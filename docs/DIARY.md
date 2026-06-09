# BUILD DIARY — PDXmaximaLIST.info

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
