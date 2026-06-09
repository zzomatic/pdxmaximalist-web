# PROMPTS.md — Build Sequence

Copy-paste these into Claude Code in order. Each prompt is self-contained. After each one, review the output before moving to the next.

---

## 1. Scaffold the project

```
Read CLAUDE.md, docs/PRD.md, and docs/STYLE.md. Scaffold a new Next.js 14 App Router project with TypeScript. Set up the project structure defined in CLAUDE.md. Create globals.css with all design tokens from docs/STYLE.md. Don't add any pages yet — just the foundation, config files, and empty directories.
```

---

## 2. Build the shared layout

```
Read docs/STYLE.md. Build the shared layout in app/layout.tsx with the Header and Footer components. Header should have the site title "PDXmaximaLIST.info" and tab navigation for [shows] [friends] [about] [merch] [contact]. Shows links to /, others to /friends, /about, /merch, /contact. Active tab should be inverted per docs/STYLE.md. Footer is minimal per docs/STYLE.md. Use CSS Modules. Update docs/DIARY.md.
```

---

## 3. Create sample data and data layer

```
Read docs/PRD.md. Create lib/types.ts with the Event type. Create lib/events.json with 5 sample Portland music events in the next 2 weeks (use real Portland venues like Doug Fir, Mississippi Studios, Revolution Hall, Polaris Hall, Holocene — include real addresses for some, null for others to test both states). Times in 24h format. Create lib/events.ts with getUpcomingEvents() that filters out past dates. Create lib/utils.ts with formatTime() that converts 24h to 12h format. Update docs/DIARY.md.
```

---

## 4. Build the Shows page

```
Read docs/PRD.md and docs/STYLE.md. Build the Shows page at app/page.tsx. It should display events from getUpcomingEvents(), grouped by date with date headers formatted as "FRI JUN 06" style. Build the EventCard component showing artist (bold, uppercase), formatted time · venue, venue address below if not null (smaller text), price if present, and [ MORE INFO ] / [ GET TICKETS ] buttons linking to source_url and ticket_url (only shown if not null, open in new tab). Include the empty state for zero events. Use CSS Modules. Update docs/DIARY.md.
```

---

## 5. Build placeholder pages and contact page

```
Read docs/PRD.md and docs/STYLE.md. Create placeholder pages for /friends, /about, and /merch — each shows the page title in header style and a centered [ COMING SOON ] card. Create the /contact page with a card containing the text "comments, corrections, or tips?", a [ EMAIL US ] button linking to mailto:pdxmaximalist@gmail.com, and the email address displayed as plain text below. Create a custom 404 page at app/not-found.tsx with a [ 404 ] header, "page not found" text, and a [ BACK TO SHOWS ] button linking to /. Add Next.js metadata exports with proper page titles per docs/PRD.md. Use CSS Modules. Update docs/DIARY.md.
```

---

## 6. Add metadata and favicon

```
Read docs/PRD.md. Add Open Graph metadata to the root layout (title, description, type, url). Create a simple black-and-white SVG favicon — a bold "P" in a square with thick border, matching the HyperCard aesthetic. Update docs/DIARY.md.
```

---

## 7. Create the sync script

```
Read docs/PRD.md. Create scripts/export-events.js that exports events from a local SQLite database to lib/events.json. Leave DB_PATH as a placeholder with a clear comment. Add the "export" and "deploy" npm scripts to package.json per docs/PRD.md. Update docs/DIARY.md.
```

---

## 8. Mobile polish

```
Review all components on mobile viewport (< 640px). Make sure cards are full-width, nav tabs don't overflow, text is readable, and touch targets are at least 44px tall. Check against docs/STYLE.md mobile specs. Fix any issues. Update docs/DIARY.md.
```

---

## 9. Final review

```
Read docs/PRD.md and docs/STYLE.md completely. Review the entire project against both documents. Check: no border-radius anywhere, no colors other than black and white, Courier New on everything, hard shadows with no blur, all hover states invert properly, time displays in 12h format, past events filtered out, empty state works, all links open in new tabs, all metadata is set, 404 page works and is styled correctly. Accessibility: semantic HTML tags (nav, main, article, footer), aria-current on active nav tab, visible focus styles (2px solid black outline) on all interactive elements, rel="noopener noreferrer" on external links. Confirm lib/events.json is NOT in .gitignore. Fix anything that doesn't match. Update docs/DIARY.md with a final entry.
```

---

## Post-build

After the build is complete:

```
Update DB_PATH in scripts/export-events.js to: /absolute/path/to/your/events.db
```

Then run:
```
npm run export
```

Review `lib/events.json` in VS Code, fix any errors, then:
```
npm run deploy
```
