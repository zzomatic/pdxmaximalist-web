# BUILD DIARY — PDXmaximaLIST.info

---

## 2026-06-16 — Phase 4: Subscriber persistence (Turso/LibSQL)

- Installed `@libsql/client@0.17.4`
- Created `lib/db.ts`: lazy Turso client singleton + `initDb()` that creates the `subscribers` table with a unique index on `(email, product_id)` (idempotent, safe to call on every request)
- Created `lib/subscribers.ts`: three functions — `upsertSubscriber()` (INSERT OR UPDATE via `ON CONFLICT`), `updateSubscriberStatus()` (syncs Stripe subscription status), `listActivePrintedSubscribers()` (returns rows for mailing runs)
- Created `app/api/subscribers/route.ts`: `GET` endpoint secured with `Authorization: Bearer <MAILING_RUN_SECRET>`; returns all active printed subscribers as JSON; returns 503 if DB not configured
- Updated `app/api/checkout/route.ts`: added `metadata: { productId }` to Stripe Checkout session creation so webhooks can identify the product
- Updated `app/api/webhooks/stripe/route.ts`: replaced `checkout.session.completed` TODO with real persistence — reads `session.collected_information?.shipping_details` for address, calls `upsertSubscriber()`; errors are logged but don't return non-200 (Stripe retry safety); `customer.subscription.updated` and `customer.subscription.deleted` now call `updateSubscriberStatus()`
- Updated `.env.local` + `.env.local.example` with `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, and `MAILING_RUN_SECRET` placeholders
- DB gracefully skipped if `TURSO_DATABASE_URL` is unset (logs warning, doesn't crash build)
- Build clean: 18 pages, all routes typed correctly

**Next:** Set up Turso database, fill in env vars, test end-to-end checkout flow.

---

## 2026-06-06 — Project kickoff

- Created PRD (PRD.md) defining data layer, pages, and event schema
- Created STYLE.md with full HyperCard aesthetic spec
- Created CLAUDE.md for Claude Code project context
- Created PROMPTS.md with 9-step build sequence
- Stack: Next.js 14 + CSS Modules + static JSON from SQLite export
- Data source: local SQLite DB with scraped Portland events
- Deploy target: Vercel

**Next:** Run prompt #1 to scaffold the project.

---

## 2026-06-06 — Prompt 1: Project scaffold

- Initialized Next.js (installed as 16.2.7, compatible with 14+ App Router API) with TypeScript
- Created `package.json` with dev/build/start/export/deploy scripts
- Created `tsconfig.json`, `next.config.ts`, `.gitignore` (lib/events.json NOT excluded)
- Created `styles/globals.css` with all design tokens from STYLE.md: CSS custom properties, reset, focus styles, `border-radius: 0 !important` global rule, `.container` utility
- Created minimal `app/layout.tsx` that imports globals.css (to be expanded in prompt 2)
- Created empty `components/`, `lib/`, `scripts/` directories with `.gitkeep`
- Verified `next build` completes without errors

**Next:** Run prompt #2 to build the shared layout (Header + Footer).

---

## 2026-06-06 — Prompt 2: Shared layout

- Built `components/Header.tsx` (Client Component — uses `usePathname` for active tab detection)
- Built `components/Header.module.css`: site title in thick-bordered box with shadow; nav tabs as `[shows]` etc., inverted on active/hover; mobile: 22px title, 44px-min touch targets
- Built `components/Footer.tsx` + `components/Footer.module.css`: dashed top border, centered `PDXmaximaLIST.info · portland, or`
- Updated `app/layout.tsx`: imports Header/Footer, wraps `<main>` with CSS Module class (no inline styles), adds root Metadata (title + description)
- Created `app/layout.module.css` for `<main>` padding/centering
- `aria-current="page"` on active nav tab; all tabs keyboard-navigable
- Verified `next build` clean

**Next:** Run prompt #3 to create sample data and data layer.

---

## 2026-06-06 — Prompt 3: Data layer

- Created `lib/types.ts` with `Event` type matching PRD schema (includes `venue_address`, `event_type`)
- Created `lib/utils.ts` with `formatTime()`: converts 24h string to 12h (e.g. `"20:00"` → `"8:00 PM"`); handles midnight, noon, and padded minutes correctly
- Created `lib/events.ts` with `getUpcomingEvents()`: imports JSON, filters `date >= today` as safety net against stale exports
- Created `lib/events.json` with 5 sample events across 4 dates (June 7–18 2026), covering all test states: two events on same date (grouping), null/non-null address, null/non-null price, null/non-null ticket_url, null/non-null source_url
  - Venues: Doug Fir Lounge, Mississippi Studios, Revolution Hall, Holocene, Polaris Hall
- Verified `next build` clean and `formatTime` edge cases (midnight, noon, AM/PM, half-hours)

**Next:** Run prompt #4 to build the Shows page and EventCard component.

---

## 2026-06-06 — Prompt 4: Shows page + EventCard

- Built `app/page.tsx`: Server Component; fetches events, sorts by venue name (ignoring "The "), groups by date, renders date headers as `SUN JUN 07` style using local-timezone `new Date(year, month-1, day)` to avoid UTC shift
- Built `app/page.module.css`: `[ UPCOMING SHOWS ]` 24px bold header; groups with 32px gap; empty state card centered with shrug + message
- Built `components/DateGroup.tsx` + `DateGroup.module.css`: bold date header with solid top/bottom borders (2px), 16px gap between cards
- Built `components/EventCard.tsx` + `EventCard.module.css`: `<article>` with 4px border + 4px offset shadow; artist bold+uppercase 18px; time · venue; conditional address (13px); conditional price; conditional `[ MORE INFO ]` / `[ GET TICKETS ]` buttons (inverted on hover, 44px min-height touch targets); card hover shifts shadow to 2px + translate(2px,2px)
- All null fields (address, price, source_url, ticket_url) correctly hidden when null
- Verified visually in browser: all 5 events render across 4 date groups, two-event grouping works, active nav tab inverted, footer correct, no console errors

**Next:** Run prompt #5 to build placeholder pages, contact page, and 404.

---

## 2026-06-06 — Prompt 5: Placeholder pages, contact, 404

- Created `app/shared.module.css` with reusable `.pageHeader`, `.card`, `.centeredCard`, `.button` classes shared across all new pages
- Created `app/friends/page.tsx`, `app/about/page.tsx`, `app/merch/page.tsx`: each has a `[ FRIENDS ]` / `[ ABOUT ]` / `[ MERCH ]` page header and a centered `[ COMING SOON ]` card; metadata titles per PRD
- Created `app/contact/page.tsx` + `page.module.css`: `[ CONTACT ]` header, card with "comments, corrections, or tips?", `[ EMAIL US ]` button → `mailto:pdxmaximalist@gmail.com`, email address as plain text below; `rel="noopener noreferrer"` not needed on mailto
- Created `app/not-found.tsx` + `not-found.module.css`: centered card with `[ 404 ]` header, "page not found" body, `[ BACK TO SHOWS ]` link-button → `/`; uses root layout (Header/Footer) automatically via App Router
- All 6 routes build clean; active nav tab inverts correctly on each page; verified visually: friends/contact/404 screenshots correct, box-shadow confirmed via computed style

**Next:** Run prompt #6 to add Open Graph metadata and favicon.

---

## 2026-06-06 — Prompt 6: OG metadata + favicon

- Updated `app/layout.tsx` `metadata` export: added `openGraph` with `title`, `description`, `type: 'website'`, `url: 'https://pdxmaximalist.info'`; confirmed all 4 `og:` meta tags present in HTML
- Created `app/icon.svg`: 32×32 HyperCard-style icon — white fill, 3px black border, bold "P" drawn as SVG rect paths (no font dependency, pixel-crisp at any size); Next.js auto-wires it as `<link rel="icon" type="image/svg+xml">`
- Verified visually at 32/64/128px — reads clearly at all sizes

**Next:** Run prompt #7 to create the SQLite export script.

---

## 2026-06-06 — Prompt 7: SQLite export script

- Created `scripts/export-events.js`: runs `sqlite3` CLI to export events + venue LEFT JOIN to `lib/events.json`; 14-day window; sorted by date ASC, venue name ASC (stripping "The "), time ASC; `DB_PATH` left as placeholder with clear warning comment
- `npm run export` and `npm run deploy` scripts were already in `package.json` from prompt 1 — no changes needed there
- Script syntax verified with `node --check`

**Next:** Run prompt #8 for mobile polish.

---

## 2026-06-06 — Prompt 8: Mobile polish

Reviewed all pages at 390x844 (iPhone 14) viewport. Fixes applied:

- `app/layout.module.css`: reduced main horizontal padding 24px → 16px on mobile (`max-width: 640px`), matching STYLE.md spec; top padding 32px → 24px
- `components/Header.module.css`: reduced header horizontal padding 24px → 16px on mobile — nav tabs now fit 4+1 wrap instead of 3+2, giving more breathing room; title font-size 22px already correct
- `app/shared.module.css`: reduced card inner horizontal padding 32px → 16px on mobile so contact/placeholder cards don't over-compress content width
- `components/EventCard.module.css`: removed duplicate `display: inline-block` declaration (second `display: inline-flex` now unambiguous)
- Verified touch targets: nav tabs and all buttons confirmed at exactly 44px height via `getBoundingClientRect()`
- Verified desktop at 1280px — no regressions

**Next:** Run prompt #9 for the final review.

---

## 2026-06-06 — Real data hardening

After connecting the real SQLite DB (423 events), two null-safety fixes:

- `app/page.tsx` sort: `venue_name` and `time` comparisons now use `?? ''` fallback so null fields sort as empty string rather than throwing
- `lib/utils.ts` `formatTime`: accepts `string | null | undefined`; returns `'TBA'` when time is null, empty, or missing `:`; guards `isNaN` on parsed hour/minute; 78 real events have empty time strings

Build clean at 423 events.

---

## 2026-06-06 — Prompt 9: Final review

Full audit against PRD.md and STYLE.md. One fix applied:

- `app/not-found.tsx`: changed `[ 404 ]` container from `<div>` to `<h1>` for proper heading hierarchy and accessibility

**Everything that passed:**

| Check | Result |
|---|---|
| No border-radius | ✓ `border-radius: 0 !important` global rule; 0px confirmed via computed style |
| Black/white only | ✓ CSS scan found only `#000000` / `#FFFFFF` across all stylesheets |
| Courier New everywhere | ✓ all font-family declarations use `var(--font-body/display)` → Courier New |
| Hard shadows, no blur | ✓ `4px 4px 0px` / `2px 2px 0px` — zero blur in all shadow values |
| Hover states invert | ✓ confirmed in prior visual testing |
| 12h time format | ✓ `8:00 PM · Doug Fir Lounge` confirmed in live DOM |
| Past events filtered | ✓ `getUpcomingEvents()` filters `date >= today`; empty state tested by backdating all events to 2020 |
| Empty state | ✓ shrug + `NO SHOWS IN THE NEXT 2 WEEKS` + `check back soon` renders correctly |
| External links: new tab | ✓ all 6 external links have `target="_blank"` confirmed in DOM |
| External links: rel | ✓ all have `rel="noopener noreferrer"` confirmed in DOM |
| All metadata titles | ✓ shows / friends / about / merch / contact — all correct |
| OG metadata | ✓ 4 tags: og:title, og:description, og:url, og:type confirmed in DOM |
| 404 page | ✓ correct layout, heading, body text, back button; uses root layout |
| `<header>` `<nav>` `<main>` `<article>` `<footer>` | ✓ all present |
| `aria-current="page"` | ✓ on active nav tab only, confirmed in DOM |
| Focus styles | ✓ `outline: rgb(0,0,0) solid 2px; outline-offset: 2px` on focused element |
| `lib/events.json` not in .gitignore | ✓ confirmed |
| No console app errors | ✓ only HMR WebSocket noise from prior stopped servers |

**Build:** clean, 7 static routes.

---

## 2026-06-06 — Text obfuscation for scraper resistance

- Added `obscure(text: string): string` to `lib/utils.ts`: replaces ASCII letters/digits with Unicode lookalikes (Cyrillic, Greek, Cherokee, etc.) using a fixed character map; unmapped characters pass through unchanged
- Updated `EventCard.tsx` to wrap artist, venue name, venue address, and price in `obscure()` with `aria-label` set to the original clean text on each `<span>` so screen readers get the real content
- Time is not obscured (already formatted output); URLs are not obscured (href values only)

---

## 2026-06-06 — Venue-grouped show layout

Replaced per-event cards with a venue-grouped layout within each day tab:

- Created `components/VenueGroup.tsx`: renders venue name (bold), optional address (small/muted), then a row per show — time (bold, min-width 68px) and artist name inline; `//more info//` and `//get tickets//` links indented to align under artist column; thin 1px top/bottom border, no card shadow
- Created `components/VenueGroup.module.css`
- Updated `components/ShowsTabView.tsx`: added `groupByVenue()` helper that preserves Map insertion order (events already sorted venue→time by page.tsx), replaced EventCard rendering with VenueGroup; removed EventCard import

---

## 2026-06-06 — Single sticky wrapper for shows header

Collapsed the three separately-sticky elements (title, tab bar, date header) into one `.stickyHeader` wrapper with `position: sticky; background-color: var(--bg)`. Eliminates scroll-through gaps that occurred between the individual layers. Simplified `useEffect` to only measure `--_hdr` (site header height); removed `--_ttl` and `--_tabs` CSS vars. Negative-margin full-width trick now on the wrapper only.

---

## 2026-06-06 — Tighter sticky header line-height and padding

Set `line-height: 1` on `.title`, `.tab`, and `.dateHeader`; reduced padding to minimum: title 4px/2px, tabBar 2px, dateHeader 2px; margin-bottom on dateHeader 12px → 8px.

---

## 2026-06-06 — Compact sticky header spacing

Reduced vertical padding in `ShowsTabView.module.css`: `.title` 16px/12px → 8px/4px; `.tabBar` 10px → 4px; `.dateHeader` 10px → 4px, margin-bottom 16px → 12px.

---

## 2026-06-06 — Border below sticky date header

Added `border-bottom: 1px solid #000000` to `.dateHeader` in `ShowsTabView.module.css` — sits at the bottom of the sticky stack, full-width via the existing negative-margin trick, separating sticky UI from scrolling content.

---

## 2026-06-06 — Full day/month names in date group header

Split date formatting into two functions in `page.tsx`: `formatTabLabel` (compact: `SA JUN 06`) for the tab bar and `formatDateHeader` (full: `SATURDAY JUNE 06`) for the sticky date header. Updated `ShowsTabView` props from a single `headers` map to `tabLabels` and `dateHeaders`.

---

## 2026-06-06 — Zero gap between date tabs

Reduced tab bar gap from 2px to 0.

---

## 2026-06-06 — Tighter date tab gap

Reduced tab bar gap from 4px to 2px.

---

## 2026-06-06 — Date tab label format restored

Restored date format to `SAT JUN 06` (uppercase month, spaces). Added `padding: 0; margin: 0` to `.tab` to eliminate browser-default button padding so slashes sit flush against the text.

---

## 2026-06-06 — Compact date tab labels

Changed `formatDateHeader` in `page.tsx` to produce compact no-space labels: uppercase 3-letter day + lowercase 3-letter month + 2-digit day, e.g. `SATjun06`. Tabs now render as `/SATjun06/`.

---

## 2026-06-06 — Date tab label and spacing tweaks

Reduced tab bar gap from 8px to 4px; changed tab label format from `//DATE//` to `/DATE/`.

---

## 2026-06-06 — Plain text date filter tabs

Stripped all box-like styles from `.tab` in `ShowsTabView.module.css`: `border: none`, `box-shadow: none`, `outline: none`, `background: transparent`. Browser default button border required explicit `border: none` to override. Active tab indicated by underline + full opacity; inactive tabs at 45% opacity; hover restores full opacity.

---

## 2026-06-06 — Remove borders from date headers

Removed `border-top`/`border-bottom` from `.dateHeader` in `ShowsTabView.module.css` and `.header` in `DateGroup.module.css`. Date headers are now plain text with spacing only.

---

## 2026-06-06 — OCR-A via next/font/local

- Configured `public/fonts/OCRA.otf` in `app/layout.tsx` with `next/font/local`, variable `--font-display`, `display: swap`; applied the font class to `<html>` so the CSS variable is available everywhere
- Updated `globals.css`: `h1`/`h2`, `nav a`/`nav button`, and `button` now use `var(--font-display)`; `--font-body` stays Courier New
- Added `font-family: var(--font-display)` to `.header` in `DateGroup.module.css` for date group headers

---

## 2026-06-06 — Day tab bar on shows page

- Created `components/ShowsTabView.tsx` (Client Component): tab bar filtering shows by day, one week window, defaults to first available date; measures header/title/tabbar heights via `useEffect` and sets `--_hdr`, `--_ttl`, `--_tabs` CSS vars on `:root` so sticky stacking is pixel-exact; updates on resize
- Created `components/ShowsTabView.module.css`: three stacked sticky elements (title, tab bar, date header) using `calc(var(--_hdr) + var(--_ttl) + ...)` for `top`; negative margin + matching padding trick so sticky backgrounds cover the full container width through `<main>`'s padding
- Updated `app/page.tsx`: filters events to 7-day window, passes grouped data + date headers to ShowsTabView; empty state still rendered server-side
- Added `id="site-header"` to `<header>` in Header.tsx for height measurement

---

## 2026-06-06 — Parse artist JSON arrays

The SQLite export stores artist names as JSON arrays (e.g. `["Artist One", "Artist Two"]`). Fixed in `lib/events.ts`: `parseArtist()` JSON-parses the field and joins multiple artists with `, `; falls back to raw string if parsing fails. Applied in `getUpcomingEvents()` via `.map()`.

---

## 2026-06-06 — Remove brackets from nav and buttons

Stripped `[ ]` wrappers from all nav tabs and button text:

- `components/Header.tsx`: nav tabs now render bare label text (e.g. `shows` not `[shows]`)
- `components/EventCard.tsx`: buttons now read `MORE INFO` and `GET TICKETS`
- `app/contact/page.tsx`: mailto button now reads `EMAIL US`
- `app/not-found.tsx`: back link now reads `BACK TO SHOWS`

---

## [Phase 0] Tailwind CSS migration — 2026-06-15

**Status:** Complete

**Files created:**
- `postcss.config.mjs` — PostCSS config wiring `@tailwindcss/postcss`
- `styles/globals.css` — rewritten with `@import "tailwindcss"`, `@theme {}` token block, and global base resets

**Files changed:**
- `app/layout.tsx` — removed `layout.module.css` import; `<main>` uses Tailwind classes
- `app/page.tsx` — removed `page.module.css` import; empty state uses Tailwind classes
- `app/about/page.tsx` — removed `shared.module.css` imports; inline Tailwind button class
- `app/merch/page.tsx` — removed `shared.module.css` import; inline Tailwind classes
- `app/more-lists/page.tsx` — removed `shared.module.css` import; inline Tailwind classes
- `app/contact/page.tsx` — removed `shared.module.css` + `page.module.css`; inline Tailwind classes
- `app/not-found.tsx` — removed `not-found.module.css`; inline Tailwind classes
- `components/Header.tsx` — removed `Header.module.css`; all classes inlined
- `components/Footer.tsx` — removed `Footer.module.css`; all classes inlined
- `components/EventCard.tsx` — removed `EventCard.module.css`; all classes inlined
- `components/DateGroup.tsx` — removed `DateGroup.module.css`; all classes inlined
- `components/VenueGroup.tsx` — removed `VenueGroup.module.css`; all classes inlined (also fixed broken `gap: 2\n  px` CSS typo → `gap-0.5`)
- `components/ShowsTabView.tsx` — removed `ShowsTabView.module.css`; all classes inlined; `top-[var(--_hdr,120px)]` preserves JS-measured sticky offset; double border via `[border-bottom-style:double]`

**Files deleted:**
- `app/layout.module.css`, `app/page.module.css`, `app/shared.module.css`, `app/contact/page.module.css`, `app/not-found.module.css`
- `components/Header.module.css`, `components/Footer.module.css`, `components/EventCard.module.css`, `components/DateGroup.module.css`, `components/VenueGroup.module.css`, `components/ShowsTabView.module.css`

**Decisions made:**
- Tailwind v4 with `@tailwindcss/postcss` (no `tailwind.config.ts` needed — v4 uses `@theme {}` in CSS)
- CSS custom properties `--bg`, `--fg`, `--font-body`, `--font-display` kept in `:root` for any runtime/JS references
- `font-mono` used everywhere (Tailwind resolves to `--font-family-mono` → `'Courier New', Courier, monospace`)
- Hover/active states use Tailwind `hover:` prefix and conditional class string ternaries
- Sticky header offset via `top-[var(--_hdr,120px)]` arbitrary value (JS sets `--_hdr` on scroll)
- Double border on date header: `border-b-[3px] [border-bottom-style:double]` arbitrary property

**STYLE.md conflicts flagged:**
- `--border-thick` (4px solid black), `--shadow` (4px 4px 0px black), `--shadow-sm` (2px 2px 0px black) were commented out in the previous `globals.css`. STYLE.md specifies these on all cards and interactive elements. For visual parity with the live site, these were NOT restored in the migration. Future work can re-enable them per STYLE.md.
- `VenueGroup.module.css` had invalid CSS `gap: 2\n  px;` (newline in value, resolved as 0). Fixed in Tailwind as `gap-0.5` (2px) matching the semantic intent.

**TODOs / handoffs left for later phases:**
- None for Phase 0. Border/shadow tokens are available to restore in Phase 1 when product cards need them.

**Notes for next phase:**
Tailwind theme tokens established in `styles/globals.css`:
- Font: `font-mono` → `'Courier New', Courier, monospace` (all `--font-family-*` aliases point here)
- Colors: black = `#000000`, white = `#FFFFFF` (also as `text-black`, `bg-white`, `text-white`, `bg-black`)
- Breakpoint: `sm:` = 640px (mobile-first, matches original site's `max-width: 640px` media query)
- Content max-width: `max-w-[700px]`; horizontal padding: `px-4` (mobile) / `px-6` (sm+)
- Card border when needed: `border-2 border-black` (thin) or `border-4 border-black` (thick per STYLE.md)
- Card shadow when needed: `shadow-[4px_4px_0px_#000]` (4px offset) or `shadow-[2px_2px_0px_#000]` (2px hover)
- Button pattern: `inline-flex items-center px-3 py-[6px] no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[44px] cursor-pointer hover:bg-black hover:text-white`
- Build: clean, 9 static routes

---

## [Phase 1] Merch page UI — 2026-06-15

**Status:** Complete

**Files created:**
- `lib/products.ts` — typed `Product` interface + product config array (4 products: free-flyer, digital-subscription, printed-subscription, field-guide)
- `components/FlyerForm.tsx` — client component: email input + `[ GET IT ]` submit → confirmation state with `[ DOWNLOAD FLYER ]`; two TODOs for phase 3
- `components/ProductCard.tsx` — client component: card with border/shadow, product name link, description, price, conditional action (FlyerForm / `[ SUBSCRIBE ]` / disabled `[ COMING SOON ]`)
- `components/SubscribeButton.tsx` — client component: subscribe button with console.log stub and phase 2 TODOs; extracted so detail pages (server components) can use it
- `app/merch/[slug]/page.tsx` — SSG detail page; `generateStaticParams` returns 3 non-comingSoon slugs; shows fuller description, price, recurring note, and the same buy action

**Files changed:**
- `app/merch/page.tsx` — replaced COMING SOON placeholder with product card grid

**Decisions made:**
- Grid: 1 col (mobile) → 2 cols (sm: 640px+). Skipped 3-up: content max-width is 700px and 3 columns at that width would make Courier New cards illegibly narrow.
- Field guide detail page: omitted. `/merch/field-guide` returns a 404. The card's disabled `[ COMING SOON ]` button is sufficient until the product launches.
- `SubscribeButton` extracted as a separate client component so `MerchDetailPage` stays a server component with `async/await params`.
- `handleSubscribe` in `ProductCard` is a plain function (not a hook) so it can differentiate printed vs. digital via `product.requiresAddress`.

**STYLE.md conflicts flagged:**
- Phase 1 prompt specified thin 2px card borders + no drop shadow (`--border`, NO drop shadow). STYLE.md says product cards use the same frame as event cards: `border-4 border-black shadow-[4px_4px_0px_#000]`. STYLE.md wins — implemented with 4px border + 4px shadow.
- Phase 1 prompt specified 3px button border, no brackets, no hover inversion, minimal hover. STYLE.md says `var(--border-thick)` (4px), `[ LABEL ]` brackets, invert on hover. STYLE.md wins — implemented accordingly.
- Phase 1 prompt said `--border-btn: 3px` — this token does not exist in STYLE.md. Not added.

**TODOs / handoffs left for later phases:**
- `components/FlyerForm.tsx:22` — `// TODO: serve the actual flyer PDF`
- `components/FlyerForm.tsx:29` — `// TODO: capture email to a mailing list — phase 3`
- `components/SubscribeButton.tsx:12` — `// TODO: Stripe Checkout w/ shipping address collection — physical subscription — phase 2`
- `components/SubscribeButton.tsx:15` — `// TODO: Stripe Checkout — recurring digital subscription — phase 2`
- `components/ProductCard.tsx:12` — `// TODO: Stripe Checkout w/ shipping address collection — physical subscription — phase 2`
- `components/ProductCard.tsx:16` — `// TODO: Stripe Checkout — recurring digital subscription — phase 2`

**Notes for next phase:**
- Product config is in `lib/products.ts`. `Product.requiresAddress` distinguishes printed vs. digital for Stripe session config.
- Stripe handlers go in `app/api/checkout/[productId]/route.ts` or similar. Replace the `console.log` + TODO stubs in `SubscribeButton.tsx` and `ProductCard.tsx`.
- For Phase 1.5 (analytics): `merch_page_view` fires on `app/merch/page.tsx` mount; `merch_product_view` on detail page mount; `merch_subscribe_click` in `SubscribeButton.tsx` next to the existing TODO; `merch_get_it_click` in `FlyerForm.tsx` on submit; `flyer_email_submit` after console.log stub; `checkout_started` TODO left by Phase 2.
- Build: clean, 12 static routes (3 merch detail pages pre-rendered via SSG)

---

## [Phase 1.5] Analytics instrumentation — 2026-06-15

**Status:** Complete

**Files created:**
- `lib/analytics.ts` — `AnalyticsEvent` union type + `track()` helper; calls `posthog.capture()` internally; guards against server-side execution (`typeof window === 'undefined'`) and absent key; all app code calls `track()`, never `posthog` directly
- `components/PostHogProvider.tsx` — client component; inits PostHog on mount with key + host from env; module-level `initialized` flag prevents double-init (including React 18 Strict Mode double-effect); renders children transparently
- `components/PageViewTracker.tsx` — client component that renders `null`; fires a single `track()` call on mount using a `useRef` guard so it fires exactly once even in Strict Mode; used by server components to emit page view events without making the whole page a client component
- `.env.local` — created with empty `NEXT_PUBLIC_POSTHOG_KEY` and default host; gitignored
- `.env.local.example` — committed template showing required env var names

**Files changed:**
- `app/layout.tsx` — wrapped body children with `<PostHogProvider>`
- `app/merch/page.tsx` — added `<PageViewTracker event="merch_page_view" />`
- `app/merch/[slug]/page.tsx` — added `<PageViewTracker event="merch_product_view" props={{ product: product.id }} />`
- `components/FlyerForm.tsx` — fires `merch_get_it_click` on button click; fires `flyer_email_submit` on form submit
- `components/SubscribeButton.tsx` — fires `merch_subscribe_click` with `product` prop; added `checkout_started` TODO for Phase 2
- `components/ProductCard.tsx` — added `checkout_started` TODO next to Stripe stubs

**Decisions made:**
- PII decision for `flyer_email_submit`: send `{ submitted: true }` only — no raw email, no hash, no region. A boolean confirming the action is sufficient for funnel analysis and carries zero PII risk.
- `capture_pageview: false` and `capture_pageleave: false` on PostHog init — manual control over what gets tracked; avoids duplicate events if PostHog's auto-capture fires on route changes.
- PostHog initialized in `useEffect` (not module scope) so server-side rendering never touches the posthog-js browser library.

**Env vars introduced:**
- `NEXT_PUBLIC_POSTHOG_KEY` — public project key from app.posthog.com (prefix intentional; browser-safe)
- `NEXT_PUBLIC_POSTHOG_HOST` — PostHog API host; defaults to `https://us.i.posthog.com`

**AnalyticsEvent names and where each fires:**
| Event | Location |
|---|---|
| `merch_page_view` | `app/merch/page.tsx` via `PageViewTracker` |
| `merch_product_view` | `app/merch/[slug]/page.tsx` via `PageViewTracker` (prop: `product`) |
| `flyer_email_submit` | `components/FlyerForm.tsx` on form submit (prop: `submitted: true`) |
| `merch_get_it_click` | `components/FlyerForm.tsx` on GET IT button click |
| `merch_subscribe_click` | `components/SubscribeButton.tsx` on click (prop: `product: digital_subscription \| printed_subscription`) |
| `checkout_started` | **Defined but not yet called** — TODOs at `components/SubscribeButton.tsx:14` and `components/ProductCard.tsx:11`; Phase 2 fills the call site |

**TODOs / handoffs left for later phases:**
- `components/SubscribeButton.tsx:14` — `// TODO: fire track('checkout_started', { product: productId }) here — wire in Phase 2`
- `components/ProductCard.tsx:11` — `// TODO: fire track('checkout_started', { product: product.id }) here — wire in Phase 2`

**Notes for next phase:**
- To activate analytics: add real `NEXT_PUBLIC_POSTHOG_KEY` to `.env.local` (and to Vercel project env vars for production).
- Phase 2 (Stripe) should call `track('checkout_started', { product })` at the Stripe redirect point, replacing the TODOs above. Use the `track()` helper from `lib/analytics.ts` — do not call `posthog.capture()` directly.
- `lib/analytics.ts` is client-only (posthog-js is browser-only). Only import it from `'use client'` components.
- Build: clean, 12 static routes

---

## [Phase 2] Stripe checkout — 2026-06-16

**Status:** Complete (test mode; live keys not wired)

**Files created:**
- `lib/stripe.ts` — lazy-init Stripe client (cached singleton, throws if `STRIPE_SECRET_KEY` absent at runtime); `PRICE_IDS` map reads price IDs from env vars
- `app/api/checkout/route.ts` — POST handler: validates product ID, creates Stripe Checkout Session (subscription mode; `shipping_address_collection` enabled for printed-subscription only), returns `{ url }` for client redirect; uses `request.nextUrl.origin` for absolute success/cancel URLs so it works on any domain/preview
- `app/api/webhooks/stripe/route.ts` — POST handler: reads raw body as text, verifies Stripe signature, handles four events (`checkout.session.completed`, `customer.subscription.created/updated/deleted`) with console.log; leaves `// TODO: persist subscriber + address for mailing run — phase 3/4` at `checkout.session.completed`
- `app/merch/success/page.tsx` — success state: bordered card, thank-you message, links back to merch + shows
- `app/merch/cancel/page.tsx` — cancel state: bordered card, reassurance message, link back to merch

**Files changed:**
- `components/SubscribeButton.tsx` — full async flow: `track('merch_subscribe_click')` → POST `/api/checkout` → `track('checkout_started')` → `window.location.href = url`; loading state (`aria-busy`, `cursor-wait`, `...` label); error message on failure (`role="alert"`)
- `components/ProductCard.tsx` — removed duplicate inline `handleSubscribe` function; now uses `<SubscribeButton>` for subscribe action (single source of truth for checkout logic)
- `.env.local` — added Stripe env var placeholders (gitignored)
- `.env.local.example` — added Stripe env var templates

**Decisions made:**
- Origin derived from `request.nextUrl.origin` (not `NEXT_PUBLIC_SITE_URL` env var) — works correctly on localhost, Vercel preview URLs, and production without additional config.
- `getStripe()` lazy-init pattern: `STRIPE_SECRET_KEY` absence throws at request time (not build time) — lets the build succeed with empty env vars and fails loudly at runtime.
- `ProductCard` now delegates to `SubscribeButton` — consolidates checkout logic in one place so Phase 3/4 only needs to touch `SubscribeButton`.
- Stripe API version: `2026-05-27.dahlia` (shipped with stripe@22.2.1).
- `checkout_started` track call fires immediately before `window.location.href` redirect — this is the right moment (post-API-success, pre-Stripe-page).

**Env vars introduced:**
- `STRIPE_SECRET_KEY` — server-only; Stripe secret key (test: `sk_test_...`)
- `STRIPE_WEBHOOK_SECRET` — server-only; from `stripe listen --forward-to` or dashboard webhook
- `STRIPE_PRICE_DIGITAL_SUBSCRIPTION` — Stripe Price ID for monthly digital subscription
- `STRIPE_PRICE_PRINTED_SUBSCRIPTION` — Stripe Price ID for monthly printed trifold subscription

**TODOs / handoffs left for later phases:**
- `app/api/webhooks/stripe/route.ts` (inside `checkout.session.completed` case) — `// TODO: persist subscriber + address for mailing run — phase 3/4`

**Notes for next phase:**
- To test end-to-end: add real test keys to `.env.local`, create two recurring prices in Stripe dashboard, run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` for webhook relay.
- Phase 3 (email capture): no Stripe changes needed. FlyerForm TODOs are in `components/FlyerForm.tsx`.
- Phase 4 (subscriber persistence): find the fulfillment hook at `app/api/webhooks/stripe/route.ts` inside `checkout.session.completed`. The `session.customer`, `session.customer_details` (email, name, address), and `session.shipping_details` (mailing address for printed-subscription) are all available on the session object.
- Build: clean, 16 routes (2 dynamic API routes, 2 new static pages)

---

## [Phase 3] Email capture for the free flyer — 2026-06-16

**Status:** Complete

**Provider chosen:** Resend (contacts API, audience-scoped).

**Files created:**
- `lib/email-capture.ts` — swappable provider function; calls `resend.contacts.create` with legacy `audienceId` form; when `RESEND_API_KEY` or `RESEND_AUDIENCE_ID` are absent it logs and returns without error (same pattern as PostHog/Stripe); to swap providers, only this file changes
- `app/api/capture-email/route.ts` — POST handler: reads honeypot field (silently succeeds if filled, no signal to bots), server-side email validation (type + length ≤ 254 + regex), calls `captureEmail()`, returns `{ ok: true }` or error JSON

**Files changed:**
- `components/FlyerForm.tsx` — full async flow: `track('merch_get_it_click')` → POST `/api/capture-email` → `track('flyer_email_submit')` → success state; `Status` union (`idle | loading | success | error`) replaces boolean `submitted`; honeypot hidden input (`name="website"`, `tabIndex={-1}`, positioned at `-left-[9999px]`, `aria-hidden`); loading state on input + button (`disabled`, `aria-busy`, `cursor-wait`); error message with `role="alert"` and `aria-live="assertive"`; success confirmation with `role="status"` and `aria-live="polite"`
- `.env.local` + `.env.local.example` — added `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`

**Decisions made:**
- Honeypot chosen over rate limiting: lightweight, no data-store dependency, sufficient for a low-traffic form. Rate limiting can be added later (e.g. Upstash/Redis) without changing the form.
- Email normalised to lowercase + trimmed before capture and validation, matching Resend's deduplication behaviour.
- Flyer PDF: stubbed. Download link points to `#` with `preventDefault`. Real PDF goes at `public/flyer.pdf`; update `href` to `'/flyer.pdf'` and remove the TODO when ready.
- `track('merch_get_it_click')` moved to start of `onSubmit` (handles Enter-key submit, not just mouse click on button); `track('flyer_email_submit')` fires only after successful API response.
- **Resend API note:** `resend.contacts.create` with `audienceId` uses `LegacyCreateContactOptions` (deprecated in Resend v6 — audiences replaced by segments). It still works. To migrate: use `CreateContactOptions` with a `segments: [{ id }]` array instead of `audienceId`.

**Env vars introduced:**
- `RESEND_API_KEY` — server-only; from resend.com/api-keys
- `RESEND_AUDIENCE_ID` — server-only; UUID of the Resend audience to add contacts to

**TODOs / handoffs left for later phases:**
- `components/FlyerForm.tsx` (inside success state) — `// TODO: replace with real flyer PDF — place at public/flyer.pdf and update href to '/flyer.pdf'`
- Phase 4 fulfillment hook is at `app/api/webhooks/stripe/route.ts` inside `checkout.session.completed` — unchanged from Phase 2.

**Notes for next phase:**
- To activate: add `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` to `.env.local` (and Vercel env vars for production). No code changes needed.
- Swappable provider is at `lib/email-capture.ts` — exports one function `captureEmail(email: string): Promise<void>`.
- Build: clean, 17 routes (3 dynamic API routes)

---
