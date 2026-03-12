import { NextRequest, NextResponse } from "next/server";
import { fetchStripeMetrics } from "@/lib/stripe-metrics";
import { generateBriefing } from "@/lib/briefing-generator";

// Simple in-memory rate limiter: 3 requests per minute per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in a minute." },
        { status: 429 }
      );
    }

    const { stripe_key } = await req.json();
    const apiKey = stripe_key;

    if (!apiKey || typeof apiKey !== "string") {
      return NextResponse.json(
        { error: "Stripe API key required" },
        { status: 400 }
      );
    }

    // Validate Stripe key format (sk_live_* or sk_test_*)
    if (!apiKey.startsWith("sk_live_") && !apiKey.startsWith("sk_test_")) {
      return NextResponse.json(
        { error: "Invalid Stripe key format. Must start with sk_live_ or sk_test_" },
        { status: 400 }
      );
    }

    const metrics = await fetchStripeMetrics(apiKey);
    const briefing = await generateBriefing(metrics);

    return NextResponse.json({ briefing });
  } catch (error) {
    console.error("Briefing error:", error);
    const isStripeError =
      error instanceof Error && error.message.includes("Stripe");
    return NextResponse.json(
      {
        error: isStripeError
          ? "Invalid Stripe key or Stripe API error. Check your key and try again."
          : "Failed to generate briefing",
      },
      { status: 500 }
    );
  }
}
