# DawnBrief

> Daily AI briefing for SaaS founders. One Stripe API key → instant metrics summary + Claude-generated insights.

**Live**: https://getdawnbrief.com

---

## What It Does

1. **Paste your Stripe API key** (sk_live_* or sk_test_*)
2. **Get instant briefing**: MRR, new customers, churn, revenue today, top plan
3. **Claude AI generates** plain-English insights (<200 words) from your metrics
4. **Zero account setup needed** — stateless, key used once per request

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **AI**: Anthropic Claude API (Haiku)
- **Payments**: Stripe SDK (read-only metrics)
- **Email**: Resend (waitlist capture)
- **Styling**: Tailwind CSS 4, Plus Jakarta Sans, IBM Plex Mono
- **Hosting**: Vercel

## Architecture

### Core Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Full landing page + live demo UI |
| `src/app/api/briefing/route.ts` | POST endpoint: accepts Stripe key, returns briefing |
| `src/app/api/waitlist/route.ts` | POST endpoint: email capture for waitlist |
| `src/lib/stripe-metrics.ts` | Stripe data fetching + metric calculations |
| `src/lib/briefing-generator.ts` | Claude Haiku prompt + response parsing |

### How the Briefing API Works

```
POST /api/briefing
{
  "stripe_key": "sk_live_..."
}
```

**Flow**:
1. Validate Stripe key format
2. Check rate limit (3 req/min per IP)
3. Fetch from Stripe (subscriptions, charges, cancellations)
4. Calculate metrics (MRR, churn, new customers, revenue, trials, top plan)
5. Generate Claude briefing from metrics
6. Return briefing text

**Response**:
```json
{
  "briefing": "Your daily SaaS briefing...",
  "metrics": { "mrr": 5432.10, "new_customers": 2, ... }
}
```

### Stripe Metrics Calculated

- **MRR** (Monthly Recurring Revenue) — sum of active subscriptions, normalized to monthly
- **MRR change** — ~~compared to yesterday~~ (TODO: requires database)
- **New customers** — subscriptions created today
- **Churned customers** — canceled subscriptions in past 24h, with tenure
- **Revenue today** — paid, non-refunded charges
- **Active subscriptions** — active + trialing status
- **Trial count** — subscriptions in trial
- **Top plan** — most common plan by count
- **Period** — today's date range

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes | Claude API access |
| `RESEND_API_KEY` | Yes | Waitlist emails |
| `NEXT_PUBLIC_APP_URL` | No | App URL for meta tags (default: localhost) |
| `WAITLIST_NOTIFY_EMAIL` | Yes | Where waitlist signups go |
| `STRIPE_SECRET_KEY` | No | Unused; users provide their own |

## Known Limitations

- **No user accounts** — Stripe key submitted each request, nothing persisted
- **No database** — stateless API, all calculations in-memory
- **No scheduled delivery** — briefings on-demand only, no daily email pipeline
- **MRR change stuck at 0** — needs yesterday's snapshot stored for comparison (database required)
- **No auth layer** — anyone with your Stripe key can request a briefing

## Development

### Prerequisites

```bash
node --version  # v20+ recommended
npm --version   # v10+
```

### Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Build & Production

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel --prod --scope mslugga35s-projects
```

## Security Notes

- Stripe keys validated but **not stored** (users submit per-request)
- Rate limiting: 3 requests/minute per IP
- PII (emails, customer names) returned from Stripe but **not persisted**
- HTTPS enforced in production

## Roadmap

### Short term
1. **Daily email pipeline** — Cron job + stored keys + Resend delivery
2. **User auth** — Magic link signup or Stripe OAuth
3. **Database** — Store encrypted Stripe keys + MRR history snapshots
4. **MRR comparison** — Day-over-day change tracking

### Medium term
5. **Pricing page** — $19/mo Stripe checkout
6. **User dashboard** — Previous briefing history
7. **Customization** — Select metrics, time windows, export formats

### Growth
8. **Distribution** — Reddit (r/SaaS, r/startups), X, Indie Hackers
9. **Integrations** — Slack, Discord, email subscriptions
10. **Premium tiers** — Multi-user, advanced metrics, integrations

## Author

Built by [@mslugga35](https://twitter.com/mslugga35)

## License

Proprietary. Not open source.

---

**Questions or bugs?** Open an issue at https://github.com/mslugga35/dawnbrief/issues
