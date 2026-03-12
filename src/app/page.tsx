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

export default function Home() {
  const [stripeKey, setStripeKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
            <Mail className="w-4 h-4 text-blue-400" />
            Your business, summarized daily
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Stop Checking
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Five Dashboards
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Connect Stripe and get a daily AI briefing in your inbox. MRR,
            churn, signups, anomalies — in plain English, every morning.
          </p>
          <p className="text-sm text-zinc-600">
            $19/mo after free trial. 99% gross margin. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              {
                icon: DollarSign,
                label: "MRR",
                value: `$${DEMO_METRICS.mrr}`,
                color: "text-emerald-400",
              },
              {
                icon: TrendingUp,
                label: "Change",
                value: `+$${DEMO_METRICS.change}`,
                color: "text-emerald-400",
              },
              {
                icon: Users,
                label: "Subs",
                value: DEMO_METRICS.subs,
                color: "text-blue-400",
              },
              {
                icon: Clock,
                label: "Trials",
                value: DEMO_METRICS.trials,
                color: "text-amber-400",
              },
              {
                icon: DollarSign,
                label: "Today",
                value: `$${DEMO_METRICS.revenue}`,
                color: "text-zinc-300",
              },
              {
                icon: TrendingDown,
                label: "Churn",
                value: DEMO_METRICS.churn,
                color: "text-red-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-zinc-800/50 rounded-xl p-3 text-center"
              >
                <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Demo Briefing Toggle */}
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-5 h-5" />
            {showDemo ? "Hide" : "See"} Example Briefing
          </button>

          {showDemo && (
            <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-700">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    DawnBrief — March 12
                  </p>
                  <p className="text-xs text-zinc-500">
                    Your daily business pulse
                  </p>
                </div>
              </div>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                {DEMO_BRIEFING}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Try It Section */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-200">
            Try with your Stripe data
          </h2>
          <p className="text-sm text-zinc-500">
            Paste your Stripe secret key to generate a real briefing. Your key
            is never stored — it&apos;s used once server-side then discarded.
          </p>
          <input
            type="password"
            value={stripeKey}
            onChange={(e) => setStripeKey(e.target.value)}
            placeholder="sk_live_... or sk_test_..."
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !stripeKey}
            className="w-full py-3 px-6 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating briefing...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                Generate My Briefing
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {briefing && (
            <div className="bg-zinc-800/50 rounded-xl p-5 border border-emerald-500/20">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                {briefing}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "1",
              title: "Connect Stripe",
              desc: "One-click OAuth. Read-only access to your subscription data.",
            },
            {
              step: "2",
              title: "AI analyzes overnight",
              desc: "Claude reads your metrics, spots anomalies, writes context.",
            },
            {
              step: "3",
              title: "Wake up to clarity",
              desc: "One email. Everything that matters. No dashboards needed.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400 mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-zinc-200 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-600">
        DawnBrief — AI Daily Business Briefing for SaaS Founders
      </footer>
    </div>
  );
}
