# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into PDXmaximaLIST.info. The project already had `posthog-js` installed and a partial PostHog setup; this run migrated initialization to the modern `instrumentation-client.ts` pattern (correct for Next.js 15.3+), wired up a reverse proxy via `next.config.ts` rewrites, added server-side tracking via `posthog-node` for Stripe webhook events, and instrumented three new client-side event capture points across the shows and merch flows.

| Event name | Description | File |
|---|---|---|
| `show_ticket_click` | User clicked the 'get tickets' link on a show listing | `components/VenueGroup.tsx` |
| `show_info_click` | User clicked the 'more info' link on a show listing | `components/VenueGroup.tsx` |
| `date_tab_switched` | User switched the active date tab on the shows listing page | `components/ShowsTabView.tsx` |
| `checkout_completed` | A Stripe checkout session completed successfully, confirming a new subscription | `app/api/webhooks/stripe/route.ts` |
| `subscription_canceled` | A Stripe subscription was canceled | `app/api/webhooks/stripe/route.ts` |

Previously instrumented events (unchanged): `merch_page_view`, `merch_product_view`, `flyer_email_submit`, `merch_subscribe_click`, `merch_get_it_click`, `checkout_started`.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/478233/dashboard/1737604)
- [Show engagement: ticket & info clicks](https://us.posthog.com/project/478233/insights/0yh1jRMb)
- [Completed subscriptions](https://us.posthog.com/project/478233/insights/h9Eoe40I)
- [Merch conversion: views → checkout](https://us.posthog.com/project/478233/insights/xVqH8XiG)
- [Flyer email signups](https://us.posthog.com/project/478233/insights/WEvTaS9p)
- [Subscription cancellations](https://us.posthog.com/project/478233/insights/2xf66AmN)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any other bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
