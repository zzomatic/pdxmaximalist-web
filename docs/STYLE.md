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

Everything on the site uses `'Courier New', Courier, monospace`. There is no separate display font — headings differ from body text by **size, weight, and casing only**, never by typeface.

---

## Rules

### Color
- ONLY black (`#000000`) and white (`#FFFFFF`)
- No grays, no off-whites, no tinted backgrounds
- Exception: dither patterns (CSS repeating patterns simulating bitmap dithering) may be used sparingly for texture
- Note on accessibility: because the palette is pure black on pure white, contrast always passes WCAG AAA. Never introduce a mid-gray to soften anything — if something needs de-emphasis, use size or casing, not color.

### Typography
- **One typeface everywhere:** `'Courier New', Courier, monospace`. No exceptions.
- Body text: 16px
- Card titles (artist names, product names): 18px, bold, uppercase
- Page headers (e.g. `[ UPCOMING SHOWS ]`): 24px, bold, uppercase
- Site title (`PDXmaximaLIST.info`): 28–32px, bold (22px on mobile)
- Hierarchy is created through **size, weight (bold), and UPPERCASE**, never through a different font
- No letter-spacing tricks, no italic except for emphasis within descriptions
- Text is always black on white, or white on black (inverted)

### Borders & Containers
- All cards and containers use `var(--border-thick)` (4px solid black)
- NO border-radius anywhere — sharp 90° corners only
- Section dividers use dashed borders: `border-top: 2px dashed #000`
- Date group headers: `═══ FRI JUN 06 ═══` style with box-drawing or repeated characters (see Accessibility note below)

### Shadows
- All cards and interactive elements get `var(--shadow)` (4px 4px 0px #000)
- Hard offset only — zero blur, zero spread
- On hover: shadow shifts to `2px 2px 0px #000` (pressed-in effect)

### Hover, Active & Focus States
- Buttons and nav tabs: **invert** on hover (black background, white text)
- Cards: shadow reduces on hover (subtle "pressed" effect)
- Links: underline on hover
- **Focus (keyboard):** every interactive element must show a clear, visible focus state. Because there's no color to work with, use a **2px solid black outline with a 2px offset** (`outline: 2px solid #000; outline-offset: 2px;`) — or the inverted state, the same as hover. Never remove outlines without replacing them. Focus must be at least as obvious as hover.
- `:focus-visible` is acceptable to avoid showing the outline on mouse click while keeping it for keyboard navigation.
- Transitions: `all 0.1s ease` — snappy, not smooth. HyperCard didn't animate.

### Buttons & Links
- Buttons rendered as: `[ LABEL ]` with brackets as part of the visual style
- Button border: `var(--border-thick)`
- Button shadow: `var(--shadow-sm)`
- Buttons sit inline, side by side when multiple (e.g. `[ MORE INFO ]  [ GET TICKETS ]`)
- Buy/action buttons follow the same bracketed pattern: `[ SUBSCRIBE ]`, `[ GET IT ]`, `[ COMING SOON ]`
- Links within text: underlined, no color change (still black)
- Touch targets: buttons at least 44px tall on all viewports

### Layout
- Max content width: 700px, centered
- Page padding: 24px horizontal
- Card spacing: 16px gap between cards
- Date group spacing: 32px above each new date group
- Overall feel: dense but readable — a stack of cards, not a sparse modern layout

### Mobile (< 640px)
- Single column, full-width cards with 16px horizontal padding
- Site title: 22px
- Nav tabs: stack horizontally, wrap if needed — or use a compact row with smaller text
- Cards: same style, just full-width
- Touch targets: buttons at least 44px tall

---

## Accessibility

The bitmap aesthetic leans heavily on ASCII and box-drawing characters. These are **decorative** and must never be the only way information is conveyed.

- **Decorative characters** (box-drawing like `┌──┐`, `═══`, rule lines, `¯\_(ツ)_/¯`, bracket frames) must be hidden from assistive tech with `aria-hidden="true"`, OR rendered with CSS borders/pseudo-elements instead of literal characters. A screen reader should never read "box drawings light horizontal" repeatedly.
- Prefer **real CSS borders** (`var(--border-thick)`, dashed dividers) over literal box-drawing characters for actual containers. Reserve literal characters for purely textual flourishes (e.g. a date header), and `aria-hidden` those.
- The bracket button style `[ LABEL ]` should keep the brackets as visible text but ensure the **accessible name** is just the label (e.g. an `aria-label="Subscribe"` if the brackets confuse the reading, or keep brackets as decorative spans). A `<button>` reading "left square bracket Subscribe right square bracket" is acceptable but not ideal — clean it up where easy.
- Use **semantic HTML**: real `<button>` for actions, `<a>` for navigation, proper heading levels, `<label>` associated with every form input.
- Every interactive element is keyboard-reachable with a visible focus state (see Focus States above).
- Disabled states (e.g. `[ COMING SOON ]`) must be communicated to assistive tech via `aria-disabled` or a real `disabled` attribute — not by appearance alone.

---

## Component Patterns

### Site Title
```
╔══════════════════════════════╗
║   PDXmaximaLIST.info         ║
╚══════════════════════════════╝
```
Large, bold, Courier New. Optionally enclosed in box-drawing characters (decorative, `aria-hidden`). Centered or left-aligned.

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
Or using dashes/equals signs. All-caps. Day of week + month + day. Centered. The rule lines are decorative (`aria-hidden`); the date itself is real text.

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
- 4px black border, 4px offset shadow (use real CSS borders, not literal box characters)
- Artist name: bold, uppercase
- Time and venue on same line, separated by ` · `
- Venue address below (if present), smaller text
- Price below (if present)
- Action buttons at bottom

### Product Card (merch)
```
┌──────────────────────────────────┐
│ ┌────────────────────────────┐   │
│ │                            │   │
│ │   [ image placeholder ]    │   │
│ │                            │   │
│ └────────────────────────────┘   │
│ PRODUCT NAME                     │
│ short description line            │
│ $X / mo                           │
│                                    │
│ [ SUBSCRIBE ]                     │
└──────────────────────────────────┘
```
- Same card frame as event cards: 4px black border, 4px offset shadow, sharp corners.
- Image placeholder: a bordered box (real CSS border) with descriptive `alt`/label text; no real images required.
- Product name: bold, uppercase. Description: body text. Price below.
- Action button uses the bracketed style: `[ SUBSCRIBE ]`, `[ GET IT ]`, or disabled `[ COMING SOON ]`.

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
The shrug is decorative (`aria-hidden`); the message text is real.

### Placeholder Page / Coming Soon
```
┌──────────────────────────────────┐
│                                    │
│         [ COMING SOON ]            │
│                                    │
└──────────────────────────────────┘
```
Centered vertically and horizontally in the content area. Used for the field guide booklet card/page until it launches.

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
Minimal. Dashed top border (real CSS border). Centered. Lowercase.

---

## Anti-Patterns (DO NOT USE)
- Any font other than `'Courier New', Courier, monospace`
- Border-radius of any kind
- Gradients
- Any color other than black and white (no grays, no off-whites)
- Blur effects (box-shadow blur, backdrop-filter, etc.)
- Smooth/slow transitions (keep everything ≤ 0.1s)
- Rounded buttons or pill shapes
- Drop shadows with blur
- Semi-transparent overlays
- Generic card layouts with subtle gray borders
- Removing focus outlines without an equally visible replacement
- Literal box-drawing characters as the only structure for a real container (use CSS borders; keep characters decorative and `aria-hidden`)