# PROMPTSv2.md — Build Prompt Library

A phased set of prompts to build the merch store on this Next.js (App Router) + TypeScript site.

**How to use this file**
- Run phases **in order** (0 → 1 → 1.5 → 2 → 3 → 4). Each phase assumes the previous one is complete and merged. Phase 1.5 (analytics) slots between the UI build and Stripe on purpose, so event tracking is added next to the button handlers before payments are wired.
- Each prompt is self-contained — paste the whole prompt block into Claude Code (or your agent) for that phase.
- This file lives at `docs/PROMPTSv2.md`. The style guide is at `docs/STYLE.md`.
- **Every phase must log its work to `docs/DIARY.md`** (see the logging rule below — it's repeated in each prompt on purpose, don't remove it).

**Standing rules (apply to every phase)**
- `docs/STYLE.md` is the source of truth for all visual decisions: minimal black & white, Courier New monospace everywhere, fully accessible. If any instruction conflicts with STYLE.md, STYLE.md wins.
- Match existing repo conventions (file naming, imports, component structure).
- Accessibility is non-negotiable: semantic HTML, labelled inputs, keyboard navigation, visible focus states, screen-reader-correct states, WCAG-passing contrast.
- Responsive across phone / tablet / laptop.
- Don't make changes outside the phase's stated scope unless genuinely required to compile.

---

## DIARY.md logging rule (referenced by every phase)

At the **end of every phase**, append an entry to `docs/DIARY.md` (create the file if it doesn't exist). Use this format:

```
## [Phase N] <short title> — YYYY-MM-DD

**Status:** Complete | Partial | Blocked

**Files created:**
- path/to/file — one-line purpose

**Files changed:**
- path/to/file — what changed and why

**Decisions made:**
- Any judgment calls, deviations from the prompt, or assumptions.

**TODOs / handoffs left for later phases:**
- Exact file + location of each `// TODO:` left in code, and what it's waiting on.

**Notes for next phase:**
- Anything the next phase's author should know (gotchas, things half-done, conventions established).
```

Keep entries concise but specific enough that someone picking up the next phase needs only DIARY.md + the relevant prompt to continue. Newest entries go at the **bottom** (append, chronological).

---

# PHASE 0 — Tailwind migration

> Run this first, on its own, and review/merge it before touching the store. Don't combine with later phases.

```
You are migrating this Next.js (App Router) + TypeScript site from per-page CSS files to Tailwind CSS. This is a refactor: the site should look and behave the same when you're done, just powered by Tailwind instead of standalone CSS files.

BEFORE YOU START
- Read docs/STYLE.md. It is the source of truth for the site's visual system: minimal black & white, Courier New monospace everywhere, fully accessible. The Tailwind config you produce must encode these tokens.
- Inventory the current styling: list every CSS file, what it styles, and any global styles, CSS variables, fonts, and breakpoints in use.

WHAT TO DO
1. Install and configure Tailwind for the App Router (tailwind.config.ts, postcss config, the @tailwind directives in the global stylesheet). Verify it builds.
2. Encode STYLE.md into the Tailwind theme: set Courier New (with sensible monospace fallbacks) as the default font, define the B&W palette and any spacing/border tokens STYLE.md specifies, and set breakpoints to match the current site if it already has them.
3. Migrate existing pages/components from their CSS files to Tailwind utility classes, one file at a time. After each, confirm the rendered result matches the original.
4. Remove the now-dead CSS files only after their styles are fully ported. Keep a global stylesheet only for true globals (Tailwind directives, base resets, font-face if needed).
5. Preserve all current behavior and accessibility. Do not redesign anything in this phase — visual parity is the goal.

CONSTRAINTS
- STYLE.md wins over any guess. If the current CSS contradicts STYLE.md, flag it in DIARY.md rather than silently "fixing" it.
- Match existing component conventions.
- Don't add new features, pages, or products — migration only.

WHEN DONE
- Confirm the site builds and runs with no per-page CSS files remaining (or list any you intentionally kept and why).
- Append a Phase 0 entry to docs/DIARY.md using the format defined at the top of docs/PROMPTSv2.md. Include the Tailwind theme tokens you established (font, colors, breakpoints) under "Notes for next phase" — later phases will rely on them.
```

---

# PHASE 1 — Merch page UI (cards + detail pages, payments stubbed)

> Assumes Phase 0 is merged and Tailwind is live across the site.

```
Build the merch page UI for this Next.js (App Router) + TypeScript site. Tailwind is already set up (see the Phase 0 entry in docs/DIARY.md for the theme tokens). The merch page already exists at app/merch/page.tsx.

This is a UI-FIRST build. Payments and email capture are STUBBED. Do NOT wire up real Stripe or real email integration. Leave clearly marked `// TODO:` comments at every integration point for later phases.

BEFORE YOU START
- Read docs/STYLE.md and treat it as the source of truth for every visual decision (minimal black & white, Courier New monospace, fully accessible). If anything here conflicts with STYLE.md, STYLE.md wins.
- Read the Phase 0 entry in docs/DIARY.md to reuse the established Tailwind tokens.
- Match existing repo component/routing conventions.

PRODUCTS (define as a single typed config; cards and detail pages render from it)
Create a TypeScript product config with an interface/type for a product, including a `comingSoon` flag so products can be toggled on later. Render these, in this order:

1. Free weekly flyer (digital download) — Free.
   - Card shows an email input (with associated <label>) + a bordered `GET IT` action button.
   - On submit: console.log the email. Add `// TODO: capture email to a mailing list — phase 3`.
   - After submit: show a confirmation state and (stubbed) trigger the download. Add `// TODO: serve the actual flyer PDF`.

2. Digital flyer subscription — recurring (Stripe later).
   - Card shows a price placeholder ($X/mo) and a bordered `SUBSCRIBE` action button.
   - Buy handler stub: `// TODO: Stripe Checkout — recurring digital subscription — phase 2`.

3. Printed trifold subscription — recurring physical (Stripe later).
   - REQUIRES name + mailing address at checkout. Buy handler stub: `// TODO: Stripe Checkout w/ shipping address collection — physical subscription — phase 2`.
   - Card shows a price placeholder and a bordered `SUBSCRIBE` action button.

4. Field guide booklet — COMING SOON.
   - `comingSoon: true`. Use a disabled `COMING SOON` action button (bordered bold-caps per STYLE.md's Action Buttons / Coming Soon pattern) in place of a working action.
   - Disabled state must be communicated to assistive tech (aria-disabled / proper semantics), not just visually.

LAYOUT (thin bordered product cards in a grid — per STYLE.md merch pattern)
- Follow the documented "Product Listing / Card (merch)" pattern in STYLE.md. The merch page is the one place that uses a thin bordered card: each product sits in a card with a thin solid black border (`--border`, 2px), sharp 90° corners, Courier New. NO drop shadow, NO border-radius.
- Each card: product name (bold, uppercase), a short description line, then the action line (price if any + the action button).
- Action buttons follow STYLE.md's "Action Buttons" pattern: a thin-bordered button (`--border-btn`, 3px — slightly bolder than the card border) with a BOLD UPPERCASE label and NO slashes and NO brackets: `GET IT`, `SUBSCRIBE`, disabled `COMING SOON`. Hover is minimal (no inversion); the clear focus outline is the primary state change. (Slashes `//...//` are reserved for nav/inline links only — do not use them on buttons.)
- Image placeholders are optional and used sparingly (products are text-first). If a product needs one, use a bordered box via a real CSS border with meaningful alt/label text — no real images.
- Cards link to their detail page (the card itself / product name is the link); the disabled Coming Soon product is not linked.

DETAIL PAGES
- Create a product detail page for each non-placeholder product, under the merch folder. Follow the repo's routing convention (e.g. app/merch/[slug]/page.tsx, rendered from the product config).
- Detail page shows fuller description + the same stubbed buy action. Keep the Coming Soon product consistent (either a "what's coming" page or omit — your call, note it in DIARY.md).

RESPONSIVENESS
- Responsive card grid via Tailwind breakpoints: single column on phone, 2-up on tablet, 3-up (or as space allows) on laptop, with a consistent gap. Ensure cards and the email input don't overflow on narrow screens; slash labels stay tappable (44px targets) on mobile.

ACCESSIBILITY (per STYLE.md, non-negotiable)
- Semantic HTML, <button> for actions, labelled inputs, keyboard nav, visible focus, screen-reader-correct disabled state, WCAG-passing contrast.

OUT OF SCOPE (do NOT do)
- No real Stripe, no real email/Resend, no real images.
- No changes outside the merch feature + product config unless required to compile.

DELIVERABLE
- Updated app/merch/page.tsx (thin-bordered product card grid), product detail pages under the merch folder, a typed product config, a reusable ProductCard component (+ small subcomponents as sensible). All Tailwind, all derived from docs/STYLE.md.

WHEN DONE
- Append a Phase 1 entry to docs/DIARY.md per the format at the top of docs/PROMPTSv2.md. Under "TODOs / handoffs," list the exact file + line location of every `// TODO:` so phases 2 and 3 can find them.
```

---

# PHASE 1.5 — Analytics instrumentation (PostHog + track helper)

> Assumes Phase 1 is merged. Run right after Phase 1, before Phase 2, so the analytics calls live next to the same button handlers where Phase 2 will add Stripe. Requires a PostHog project API key. The existing Vercel Web Analytics stays as-is (basic traffic); this adds behavior/funnel events.

```
Add product analytics to this Next.js (App Router) + TypeScript site, focused on the merch funnel, using PostHog. Keep the existing Vercel Web Analytics in place — this is additive (Vercel = traffic, PostHog = behavior/funnel events). Read the Phase 1 DIARY.md entry to find the merch button handlers and any `// TODO:` stubs to instrument alongside.

BEFORE YOU START
- Read docs/STYLE.md only insofar as any visible UI is added (there should be little to none — analytics is mostly invisible). No new visual components unless strictly necessary.
- Confirm the PostHog key + host are available via env vars: NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST (host is the PostHog cloud or self-host URL). If missing, wire them via env and note in DIARY.md — do NOT hardcode keys. The key is a public/client key (NEXT_PUBLIC_ prefix is expected).

WHAT TO BUILD
1. PostHog provider: install posthog-js and add a client-side provider/initialization at the app root (e.g. a 'use client' provider component mounted in app/layout). Initialize PostHog with the env key/host. Guard against double-init and against running when the key is absent (so local/dev without a key doesn't crash).
2. A thin, typed, provider-agnostic tracking helper — e.g. `lib/analytics.ts` exporting `track(event: AnalyticsEvent, props?: Record<string, unknown>)`. Internally it calls PostHog's capture, but ALL app code calls `track(...)`, never posthog directly. Define `AnalyticsEvent` as a TypeScript union of the named events below so event names are typo-proof and discoverable. This isolation means PostHog can be swapped later by editing one file.
3. Instrument the merch funnel. Fire these named events at the right spots (co-locate with the Phase 1 handlers / Phase 2 payment stubs):
   - `merch_page_view` — when the merch page mounts.
   - `merch_product_view` — when a product detail page mounts (prop: product slug/id).
   - `flyer_email_submit` — when the free-flyer email form is submitted (no PII beyond what's needed; do NOT send the raw email as a property unless you intend to — prefer a boolean/hashed/region, and note the choice in DIARY.md).
   - `merch_subscribe_click` — when a SUBSCRIBE button is clicked (prop: product = digital_subscription | printed_subscription).
   - `merch_get_it_click` — when the free flyer GET IT button is clicked.
   - `checkout_started` — leave a `// TODO: fire track('checkout_started') here — wire in Phase 2` at the payment stub locations so Phase 2 completes the funnel. (Define the event now; Phase 2 fills the call site.)
4. Make sure events fire once and correctly with the App Router (mount effects, not re-fired on every render). Respect that some components are server components — the provider and track calls belong in client components.

PRIVACY / CONSTRAINTS
- Public key only (client-side). No secret keys.
- Be deliberate about PII: don't capture raw emails or addresses as event properties unless intentional and documented. Prefer counts, booleans, product ids, and coarse properties.
- Don't remove or duplicate Vercel Analytics.
- Don't build Stripe (phase 2) or email integration (phase 3) — only leave the `checkout_started` TODO at the stub sites.
- Keep client bundle impact minimal; lazy-init is fine.

WHEN DONE
- Confirm events appear in the PostHog dashboard for a manual run-through of the merch funnel (view → click → submit).
- Append a Phase 1.5 entry to docs/DIARY.md per the format at the top of docs/PROMPTSv2.md. Record: env vars introduced, where lib/analytics.ts lives, the full list of `AnalyticsEvent` names and where each fires, the PII decision for the email event, and the exact location of the `checkout_started` TODO for Phase 2.
```

---

# PHASE 2 — Stripe checkout (digital + physical subscriptions)

> Assumes Phase 1 is merged. Requires a Stripe account and test API keys.

```
Wire up real Stripe Checkout for the merch store on this Next.js (App Router) + TypeScript site, replacing the payment `// TODO:` stubs left in Phase 1. Read the Phase 1 entry in docs/DIARY.md to locate every stub.

BEFORE YOU START
- Read docs/STYLE.md (visual source of truth) and the Phase 1 DIARY.md entry (stub locations, product config shape).
- Confirm Stripe keys are available via environment variables (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET). If any are missing, stub them via env and note it in DIARY.md — do NOT hardcode keys.

WHAT TO BUILD
1. Stripe SDK setup and a server-side helper. Use the official Stripe Node library. Keep secret keys server-side only.
2. Products/prices: create a typed mapping from the Phase 1 product config to Stripe Price IDs (read Price IDs from env/config, don't hardcode). Document in DIARY.md which products map to which env vars.
3. Checkout sessions via a Next.js Route Handler (app/api/...):
   - Digital flyer subscription → recurring Checkout Session (mode: subscription), no address needed.
   - Printed trifold subscription → recurring Checkout Session (mode: subscription) WITH shipping address collection enabled, so name + mailing address are captured. This address must be retrievable later for the mailing run.
4. Wire the Phase 1 "Subscribe" buttons to call these route handlers and redirect to Stripe Checkout. Replace the corresponding `// TODO:` stubs. Also complete the `// TODO: fire track('checkout_started')` left by Phase 1.5 — call the analytics `track('checkout_started', { product })` helper at the point checkout is initiated (use the existing helper; do not call PostHog directly).
5. Stripe webhook Route Handler (app/api/webhooks/stripe): verify the signature, handle the core subscription events (checkout.session.completed, subscription created/updated/deleted). For now, log handled events and leave a `// TODO: persist subscriber + address for mailing run — phase 3/4` where fulfillment will hook in. Do not build the mailing pipeline here.
6. Success and cancel pages/states consistent with STYLE.md.

CONSTRAINTS
- Test mode only. No live keys.
- Never expose the secret key client-side. Validate webhook signatures.
- Keep all UI on-aesthetic per STYLE.md.
- Don't build email capture (phase 3) or the mailing automation (phase 4) here — just leave the marked TODOs.

WHEN DONE
- Confirm a test purchase works end-to-end for both subscriptions in Stripe test mode, and that the printed-subscription session captures a shipping address.
- Append a Phase 2 entry to docs/DIARY.md per the format at the top of docs/PROMPTSv2.md. Record the env vars introduced, the product→Price ID mapping, webhook events handled, and the exact location of the phase-3/4 fulfillment TODO.
```

---

# PHASE 3 — Email capture for the free flyer

> Assumes Phase 1 merged (Phase 2 optional/parallel). Requires an email/list provider decision.

```
Replace the free-flyer email-capture stub from Phase 1 with a real implementation on this Next.js (App Router) + TypeScript site. Read the Phase 1 DIARY.md entry to locate the `// TODO: capture email to a mailing list` stub and the `// TODO: serve the actual flyer PDF` stub.

DECISION NEEDED FIRST
- This site will use an email/list provider (e.g. Resend audiences, or a newsletter tool like Buttondown/Kit). Confirm which provider's API key/credentials are available via env vars. If undecided, implement against Resend's audiences API as the default and clearly isolate the provider call behind a single function so it can be swapped. Note the choice in DIARY.md.

WHAT TO BUILD
1. A Next.js Route Handler (app/api/...) that accepts the submitted email, validates it server-side, and adds it to the mailing list/audience via the provider's API. Keep the API key server-side only (env var).
2. Wire the Phase 1 free-flyer form to POST to this route, with proper loading / success / error states, all on-aesthetic per docs/STYLE.md and fully accessible (announce success/error to screen readers).
3. Flyer delivery: serve the actual flyer PDF on successful capture (download link or triggered download). If the PDF asset isn't provided yet, serve a clearly-labelled placeholder PDF and leave `// TODO: replace with real flyer PDF`.
4. Basic protections: server-side email validation, and a simple guard against obvious abuse (e.g. honeypot field or minimal rate limiting). Keep it lightweight.

CONSTRAINTS
- Never expose the provider API key client-side.
- Isolate the provider behind one swappable function.
- STYLE.md governs all UI. Don't touch Stripe or the mailing-automation pipeline.

WHEN DONE
- Confirm a submitted email lands in the provider's list (test) and the flyer download works.
- Append a Phase 3 entry to docs/DIARY.md per the format at the top of docs/PROMPTSv2.md. Record the provider chosen, env vars introduced, and where the swappable provider function lives.
```

---

# PHASE 4 — Subscriber persistence + mailing-run readiness (groundwork)

> Assumes Phases 2 and 3 merged. This sets up the data the external mailing automation (n8n → print-and-mail API) will consume. It does NOT build the n8n flow.

```
On this Next.js (App Router) + TypeScript site, implement the persistence layer that the external mailing automation will read from. Read the Phase 2 DIARY.md entry to find the `// TODO: persist subscriber + address` fulfillment hook in the Stripe webhook.

CONTEXT
- The printed trifold subscription captures name + mailing address at Stripe Checkout (Phase 2). An external automation (n8n) will, on a schedule, fetch the list of ACTIVE printed-subscription subscribers with their mailing addresses and send them to a print-and-mail API. This phase makes that data reliably available.

WHAT TO BUILD
1. Persist subscriber records on the relevant Stripe webhook events: store at minimum subscriber id, email, name, mailing address, the product they subscribed to, and subscription status (active/canceled). Use whatever datastore the project already uses; if none exists, choose a simple, well-justified option and document it in DIARY.md.
2. Keep status in sync: update records on subscription updated/canceled events so "active" is always accurate.
3. Expose a secured, read-only endpoint (or documented query) that returns active printed-subscription subscribers with mailing addresses, for the external mailing run to consume. Protect it (e.g. a secret token via env var). Do NOT leave subscriber PII on an open endpoint.
4. Replace the Phase 2 fulfillment `// TODO:` with the real persistence call.

CONSTRAINTS
- Treat mailing addresses as PII: secure the endpoint, keep secrets in env vars, log minimally.
- Do NOT build the n8n workflow or call any print-and-mail API here — only make the data available and documented.
- STYLE.md is irrelevant to this phase (no UI) unless you add any status page, which should conform if so.

WHEN DONE
- Confirm a test printed-subscription purchase produces an active subscriber record retrievable via the secured endpoint, and that canceling updates the status.
- Append a Phase 4 entry to docs/DIARY.md per the format at the top of docs/PROMPTSv2.md. Document the datastore, the record shape, the secured endpoint's URL + auth method, and a short note describing exactly what the external n8n run should call. This note is the handoff to the mailing automation.
```

---

## Phase summary

| Phase | Builds | Real vs stub | Needs |
|------|--------|--------------|-------|
| 0 | Tailwind migration (visual parity) | n/a | STYLE.md |
| 1 | Merch cards + detail pages | UI real, payments/email stubbed | Phase 0 |
| 1.5 | Analytics instrumentation (PostHog + track helper) | Analytics real | Phase 1 + PostHog key |
| 2 | Stripe checkout (both subscriptions) | Stripe real (test mode) | Stripe test keys |
| 3 | Free-flyer email capture + PDF | Email provider real (test) | provider key |
| 4 | Subscriber persistence + secured read endpoint | Data real | Phases 2 & 3 |

External, not in this repo: the n8n mailing run (pulls active subscribers from Phase 4's endpoint → print-and-mail API), the Lulu POD integration for the field guide, and flipping the field guide's `comingSoon` flag when it's ready.
