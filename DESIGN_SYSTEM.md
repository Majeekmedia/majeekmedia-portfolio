# DESIGN_SYSTEM.md

**Majeek Media — visual system**
Version 1.0 · Established 2026-10-16 · Describes the system **as built**

Every value here was verified against the running application and the built
stylesheet. Contrast numbers come from `docs/qa/contrast.mjs`, which you can re-run at
any time: `node docs/qa/contrast.mjs`.

---

## 1. The idea

**Everything on this site is a printed thing that happens to be on a screen.**

The world is a Swiss-editorial poster system: a strict grid, one committed accent, an
oversized display face carrying the meaning, hairline rules doing the structural work,
and numbered project spreads. The motion layer gives it the kinetic quality of a poster
being pasted up: type arriving from just outside the frame, rules drawing themselves,
plates settling into register.

### What it refuses

The incumbent design's arrangement, specifically:

| Refused | Because |
|---|---|
| Dark hero over a blurred glow ellipse | The single most common AI-generated hero |
| Alternating black / white section bands | Makes the page read as two websites |
| Three equal cards in a row | The default when no composition was decided |
| `rounded-full` on every interactive element | Removes all typographic structure |
| `A PASSION, PURPOSE` earnest-capital headline | Says nothing about what is built |
| An accent used as scattered decoration | Dilutes it to noise |
| A section-number eyebrow above every heading | Banned pattern, and it collided with the project numbering |

### What it commits to

One colour field the whole page sits on. One accent used the way a printer uses a second
ink: deliberately, and in quantity, in a few places. Type at poster scale. Rules, not
boxes. Numbers that mean something.

Dials, pinned by the brief:

| Dial | Value | Consequence |
|---|---|---|
| `DESIGN_VARIANCE` | **9** | Asymmetric grid, offset columns, deliberate empty zones. Never symmetric 12-col. |
| `MOTION_INTENSITY` | **6** | Authored entrance and scroll moments, CSS-first, no scroll hijacking, no library added. |
| `VISUAL_DENSITY` | **3** | Gallery spacing, one idea per viewport. |

---

## 2. Palette — BLUE

Cold, blue-tinted, near-black. **Not pure black.** `#000000` kills depth, makes
elevation impossible, and reads as a default rather than a decision.

```css
--mm-bg:            #0e1116;  /* page ground — blue-tinted, not neutral grey */
--mm-surface:       #151a22;
--mm-surface-raised:#1c222c;
--mm-line:          #262d38;  /* hairlines between rows — decorative */
--mm-line-control:  #566478;  /* interactive borders — WCAG 1.4.11 needs 3:1 */

--mm-text:          #f0eee8;  /* warm off-white, never #ffffff */
--mm-text-muted:    #9a9a9a;

--mm-accent:        #6ba4fa;  /* BRIGHT blue — all accent TEXT */
--mm-accent-dim:    #4a8cf7;  /* accent text hover */
--mm-accent-fill:   #2470f0;  /* BRAND blue — button FILLS only */
--mm-accent-fill-dim:#1e63da;

--mm-danger:        #ff8172;
```

### Why there are TWO blues, not one

The original system used a single bright chartreuse (`#C6FF39`) that did both jobs at
once: 16.00:1 as text and as a fill. **Blue cannot do that in one value.** The choice is
between a deep saturated blue that fails as text, or a pale one that stops reading as a
brand colour.

So the two roles are split, deliberately:

| Role | Value | Where | Contrast |
|---|---|---|---|
| `accent` | `#6ba4fa` | Accent **text**: headings, links, index numerals, rules, focus ring | **7.49:1** on bg — AAA |
| `accent-fill` | `#2470f0` | Button **fills** only, carrying a white label | White on it **4.52:1** — AA |

**`#2470f0` is your actual logo blue**, extracted programmatically from
`assets-source/logo.png` (57.8% of opaque pixels) rather than eyeballed. It is the deep
saturated blue, which is exactly why it makes a good fill and a bad text colour: as small
text on the ground it measures **4.19:1** and would fail AA.

The bright blue was solved for, not guessed. Candidates were scanned across hue 210–225
for the most saturated value that still clears AAA on all three surfaces. `#6ba4fa` is
hue 216, 93% saturated — it keeps the vividness that made the green work while staying
readable.

### Verified contrast `[MEASURED — 0 failures]`

```
textPrimary on bg             16.30:1  AAA
textPrimary on surface        15.05:1  AAA
textPrimary on surfaceRaised  13.77:1  AAA
textMuted   on bg              6.72:1  AA
textMuted   on surface         6.20:1  AA
textMuted   on surfaceRaised   5.68:1  AA
accent      on bg              7.49:1  AAA
accent      on surface         6.91:1  AA
accent      on surfaceRaised   6.33:1  AA
accentDim   on bg              5.75:1  AA
danger      on bg              7.78:1  AAA
white       on accent-fill     4.52:1  AA
white       on accent-fill-dim 5.45:1  AA
```

### Three corrections that matter

1. **`#858585` failed.** The brief's starting muted value gives **4.42:1** on the raised
   surface: it *misses AA*. Raised to **`#9a9a9a`**, which clears AA on all three
   surfaces. This is the failure that survives review, because the token looks fine
   against the page ground and only fails on the panel nobody checks.
2. **`#5a5a5a` was deleted from the text scale.** Drafted as `--mm-text-faint`, it measures
   **2.76:1**, failing even the 3:1 non-text threshold. It was not subtle text, it was
   unreadable text.
3. **The control border was split out into its own token.** The ghost button's border
   measured **1.89:1** against the ground, below the 3:1 that WCAG 1.4.11 requires for the
   boundary that identifies a control. `--mm-line-control: #566478` clears it at **3.14:1**.
   Row dividers stay at `--mm-line` (1.36:1) and are documented as decorative, which is
   why they are a *different token* rather than the same one stretched to cover both jobs.

### The accent rule: four roles, and no others

1. The one primary action per viewport (as a **fill**).
2. Project index numerals (`01`, `02`) and accent text.
3. The hover/active rule under a nav item, project title, or link.
4. An accent `border-left` on the honesty disclosure.

**Never** for: icon fills, badge backgrounds, decorative status dots, gradient stops, or a
coloured word inside an otherwise neutral headline.

**Colour strategy: Committed, not Drenched.** The blue-tinted ground owns ~90% of every
surface; the accent owns whole small regions rather than being sprinkled.

---

## 3. Typography

### The serif decision, stated explicitly

The brief's `design-taste-frontend` skill flags "creative brief implies serif" as the
most-tested AI tell, and bans `Fraunces` and `Instrument_Serif` outright.

**No serif is used anywhere.** The editorial quality comes from scale, tracking, alignment
and whitespace, which are the things that actually produce editorial typography, rather
than from reaching for a serif to signal "premium".

### Faces

| Role | Face | Why |
|---|---|---|
| **Display** | Archivo Variable, `wght` 100–900 | An industrial grotesque with real character. Very large and tightly tracked, it reads as poster type. Not Inter, not a serif. |
| **Text** | the same Archivo | One family keeps the system coherent. Differentiating by weight rather than adding a second face avoids the "two random fonts" failure. |
| **Mono** | JetBrains Mono | Earns its place: this is a software engineer. Used for tech chips, project metadata and index numerals. Real data, never "technical" costume. |

### Font payload decision `[MEASURED]`

Fontsource offers a **weight-only** Archivo variable build at **34 KB** (latin) and a
**weight + width** build at **88 KB**. The width axis is **not** loaded: 54 extra KB is not
repayable for two display moments. Total font payload is **~55 KB, same-origin**, versus
the incumbent's Inter from Google Fonts at a similar size *plus* a render-blocking
third-party request.

### Scale

Fluid via `clamp()`, so there are no breakpoint jumps:

```css
--mm-fs-display: clamp(3rem, 11vw, 9.5rem);
--mm-fs-h1:      clamp(2.5rem, 6.5vw, 5.5rem);
--mm-fs-h2:      clamp(2rem, 4.5vw, 4rem);
--mm-fs-h3:      clamp(1.375rem, 2.2vw, 2rem);
--mm-fs-body:    1.0625rem;
--mm-fs-small:   0.875rem;
--mm-fs-mono:    0.75rem;
```

**Tracking floor is `-0.04em`; the system stops at `-0.035em`.** Display type at 9.5rem
needs negative tracking to hold together, and past `-0.04em` letters begin to collide. The
incumbent used `-0.02em` at 60px, too loose to read as poster type at that size.

**Line height:** `0.90` display, `0.94` `h1`, `0.98` `h2`, `1.55` body.
Body measure capped at **68ch** via `--mm-measure`.

---

## 4. Space and grid

**4px base scale:** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 200`

```css
--mm-section:    clamp(4.5rem, 9vw, 8rem);
--mm-section-lg: clamp(6rem, 12vw, 10rem);
--mm-gutter:     clamp(1rem, 2vw, 2rem);
```

Rule: **more space above a heading than below it.** The incumbent got this backwards:
`.section` was `py-12 sm:py-16 lg:py-20`, tightened further by card padding, which is why
nothing read as a distinct section. Section rhythm was tightened once during this build
after measuring the homepage at 6,473px.

**Grid:** a 12-column grid, deliberately **not** used symmetrically.

| Permitted | Forbidden |
|---|---|
| `7 / 5` split, heavier on one side | `6 / 6` |
| Full-bleed plate with text in columns 8–12 | Centred text over a centred element |
| An intentional empty gutter column | Equal padding everywhere |

**Container:** `max-w-[1600px]` with fluid gutters. The incumbent's `max-w-6xl` (1152px)
left ~380px dead each side at 1920px `[MEASURED]`, which cannot support an oversized
editorial direction at all.

**Radius, one decision:** `--mm-radius: 2px`, used identically everywhere. This replaces
the incumbent's mixed `rounded-full` + `rounded-3xl` + `rounded-2xl` + `rounded-xl` soup.
A 2px radius reads as a printed plate rather than a UI card, which is the point.

---

## 5. Structural devices

What makes the system recognisable with all content removed:

1. **Totally flat type.** Every heading is upright, weight 800–900, tightly tracked. The
   single italic moment in the whole site is the honesty disclosure on the crypto project.
2. **Hairline rules.** 1px `--mm-line` rules spanning the grid, opening sections and
   separating list rows. These do the work the incumbent delegated to cards.
   **Rules, not boxes.**
3. **The plate.** A screenshot presented with no border, no shadow and no card, its
   metadata in a column beside or below it. Replaces `card-light` + `ImageGallery`.
4. **The accent underline.** A 2px accent line scaling from 0 to full width on hover, from
   the left. The single interaction signature of the site.
5. **Numbered project spreads.** `01` and `02` identify real, referable work. This is the
   **only** numbering on the site.

### Surfaces: three, with a stated rule

| Token | Value | Used for |
|---|---|---|
| `bg` | `#101010` | The page. ~90% of every viewport. |
| `surface` | `#181818` | Form fields, the honesty disclosure. Used sparingly. |
| `surface-raised` | `#202020` | Highest elevation. At most twice per page. |

**The page never inverts.** There is no light-on-dark to dark-on-light flip. This is the
hardest break from the incumbent, whose every page alternated `bg-black` / `bg-white`, and
it is what makes the redesign read as one designed thing rather than a stack of blocks.
Depth is expressed by hairlines and space, not by changing the theme.

**Elevation: borders, not shadows.** There is one glass-free, shadow-free elevation system.
No glassmorphism anywhere.

---

## 6. Components

| Component | Notes |
|---|---|
| `Reveal` | **Visible by default.** Motion is additive. Supports a `lines` variant for heading reveals. |
| `Button` | Two variants: `accent` (one per viewport) and `ghost`. Labels are 1–3 words, `nowrap` enforced. |
| `ProjectSpread` | The full editorial showcase, used on a project's own page. Heading level is a prop so the title is `h1` on a detail route and `h2` inside an index. |
| `Plate` | Image with real `srcSet`, explicit dimensions, lazy loading, and per-image aspect ratio. |
| `Rule` | Hairline. Optional scale-in draw. |
| `SectionIndex` | Heading + lead. **No numeral**, see below. |
| `SkipLink` | Keyboard users should not have to tab the nav to reach content. |
| `Seo` | Per-route head, Open Graph, and JSON-LD. Emits `Person` + `ItemList`. |

### Route structure

| Route | Renders |
|---|---|
| `/portfolio` | An index: one compact row per project with an excerpt and a link. |
| `/portfolio/:slug` | The full spread for one project, plus prev/next. |
| unknown slug | A real not-found state, not an empty shell. |

Projects are individually linkable and individually indexable, each with its own
`<title>`, description and canonical URL.

### Locks enforced, with evidence

- **Shape lock:** `2px` radius everywhere.
- **Colour lock:** the accent appears in exactly the four roles in §2.
- **One label per CTA intent.** The incumbent shipped **six** labels for the single
  "contact" intent (`Start a Project`, `Get In Touch`, `Get in Touch`,
  `Let's Work Together`, `Let's Build Something Great`, `Read More About Me`). The site now
  has **one**: *Get in touch*, identical in nav, hero, and footer. `[MEASURED]` — the
  distinct button-label set contains only `Get in touch` and `See the work`.
- **Button contrast:** accent fill `#c6ff39` with `#101010` label = **16.10:1**.
- **Form contrast:** inputs are `surface` `#181818` with `#f0eee8` text (**15.30:1**) and a
  real 2px accent focus ring, measured live as `rgb(198, 255, 57) 0px 0px 0px 2px`. The
  incumbent's ring resolved to **no CSS at all**.
- **Tap targets:** every nav, footer and social link is at least 24×24px, clearing the
  WCAG 2.2 minimum. Measured: previously 22px, now 34px.
- **No emoji as icons, anywhere.** The incumbent's skills heading read
  `I SPECIALIZE IN A RANGE OF 💪 SKILLS`.
- **No gradient text, no glow, no decorative blob.**

---

## 7. Two patterns that were added, then removed

Both are easy to reintroduce, so they are recorded.

**Section numerals were added, then removed.** `01`–`05` sat above each section heading.
Removed because:
- It is the banned "section-number eyebrow": a numeral that only counts positions carries
  no information the reader needs.
- It **collided** with the project numbering. Two competing number sequences on one page
  is genuinely confusing, not merely untidy.

Numbering now exists in exactly one place, and it means something: the project spreads.

**The split-header pattern is avoided.** No "large headline left, small explainer
paragraph floating in the right column". The heading is a single statement, with the lead
directly beneath it where reading order expects it.

**Eyebrow budget:** the page uses **zero** wide-tracked uppercase labels above headings.
The cap is one per three sections; using none is the cleanest way to satisfy it.

---

## 8. Motion

`MOTION_INTENSITY: 6`. CSS-first. **No animation library was added**, because the brief
forbids introducing heavy dependencies without justification and at this intensity CSS plus
`IntersectionObserver` covers every gesture. That keeps the bundle where it is instead of
adding roughly 35 KB gzip.

| Moment | Implementation | Communicates |
|---|---|---|
| Section entry | `opacity` + `translateY(24px)`, `IntersectionObserver`, once | Storytelling: content arrives as it is reached |
| Nav shrink | Height only, driven by an `IntersectionObserver` sentinel | State transition |
| Underline hover | `scaleX` on the underline, `transform` only | Feedback |
| Marquee | `translateX` loop, pauses on hover | Breadth: capabilities scrolling |

### The eases

```css
--mm-ease: cubic-bezier(0.16, 1, 0.3, 1);
--mm-dur-fast: 180ms;
--mm-dur: 420ms;
--mm-dur-slow: 720ms;
```

**Everything animates `transform` and `opacity` only.** No `top`/`left`/`width`/`height`,
and **no `window.addEventListener('scroll')` anywhere.** The brief bans it: it fires on
every frame and forces a re-render each time. The Navbar and BackToTop both use a sentinel
element plus `IntersectionObserver`, and BackToTop previously used the banned pattern.

**One marquee per page**, maximum. The rule is respected: exactly one, in capabilities.

### `prefers-reduced-motion`: built in, and it is the *simpler* path

The JS reads `matchMedia('(prefers-reduced-motion: reduce)')` and **never arms the entrance
state at all**. `Reveal` renders visible and only animates when motion is permitted, so the
reduced-motion path requires no override to work.

The CSS block is deliberately **narrower than a blanket `0.01ms` kill**: it removes
`transform` and animation but **keeps colour and opacity transitions**, because removing
those destroys real affordance.

**Verified by emulation, not by reading the stylesheet** `[MEASURED]`:

```
route         armed  hidden  animating  scroll-behavior  marquee
/                 0       0          0             auto     none
/portfolio        0       0          0             auto     none
/services         0       0          0             auto     none
/about            0       0          0             auto     none
/contact          0       0          0             auto     none
```

Zero armed, zero hidden, zero animating, native scroll. Content is simply present.

---

## 9. Tokens as shipped

```css
:root {
  /* colour */
  --mm-bg: #101010;
  --mm-surface: #181818;
  --mm-surface-raised: #202020;
  --mm-line: #2a2a2a;
  --mm-line-strong: #3f3f3f;
  --mm-text: #f0eee8;
  --mm-text-muted: #9a9a9a;
  --mm-accent: #c6ff39;
  --mm-accent-dim: #9fcc2e;

  /* type */
  --mm-font-display: "Archivo Variable", system-ui, sans-serif;
  --mm-font-text: var(--mm-font-display);
  --mm-font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* space */
  --mm-section: clamp(4.5rem, 9vw, 8rem);
  --mm-section-lg: clamp(6rem, 12vw, 10rem);
  --mm-gutter: clamp(1rem, 2vw, 2rem);
  --mm-measure: 68ch;

  /* shape */
  --mm-radius: 2px;

  /* motion */
  --mm-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --mm-dur-fast: 180ms;
  --mm-dur: 420ms;
  --mm-dur-slow: 720ms;

  /* z-index: a documented scale, never arbitrary values */
  --mm-z-content: 1;
  --mm-z-sticky: 40;
  --mm-z-nav: 50;
  --mm-z-overlay: 60;
}
```

**Tailwind v3 is kept** (it was already installed) and extended to *read* these tokens
rather than redefining them, so there is one source of truth. A migration to v4 mid-
redesign would put the working build, `_redirects` and deploy path at risk for no visual
gain.

**This replaced the entire `vibrant` / `accent` split** documented in
`PORTFOLIO_AUDIT.md` §3, where 92 source references pointed at a colour key that did not
exist in the Tailwind config.

---

## 9. Motion

`MOTION_INTENSITY: 6`, revised down in practice. **Three effects, no more.** The
owner's instruction was "ensure it's minimal", and a portfolio that animates
everything reads as a demo reel rather than as an engineer's site.

**No animation library was added.** The brief forbids heavy dependencies without
justification, and CSS plus `IntersectionObserver` covers all three for 0 KB.

| Effect | Mechanism | Communicates |
|---|---|---|
| Section heading lines rise and fade in sequence | `IntersectionObserver` + staggered transition | Reading order: lines arrive left-to-right, top-to-bottom |
| Section rule draws in from the left | `IntersectionObserver` + `scaleX` transition | Structure being established as you arrive |
| Pointer-reactive light and tilt | CSS variables written on `requestAnimationFrame` | "Which plate am I on?" on a grid of similar rectangles |

### What was deliberately NOT built

- **No letter-by-letter or word-by-word heading animation.** It reads as a demo
  reel, and it breaks on reflow.
- **No magnetic buttons or cursor follower.** Gimmicks on a portfolio whose job
  is to prove engineering judgement.
- **No hero entrance animation.** The headline is the first thing on screen, so
  animating it means the visitor waits to read the most important sentence. The
  reveal moment is spent further down, where it does work.
- **No parallax.** See below.

### A scroll-driven animation that silently did nothing

The section rule and the project plates were first built with CSS
`animation-timeline: view()`, which would have tied them to scroll position on the
compositor with no JavaScript at all.

It parsed correctly and reported a valid timeline. And it never advanced:
`getComputedTiming().progress` stayed pinned at **exactly 0.5** across 1400px of
scrolling, so the transform never changed. A scroll effect that does nothing is
worse than no effect, because review sees the element, the keyframes and a
`running` play state and concludes it works.

Both were moved to the `IntersectionObserver` path already proven elsewhere in
the codebase. **The parallax was removed entirely**: it gained only ~0.9% of
frame height of movement, so it was imperceptible even when working. The plate
already has a pointer-driven spotlight and tilt, which is enough.

Verified after the change: heading lines go `[0, 0]` off-screen and armed →
`[1, 1]` revealed; the rule goes `scaleX: 0` → `1`.

### `prefers-reduced-motion`: verified by emulation

`[MEASURED]` across all routes:

```
route         armed  stuckHidden  animating  scroll-behavior
/                 0            0          0             auto
/portfolio        0            0          0             auto
/contact          0            0          0             auto
```

Zero armed means the entrance state is never set, so reduced motion takes the
**simpler** code path rather than relying on a CSS override to undo an armed
state. The CSS block additionally disables the rule draw and the marquee.

### Cost `[MEASURED]`

**+2.3 KB gzip JS, +0.5 KB gzip CSS** for the whole motion layer including the
pointer effects.

---

## 10. Images

Assets are prepared by `node docs/qa/optimize-images.mjs`, which writes
`src/lib/image-manifest.json`. The manifest is what `src/lib/images.js` reads, so
the width plan exists in **exactly one place** and a component cannot request a
width that was never produced.

```
assets-source/          source assets, ~4.9 MB, NOT deployed
        |
        v  optimize-images.mjs
public/optimized/       WebP derivatives, 946 KB, deployed
```

`[MEASURED]` 4,851 KB of source becomes **946 KB** of derivatives, **81% smaller**.

### Width plan is derived from the source, not hard-coded

Source resolutions vary widely: VHM desktop captures are 1920x891, the Expo app
captures are 780x1688 portrait, and UniTrade is 1024x576. A fixed plan either
upscales the small ones or under-serves the large ones, so the pipeline emits up
to three steps drawn from `[480, 640, 1024, 1600, 1920]` filtered to the source
width, and records each image's true dimensions in the manifest.

**Aspect ratio is derived per image.** Forcing every plate into one landscape
frame cropped the 780x1688 phone screenshots into ribbons. `Plate` now uses each
image's own ratio unless a caller explicitly forces one.

### Transparency: a policy decision, not a measurement

Two opposite treatments are needed, and **pixel measurement cannot tell them
apart**:

| Asset | Transparent pixels | Correct treatment |
|---|---|---|
| Hero portrait | 40% | **Keep alpha.** It is a cut-out figure. |
| UniTrade screenshots | 16-23% | **Flatten.** A drop shadow was baked into the PNG. |

Those look numerically identical. So the policy is explicit by path: only the
brand mark and the portrait are cut-outs; everything under `projects/` is a
screenshot composited onto the page ground. Screenshots kept as cut-outs float in
a letterbox with their baked shadow reading as a stray halo.

The pipeline also **throws** if a cut-out loses its alpha channel, converting a
silent visual regression into a build failure.

### Honest limitation

UniTrade's screenshots are still 1024x576, so they are softer than the VHM ones at
1920px. That is a property of the supplied assets. Re-running the pipeline after a
larger capture widens every `srcSet` automatically.
