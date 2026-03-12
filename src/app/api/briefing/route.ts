import { NextRequest, NextResponse } from "next/server";
import { fetchStripeMetrics } from "@/lib/stripe-metrics";
import { generateBriefing } from "@/lib/briefing-generator";

export async function POST(req: NextRequest) {
  try {
    const { stripe_key } = await req.json();
    const apiKey = stripe_key || process.env.STRIPE_SECRET_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Stripe API key required" },
        { status: 400 }
      );
    }

    const metrics = await fetchStripeMetrics(apiKey);
    const briefing = await generateBriefing(metrics);

    return NextResponse.json({ metrics, briefing });
  } catch (error) {
    console.error("Briefing error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate briefing";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
