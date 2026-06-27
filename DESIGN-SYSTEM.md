# The Office — Complete Design System & Terminology Reference

> This document captures every design decision, pattern, animation behavior, layout rule, and terminology used across the website. Anyone reading this should be able to recreate the website's design to an exact degree.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout Grid](#spacing--layout-grid)
5. [Component Library](#component-library)
6. [Animation System](#animation-system)
7. [Page Transitions](#page-transitions)
8. [Page-by-Page Breakdown](#page-by-page-breakdown)
9. [Responsive Behavior](#responsive-behavior)
10. [Internationalization](#internationalization)
11. [Terminology & Voice](#terminology--voice)

---

## Brand Identity

### Company
- **Name:** The Office (Arabic: ذا أوفيس)
- **Type:** Development Company / Digital Studio
- **Location:** Amman, Jordan
- **Email:** info@theoffice.it.com
- **Instagram:** @theoffice_dev
- **YouTube:** @codegrid
- **X/Twitter:** @codegridweb
- **Founded:** 2023

### Philosophy
- Internal project name: "wu-wei" (effortless action — Taoist concept)
- Design language centers on: quiet focus, restraint, intention, calm execution
- The brand avoids excess; every element earns its place
- Typography-forward, minimal color, motion as personality

### Dual Positioning
- **Main site (/):** Creative digital studio — "Web Systems, Interface Design, Creative Development, End to End Delivery"
- **Card page (/card):** Software development company — "Custom Software, Automation, Mobile Applications, AI Solutions"

### Logo
- File: `/images/logos/c.png`
- Used in: nav (2rem width), hero background (particle system)
- Monochrome, abstract mark

---

## Color System

### CSS Custom Properties

```css
:root {
  --background: #1a1a1a;       /* Primary dark background */
  --background-200: #141414;   /* Deeper dark (preloader, menu overlay) */
  --foreground: #e4e7df;       /* Primary text / light color */
  --foreground-200: #666666;   /* Muted text / secondary info */
  --btn-icon: #ffc22a;         /* Accent — golden yellow (CTA pill icon bg) */
}
```

### Usage Rules

| Token | Usage |
|-------|-------|
| `--background` | Page backgrounds, hero, cards' dark side |
| `--background-200` | Preloader overlay, menu overlay, deeper sections |
| `--foreground` | All primary text, headings, links |
| `--foreground-200` | Muted labels, tags, secondary copy, section labels |
| `--btn-icon` | BtnLink arrow pill background (light variant only) |

### Borders & Dividers
- All section dividers: `1px solid rgba(228, 231, 223, 0.1)` (foreground at ~4% opacity)
- Used for: card page section separators, list item borders, contact links

### Inverted Sections
- Some sections flip to light: `background: var(--foreground); color: var(--background)`
- Used in: ProcessCards, mission-intro section on /studio
- Dark overlay on pinned process cards: `rgba(0, 0, 0, 0.5)` with variable opacity

---

## Typography

### Font Stack

| Role | Family | Weight | Source |
|------|--------|--------|--------|
| **Primary (body/headings)** | `"nm"` | 500 (medium), 550, 600 | Custom: `/fonts/nm/nm-medium.otf` |
| **Monospace (labels/tags)** | `"DM Mono"` | 300, 400, 500 | Google Fonts |
| **Fallback** | `"Helvetica Neue", Arial, sans-serif` | — | System |

### Type Scale (Fluid / Clamp)

```css
h1: clamp(2.5rem, 1.815rem + 5.75vw, 9rem)    /* weight: 600, letter-spacing: -0.075rem */
h2: clamp(2rem, 1.25rem + 2.25vw, 5rem)        /* weight: 550 */
h3: clamp(1.5rem, 0.75rem + 1.75vw, 3.5rem)    /* weight: 550 */
p/a: clamp(1.075rem, 0.325rem + 0.825vw, 2rem) /* weight: 500 */
p.sm/a.sm: clamp(0.8rem, 0.2rem + 0.7vw, 1.5rem) /* small text */
```

### Type Utilities (CSS Classes)

| Class | Effect |
|-------|--------|
| `.caps` | `text-transform: uppercase` |
| `.mono` | `font-family: "DM Mono", monospace` |
| `.sm` | Smaller font-size clamp (see above) |
| `.caps.mono` | Combined: uppercase monospace — used for all labels, tags, metadata |
| `.dark` | `color: var(--foreground)` |
| `.light` | `color: var(--background)` |

### Typography Rules
- All headings: `line-height: 1.1`, `user-select: none`
- Body text (p, a): `font-weight: 500`, `user-select: none`
- `.caps` elements: `font-weight: 600`, `-webkit-font-smoothing: antialiased`
- Process card descriptions: `line-height: 1.45`, `text-wrap: pretty`
- Hero tags: `font-weight: 700`, `color: white`, `font-size: 0.875rem` (fixed, not fluid)
- On mobile (≤1000px): h1 letter-spacing reduces to `-0.05rem`

### Special Type Treatments
- Studio hero "TO": `font-size: 50vw` (fills viewport width)
- WhoWeAre header: `font-size: 55vw`, uppercase
- Work page year labels: prefixed with `'` (e.g., `'26`)
- Menu items: rendered as h1 (full-size headings), comma-separated in a wrapping flex row
- Nav toggle labels: `font-weight: 700`, `color: white`, `font-size: 0.875rem`

---

## Spacing & Layout Grid

### Base Unit
- **1.5rem** is the universal spacing unit (page padding, gaps, nav padding)
- Larger gaps use multiples: `3rem`, `4.5rem`, `7.5rem`, `10rem`

### Page Padding
- All pages: `padding: 1.5rem` on all sides
- Studio hero on mobile adds extra top: `padding-top: 7.5rem`

### Flex Column Ratio System
- The site uses a consistent **ratio-based flex layout** (not a 12-column grid):
  - `flex: 4` + `flex: 2` = large column (2/3) + small column (1/3)
  - `flex: 2` + `flex: 1` = similar ratio for footer/nav contexts
  - `flex: 1` + `flex: 3` = sidebar + main (work page)
  - `flex: 1` + `flex: 1` = equal halves (project copy layout)

### Specific Layout Patterns

| Context | Pattern |
|---------|---------|
| Hero header/footer | `flex: 4` (left/large) + `flex: 2` (right/small) |
| Nav | `flex: 2` (logo) + `flex: 1` (items) |
| Nav items | `flex: 1` (time) + `flex: 1` (menu button) |
| Studio mission | `flex: 2` (empty) + `flex: 4` (content) |
| Process cards | `flex: 2` (index number) + `flex: 4` (content) |
| Process card copy | `flex: 2` (label) + `flex: 4` (description) |
| Work page | `flex: 1` (sidebar) + `flex: 3` (main) |
| Project copy | `flex: 1` (sp-col-lg) + `flex: 1` (sp-col-sm) |
| Footer | `flex: 2` (left) + `flex: 1` (right) |
| Contact | `flex: 2` (image) + `flex: 1` (copy) |
| Menu overlay footer | `flex: 2` (col 1) + `flex: 1` (col 2) |

### Section Heights
- Hero: `100svh`
- Studio hero img: `aspect-ratio: 7/5`
- Mission intro: `100svh`
- Recognition: `100svh`
- Process cards: `min-height: 120svh` each
- WhoWeAre: `100svh` (pinned for `6 * innerHeight` scroll distance)
- Contact: `min-height: 100svh`
- Project hero: `60svh`
- Project banner: `90svh`
- Next project section: `100svh`
- Card hero: `min-height: 100svh`

### Work Page Grid
- Desktop: `grid-template-columns: repeat(3, 1fr)`, gap `1.5rem`
- Mobile: `grid-template-columns: 1fr` (single column)
- Project thumbnail aspect ratio: `5/3`

### Content Width Constraints
- Studio header copy: `width: 60%`
- Mission intro copy: `width: 75%`
- Recognition copy: `width: 60%`
- Process card content wrapper: `width: min(75%, 980px)`
- Process card header: `width: 75%`
- Process card description: `max-width: 60ch`
- Project copy title/description: `width: 75%`
- Project images container: `width: 40%` (desktop), `width: 85%` (mobile)
- Menu overlay items: `width: 75%`
- Contact image: `width: 40%`, `aspect-ratio: 5/7`

---

## Component Library

### 1. Copy (Text Reveal Animation)

**Purpose:** Universal text animation wrapper. Splits text into lines and reveals them with a staggered upward slide.

**Behavior:**
- Waits for custom fonts ("nm", "DM Mono") to load before splitting
- Uses GSAP SplitText with `type: "lines"` and `mask: "lines"`
- Initial state: lines at `y: "100%"` (hidden below mask)
- Reveal: `y: "0%"`, `duration: 1`, `stagger: 0.1`, `ease: "power4.out"`
- Scroll-triggered by default (`start: "top 75%"`, fires once)
- Can be non-scroll-triggered with `animateOnScroll={false}` + custom `delay`

**CSS:**
```css
.line {
  position: relative;
  transform: translateY(100%);
  will-change: transform;
}
```

### 2. BtnLink (Arrow Button)

**Purpose:** Navigation link with animated arrow pill.

**Structure:**
```
[Label text] [Golden pill with arrow icon →]
```

**Styling:**
- Flex row, gap `0.5rem`, vertically centered
- Pill: `width: 4rem`, `height: 1.25rem`, `border-radius: 5rem`, `background: var(--btn-icon)`
- Icon: `IoMdArrowForward` from react-icons
- Light variant: gold pill, dark text (`color: var(--foreground)`)
- Dark variant: dark pill (`background: var(--background)`), light text, white arrow icon

**Behavior:**
- Internal routes: intercepted, uses view transition navigation
- External routes (http/mailto/tel): opens in new tab, no transition

### 3. Menu (Full-Screen Overlay)

**Structure:**
- **Nav bar** (always visible): logo (left) + live clock + "Menu" toggle (right)
- **Overlay** (hidden by default): close button + nav items (h1 links in flex-wrap row) + footer (rights, language toggle, socials)

**Nav bar:**
- Fixed top, `mix-blend-mode: difference` (inverts against content)
- Logo: 2rem image
- Clock: live time (HH:MM:SS AM/PM), DM Mono, uppercase
- "Menu" label: white, 700 weight, 0.875rem

**Overlay:**
- Background: `var(--background-200)` (#141414)
- Covers full viewport, z-index 10000
- Nav items rendered as h1 text with commas: "home, work, about us, archive, contact"
- Items use `.revealer` clip-path masking for reveal animation

**Open animation (timeline):**
1. Menu button slides up (`y: "-100%"`) and hides
2. Overlay fades in (opacity 0→1)
3. Close button slides down from above (`y: "100%" → "0%"`)
4. Nav links stagger in (`y: "100%" → "0%"`, stagger 0.04, duration 1)
5. Footer text staggers in simultaneously

**Close animation (timeline):**
1. Close button slides up
2. Nav links slide up and out (`y: "-100%"`)
3. Footer slides up and out
4. Overlay fades out
5. Menu button slides back down into view

**All ease:** `power3.out` (open) / `power3.in` (close for items)

### 4. Footer

**Structure:**
- Two rows: socials section + credits section
- Socials: "(Socials)" label + Email / LinkedIn / Instagram links (rendered as h2)
- Credits: "Developed by The Office Development" + "© 2026 All Rights Reserved"

**Layout:**
- Each row: `flex: 2` (large left, usually empty on desktop) + `flex: 1` (content right)
- Gap between rows: `4.5rem`
- All text uses scroll-triggered `.footer-text` reveal (overflow hidden, content slides up)

### 5. DynamicBackground (WebGL Particle Logo)

**Purpose:** Hero background — renders the logo as a field of interactive particles.

**Behavior:**
- Loads logo image, samples pixels at 1100×1100 resolution
- Creates a WebGL point cloud from non-transparent pixels
- Each particle: `gl_PointSize: 3.5`, circular (distance-based alpha in fragment shader)
- Mouse interaction: particles repel from cursor within `distortionRadius: 3000`
- Force: `0.003` strength, velocity damping `0.82`, return force `0.025`
- Max displacement: `100px` from origin (soft clamped with exponential decay)
- Canvas background: `#1a1a1a`
- Only renders on desktop (≥1000px width)
- Mobile: canvas exists but effect is disabled

### 6. ProcessCards (Stacking Pinned Cards)

**Purpose:** Four full-height philosophy cards that pin and stack as you scroll.

**Structure per card:**
```
[Index number (01-04)] [Content: Header h1 + Image (16:9) + Label + Description]
```

**Scroll behavior (desktop only):**
- Cards 1-3 get pinned at the top (`pin: true, pinSpacing: false`)
- As the next card enters (starts at `top 75%`, ends at `top top`):
  - Previous card scales down: `1 → 0.75` (progressive, -0.25 per card)
  - Previous card rotates: alternating `+5°` / `-5°`
  - Dark overlay fades in via CSS `--after-opacity` variable
- Last card doesn't pin (it's the final resting state)
- Mobile: no pinning, no scale/rotation, cards simply stack vertically

### 7. WhoWeAre (Horizontal Scroll with Clip Reveal)

**Purpose:** Dramatic section that reveals with a circular clip-path, then scrolls horizontally.

**Behavior:**
1. **Circle reveal:** As section enters viewport, container clip-path expands from `circle(0%)` to `circle(100%)` — background switches from dark to light
2. **Pin & horizontal scroll:** Section pins for 6× viewport heights, during which:
   - First 30% of scroll: content fades in (`opacity: 0→1`) and scales up (`0.85→1`)
   - Remaining 70%: content translates horizontally (4× viewport width container)
3. **Parallax images:** 5 absolutely-positioned images with independent x-translation speeds
4. **Text:** "Who we are" at 55vw font-size in dark color on light background

---

## Animation System

### Global Easing

| Name | Value | Usage |
|------|-------|-------|
| `hop` | `CustomEase: "0.9, 0, 0.1, 1"` | Preloader counter, menu reveal |
| `power3.out` | GSAP built-in | Menu animations, text reveals |
| `power4.out` | GSAP built-in | Copy component, banner reveals, progress bars |
| `power3.in` | GSAP built-in | Menu close (items leaving) |
| `sine.inOut` | GSAP built-in | Status dot pulse |
| `cubic-bezier(0.87, 0, 0.13, 1)` | CSS/WAAPI | Page transitions (aggressive ease) |
| `cubic-bezier(0.22, 1, 0.36, 1)` | CSS transition | Work project hover (image scale, lift) |

### Preloader Sequence

**Trigger:** First visit per session (sessionStorage check)

**Elements:** Counter (00 → 27 → 65 → 98 → 99), progress bar, overlay

**Timeline:**
1. Counter digits reveal with `y: "0%"`, stagger 0.075, duration 1 each set
2. Each set then exits with `y: "-120%"` 
3. Progress bar scales from bottom: `scaleY: 0 → (1/5) → (2/5) → ... → 1`
4. Progress bar origin flips to top, scales back to 0
5. Overlay fades out
6. Hero link fades in after `6.2s` delay (vs `0.9s` without preloader)

### Common Animation Patterns

| Pattern | Properties | Usage |
|---------|-----------|-------|
| **Clip reveal (bottom-up)** | `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)` → `polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)` | Images, banners, progress containers |
| **Text line reveal** | `y: "100%" → "0%"`, duration 1, stagger 0.1 | Copy component (all text) |
| **Char reveal** | Individual characters masked, `y: "100%" → "0%"`, stagger 0.2 | Studio hero "TO" |
| **Fade + lift** | `y: 30, opacity: 0` → `y: 0, opacity: 1` | BtnLink wrappers, hero link |
| **Scale up entrance** | `y: 100, opacity: 0` → `y: 0, opacity: 1`, stagger 0.05 | Work page projects |
| **Pulse** | `opacity: 1 → 0.2`, repeat infinite, yoyo | Card page status dot |

### Hover States (Desktop Only — `@media (hover: hover) and (pointer: fine)`)

| Element | Effect |
|---------|--------|
| Links (a) | `opacity: 0.65`, transition `0.25s ease` |
| Work project card | `translateY(-0.3rem)`, image `scale(1.045)` + `saturate(1.05)` + `contrast(1.02)` + border appears |
| Nav/Menu buttons | `opacity: 0.5`, transition `0.3s ease` |
| Card contact links | `opacity: 0.65`, transition `0.25s ease` |
| Language toggle | `opacity: 0.5`, transition `0.3s ease` |

### Revealer Pattern
```css
.revealer {
  position: relative;
  width: max-content;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
```
Used in: Menu nav items, nav logo, menu footer text. Content inside starts at `y: "100%"` or `y: "-100%"` for entrance/exit.

---

## Page Transitions

### View Transition API (via next-view-transitions)

**Shared transition function `slideInOut()`** — used on every internal navigation:

**Old page (exiting):**
```js
[
  { opacity: 1, transform: "translateY(0) scale(1)" },
  { opacity: 0.2, transform: "translateY(-30%) scale(0.90)" }
]
// duration: 1500ms, easing: cubic-bezier(0.87, 0, 0.13, 1)
```

**New page (entering):**
```js
[
  { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
  { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }
]
// duration: 1500ms, easing: cubic-bezier(0.87, 0, 0.13, 1)
```

**Effect:** Old page shrinks and fades backward; new page clips upward from the bottom.

**CSS Overrides:**
```css
::view-transition-old(root), ::view-transition-new(root) { animation: none !important; }
::view-transition-new(root) { z-index: 10000; }
::view-transition-old(root) { z-index: 1; }
```

**Scroll reset:** On every transition, scroll is forced to top immediately + via rAF + via setTimeout(220ms).

---

## Page-by-Page Breakdown

### Home (`/`)

**Sections:**
1. **Preloader** (first visit only): full-screen counter animation on `--background-200`
2. **Hero**: full viewport, WebGL particle background, positioned content

**Hero Layout:**
- Absolute-positioned content over canvas
- Header row at `top: 25svh`: tagline in right column (flex: 2)
- Footer row at bottom: location info (left, flex: 4) + service tags + lang toggle + contact CTA (right, flex: 2)

**Mobile:** Left columns hidden, tagline moves to `top: 40svh`, no particle effect

---

### Work (`/work`)

**Layout:**
- Fixed year index sidebar (left, at `top: 30svh`)
- Empty flex sidebar (flex: 1)
- Main content (flex: 3) with top margin `17.5svh`

**Year groups:** Each year block has:
- Large year label (`'26` format) positioned with `top: 8rem, left: -7rem` overlapping the grid
- 3-column grid of project cards

**Year index sidebar:**
- Fixed position, staggered left margins (0rem / 2rem / 1rem alternating)
- Active state: `color: var(--foreground)` + underline bar scales in (`scaleX: 0 → 1`)
- Updates on scroll (ScrollTrigger, `start: "top 50%"`, `end: "bottom 50%"`)
- Clickable (smooth scrolls to year)

**Desktop parallax:** Year labels get subtle vertical parallax on scroll (`progress * -100` y-offset)

---

### Project Pages (`/work/borvyn`, `/work/newlook`, `/work/the-way-mobile`)

**Shared template structure:**
1. **Hero** (60svh): centered project name as h1
2. **Banner image** (90svh): full-bleed, clip-path reveal on load
3. **Info row**: tags (left, dimmed at `opacity: 0.3`) + year + client name (right)
4. **Copy section**: title (left col) + description paragraphs + "View Project" BtnLink (right col)
5. **Image gallery**: centered column (40% width desktop), vertical stack with 1.5rem gap
6. **Scroll progress**: fixed counter (`0/100`) that travels vertically as you scroll, revealed when first image enters
7. **Next project**: full-height section, centered "(More Projects)" label + next project name as h1 link

---

### UniDash (`/work/unidash`)

**Minimal "coming soon" page:**
- Hero: subtitle label + horizontal line (animated scaleX reveal) + "UniDash" h1 + status + back button
- Body: "Coming Soon" h2 + short explanation

---

### Studio (`/studio`)

**Sections:**
1. **Hero**: "TO" at 50vw font size, centered, char-by-char reveal
2. **Hero image**: aspect-ratio 7/5, clip-path reveal, offset upward by -50% (overlaps hero)
3. **Header copy**: centered text (60% width), studio philosophy statement
4. **WhoWeAre**: horizontal scroll component (see Component Library)
5. **Mission intro**: inverted section (light bg), 2-column, left empty (flex: 2) + right content (flex: 4, 75% width), two paragraphs + "View Work" BtnLink
6. **ProcessCards**: 4 stacking cards (see Component Library)
7. **Recognition**: centered text (60% width), full-height section, label + copy

---

### Contact (`/contact`)

**Layout:** Two-column centered layout
- Left (flex: 2): centered portrait image (40% width, 5:7 aspect ratio, clip-path reveal)
- Right (flex: 1): stacked info with 3rem gaps

**Right column content (sequential Copy reveals):**
1. Studio name + city
2. Service tags (4 lines)
3. Address: Amman / Jordan / By Appointment (indented 20% left)
4. Links: LinkedIn, Instagram DM, About Us, Project Archive, Selected Work
5. CTA: "Reach Us via Email" BtnLink

**Footer:** absolute bottom, full-width, "Developed by..." + "© 2026..."

**Mobile:** Image hidden, copy takes full width with 1.5rem padding

---

### Archive (`/archive`)

**Concept:** Infinite draggable image mosaic

**Setup:**
- Fixed viewport, overflow hidden
- Container: 150vw × 150vh centered
- Gallery: flex-wrap grid of tiny image tiles
  - Desktop: 20 rows × 60 images (1200 total), each `width: calc((100% - 236px) / 60)`
  - Mobile: 15 rows × 30 images (450 total), each `width: calc((100% - 72px) / 6)`

**Animation sequence:**
1. All tiles start at `scale: 0, opacity: 0`
2. Random stagger reveal: `scale: 1, opacity: 0.3`, 1s stagger amount
3. Auto zoom-in: all tiles scale up (5× desktop, 2.5× mobile) and translate outward from center
4. Drag layer activates — user can grab and pan the zoomed mosaic

**Interaction:** lerp-based smooth dragging (factor 0.075), cursor changes to grab/grabbing

**Featured images:** First 3 tiles use actual project images (Borvyn, New Look, The Way Mobile)

---

### Card (`/card`)

**Standalone business card page** — no Menu, no Footer, no Lenis smooth scroll

**Visual style:** Same dark bg, sectioned with subtle `rgba(228, 231, 223, 0.1)` borders

**Sections (in order):**
1. Hero (100svh): "Development Company" label → "The Office" h1 → tagline h3 → two BtnLinks
2. Currently Building: pulsing dot + UniDash info
3. Who We Are: paragraph + 3 stats (Since 2023 / 1 Product / ∞ Ventures)
4. Featured Venture: UniDash details + "Learn More"
5. What We Build: 4-item list (Custom Software, Automation, Mobile Apps, AI)
6. Selected Work: 2-item list
7. Why The Office?: 3-item list (Fast Dev, Scalable Arch, Long-Term Partnership)
8. Get In Touch: Call / WhatsApp / Email / Website (h2 links)
9. Footer: company info + rights

**List pattern:** Each item has `padding: 2rem 0`, separated by the subtle border, two lines (title in `.caps` + description in `.sm.caps.mono` muted)

**Status dot:** `0.5rem` circle, background foreground color, pulsing opacity `1 → 0.2` infinitely

---

## Responsive Behavior

### Breakpoint
- **Single breakpoint:** `1000px` (sometimes `800px` for card page)
- Above 1000px: desktop layout
- Below 1000px: mobile layout

### Mobile Adaptations

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Lenis smooth scroll | Enabled | Disabled (native scroll) |
| ScrollTrigger animations | Enabled | Disabled on touch devices |
| WebGL particle bg | Rendered | Skipped entirely |
| Work grid | 3 columns | 1 column |
| Hero left columns | Visible (flex: 4) | Hidden (`display: none`) |
| Contact image | Visible (flex: 2) | Hidden |
| Footer socials left col | Visible | Hidden |
| Process cards | Pinned + stacking | Normal flow |
| Menu nav items | Flex wrap (horizontal) | Flex column (vertical) |
| Nav clock | Visible | Hidden |
| WhoWeAre images | 25vw | 50vw |
| Project images | 40% width | 85% width |
| Year label positioning | `top: 8rem, left: -7rem` | `top: 0, left: 0` |
| Year indices | `gap: 1rem`, at `top: 30svh` | `gap: 0.5rem`, at `top: 12.5svh` |
| Project year badge | Visible | Hidden |

### Touch Detection
Multi-factor detection: `ontouchstart`, `maxTouchPoints`, `pointer: coarse` media query, iPad user-agent sniffing, viewport dimensions (768-1366 range)

When touch detected:
- Adds `.has-touch` class to `<html>`
- Disables ALL ScrollTrigger instances
- Removes Lenis wrapper (children render without smooth scroll)
- Hover states gated behind `html:not(.has-touch)` selector

### Scroll Configuration

| Setting | Desktop | Mobile |
|---------|---------|--------|
| Lenis duration | 1.2 | 1 |
| Lerp | 0.1 | 0.05 |
| smoothTouch | false | true |
| touchMultiplier | 2 | 1.5 |
| syncTouch | true | true |

---

## Internationalization

### System
- React context (`LanguageProvider`)
- Toggle stored in `localStorage` key: `office-lang`
- Default: English (`en`)
- Supported: English (`en`), Arabic (`ar`)

### RTL Handling
- On toggle: `document.documentElement.dir` set to `rtl` or `ltr`
- `document.documentElement.lang` set to `en` or `ar`
- No additional CSS RTL overrides observed — relies on browser's native RTL flow

### Translation Keys
All text is accessed via `t("key_name")` helper. Full translation file at `/src/lib/translations.js` with ~120+ keys covering all pages.

### Language Toggle Locations
- Home page: hero footer (button)
- Menu overlay: footer section (button, closes menu first then toggles)

---

## Terminology & Voice

### Brand Terminology

| Term | Context |
|------|---------|
| Web Systems | Service tag — implies systematic/engineering approach to web |
| Interface Design | Service tag — UI/UX positioned as "interface" work |
| Creative Development | Service tag — code as creative medium |
| End to End Delivery | Service tag — full-cycle project ownership |
| Systems thinking | Tagline concept — structured, holistic approach |
| Creative execution | Tagline concept — craft in implementation |
| Consistent outcomes | Tagline promise — reliability, predictability |
| Quiet focus | Studio philosophy — no noise, deep work |
| Restraint and intention | Design philosophy — nothing without purpose |
| Calm execution | Process philosophy — composed, unhurried delivery |
| Digital work | How they refer to their output (not "websites" or "apps") |
| Practice | How they refer to their business (not "agency" or "firm") |
| Scalable solutions | Engineering language applied to design |
| Long-term value | Positioning against trend-chasing |

### Voice Rules
- **Concise over verbose** — short sentences, no filler
- **Confident but not loud** — statements, not exclamations
- **Philosophical undertone** — wu-wei, restraint, intention, "effortless"
- **Structured language** — "process", "systems", "architecture", "structure"
- **No superlatives** — never "best", "amazing", "incredible"
- **Third person** — "We" (never "I"), referencing the studio as a collective
- **Present tense** — "We build", "We design" (not "We have built")

### Section Labels
Always rendered as: `p.sm.caps.mono` in `var(--foreground-200)` color, parenthesized:
- `(About the principles)`
- `(About the approach)`
- `(Recognition)`
- `(Socials)`
- `(More Projects)`

Non-parenthesized labels for card page: "Currently Building", "Who We Are", "Featured Venture", etc.

### Copywriting Patterns
- Taglines: one sentence, no period, lowercase implied gravity
- Descriptions: 2 paragraphs max, ~50-80 words each
- Service descriptions (card page): one sentence, under 10 words
- "Why us" descriptions: one sentence fragments, confidence without explanation

---

## Technical Notes

### Scroll Restoration
- Manually disabled: `window.history.scrollRestoration = "manual"`
- Every route change forces scroll to 0 (Lenis immediate + window.scrollTo + rAF + timeout)

### Performance Optimizations
- WebGL: `powerPreference: "high-performance"`, no depth/stencil buffer
- Particle system: typed Float32Array for positions, DYNAMIC_DRAW for position buffer, STATIC_DRAW for colors
- GSAP `quickSetter` for scroll progress positioning
- Image load listeners refresh ScrollTrigger metrics
- `will-change: transform` on animated elements
- `execCount` throttle on particle updates (only runs when mouse recently moved)

### Z-Index Stack
| Layer | Z-Index |
|-------|---------|
| Preloader | 10000000 |
| Menu overlay | 10000 |
| View transition new | 10000 |
| Nav container | 1000 |
| Year indices | 1 |
| Process card overlay | 2 (local) |
| Archive page | 10 |
| Drag layer | 1 (local) |
| DynamicBackground canvas | -1 |

### Key Dependencies
- `gsap: 3.13.0` (ScrollTrigger, SplitText, CustomEase)
- `@gsap/react: 2.1.2` (useGSAP hook)
- `lenis: 1.3.1` (smooth scroll)
- `next: ^16.1.6` (App Router)
- `react: ^19.0.0`
- `next-view-transitions: ^0.3.5`
- `react-icons: ^5.5.0` (IoMdArrowForward only)
- `leva: ^0.10.0` (dev UI controls, not visible in production)

---

## File Structure Reference

```
src/
├── app/
│   ├── layout.js              (root metadata, ViewTransitions wrapper)
│   ├── page.js                (home — hero + preloader)
│   ├── globals.css            (variables, typography, reset, view transitions)
│   ├── home.css
│   ├── card/                  (standalone business card)
│   ├── contact/
│   ├── studio/
│   ├── archive/
│   ├── sample-project/        (legacy/template)
│   └── work/
│       ├── page.jsx           (portfolio grid)
│       ├── portfolio.js       (project data)
│       ├── work.css
│       ├── borvyn/
│       ├── newlook/
│       ├── the-way-mobile/
│       └── unidash/
├── client-layout.js           (Lenis, Menu, LanguageProvider, touch detection)
├── components/
│   ├── BtnLink/
│   ├── Copy/
│   ├── DynamicBackground/
│   ├── Footer/
│   ├── Menu/
│   ├── ProcessCards/
│   └── WhoWeAre/
├── context/
│   └── LanguageContext.jsx
└── lib/
    └── translations.js
public/
├── fonts/nm/nm-medium.otf
└── images/
    ├── archive/ (img1-50.jpeg)
    ├── contact/contact.jpeg
    ├── logos/c.png
    ├── process/process_001-004.jpeg
    ├── studio/hero.jpeg
    ├── who-we-are/
    └── work/ (per-project folders)
```

---

*Document generated from source code analysis. Last updated: 2026-06-28.*
