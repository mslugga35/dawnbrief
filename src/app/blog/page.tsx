import type { Metadata } from "next";
import Link from "next/link";
import { Sunrise, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — SaaS Metrics & Growth | DawnBrief",
  description:
    "Practical guides for SaaS founders on metrics, growth, and building better morning routines for your business data.",
  metadataBase: new URL("https://getdawnbrief.com"),
  openGraph: {
    title: "Blog — SaaS Metrics & Growth | DawnBrief",
    description:
      "Practical guides for SaaS founders on metrics, growth, and building better morning routines for your business data.",
    url: "https://getdawnbrief.com/blog",
    siteName: "DawnBrief",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — SaaS Metrics & Growth | DawnBrief",
    description:
      "Practical guides for SaaS founders on metrics, growth, and building better morning routines for your business data.",
  },
  alternates: { canonical: "https://getdawnbrief.com/blog" },
};

const ARTICLES = [
  {
    slug: "saas-metrics-morning-routine",
    title: "The 5-Minute SaaS Morning Routine: Metrics That Actually Matter",
    description:
      "Most SaaS founders start their day checking the wrong numbers. Here's the exact five metrics to review every morning — and why they tell you everything else you need to know.",
    category: "Metrics",
    readTime: "8 min read",
    date: "March 13, 2026",
    tags: ["MRR", "Churn", "Trial Conversion", "ARPU"],
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-void)", color: "var(--text-primary)" }}>

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
              fontWeight: 600,
              color: "var(--accent-em)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
            aria-current="page"
          >
            Blog
          </Link>
          <Link
            href="/#waitlist"
            className="btn-primary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
          >
            <span>Join Waitlist</span>
            <ArrowRight style={{ width: 13, height: 13 }} aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <main id="main-content">
        {/* ── Hero ── */}
        <section style={{ position: "relative", maxWidth: "760px", margin: "0 auto", padding: "3.5rem 1.5rem 2.5rem", overflow: "hidden" }}>
          <div className="dawn-gradient" aria-hidden="true" />
          <div style={{ position: "relative" }}>
            <div className="section-label" style={{ marginBottom: "1rem" }}>
              <span className="label-tag">DawnBrief</span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "0.875rem",
              }}
            >
              The <span className="gradient-text">SaaS Founder</span> Blog
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.65 }}>
              Practical guides on metrics, growth, and building smarter morning
              routines for your business — from the team behind DawnBrief.
            </p>
          </div>
        </section>

        {/* ── Article Grid ── */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{ textDecoration: "none" }}
                aria-label={`Read: ${article.title}`}
              >
                <article
                  className="card-base blog-card"
                  style={{
                    padding: "1.75rem",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1.25rem",
                    alignItems: "center",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {/* Meta row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
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
                        {article.category}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)" }}>
                        <Clock style={{ width: 11, height: 11 }} aria-hidden="true" />
                        <span className="mono-data">{article.readTime}</span>
                      </div>
                      <span className="mono-data" style={{ color: "var(--text-muted)" }}>
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.25,
                        color: "var(--text-primary)",
                      }}
                    >
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {article.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono-data"
                          style={{
                            padding: "0.175rem 0.5rem",
                            background: "var(--bg-raised)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "4px",
                            color: "var(--text-muted)",
                            fontSize: "0.65rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--bg-raised)",
                      border: "1px solid var(--border-mid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--text-muted)",
                    }}
                    aria-hidden="true"
                  >
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
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
            <a href="mailto:hi@getdawnbrief.com" className="footer-link">Contact</a>
            <span className="footer-sep" />
            <a href="#" className="footer-link">Privacy</a>
            <span className="footer-sep" />
            <a href="#" className="footer-link">Terms</a>
          </div>
          <p className="mono-data" style={{ color: "var(--text-faint)", marginTop: "0.5rem" }}>
            © 2026 DawnBrief · Built with Claude
          </p>
        </div>
      </footer>
      <style>{`
        .blog-card:hover {
          border-color: rgba(16,185,129,0.3) !important;
          box-shadow: 0 4px 32px rgba(16,185,129,0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
