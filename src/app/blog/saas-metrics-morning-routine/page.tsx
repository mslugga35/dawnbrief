import type { Metadata } from "next";
import Link from "next/link";
import { Sunrise, ArrowRight, Clock, TrendingDown, TrendingUp, Users, DollarSign, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "The 5-Minute SaaS Morning Routine: Metrics That Actually Matter | DawnBrief",
  description:
    "Most SaaS founders start their day checking the wrong numbers. Here's the exact five metrics — MRR, churn, trial conversion, new customers, ARPU — to review every morning and why they tell you everything else.",
  metadataBase: new URL("https://getdawnbrief.com"),
  openGraph: {
    title: "The 5-Minute SaaS Morning Routine: Metrics That Actually Matter",
    description:
      "Most SaaS founders start their day checking the wrong numbers. Here's the exact five metrics to review every morning — and why they tell you everything else.",
    url: "https://getdawnbrief.com/blog/saas-metrics-morning-routine",
    siteName: "DawnBrief",
    type: "article",
    publishedTime: "2026-03-13T07:00:00.000Z",
    authors: ["DawnBrief"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 5-Minute SaaS Morning Routine: Metrics That Actually Matter",
    description:
      "Stop checking five dashboards. Here are the five SaaS metrics that actually signal whether your business is growing or quietly dying.",
  },
  alternates: { canonical: "https://getdawnbrief.com/blog/saas-metrics-morning-routine" },
  keywords: [
    "saas metrics dashboard",
    "saas morning routine",
    "saas daily metrics",
    "mrr tracking",
    "saas churn rate",
    "trial conversion rate",
    "arpu saas",
    "saas founder metrics",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The 5-Minute SaaS Morning Routine: Metrics That Actually Matter",
  description:
    "Most SaaS founders start their day checking the wrong numbers. Here's the exact five metrics to review every morning — MRR, churn, trial conversion, new customers, and ARPU — and why they tell you everything else.",
  datePublished: "2026-03-13T07:00:00.000Z",
  dateModified: "2026-03-13T07:00:00.000Z",
  author: {
    "@type": "Organization",
    name: "DawnBrief",
    url: "https://getdawnbrief.com",
  },
  publisher: {
    "@type": "Organization",
    name: "DawnBrief",
    url: "https://getdawnbrief.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://getdawnbrief.com/blog/saas-metrics-morning-routine",
  },
  keywords:
    "saas metrics dashboard, saas morning routine, saas daily metrics, mrr tracking, churn rate, trial conversion",
};

const METRICS = [
  {
    number: "01",
    icon: DollarSign,
    color: "var(--accent-em)",
    bgColor: "rgba(16,185,129,0.08)",
    borderColor: "rgba(16,185,129,0.2)",
    title: "MRR — Monthly Recurring Revenue",
    keyword: "The Scoreboard",
    body: [
      "MRR is the number your entire business is built around. Not revenue, not ARR — MRR, because it tells you what you earned this month from subscriptions and whether that number went up or down from yesterday.",
      "The daily delta is what matters most. A $4,823 MRR is just a number. A $4,823 MRR that grew $47 since yesterday morning tells you that expansion is happening — new signups or upgrades are outpacing churn. A $4,823 MRR that shrank $112 since yesterday tells you something broke, and you have a narrow window to find out what.",
      "What to look for every morning: Is MRR up, flat, or down? If it moved more than 2% in either direction with no obvious cause (a big launch, a holiday), dig in immediately. Big unexpected swings are early warnings of billing failures or a surge you should double down on.",
    ],
    callout: {
      label: "Daily target",
      value: "MRR Δ > $0",
      subtext: "Any positive movement compounds — a $50/day average is $18K/yr of organic growth",
    },
  },
  {
    number: "02",
    icon: TrendingDown,
    color: "#f87171",
    bgColor: "rgba(239,68,68,0.07)",
    borderColor: "rgba(239,68,68,0.18)",
    title: "Churn — Who Left and Why",
    keyword: "The Leak",
    body: [
      "Revenue churn and customer churn are two different numbers and most founders only track one. Revenue churn tells you how much MRR you lost. Customer churn tells you how many accounts cancelled. A single $499/mo enterprise cancellation has 17x the revenue impact of a $29/mo solo founder leaving — but both count as one customer.",
      "The time to respond to churn is the same day it happens, not at the end of the month. If someone cancels at 9 PM Tuesday, a win-back email sent Wednesday morning has a 3-7x higher conversion rate than one sent a week later. By then, they've moved on, found an alternative, or forgotten what your product does.",
      "Daily churn also tells you whether you have a product problem or a market problem. If churn spikes from a specific cohort — users who signed up in the last 30 days, users on a specific plan, users from a specific acquisition channel — that's signal, not noise. Most monthly churn reports bury this pattern under aggregation.",
    ],
    callout: {
      label: "Healthy benchmark",
      value: "< 2% monthly",
      subtext: "Anything above 5% monthly churn is a leaky bucket — growth can't outrun it",
    },
  },
  {
    number: "03",
    icon: RefreshCw,
    color: "#fbbf24",
    bgColor: "rgba(251,191,36,0.07)",
    borderColor: "rgba(251,191,36,0.18)",
    title: "Trial Conversion — Time-Sensitive Revenue",
    keyword: "The Pressure Gauge",
    body: [
      "Trial conversion is the most time-sensitive metric on this list because it expires. Every trial account has a clock running. When that clock hits zero, one of two things happens: they convert and you gain a customer, or they don't and you've permanently lost them — very few churned trial users ever come back.",
      "The number to watch each morning is not your overall trial conversion rate (a lagging indicator) — it's which trials are expiring in the next 72 hours and whether those users have activated. Activation means they've done the core thing your product is designed for: generated a briefing, run a report, sent a message, whatever that is for you.",
      "Non-activated trials expiring in 3 days have a sub-5% conversion rate with zero intervention. The same users with a targeted email — not a generic 'trial ending soon' blast, but a specific 'you haven't tried X yet' message — convert at 15-25%. That's a 3-5x lift from knowing one number every morning.",
    ],
    callout: {
      label: "Industry average",
      value: "15-25% trial-to-paid",
      subtext: "Top-quartile B2B SaaS converts 25-40% of trials — the difference is activation, not features",
    },
  },
  {
    number: "04",
    icon: Users,
    color: "#60a5fa",
    bgColor: "rgba(96,165,250,0.07)",
    borderColor: "rgba(96,165,250,0.18)",
    title: "New Customers — Acquisition Velocity",
    keyword: "The Fuel",
    body: [
      "New customers today tell you whether your acquisition engine is running. Not leads, not signups, not trial starts — paying customers who converted in the last 24 hours. This number should be non-zero on most business days if you're in growth mode.",
      "The source breakdown matters as much as the count. Two new customers from organic search means your SEO content is working. Two new customers from a Reddit thread means someone found you via word of mouth. Two new customers with a shared UTM parameter means your paid campaign converted. The same number with three different acquisition stories means your funnel has multiple working channels — and that's a qualitatively different business than one that depends on a single source.",
      "When new customers drop to zero for two or more consecutive days, don't wait until the end of the week to investigate. Check whether traffic dropped, whether your signup flow has an error, whether a payment method stopped working, or whether your top acquisition source dried up. These are all fixable within hours if caught early.",
    ],
    callout: {
      label: "Growth signal",
      value: "Net new > churn",
      subtext: "If new customers exceed churned customers every day, your business compounds — even slowly",
    },
  },
  {
    number: "05",
    icon: TrendingUp,
    color: "var(--accent-cyan)",
    bgColor: "rgba(6,182,212,0.07)",
    borderColor: "rgba(6,182,212,0.18)",
    title: "ARPU — Average Revenue Per User",
    keyword: "The Efficiency Score",
    body: [
      "ARPU tells you how much revenue each customer generates on average: MRR divided by total active subscriptions. A rising ARPU means your mix is shifting toward higher-value plans — either customers are upgrading, or new customers are choosing more expensive tiers. A falling ARPU means the opposite, and it's often an early warning before revenue growth stalls.",
      "The daily ARPU movement is subtle — you won't see dramatic swings unless someone on a large plan churns or a significant upgrade happens. What you're watching for is the trend over a rolling 7-day window. If ARPU has drifted down 10% over the last week without a deliberate decision (like a promotion), that's a product mix problem, a pricing problem, or a sign that you're attracting lower-value customers than before.",
      "ARPU also surfaces expansion revenue opportunities. If your average customer pays $29 but you have a $79 plan, and ARPU has been flat at $31 for months, your upgrade path isn't working. That's a different problem than churn, but it's equally important for growth — the cheapest customer you'll ever close is one you already have.",
    ],
    callout: {
      label: "Expansion lever",
      value: "ARPU × subscribers",
      subtext: "A $10 ARPU increase on 100 subscribers is $1,000/mo of revenue without acquiring a single new customer",
    },
  },
];

export default function SaasMetricsMorningRoutine() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)", color: "var(--text-primary)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Nav ── */}
      <nav className="nav-bar" aria-label="Main navigation">
        <Link href="/" className="nav-logo" style={{ textDecoration: "none" }} aria-label="DawnBrief home">
          <div className="nav-logo-mark" aria-hidden="true">
            <Sunrise style={{ width: 14, height: 14, color: "#fff" }} />
          </div>
          DawnBrief
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <Link
            href="/blog"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.15s",
            }}
          >
            ← Blog
          </Link>
          <Link
            href="/#waitlist"
            className="btn-primary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
          >
            <span>Try DawnBrief</span>
            <ArrowRight style={{ width: 13, height: 13 }} aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <main id="main-content">
        {/* ── Article Header ── */}
        <header style={{ position: "relative", maxWidth: "720px", margin: "0 auto", padding: "3.5rem 1.5rem 2.5rem", overflow: "hidden" }}>
          <div className="dawn-gradient" aria-hidden="true" />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol style={{ display: "flex", alignItems: "center", gap: "0.375rem", listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.75rem", textDecoration: "none" }}>
                    DawnBrief
                  </Link>
                </li>
                <li style={{ color: "var(--text-faint)", fontSize: "0.75rem" }} aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" style={{ color: "var(--text-muted)", fontSize: "0.75rem", textDecoration: "none" }}>
                    Blog
                  </Link>
                </li>
                <li style={{ color: "var(--text-faint)", fontSize: "0.75rem" }} aria-hidden="true">/</li>
                <li style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }} aria-current="page">
                  SaaS Morning Routine
                </li>
              </ol>
            </nav>

            {/* Category + meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent-em)",
                  padding: "0.175rem 0.5rem",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "4px",
                }}
              >
                Metrics
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)" }}>
                <Clock style={{ width: 11, height: 11 }} aria-hidden="true" />
                <span className="mono-data">8 min read</span>
              </div>
              <span className="mono-data" style={{ color: "var(--text-muted)" }}>
                March 13, 2026
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              The 5-Minute SaaS Morning Routine:{" "}
              <span className="gradient-text">Metrics That Actually Matter</span>
            </h1>

            {/* Deck */}
            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "580px",
              }}
            >
              Most SaaS founders start their day by opening Stripe, then Mixpanel, then their email,
              then a spreadsheet. Forty-five minutes later they have a vague sense of how the business
              is doing. Here&apos;s how to get a precise picture in five minutes flat — and which five numbers
              actually drive every decision that matters.
            </p>
          </div>
        </header>

        {/* ── Article Body ── */}
        <article
          style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}
          aria-label="Article: The 5-Minute SaaS Morning Routine"
        >

          {/* Intro section */}
          <section style={{ marginBottom: "3rem" }}>
            <div className="card-base card-glow" style={{ padding: "1.5rem 1.75rem" }}>
              <p
                className="label-tag"
                style={{ color: "var(--accent-em)", marginBottom: "0.75rem" }}
              >
                The core insight
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.75 }}>
                A SaaS business has hundreds of metrics you <em>could</em> track, but only five that you need to
                check every single morning. These five numbers — MRR, churn, trial conversion, new customers,
                and ARPU — form a complete diagnostic picture. If all five are healthy, your business is growing.
                If any one of them is broken, the others will show the downstream effects within 72 hours.
                Understanding the relationships between them is what separates reactive founders from ones
                who never get surprised.
              </p>
            </div>
          </section>

          {/* Why dashboards fail */}
          <section style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.625rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "1.125rem",
              }}
            >
              Why Your Current SaaS Metrics Dashboard Is Making You Slower
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
              <p>
                The problem with most SaaS metrics dashboards is that they optimize for completeness, not
                for decision speed. They show you 40 charts, color-coded by period, with comparison toggles
                and drill-down tables. By the time you&apos;ve loaded the dashboard and figured out what&apos;s different
                from yesterday, you&apos;ve already spent 20 minutes and you&apos;re no clearer on what to do first.
              </p>
              <p>
                The second problem is that most SaaS metrics dashboards are passive. They show you what
                happened. They don&apos;t tell you what it <em>means</em>, which numbers are worth worrying about,
                or what action to take. That interpretation step is left entirely to you — and after a
                long day, at 8 AM with coffee in hand, most founders just pattern-match against their
                existing beliefs rather than doing genuine analysis.
              </p>
              <p>
                The solution is not a better dashboard. It&apos;s a tighter set of metrics reviewed in a consistent
                order every morning, with a clear decision framework for each one. Here are the five that
                matter and exactly what to do with them.
              </p>
            </div>
          </section>

          {/* The 5 metrics */}
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <section key={metric.number} style={{ marginBottom: "3.5rem" }} aria-labelledby={`metric-${idx + 1}`}>
                {/* Metric header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "10px",
                      background: metric.bgColor,
                      border: `1px solid ${metric.borderColor}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <Icon style={{ width: 20, height: 20, color: metric.color }} />
                  </div>
                  <div>
                    <div
                      className="mono-data"
                      style={{ color: metric.color, marginBottom: "0.25rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      Metric {metric.number} · {metric.keyword}
                    </div>
                    <h2
                      id={`metric-${idx + 1}`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        color: "var(--text-primary)",
                      }}
                    >
                      {metric.title}
                    </h2>
                  </div>
                </div>

                {/* Body paragraphs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.25rem" }}>
                  {metric.body.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Callout chip */}
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    padding: "0.875rem 1.125rem",
                    background: metric.bgColor,
                    border: `1px solid ${metric.borderColor}`,
                    borderRadius: "0.75rem",
                  }}
                  role="note"
                  aria-label={`${metric.callout.label}: ${metric.callout.value}`}
                >
                  <div
                    className="mono-data"
                    style={{ color: metric.color, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {metric.callout.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: metric.color,
                      lineHeight: 1.2,
                    }}
                  >
                    {metric.callout.value}
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: "400px" }}>
                    {metric.callout.subtext}
                  </div>
                </div>
              </section>
            );
          })}

          {/* How to read them together */}
          <section style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.625rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "1.125rem",
              }}
            >
              How the Five Metrics Interact
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
              <p>
                These five numbers are not independent. They tell a story together, and the story only makes
                sense if you read them in sequence. Start with MRR to get the headline. Then use churn and
                new customers to explain the movement. Then use trial conversion to see what&apos;s coming in the
                next 30 days. Finally, check ARPU to understand whether the mix is shifting toward higher
                or lower-value customers.
              </p>
              <p>
                The failure mode is checking them in isolation. If MRR is up $200 today, that looks like
                good news. But if churn is also elevated and two large accounts converted — meaning the
                underlying subscription base is actually thinning — you have a fragile business dressed up
                as a growing one. ARPU rising while subscriber count falls is the classic pattern of a product
                that&apos;s pricing its way into a corner.
              </p>
              <p>
                The daily SaaS morning routine should take five minutes or less once you know what you&apos;re
                looking for. Here&apos;s the exact order: MRR delta, churn (who and why), trials expiring in
                72 hours, new customers (count and source), ARPU trend. If all five are moving in the right
                direction, ship something. If one of them is off, you have a clear next task before you touch
                anything else.
              </p>
            </div>

            {/* Decision table */}
            <div
              className="card-base"
              style={{ marginTop: "1.75rem", overflow: "hidden" }}
              role="table"
              aria-label="Morning metric decision framework"
            >
              <div
                style={{
                  padding: "0.875rem 1.25rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "linear-gradient(135deg, rgba(16,185,129,0.04), rgba(6,182,212,0.02))",
                }}
                role="rowgroup"
              >
                <div
                  role="row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div role="columnheader" className="label-tag">If you see this…</div>
                  <div role="columnheader" className="label-tag">Do this first</div>
                </div>
              </div>
              {[
                { signal: "MRR down >2% from yesterday", action: "Check failed charges + churn log before anything else" },
                { signal: "Churn spike from single cohort", action: "Pull that cohort's activation data — product failure, not market" },
                { signal: "Trials expiring in 48 hrs, not activated", action: "Send manual 'you haven't tried X' email today" },
                { signal: "Zero new customers, 2+ days", action: "Check Stripe, check signup flow, check top acquisition source" },
                { signal: "ARPU falling for 7 days straight", action: "Audit plan mix — likely high-value churn or downgrade pattern" },
              ].map((row, i) => (
                <div
                  key={i}
                  role="row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < 4 ? "1px solid var(--border-subtle)" : undefined,
                    alignItems: "start",
                  }}
                >
                  <div
                    role="cell"
                    className="mono-data"
                    style={{ color: "var(--text-primary)", fontSize: "0.775rem", lineHeight: 1.5 }}
                  >
                    {row.signal}
                  </div>
                  <div
                    role="cell"
                    style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: 1.55 }}
                  >
                    {row.action}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Automation section */}
          <section style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.5vw, 1.625rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "1.125rem",
              }}
            >
              The Case for Automating Your SaaS Daily Metrics Review
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.75 }}>
              <p>
                The five-metric routine only works if you actually do it every day — and that&apos;s where most
                founders fall off. When the business is growing and things are going well, the morning
                review feels unnecessary. When things are going badly, it feels too stressful to confront
                before the first meeting. Both of these are exactly the wrong time to skip it.
              </p>
              <p>
                The solution that actually works in practice is automated delivery: a plain-English summary
                of all five metrics waiting in your inbox at 7 AM, every morning, before you open anything else.
                Not a link to a dashboard. Not a notification. A summary you can read in two minutes that
                tells you the headline for each number, whether it changed, and what (if anything) needs
                attention today.
              </p>
              <p>
                This is the problem DawnBrief was built to solve. Connect your Stripe account once, and every
                morning you&apos;ll wake up to an AI-generated brief covering exactly these five metrics — with
                context, anomaly detection, and specific action items based on what the numbers actually show.
                No dashboards, no interpretation required, no 45-minute morning ritual.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section
            className="waitlist-section"
            style={{ borderRadius: "1.25rem", marginBottom: "4rem", padding: "0", overflow: "hidden" }}
            aria-labelledby="cta-heading"
          >
            <div className="waitlist-beacon" aria-hidden="true" />
            <div className="waitlist-card" style={{ margin: "0" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", textAlign: "center" }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))",
                  border: "1px solid rgba(16,185,129,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(16,185,129,0.08)",
                }}>
                  <Sunrise style={{ width: 22, height: 22, color: "var(--accent-em)" }} />
                </div>

                <div>
                  <div className="label-tag" style={{ marginBottom: "0.625rem" }}>
                    Stop checking five dashboards
                  </div>
                  <h2
                    id="cta-heading"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Get all five metrics in one email,{" "}
                    <span className="gradient-text">every morning</span>
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65, maxWidth: "400px", margin: "0 auto" }}>
                    DawnBrief connects to Stripe and delivers a plain-English AI briefing — MRR, churn, trial
                    urgency, new customers, ARPU — before you open your first meeting.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", width: "100%", maxWidth: "340px" }}>
                  <Link
                    href="/#waitlist"
                    className="btn-primary"
                    style={{ width: "100%", padding: "0.875rem 1.5rem" }}
                    aria-label="Join the DawnBrief waitlist"
                  >
                    <span>Join the Waitlist — It&apos;s Free</span>
                    <ArrowRight style={{ width: 15, height: 15 }} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/#try-it"
                    className="btn-ghost"
                    style={{ width: "100%", padding: "0.75rem 1.5rem" }}
                    aria-label="Try DawnBrief with your Stripe data"
                  >
                    Try it with your Stripe data →
                  </Link>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border-subtle)",
                  width: "100%",
                  justifyContent: "center",
                }}>
                  {[
                    { val: "$19/mo", label: "after trial" },
                    { val: "2 min", label: "setup" },
                    { val: "7 AM", label: "delivery" },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 500,
                        color: "var(--accent-em)", lineHeight: 1, marginBottom: 3
                      }}>{item.val}</div>
                      <div className="label-tag" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <div className="footer-divider" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem" }}>
          <div className="footer-brand">
            <Sunrise style={{ width: 14, height: 14, color: "var(--accent-em)" }} />
            DawnBrief
            <span className="dot" />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.625rem" }}>
            AI daily business briefings for SaaS founders
          </p>
          <div className="footer-links">
            <Link href="/" className="footer-link">Home</Link>
            <span className="footer-sep" />
            <Link href="/blog" className="footer-link">Blog</Link>
            <span className="footer-sep" />
            <a href="mailto:hi@getdawnbrief.com" className="footer-link">Contact</a>
            <span className="footer-sep" />
            <a href="#" className="footer-link">Privacy</a>
          </div>
          <p className="mono-data" style={{ color: "var(--text-faint)", marginTop: "0.5rem" }}>
            © 2026 DawnBrief · Built with Claude
          </p>
        </div>
      </footer>
    </div>
  );
}
