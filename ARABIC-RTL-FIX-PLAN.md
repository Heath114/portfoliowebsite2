# Arabic RTL Localisation Fix Plan

## Problems Identified

1. **No Arabic font** - `nm` is Latin-only. Arabic falls back to system fonts (Helvetica/Arial). Typographic identity is completely lost.
2. **Zero RTL CSS** - Not a single `[dir="rtl"]` rule exists. Layout relies entirely on default browser behavior.
3. **Hardcoded physical directions** - `left`/`right`/`margin-left` used everywhere instead of logical properties.
4. **Animations assume LTR** - GSAP `transformOrigin: "left"` and horizontal scroll logic are fixed to LTR.
5. **Negative letter-spacing breaks Arabic** - Connected Arabic script distorts when letters are tightened.
6. **No word-spacing adjustments** - Arabic has different spatial rhythm than Latin.

---

## Fix Workflow

### Phase 1: Typography

- [ ] Source an Arabic display font that matches `nm`'s weight and personality (geometric, medium weight, clean)
- [ ] Add `@font-face` declaration for Arabic font
- [ ] Set font-family stack for `[dir="rtl"]`: Arabic font first, then fallbacks
- [ ] Remove negative `letter-spacing` for Arabic (set to `0` or slightly positive)
- [ ] Adjust `line-height` if Arabic font metrics differ
- [ ] Review `word-spacing` overrides on contact page for Arabic

### Phase 2: CSS Logical Properties / RTL Overrides

Convert all physical directional properties to either logical properties or add `[dir="rtl"]` overrides:

**globals.css:**
- [ ] `letter-spacing` on h1/h2/h3 - neutralize for RTL

**home.css:**
- [ ] `.progress-bar { right: 0 }` - flip to `left: 0` in RTL
- [ ] `.counter, .count { left: 1.5rem }` - flip to `right: 1.5rem` in RTL

**work.css:**
- [ ] `.work-year { left: -7rem }` - flip to `right: -7rem`
- [ ] `.year-indices { left: 1.5rem }` - flip to `right: 1.5rem`
- [ ] `.year-index margin-left` stagger values - flip to `margin-right`
- [ ] `.work-project { text-align: left }` - flip to `text-align: right`
- [ ] `.year-index-highlighter transform-origin: left` - flip to `right`

**contact.css:**
- [ ] `.contact-copy-addresses { left: 20% }` - flip to `right: 20%`

**Menu.css:**
- [ ] Review all `left: 0` on fixed elements (may be fine since they span full width)

**WhoWeAre.css:**
- [ ] All image `left: %` positions - flip to `right: %`
- [ ] `transform-origin: 10% center` - flip to `90% center`

**ProcessCards.css:**
- [ ] `.process-card::after { left: 0 }` - fine (full width overlay)

**BtnLink:**
- [ ] Arrow icon direction - flip or mirror for RTL

### Phase 3: Animation Direction Fixes

**work/page.jsx:**
- [ ] Year index highlighter `transformOrigin` - read `dir` and set `"right"`/`"left"` accordingly

**work/unidash/page.jsx:**
- [ ] Line animation `transformOrigin: "left"` - flip for RTL

**WhoWeAre.jsx:**
- [ ] Horizontal scroll direction - flip translateX logic for RTL
- [ ] Image parallax endTranslateX values - invert sign for RTL

**page.js (home):**
- [ ] Preloader progress bar `transformOrigin` may need flip

### Phase 4: Component Adjustments

**BtnLink.jsx:**
- [ ] Arrow icon: mirror horizontally in RTL (CSS `transform: scaleX(-1)` or swap icon)
- [ ] Flex direction stays row (correct for both), but icon position may feel wrong

**Menu.jsx:**
- [ ] Nav layout: logo left, items right. In RTL should flip naturally via flex. Verify.
- [ ] Menu overlay items - flex-wrap should flow RTL naturally. Verify.
- [ ] Socials `justify-content: flex-end` - verify alignment in RTL

**Copy.jsx:**
- [ ] Test SplitText with Arabic text - ensure line splitting respects RTL and ligatures
- [ ] If SplitText breaks Arabic, add `{ type: "lines", specialChars: [...] }` or use a fallback strategy

**Footer.jsx:**
- [ ] Flex layout should flip naturally. Verify.

### Phase 5: Testing & QA

- [ ] Run dev server, toggle to Arabic, check every page:
  - [ ] Home
  - [ ] Work (grid + year labels + sidebar)
  - [ ] Individual project pages (Borvyn, New Look, The Way Mobile, UniDash)
  - [ ] Studio (hero, WhoWeAre, ProcessCards, mission, recognition)
  - [ ] Contact
  - [ ] Archive
  - [ ] Card
  - [ ] Menu overlay
- [ ] Test on mobile viewport (< 1000px)
- [ ] Verify SplitText animations don't break Arabic ligatures
- [ ] Check that view transitions still work correctly in RTL

---

## Font Candidates (to research)

Looking for: geometric, medium/semi-bold weight, clean sans-serif Arabic that pairs with `nm`

Options to evaluate:
- IBM Plex Arabic
- Tajawal
- Cairo
- Noto Sans Arabic
- Readex Pro
- Almarai

Criteria:
- Similar x-height proportion to nm
- Medium weight available (500-600)
- Clean geometric style (not calligraphic)
- Good web performance (subset available)
- Open source or purchasable

---

## Notes

- Do not use em dashes anywhere in copy
- Keep all changes backward-compatible with English (LTR should not break)
- Prefer `[dir="rtl"] .class` overrides over logical properties where logical properties would change LTR behavior
- Test DM Mono in Arabic context (used for labels/tags) - may also need an Arabic mono alternative or just let it fall back gracefully
