# CLAUDE.md

## Project
PDXmaximaLIST.info — a Portland events/culture website with a HyperCard-inspired black-and-white aesthetic.

## Key Documents
- `docs/PRD.md` — product requirements, data layer, page specs
- `docs/STYLE.md` — all visual/aesthetic rules, design tokens, component patterns
- `docs/DIARY.md` — build log, update after completing each task
- `docs/PROMPTS.md` — reference for planned build sequence

## Tech Stack
- Next.js 14+ (App Router)
- CSS Modules for styling
- TypeScript
- Static JSON data (`lib/events.json`) exported from a local SQLite DB
- Deployed to Vercel

## Project Structure
```
/app
  /layout.tsx           — shared layout (header, footer, nav)
  /page.tsx             — Shows page (default)
  /friends/page.tsx     — placeholder
  /about/page.tsx       — placeholder
  /merch/page.tsx       — placeholder
  /contact/page.tsx     — mailto contact page
  /not-found.tsx        — custom 404 page
/components
  /Header.tsx + Header.module.css
  /Footer.tsx + Footer.module.css
  /EventCard.tsx + EventCard.module.css
  /DateGroup.tsx + DateGroup.module.css
/lib
  /events.ts            — data access (swap this for Convex later)
  /events.json          — exported event data (generated, committed)
  /types.ts             — Event type definition
  /utils.ts             — formatTime() and helpers
/scripts
  /export-events.js     — SQLite → JSON export
/styles
  /globals.css          — CSS custom properties, resets
```

## Rules
1. **Read docs/STYLE.md before writing any CSS.** Every design decision is specified there.
2. **Read docs/PRD.md before building any feature.** Data shapes, page specs, and behavior are defined there.
3. **Only black and white.** No grays, no colors, no gradients. See STYLE.md anti-patterns.
4. **Courier New everywhere.** No other fonts. Ever.
5. **No border-radius.** Sharp corners only.
6. **All data access through `lib/events.ts`.** Components never import events.json directly.
7. **CSS Modules only.** No inline styles, no Tailwind, no styled-components.
8. **Accessibility.** Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<footer>`). Add `aria-current="page"` on the active nav tab. Ensure visible focus styles on all interactive elements (2px solid black outline). All links and buttons must be keyboard navigable. External links get `rel="noopener noreferrer"`.
9. **Do NOT gitignore `lib/events.json`.** It must be committed — it's the data source for the deployed site.
10. **Update docs/DIARY.md** after completing each task with a short entry noting what was done.

## Common Tasks

### Adding a new page
1. Create `/app/pagename/page.tsx`
2. Add nav tab in Header component
3. Add metadata export in the page file
4. Update docs/DIARY.md

### Updating styles
1. Check docs/STYLE.md first
2. Use CSS custom properties from globals.css
3. Component-specific styles go in ComponentName.module.css

### Syncing event data
Run `npm run sync` (requires sqlite3 CLI and correct DB_PATH in scripts/export-events.js)
