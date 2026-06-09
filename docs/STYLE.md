# STYLE GUIDE: PDXmaximaLIST.info

## Aesthetic: HyperCard Revival

The entire site should feel like a HyperCard stack running on a 1989 Macintosh — transported into a modern browser. Stark black and white. No color. No gradients. No rounded corners. Every element looks like it was drawn with MacPaint's rectangle and text tools.

Reference points: HyperCard, MacPaint, early Mac OS (System 6/7), ResEdit, bitmap-era UI.

---

## Design Tokens (CSS Custom Properties)

```css
:root {
  --bg: #FFFFFF;
  --fg: #000000;
  --font-body: 'Courier New', Courier, monospace;
  --font-display: 'Courier New', Courier, monospace;
  --border: 2px solid #000000;
  --border-thick: 4px solid #000000;
  --shadow: 4px 4px 0px #000000;
  --shadow-sm: 2px 2px 0px #000000;
}
```

---

## Rules

### Color
- ONLY black (`#000000`) and white (`#FFFFFF`)
- No grays, no off-whites, no tinted backgrounds
- Exception: dither patterns (CSS repeating patterns simulating bitmap dithering) may be used sparingly for texture

### Typography
- Body text, nav, button text uses `'Courier New', Courier, monospace` 
— Heading text (H1, H2) uses 'OCR-A'
- Body text: 16px
- Card titles (artist names): 18px, bold, uppercase
- Page headers (e.g. `[ UPCOMING SHOWS ]`): 24px, bold, uppercase
- Site title (`PDXmaximaLIST.info`): 28-32px, bold
- No letter-spacing tricks, no italic except for emphasis within descriptions
- Text is always black on white, or white on black (inverted)

### Borders & Containers
- All cards and containers use `var(--border-thick)` (4px solid black)
- NO border-radius anywhere — sharp 90° corners only
- Section dividers use dashed borders: `border-top: 2px dashed #000`
- Date group headers: `═══ FRI JUN 06 ═══` style with box-drawing or repeated characters

### Shadows
- All cards and interactive elements get `var(--shadow)` (4px 4px 0px #000)
- Hard offset only — zero blur, zero spread
- On hover: shadow shifts to `2px 2px 0px #000` (pressed-in effect)

### Hover & Active States
- Buttons and nav tabs: **invert** on hover (black background, white text)
- Cards: shadow reduces on hover (subtle "pressed" effect)
- Links: underline on hover
- Transitions: `all 0.1s ease` — snappy, not smooth. HyperCard didn't animate.

### Buttons & Links
- Buttons rendered as: `[ LABEL ]` with brackets as part of the visual style
- Button border: `var(--border-thick)`
- Button shadow: `var(--shadow-sm)`
- Buttons sit inline, side by side when multiple (e.g. `[ MORE INFO ]  [ GET TICKETS ]`)
- Links within text: underlined, no color change (still black)

### Layout
- Max content width: 700px, centered
- Page padding: 24px horizontal
- Card spacing: 16px gap between event cards
- Date group spacing: 32px above each new date group
- Overall feel: dense but readable — a stack of cards, not a sparse modern layout

### Mobile (< 640px)
- Single column, full-width cards with 16px horizontal padding
- Site title: 22px
- Nav tabs: stack horizontally, wrap if needed — or use a compact row with smaller text
- Cards: same style, just full-width
- Touch targets: buttons at least 44px tall

---

## Component Patterns

### Site Title
```
╔══════════════════════════════╗
║   PDXmaximaLIST.info         ║
╚══════════════════════════════╝
```
Large, bold, Courier New. Optionally enclosed in box-drawing characters. Centered or left-aligned.

### Nav Tabs
```
shows  friends  about  merch  contact
```
- Active tab: inverted (white text on black bg)
- Inactive: black text on white bg with black border
- All lowercase

### Date Group Header
```
════════════════════════════
  FRI JUN 06
════════════════════════════
```
Or using dashes/equals signs. All-caps. Day of week + month + day. Centered.

### Event Card
```
┌──────────────────────────────────┐
│ ARTIST NAME                      │
│ 8:00 PM · Venue Name             │
│ 123 SE Example St               │
│ $10                               │
│                                    │
│ [ MORE INFO ]  [ GET TICKETS ]    │
└──────────────────────────────────┘
```
- 4px black border, 4px offset shadow
- Artist name: bold, uppercase
- Time and venue on same line, separated by ` · `
- Venue address below (if present), smaller text
- Price below (if present)
- Action buttons at bottom

### Empty State
```
┌──────────────────────────────────┐
│                                    │
│     ¯\_(ツ)_/¯                     │
│                                    │
│   NO SHOWS IN THE NEXT 2 WEEKS    │
│                                    │
│   check back soon                  │
│                                    │
└──────────────────────────────────┘
```

### Placeholder Page (Coming Soon)
```
┌──────────────────────────────────┐
│                                    │
│         [ COMING SOON ]            │
│                                    │
└──────────────────────────────────┘
```
Centered vertically and horizontally in the content area.

### 404 Page
```
┌──────────────────────────────────┐
│                                    │
│            [ 404 ]                 │
│        page not found              │
│                                    │
│      [ BACK TO SHOWS ]            │
│                                    │
└──────────────────────────────────┘
```
Centered. Same card style as other pages.

### Footer
```
────────────────────────────────────
PDXmaximaLIST.info · portland OR
────────────────────────────────────
```
Minimal. Dashed top border. Centered. Lowercase.

---

## Anti-Patterns (DO NOT USE)
- Border-radius of any kind
- Gradients
- Any color other than black and white
- Blur effects (box-shadow blur, backdrop-filter, etc.)
- Smooth/slow transitions (keep everything ≤ 0.1s)
- Inter, Roboto, Arial, system-ui, or any non-monospace font
- Rounded buttons or pill shapes
- Drop shadows with blur
- Semi-transparent overlays
- Generic card layouts with subtle gray borders
