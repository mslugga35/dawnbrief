import Link from "next/link";
import { Sunrise, ArrowRight } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | DawnBrief",
  description: "This page doesn't exist. Head back to DawnBrief.",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-void)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "420px" }}>
        {/* Logo mark */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            background:
              "linear-gradient(135deg, var(--accent-em) 0%, var(--accent-cyan) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
            boxShadow: "0 4px 20px rgba(16,185,129,0.25)",
          }}
        >
          <Sunrise style={{ width: 24, height: 24, color: "#fff" }} aria-hidden="true" />
        </div>

        {/* 404 number */}
        <div
          className="mono-data"
          style={{
            fontSize: "0.75rem",
            color: "var(--accent-em)",
            letterSpacing: "0.18em",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          Error 404
        </div>

        <h1
          className="display-section"
          style={{ marginBottom: "1rem", fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            marginBottom: "2rem",
          }}
        >
          This page doesn&apos;t exist — but your morning briefing does.
          Head back and connect your Stripe account.
        </p>

        <Link
          href="/"
          className="btn-primary"
          style={{
            display: "inline-flex",
            padding: "0.8125rem 1.625rem",
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
          aria-label="Go back to DawnBrief homepage"
        >
          <span>Back to DawnBrief</span>
          <ArrowRight style={{ width: 15, height: 15 }} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
