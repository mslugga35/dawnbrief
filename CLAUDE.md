# DawnBrief
> Last verified: 2026-03-23 (overnight update: confirmed MRR change fix, documented actual implementation)

## Project
- **Repo:** `github.com/mslugga35/dawnbrief` (branch: `master`)
- **Live:** https://getdawnbrief.com
- **Stack:** Next.js 16 + Claude API (Haiku) + Stripe SDK + Resend + Tailwind 4 + Vercel
- **Fonts:** Plus Jakarta Sans (body), IBM Plex Mono (monospace)
- **Colors:** Dark mode, emerald→teal→cyan gradients

## Architecture
- **Homepage:** `src/app/page.tsx` — Full landing page with live demo
- **Briefing API:** `src/app/api/briefing/route.ts` — Accepts Stripe key, fetches metrics, Claude generates briefing
- **Waitlist API:** `src/app/api/waitlist/route.ts` — Resend email capture
- **Stripe Metrics:** `src/lib/stripe-metrics.ts` — MRR, trials, churn, top plan calculation
- **Briefing Generator:** `src/lib/briefing-generator.ts` — Claude Haiku prompt for SaaS briefings
- **Rate limiting:** In-memory per IP (3/min for both endpoints)

## How It Works
1. User pastes Stripe API key (sk_live_* or sk_test_*)
2. Server fetches subscriptions, charges, cancellations from Stripe
3. Calculates MRR, new customers, trials, churn
4. Claude generates plain-English daily briefing (<200 words)
5. Returns briefing to frontend

## Env Vars
- `ANTHROPIC_API_KEY` — Claude API
- `STRIPE_SECRET_KEY` — (empty, users provide their own)
- `RESEND_API_KEY` — Waitlist emails
- `NEXT_PUBLIC_APP_URL` — App URL
- `WAITLIST_NOTIFY_EMAIL` — Notification recipient

## Implemented ✅
- **MRR calculation** — Includes day-over-day change (new vs canceled subscriptions), % change
- **Rate limiting** — 3 req/min per IP on both briefing and waitlist APIs
- **Stripe key validation** — Checks sk_live_* or sk_test_* prefix
- **Claude integration** — Haiku model generates ~150-200 word briefings
- **Waitlist** — Email capture + Resend notification to WAITLIST_NOTIFY_EMAIL
- **Email privacy** — Customer churn list masks emails (first 2 chars + domain only)

## Not Implemented (Backlog)
- **Scheduled delivery** — Briefings are on-demand only, no daily email pipeline
- **User auth** — No accounts; users paste Stripe key each time
- **Database** — Stateless, nothing persisted
- **Stripe key storage** — Keys used once per request, discarded (secure but limits features)
- **MRR history** — No daily snapshots for historical comparison

## Deploying
`cd dawnbrief && npx vercel --prod --scope mslugga35s-projects`

## In Progress
- **Toolkit section** — Branch `overnight/dawnbrief/2026-03-16` has 85 lines uncommitted. Adds "Build your own briefing system" section with Gumroad product link. Needs review/completion before merging.

## Next Priorities
1. **Complete & merge toolkit feature** — Finish the in-progress section on overnight/dawnbrief/2026-03-16 branch
2. **Daily email pipeline** — Cron job + Vercel deployments + stored keys + Resend delivery (core product promise)
3. **User auth + database** — Supabase for accounts + encrypted Stripe keys + MRR history
4. **Pricing page** — $19/mo Stripe checkout
5. **Distribution** — Reddit (r/SaaS, r/startups, r/EntrepreneurRideAlong), X, Indie Hackers

## Gotchas
- All UI is in page.tsx (no separate components)
- Claude model hardcoded to claude-haiku-4-5-20251001
- Stripe key validation only checks prefix (sk_live_* or sk_test_*)
- No database — everything is stateless
- NEVER create Vercel deploy hooks (see main CLAUDE.md)
