# PRD: PDXmaximaLIST.info

## Overview
A Portland, Oregon events/culture website. Built with Next.js (App Router), deployed to Vercel. Data is exported from a local SQLite database into a static JSON file via an npm script.

See **STYLE.md** for all visual/aesthetic specifications.

---

## Pages

1. **`/` (Shows)** — default landing page, upcoming event listings
2. **`/friends`** — placeholder
3. **`/about`** — placeholder
4. **`/merch`** — placeholder
5. **`/contact`** — mailto contact page
6. **`not-found.tsx`** — custom 404 page

---

## Layout: Header + Footer (persistent across all pages)

### Header
- Site title: **PDXmaximaLIST.info**
- Tab navigation: `[shows]` `[friends]` `[about]` `[merch]` `[contact]`
- Active tab is visually inverted (see STYLE.md)

### Footer
- Minimal: `PDXmaximaLIST.info · portland, or`
- Dashed top border

---

## Data Layer

### Source
Local SQLite database on the developer's machine (in a separate project). NOT in this repo.

**Prerequisite:** `sqlite3` CLI must be installed on the machine.

### SQLite Schema (source table: `events`)
| Column | Exported | Notes |
|---|---|---|
| `id` | ✓ | primary key |
| `artist` | ✓ | |
| `venue_name` | ✓ | |
| `date` | ✓ | ISO format: `2026-06-10` |
| `time` | ✓ | 24h format: `20:00` |
| `price` | ✓ | may be null |
| `ticket_url` | ✓ | may be null |
| `source_url` | ✓ | may be null |
| `scraped_at` | ✗ | internal |
| `notified` | ✗ | internal |
| `event_type` | future | not yet in DB — values: `music`, `film`, `dance`, `comedy`, etc. When added, include in export query and use for filtering |

### SQLite Schema (source table: `venues`)
Used for venue address lookup. Joined via venue name (not yet standardized — expect partial matches).

| Column | Used | Notes |
|---|---|---|
| `id` | ✗ | |
| `name` | ✓ | join key (matched against events.venue_name) |
| `address` | ✓ | shown on event card if available |
| `capacity` | future | |
| `website` | future | venue pages |
| `booking_email` | future | venue pages |
| `detail_url` | future | venue pages |
| `calendar_type` | ✗ | internal |
| `calendar_notes` | ✗ | internal |

### Export Script: `scripts/export-events.js`

```js
const { execSync } = require('child_process')
const path = require('path')

// ⚠️ UPDATE THIS to your local SQLite DB path
const DB_PATH = '/absolute/path/to/your/events.db'
const OUT_PATH = path.join(__dirname, '../lib/events.json')

execSync(`sqlite3 "${DB_PATH}" \
  ".mode json" \
  ".output ${OUT_PATH}" \
  "SELECT e.id, e.artist, e.venue_name, v.address AS venue_address, e.date, e.time, e.price, e.ticket_url, e.source_url FROM events e LEFT JOIN venues v ON e.venue_name = v.name WHERE e.date >= date('now') AND e.date <= date('now', '+14 days') ORDER BY e.date ASC, CASE WHEN e.venue_name LIKE 'The %' THEN SUBSTR(e.venue_name, 5) ELSE e.venue_name END ASC, e.time ASC;"
`)

console.log('✓ events.json updated')
```

### npm Scripts (`package.json`)
```json
"scripts": {
  "export": "node scripts/export-events.js",
  "deploy": "git add lib/events.json && git commit -m 'sync events' && git push"
}
```

Workflow:
1. `npm run export` — pulls fresh data from SQLite into `lib/events.json`
2. Open `lib/events.json` in VS Code, review and hand-edit if needed
3. `npm run deploy` — commits and pushes (triggers Vercel redeploy)

### TypeScript Type: `lib/types.ts`
```ts
export type Event = {
  id: number
  artist: string
  venue_name: string
  venue_address: string | null  // from venues table LEFT JOIN, may be null
  date: string          // "2026-06-10"
  time: string          // "20:00" (24h from DB)
  price: string | null
  ticket_url: string | null
  source_url: string | null
  event_type: string | null  // "music", "film", "dance", "comedy", etc. — not yet in DB
}
```

### Data Access: `lib/events.ts`
All components import from here. When migrating to Convex, only this file changes.

```ts
import eventsData from './events.json'
import type { Event } from './types'

export function getUpcomingEvents(): Event[] {
  // Safety filter: exclude past dates even if export is stale
  const today = new Date().toISOString().split('T')[0]
  return (eventsData as Event[]).filter(e => e.date >= today)
}
```

### Time Display
The database stores time in 24h format (`"20:00"`). The UI must convert to 12h for display (`"8:00 PM"`). Create a utility function `formatTime(time: string): string` in `lib/utils.ts`.

---

## Shows Page (`/`)

### Content
- Page header: `[ UPCOMING SHOWS ]`
- Events grouped by date
- Date group headers formatted as: `FRI JUN 06` (day-of-week + month + day, all caps, derived from ISO date string)
- Within each date group, events sorted alphabetically by venue name (ignoring leading "The "), then by time ascending

### Event Card
- **Artist name** — bold, uppercase
- **Time · Venue** — formatted 12h time, middle dot, venue name
- **Venue address** — shown below venue name if not null, smaller text
- **Price** — shown if not null
- **Action buttons:**
  - `[ MORE INFO ]` — links to `source_url`, opens in new tab. Only shown if not null.
  - `[ GET TICKETS ]` — links to `ticket_url`, opens in new tab. Only shown if not null.

### Empty State
When zero events match: show a centered card with `NO SHOWS IN THE NEXT 2 WEEKS` and `check back soon` (see STYLE.md for layout).

---

## Placeholder Pages

`/friends`, `/about`, `/merch` each render:
- Page header in the same style as Shows
- A centered card: `[ COMING SOON ]`

---

## Contact Page (`/contact`)

- Page header: `[ CONTACT ]`
- A card containing:
  - Text: `comments, corrections, or tips?`
  - A mailto link styled as a button: `[ EMAIL US ]` → `mailto:pdxmaximalist@gmail.com`
  - The email address displayed as plain text below the button
- This page will be expanded later

---

## 404 Page (`app/not-found.tsx`)

- Same layout (header + footer)
- Centered card:
  - `[ 404 ]` as header
  - `page not found` as body text
  - `[ BACK TO SHOWS ]` button linking to `/`

---

## Important: .gitignore

`lib/events.json` MUST be committed to the repo (it's the data source for the site). Ensure it is NOT in `.gitignore`.

---

## Metadata & SEO

### Per-page `<title>`
- Shows: `PDXmaximaLIST.info — shows`
- Friends: `PDXmaximaLIST.info — friends`
- About: `PDXmaximaLIST.info — about`
- Merch: `PDXmaximaLIST.info — merch`
- Contact: `PDXmaximaLIST.info — contact`

### Open Graph (for social sharing)
- `og:title`: `PDXmaximaLIST.info`
- `og:description`: `portland shows & events`
- `og:type`: `website`
- `og:url`: `https://pdxmaximalist.info` (update after Vercel deploy)

### Favicon
Simple black-and-white favicon. A bold `P` in Courier or a small bitmap-style icon. Can be a simple SVG favicon.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | CSS Modules (reference STYLE.md for all design specs) |
| Data | `lib/events.json` exported from local SQLite |
| Deployment | Vercel |
| Future DB | Convex (only `lib/events.ts` changes on migration) |

---

## Future-Proofing Notes

- All data access goes through `lib/events.ts` — Convex migration only touches this file
- No DB-specific code in components
- Modular component structure for easy page additions
- Global styles in `globals.css`
- Cron job can automate `npm run export` later (macOS `crontab` or GitHub Actions) — would still need manual review before `npm run deploy`

---

## Phase 2+ Ideas (Out of Scope Now)
- Convex database migration
- Automate sync with cron job or GitHub Actions
- Event submission form
- Friends/venue directory
- Venue detail pages/cards (click venue name → capacity, website, booking email, upcoming shows)
- Merch store
- Search/filter by venue or date range
- Filter by event_type (music, film, dance, comedy, etc.)
- Calendar view
- Email newsletter signup
