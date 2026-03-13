import Anthropic from "@anthropic-ai/sdk";
import { StripeMetrics } from "./stripe-metrics";

const BRIEFING_PROMPT = `You are a concise business analyst writing a daily morning briefing for a SaaS founder.

Write a short, scannable email briefing based on the metrics provided. Be direct and actionable.

FORMAT:
- Start with a one-line summary (the "headline")
- Use bullet points for each key metric with context
- Flag anything unusual with a warning emoji
- If there's churn, mention it with the masked email (as provided) and how long they were subscribed
- End with one actionable suggestion based on the data
- Keep it under 200 words total
- Use plain text, no markdown headers — this goes in an email

TONE: Like a smart co-founder giving you a 30-second update over coffee. Casual but precise.`;

const anthropic = new Anthropic();

export async function generateBriefing(
  metrics: StripeMetrics
): Promise<string> {

  const metricsText = `
TODAY'S METRICS (${metrics.period.end}):
- MRR: $${metrics.mrr.toLocaleString()}${metrics.mrr_change !== 0 ? ` (${metrics.mrr_change >= 0 ? "+" : ""}$${metrics.mrr_change} / ${metrics.mrr_change_pct >= 0 ? "+" : ""}${metrics.mrr_change_pct}%)` : ""}
- Active Subscriptions: ${metrics.active_subscriptions}
- Trials: ${metrics.trial_count}
- New Customers Today: ${metrics.new_customers}
- Revenue Collected Today: $${metrics.total_revenue_today}
- Top Plan: ${metrics.top_plan}
- Churned (last 24h): ${metrics.churned_customers.length === 0 ? "None" : metrics.churned_customers.map((c) => `${c.email.replace(/^(.{2}).*(@.*)$/, "$1***$2")} (${c.plan}, ${c.months_active}mo)`).join(", ")}
`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: BRIEFING_PROMPT,
    messages: [{ role: "user", content: metricsText }],
  });

  return response.content[0]?.type === "text" ? response.content[0].text : "";
}
