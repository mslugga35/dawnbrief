# DawnBrief
> Last verified: 2026-03-13

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

## Known Issues
- **MRR change hardcoded to $0** — `mrr_change` and `mrr_change_pct` in stripe-metrics.ts are always 0. Needs yesterday's MRR stored for comparison.
- **No scheduled delivery** — Briefings are on-demand only, no daily email pipeline
- **No auth** — Users submit Stripe key each time, no accounts
- **No database** — Stateless, nothing persisted
- **Stripe key not stored** — Used once per request, discarded (secure but limits features)

## Deploying
`cd dawnbrief && npx vercel --prod --scope mslugga35s-projects`

## Next Priorities
1. **Daily email pipeline** — Cron + stored keys + Resend delivery (core product promise)
2. **User auth** — Stripe OAuth or magic link signup
3. **Database** — Supabase for user accounts + encrypted Stripe keys + MRR history
4. **MRR comparison** — Store daily snapshots for day-over-day change
5. **Pricing page** — $19/mo Stripe checkout
6. **Distribution** — Reddit (r/SaaS, r/startups, r/EntrepreneurRideAlong), X, Indie Hackers

## Gotchas
- All UI is in page.tsx (no separate components)
- Claude model hardcoded to claude-haiku-4-5-20251001
- Stripe key validation only checks prefix (sk_live_* or sk_test_*)
- No database — everything is stateless
- NEVER create Vercel deploy hooks (see main CLAUDE.md)
