import Stripe from "stripe";

export interface StripeMetrics {
  mrr: number;
  mrr_change: number;
  mrr_change_pct: number;
  new_customers: number;
  churned_customers: { email: string; plan: string; months_active: number }[];
  total_revenue_today: number;
  active_subscriptions: number;
  trial_count: number;
  top_plan: string;
  period: { start: string; end: string };
}

export async function fetchStripeMetrics(
  apiKey: string
): Promise<StripeMetrics> {
  const stripe = new Stripe(apiKey);

  const now = Math.floor(Date.now() / 1000);
  const todayStart = now - (now % 86400);
  const yesterdayStart = todayStart - 86400;
  // Fetch in parallel
  const [subscriptions, recentCharges, recentCancellations] = await Promise.all(
    [
      stripe.subscriptions.list({
        status: "all",
        limit: 100,
        expand: ["data.customer"],
      }),
      stripe.charges.list({
        created: { gte: todayStart },
        limit: 100,
      }),
      stripe.subscriptions.list({
        status: "canceled",
        created: { gte: yesterdayStart },
        limit: 50,
        expand: ["data.customer"],
      }),
    ]
  );

  // Calculate MRR from active subscriptions
  const activeSubs = subscriptions.data.filter(
    (s) => s.status === "active" || s.status === "trialing"
  );
  const mrr = activeSubs.reduce((sum, sub) => {
    const item = sub.items.data[0];
    if (!item?.price?.unit_amount || !item?.price?.recurring) return sum;
    const amount = item.price.unit_amount / 100;
    const interval = item.price.recurring.interval;
    if (interval === "month") return sum + amount;
    if (interval === "year") return sum + amount / 12;
    return sum + amount;
  }, 0);

  // Count trials
  const trialCount = activeSubs.filter((s) => s.status === "trialing").length;

  // New customers (subscriptions created today)
  const newCustomers = subscriptions.data.filter(
    (s) => s.created >= todayStart
  ).length;

  // Revenue today
  const totalRevenueToday = recentCharges.data
    .filter((c) => c.paid && !c.refunded)
    .reduce((sum, c) => sum + c.amount / 100, 0);

  // Churned customers
  const churned = recentCancellations.data.map((sub) => {
    const customer =
      typeof sub.customer === "object" && sub.customer !== null
        ? (sub.customer as Stripe.Customer)
        : null;
    const canceledAt = sub.canceled_at ?? sub.ended_at ?? now;
    const months = Math.round(
      (canceledAt - sub.start_date) / (30 * 86400)
    );
    return {
      email: customer?.email || "unknown",
      plan: sub.items.data[0]?.price?.nickname || "unknown",
      months_active: months,
    };
  });

  // Top plan by count
  const planCounts: Record<string, number> = {};
  activeSubs.forEach((sub) => {
    const name = sub.items.data[0]?.price?.nickname || "default";
    planCounts[name] = (planCounts[name] || 0) + 1;
  });
  const topPlan =
    Object.entries(planCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "none";

  return {
    mrr: Math.round(mrr * 100) / 100,
    mrr_change: 0, // TODO: compare with stored yesterday's MRR
    mrr_change_pct: 0,
    new_customers: newCustomers,
    churned_customers: churned,
    total_revenue_today: Math.round(totalRevenueToday * 100) / 100,
    active_subscriptions: activeSubs.filter((s) => s.status === "active")
      .length,
    trial_count: trialCount,
    top_plan: topPlan,
    period: {
      start: new Date(todayStart * 1000).toISOString().split("T")[0],
      end: new Date(now * 1000).toISOString().split("T")[0],
    },
  };
}
