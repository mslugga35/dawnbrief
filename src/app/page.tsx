"use client";

import { useState } from "react";
import {
  Mail,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sunrise,
  ChevronDown,
} from "lucide-react";

// Demo briefing for landing page
const DEMO_BRIEFING = `Your MRR grew $47 to $4,823 — steady climb, no spikes.

- 3 new trials started (2 from Product Hunt traffic, 1 organic)
- 1 churn: john@acme.com dropped the $29/mo Pro plan after 4 months
- $127 collected today from 3 successful charges, 0 failed
- 14 active subscriptions, 3 in trial (convert by March 19)
- Top plan: Pro ($29/mo) — 9 of 14 subs

The churn is worth a quick win-back email — 4 months is long enough that they saw value. A "we miss you, here's what's new" note with a 1-month discount could save it.`;

const DEMO_METRICS = {
  mrr: 4823,
  change: 47,
  subs: 14,
  trials: 3,
  revenue: 127,
  churn: 1,
};

const TICKER_ITEMS = [
  { label: "MRR", value: "$4,823", up: true },
  { label: "Active subs", value: "14" },
  { label: "Trials", value: "3", amber: true },
  { label: "Today's revenue", value: "$127", up: true },
  { label: "Churn today", value: "1", down: true },
  { label: "MRR Δ", value: "+$47", up: true },
  { label: "Top plan", value: "Pro · $29/mo" },
  { label: "Convert by", value: "Mar 19" },
];

export default function Home() {
  const [stripeKey, setStripeKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "success" | "error">("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  const handleGenerate = async () => {
    if (!stripeKey.startsWith("sk_")) {
      setError("Enter a valid Stripe secret key (starts with sk_)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripe_key: stripeKey }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBriefing(data.briefing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleWaitlist = async () => {
    if (!waitlistEmail.includes("@")) return;
    setWaitlistLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      const data = await res.json();
      if (data.message) {
        setWaitlistStatus("success");
        setWaitlistMessage(data.message);
        setWaitlistEmail("");
      } else {
        setWaitlistStatus("error");
        setWaitlistMessage(data.error || "Something went wrong");
      }
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage("Failed to join waitlist. Please try again.");
    } finally {
      setWaitlistLoading(false);
    }
  };

  // Build duplicated ticker for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)", color: "var(--text-primary)" }}>

      {/* ── Nav ── */}
      <nav className="nav-bar">
        <div className="nav-logo">
          <div className="nav-logo-mark">
            <Sunrise style={{ width: 14, height: 14, color: "#fff" }} />
          </div>
          DawnBrief
        </div>
        <div className="status-badge">
          <span className="dot" />
          Early Access
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: "relative", maxWidth: "760px", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <div className="dawn-gradient" />
        <div className="hero-beam" />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Eyebrow tag */}
          <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="status-badge">
              <span className="dot" />
              <span style={{ fontFamily: "var(--font-mono)" }}>v0.1 · beta</span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
              For SaaS founders
            </span>
          </div>

          {/* Headline */}
          <h1 className="display-hero animate-fade-up-delay-1">
            Stop Checking<br />
            <span className="gradient-text">Five Dashboards</span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up-delay-2" style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.65 }}>
            Connect Stripe and wake up to a plain-English AI briefing.
            MRR, churn, signups, anomalies — one email, every morning.
          </p>

          {/* CTA row */}
          <div className="animate-fade-up-delay-3" style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "0.8125rem 1.625rem", fontSize: "0.9rem" }}
            >
              <span>Join the Waitlist</span>
              <ArrowRight style={{ width: 15, height: 15 }} className="relative z-10" />
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById("try-it")?.scrollIntoView({ behavior: "smooth" })}
            >
              Try with your Stripe data
              <ChevronDown style={{ width: 14, height: 14 }} />
            </button>
          </div>

          <p className="animate-fade-up-delay-3 mono-data" style={{ color: "var(--text-muted)", marginTop: "-0.25rem" }}>
            $19/mo after free trial · 99% gross margin · cancel anytime
          </p>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="ticker-track" style={{ marginBottom: "0" }}>
        <div className="ticker-inner">
          {tickerItems.map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: "var(--text-faint)" }}>◆</span>
              <span>{item.label}</span>
              <span className="highlight" style={{
                color: item.up ? "var(--accent-em)" : item.down ? "#f87171" : item.amber ? "#fbbf24" : "var(--accent-teal)"
              }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Demo Section ── */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div className="section-label">
            <span className="label-tag">01 · Preview</span>
          </div>
          <h2 className="display-section" style={{ marginBottom: "0.375rem" }}>
            Your briefing looks like this
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Real data, written in plain English. No charts to decode.
          </p>
        </div>

        <div className="card-base card-glow" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.5rem" }}>
            {[
              { icon: DollarSign, label: "MRR",    value: `$${DEMO_METRICS.mrr}`,     color: "var(--accent-em)" },
              { icon: TrendingUp, label: "Change", value: `+$${DEMO_METRICS.change}`, color: "var(--accent-em)" },
              { icon: Users,      label: "Subs",   value: DEMO_METRICS.subs,           color: "#60a5fa" },
              { icon: Clock,      label: "Trials", value: DEMO_METRICS.trials,         color: "#fbbf24" },
              { icon: DollarSign, label: "Today",  value: `$${DEMO_METRICS.revenue}`,  color: "var(--text-primary)" },
              { icon: TrendingDown,label:"Churn",  value: DEMO_METRICS.churn,          color: "#f87171" },
            ].map((stat, i) => (
              <div key={i} className="stat-chip">
                <stat.icon style={{ width: 13, height: 13, margin: "0 auto 4px", display: "block", color: stat.color }} />
                <div className="value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem" }}
          >
            <Mail style={{ width: 16, height: 16 }} className="relative z-10" />
            <span>{showDemo ? "Hide" : "Read"} Today&apos;s Briefing</span>
          </button>

          {/* Demo email */}
          {showDemo && (
            <div className="email-card animate-slide-down">
              <div className="email-header">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--accent-em), var(--accent-cyan))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Zap style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                    DawnBrief — Thursday, March 12
                  </p>
                  <p className="mono-data" style={{ color: "var(--text-muted)" }}>
                    Your daily business pulse · 7:03 AM
                  </p>
                </div>
                <div className="email-dot" />
              </div>
              <div className="email-body">
                {DEMO_BRIEFING}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Try It ── */}
      <section id="try-it" style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div className="section-label">
            <span className="label-tag">02 · Live Demo</span>
          </div>
          <h2 className="display-section" style={{ marginBottom: "0.375rem" }}>
            Try it with your Stripe data
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Your key is used once server-side, then immediately discarded. Never stored.
          </p>
        </div>

        <div className="card-base" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            value={stripeKey}
            onChange={(e) => setStripeKey(e.target.value)}
            placeholder="sk_live_... or sk_test_..."
            className="input-base"
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !stripeKey}
            className="btn-primary"
            style={{ width: "100%", padding: "0.8125rem" }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: "2px solid rgba(255,255,255,0.25)",
                  borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
                  animation: "spin 0.7s linear infinite", position: "relative", zIndex: 1
                }} />
                <span className="relative z-10">Generating briefing…</span>
              </>
            ) : (
              <>
                <ArrowRight style={{ width: 15, height: 15 }} className="relative z-10" />
                <span className="relative z-10">Generate My Briefing</span>
              </>
            )}
          </button>

          {error && (
            <div className="error-toast animate-fade-in">
              <AlertTriangle style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {briefing && (
            <div className="email-card animate-slide-down">
              <div className="email-header">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--accent-em), var(--accent-cyan))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Zap style={{ width: 14, height: 14, color: "#fff" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                    DawnBrief — Your Business Pulse
                  </p>
                  <p className="mono-data" style={{ color: "var(--text-muted)" }}>Live data · just now</p>
                </div>
              </div>
              <div className="email-body">{briefing}</div>
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div className="section-label">
            <span className="label-tag">03 · How It Works</span>
          </div>
          <h2 className="display-section" style={{ marginBottom: "0.375rem" }}>
            Simple by design
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Three steps. No configuration. No dashboards.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "0.75rem" }}>
          {[
            {
              step: "1",
              title: "Connect Stripe",
              desc: "One-click OAuth. Read-only access to your subscription data. Takes 30 seconds.",
              tag: "OAuth · Read-only",
            },
            {
              step: "2",
              title: "AI analyzes overnight",
              desc: "Claude reads your metrics, compares to yesterday, spots anomalies, and writes context — while you sleep.",
              tag: "Powered by Claude",
            },
            {
              step: "3",
              title: "Wake up to clarity",
              desc: "One email. Everything that matters. MRR movement, churn signals, trial urgency — no dashboards needed.",
              tag: "7 AM delivery",
            },
          ].map((item) => (
            <div key={item.step} className="step-card">
              <div className="step-number-bg">{item.step}</div>
              <div style={{ position: "relative", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div className="step-badge">{item.step}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                      {item.title}
                    </h3>
                    <span className="mono-data" style={{
                      padding: "0.15rem 0.5rem",
                      background: "var(--bg-highlight)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "4px",
                      color: "var(--text-muted)",
                      fontSize: "0.65rem",
                    }}>
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Waitlist ── */}
      <section id="waitlist" className="waitlist-section" style={{ padding: "5rem 1.5rem 6rem" }}>
        <div className="waitlist-beacon" />

        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          <div className="waitlist-card">
            {/* Icon with pulse */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
              <div className="pulse-icon">
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))",
                  border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 24px rgba(16,185,129,0.12)",
                }}>
                  <Sunrise style={{ width: 24, height: 24, color: "var(--accent-em)" }} />
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div className="label-tag" style={{ marginBottom: "0.625rem" }}>
                  Coming soon
                </div>
                <h2 className="display-section" style={{ marginBottom: "0.625rem", fontSize: "1.75rem" }}>
                  Automated daily briefings
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  Stripe OAuth + scheduled 7 AM emails — launching soon.
                  Be first to know, and lock in the founding rate.
                </p>
              </div>

              {/* Form */}
              {waitlistStatus === "success" ? (
                <div className="success-toast animate-fade-in" style={{ width: "100%", justifyContent: "center" }}>
                  <CheckCircle2 style={{ width: 16, height: 16, flexShrink: 0 }} />
                  <span>{waitlistMessage}</span>
                </div>
              ) : (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleWaitlist()}
                      placeholder="your@email.com"
                      className="input-base input-email"
                      style={{ flex: 1 }}
                    />
                    <button
                      onClick={handleWaitlist}
                      disabled={waitlistLoading || !waitlistEmail.includes("@")}
                      className="btn-primary"
                      style={{ whiteSpace: "nowrap", padding: "0.75rem 1.125rem" }}
                    >
                      {waitlistLoading ? (
                        <span style={{
                          width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff", borderRadius: "50%", display: "block",
                          animation: "spin 0.7s linear infinite", position: "relative", zIndex: 1
                        }} />
                      ) : (
                        <>
                          <span className="relative z-10">Join Waitlist</span>
                          <ArrowRight style={{ width: 14, height: 14 }} className="relative z-10" />
                        </>
                      )}
                    </button>
                  </div>
                  {waitlistStatus === "error" && (
                    <div className="error-toast animate-fade-in">
                      <AlertTriangle style={{ width: 13, height: 13, flexShrink: 0 }} />
                      <span>{waitlistMessage}</span>
                    </div>
                  )}
                  <p className="mono-data" style={{ color: "var(--text-muted)", textAlign: "center" }}>
                    No spam · unsubscribe anytime · founding rate locked in
                  </p>
                </div>
              )}

              {/* Social proof row */}
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
                      fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 500,
                      color: "var(--accent-em)", lineHeight: 1, marginBottom: 3
                    }}>{item.val}</div>
                    <div className="label-tag" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
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
            <a href="mailto:hi@getdawnbrief.com" className="footer-link">Contact</a>
            <span className="footer-sep" />
            <a href="#" className="footer-link">Privacy</a>
            <span className="footer-sep" />
            <a href="#" className="footer-link">Terms</a>
            <span className="footer-sep" />
            <a href="#try-it" className="footer-link">Try it free</a>
          </div>
          <p className="mono-data" style={{ color: "var(--text-faint)", marginTop: "0.5rem" }}>
            © 2026 DawnBrief · Built with Claude
          </p>
        </div>
      </footer>

      {/* Spin keyframe (inline since Tailwind doesn't always have it available without @layer) */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
