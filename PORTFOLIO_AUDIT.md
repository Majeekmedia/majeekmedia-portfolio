# PORTFOLIO_AUDIT.md

**Site:** https://majeekmedia.com
**Repo:** `c:\Users\HP\Desktop\majeekmedia-portfolio`
**Audit date:** 2026-10-16
**Auditor:** GitHub Copilot (DeepSeek V4.1 Flash)
**Mode:** Redesign — Overhaul (new visual language, preserve content, function and IA)

---

## 0. Method and evidence

Every finding below is labelled with how it was verified. Three classes appear:

| Tag | Meaning |
|---|---|
| `[MEASURED]` | Read out of the running app with `getComputedStyle`, `performance` APIs, or the built CSS bundle. Reproducible. |
| `[READ]` | Established by reading source. |
| `[INFERRED]` | Reasoned from the above, not directly measured. |

Tooling used:

- Local dev server (`vite`) inspected through a real browser at 375 / 768 / 1440 / 1920 px.
- `npm run build` executed to measure real bundle output.
- Built CSS grepped for every generated utility class.
- Contrast computed from live computed colors, not eyeballed.

The "before" screenshots are in `docs/qa/before/`. **Read `docs/qa/capture.mjs`
before you look at them** — a naive Playwright `fullPage: true` capture of this site
produces large blank bands because sections start at `opacity: 0` behind an
IntersectionObserver. The harness in `docs/qa/capture.mjs` documents the fix and
asserts that zero elements remain hidden before it captures.

---

## 1. Executive summary

The site is **structurally sound and technically competent**. It builds clean, has one
`h1` per page, correct landmarks, no broken images, no unlabelled links or buttons, and
it renders without horizontal overflow at every viewport tested. That is a better
starting point than most portfolios.

It is also **visually generic in exactly the way the brief describes**. The design is
the default "dark hero, blue accent, alternating black/white cards, three equal
project cards, glowing blob, pulse animation" template. It reads as assembled rather
than art-directed.

Separately, the audit surfaced **one significant defect that the site owner almost
certainly does not know about**: **92 uses of a `vibrant` color token that does not
exist in the Tailwind configuration.** The token is undefined, so a large share of the
site's accent styling silently does nothing. This is a real, user-visible bug, not a
style preference.

### Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2 / 4 | No `prefers-reduced-motion` support anywhere; no visible focus ring on links; `--color-text-secondary` set to `#000000` on a black page |
| 2 | Performance | 2 / 4 | 1.9 MB of screenshots compressed to 1024px wide; hero PNG is 787 KB at 819px; no image dimension attributes; 5 `blur-3xl` layers |
| 3 | Responsive | 3 / 4 | No overflow at any of the four viewports; one-off `max-w-6xl` container; needs re-verification after redesign |
| 4 | Theming | 1 / 4 | Two overlapping token systems; `darkMode: class` configured but `ThemeToggle`/`useTheme` are dead code; page is permanently dark |
| 5 | Implementation integrity | 1 / 4 | 92 dead `vibrant` references; 4 dead animation classes; duplicate parallel toolchain |
| **Total** | | **9 / 20** | **Poor — major overhaul justified** |

**Rating bands:** 18-20 Excellent · 14-17 Good · 10-13 Acceptable · 6-9 Poor · 0-5 Critical

---

## 2. Framework, dependencies, routes, deployment

### 2.1 Stack `[READ]`

| Concern | Actual |
|---|---|
| Bundler | Vite 7.3.1 |
| UI | React 18.3.1 (not React 19) |
| Routing | `react-router-dom` 7.12.0 — `BrowserRouter` + `Routes` / `Route` |
| Styling | Tailwind CSS **3.4.17** (`postcss.config.cjs` + `tailwind.config.cjs`) |
| Head/SEO | `react-helmet-async` 2.0.5 |
| Forms | `@emailjs/browser` 4.4.1 |
| Icons | `lucide-react` 0.562.0 |
| Language | JavaScript. TypeScript is installed and configured but unused for app code |
| Deploy | Netlify (`netlify.toml`, `public/_redirects` SPA fallback) |

### 2.2 Routes `[READ]`

`/` · `/services` · `/portfolio` · `/about` · `/contact` · `*` → NotFound

All are stable, well-named and indexable. **These slugs must not change** (see §10).

### 2.3 Duplicate toolchain `[READ]`

The repo contains **two complete parallel entry points**:

```
src/main.jsx  → App.jsx   (the real app; used by index.html)
src/main.tsx  → App.tsx   (unused Vite scaffold)
src/App.tsx                 the untouched "Vite + React" counter demo
src/App.css                 Vite scaffold CSS (#root max-width, logo spin)
src/assets/react.svg        unused
public/vite.svg             unused
```

`index.html` loads `main.jsx`. `main.tsx`, `App.tsx` and `App.css` are **never
reached at runtime**. They still cost maintainer attention and they make the repo look
unfinished to anyone who opens it. They should be deleted — see Redesign Plan step 1.

### 2.4 Build output `[MEASURED]`

```
dist/index.html                 1.11 kB   gzip:  0.59 kB
dist/assets/index-*.css        27.10 kB   gzip:  5.43 kB
dist/assets/index-*.js        256.39 kB   gzip: 80.32 kB
built in 33.12s
```

80 KB gzip JS for a six-page site with 4 dependencies is acceptable but not lean.
`lucide-react` is the largest single contributor after React itself. Worth watching,
not worth emergency action.

### 2.5 Dependency hygiene `[MEASURED]`

`npm install` reported **24 vulnerabilities (1 low, 5 moderate, 18 high)**. These are
almost entirely in the Vite/esbuild dev toolchain and do not ship to production, but
they should be addressed before the redesign is declared finished so the report is
honest. `npm audit fix` first, then re-measure.

`Browserslist: browsers data (caniuse-lite) is 10 months old` also fires on every build.
Cosmetic, one command to fix.

---

## 3. The critical defect: 92 dead `vibrant` color references

This is the most important technical finding in the audit.

### What happens

`tailwind.config.cjs` defines exactly one custom color scale:

```js
colors: { accent: { 50: '#eff6ff', 600: '#2563eb', 700: '#1d4ed8' } }
```

There is **no `vibrant` key**. The accent color actually implemented in `src/index.css`
is a CSS custom property:

```css
--color-vibrant: #1a73e8;   /* rgb(26, 115, 232) */
```

Source files then use Tailwind utility syntax built on the missing name: `bg-vibrant`,
`border-vibrant`, `text-vibrant`, `hover:bg-vibrant`, `ring-vibrant`,
`group-hover:border-vibrant`, `from-vibrant/20`, and so on.

### What the built CSS proves `[MEASURED]`

Grepping `dist/assets/index-*.css`:

| Class | Occurrences in built CSS |
|---|---|
| `bg-vibrant` | **0** |
| `border-vibrant` | **0** |
| `hover:bg-vibrant` | **0** |
| `hover:border-vibrant` | **0** |
| `ring-vibrant` | **0** |
| `group-hover:bg-vibrant` | **0** |
| accent color `#2563eb` / `#1d4ed8` / `#eff6ff` | **0** |
| `text-vibrant` | 3 — but these come from the hand-written `.text-vibrant` rule in `index.css`, **not** from Tailwind |
| `border-vibrant/20` | **0** (the `/20` opacity syntax on a non-existent color is particularly dead) |

So of the 92 source references, only the handful that happen to collide with a
hand-written `.text-vibrant` helper in `index.css` do anything at all.

### User-visible consequences `[INFERRED from MEASURED]`

- **Every `border-vibrant/20` accent border is invisible.** Project cards, skill cards,
  the "About Me" portrait frame, the CTA panel — the accent outline simply is not there.
- **Every `hover:bg-vibrant` / `hover:border-vibrant` hover state does nothing.** The
  skill chips, tech badges, service icons and thumbnail selection border do not
  respond to hover.
- **Every `bg-vibrant/5` and `bg-vibrant/10` tinted panel is transparent.** The icon
  tiles in Services, About and Contact render as empty boxes.
- **`ring-vibrant` focus rings are absent** on the Contact form inputs, which combine
  this with `outline-none`. That is a genuine keyboard-accessibility failure: a
  keyboard user tabbing through the contact form gets **no visible focus indicator**.
- `bg-gradient-to-br from-vibrant/10 to-vibrant/5` on the hero portrait container
  resolves to a gradient between two undefined colors.

### Why this happened `[INFERRED]`

`docs/implementation_plan.md` describes a redesign to a **"vibrant green"** palette
(`#BEFF55`). `docs/color-scheme-update.md` then says the scheme was "fixed" and
references green accents too. The code in `index.css` now holds **blue** (`#1a73e8`).
It looks like the green direction was abandoned mid-flight, the CSS variable was
recoloured to blue, and the utility class names kept the old word `vibrant` — but the
Tailwind config was never given a matching key. The class names became orphans.

### Recommendation

**Do not patch this by adding `vibrant` to the Tailwind config.** Patching it would
make the current undirected design render *louder*, not better. Instead the redesign
replaces the token layer entirely (§7) with real, semantic, documented tokens. This
finding matters because it means **what you see today is not the design anyone
intended** — several elements are missing their styling — so visual judgements about
the current site must account for that.

---

## 4. Generic AI-generated design patterns

The brief asks specifically for these. Each is present and verifiable.

### 4.1 The full cliché checklist

| Pattern | Where | Evidence |
|---|---|---|
| Dark hero over a decorative glow | Home hero | `[READ]` `Home.jsx:112` — `blur-3xl` blurred ellipse behind the portrait |
| Glowing accent blob | NotFound | `[READ]` `NotFound.jsx:12` — `blur-[100px]` circle, 256px, purely decorative |
| Glassmorphism badge | Home hero | `[READ]` `Home.jsx:52` — rounded-full `glass` pill reading "Available for Projects" |
| Pulsing CTA | 5 pages | `[READ]` `.pulse-glow` infinite 2s animation, on `Home.jsx:86`, `Home.jsx:307`, `About.jsx:226`, `Portfolio.jsx:188`, `Services.jsx:231` |
| Three equal cards in a row | Home, Services, About, Contact | `[READ]` `Home.jsx` skills grid `lg:grid-cols-4`, projects `lg:grid-cols-3`; `Services.jsx` "Why Work With Me" `md:grid-cols-3`; `About.jsx` beliefs stack; `Contact.jsx` `md:grid-cols-3` |
| Alternating black / white sections | Every page | `[READ]` e.g. `Home.jsx`: `bg-black` → `bg-white` → `bg-white` → `bg-white` → `bg-black`. This is the single strongest "assembled from a template" signal. |
| Emoji used as an icon | Home skills heading | `[READ]` `Home.jsx:189` — `I SPECIALIZE IN A RANGE OF 💪 SKILLS`. An emoji standing in for an icon system. |
| Fake-precise invented metrics | About | `[READ]` `About.jsx:144-147` — "4+ Years", "20+ Projects Delivered", **"100% Client Satisfaction"**, "24/7 Support Available". None of these are verifiable or sourced. |
| "Available for Projects" status badge | Home hero | `[READ]` A decorative coloured dot plus a claim, occupying hero space. |
| Gradient text helper | Available but unused | `[READ]` `.text-gradient` defined in `index.css:172`, never used. Dead code that also signals the template origin. |

### 4.2 Copy problems

The brief names three banned phrases. One is present in spirit and the surrounding copy
is weak:

| Current copy | Problem |
|---|---|
| `CODING WITH A PASSION, CREATING WITH PURPOSE` `[READ]` `Home.jsx:55-65` | Exactly the register the brief bans — earnest, content-free, four lines tall. Says nothing about what is built. |
| `HERE'S A GLIMPSE OF SOME RECENT PROJECTS` `[READ]` `Home.jsx:226` | "Here's a glimpse" is filler. |
| `Building scalable web platforms, custom dashboards, and MVPs for businesses and startups using modern technology stacks.` `[READ]` | "using modern technology stacks" is a non-claim. |
| `100% Client Satisfaction` `[READ]` `About.jsx:145` | An unsupportable claim. |
| `Let's build something exceptional.` `[READ]` `Home.jsx:302` | Generic. |
| `70% reduction in administrative overhead, 95% payment transparency, 3x faster billing cycles` `[READ]` `projects.js` | Unverifiable metrics presented as outcomes. Either source them or label them. |

**CTA duplication `[READ]`** — the same "contact me" intent carries **six different
labels**: `Start a Project`, `Get In Touch`, `Get in Touch`, `Let's Work Together`,
`Let's Build Something Great`, `Read More About Me`. The brief's rule is one label per
intent.

### 4.3 Mobile app development is entirely absent

`[READ]` The brief asks for a dedicated React Native / Expo showcase (Phase 6). The
current site mentions no mobile work at all. Every one of the four projects in
`src/data/projects.js` is described as a web platform. There is genuine Expo
experience recorded in the owner's other work, but **no mobile project data, and no
mobile screenshots, exist in this repo.** This is the largest content gap and it is
documented in `CONTENT_GAPS.md` rather than invented.

---

## 5. Typography, color, spacing, layout, motion, hierarchy

### 5.1 Typography `[MEASURED]`

Live computed values:

| Element | Family | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `h1` (desktop) | Inter | 60px | 800 | 60px (1.0) | -1.2px (-0.02em) |
| `body` | Inter | — | — | — | — |

**Problems:**

1. **Inter is the LLM default and the brief's own skill discourages it.** `[MEASURED]`
   It is loaded from Google Fonts via `<link>` in `index.html`, which is a render-block
   and a third-party dependency the brief's skill explicitly says to avoid.
2. **One face for everything.** No display face, no mono, no second register. Headings
   and body differ only in size and weight, so the page has no typographic voice.
3. **Line height 1.0 on a 4-line headline** `[READ]` `Home.jsx:55`. Tight leading `-`
   combined with the real risk that the single "A PASSION," line, centred, wraps.
   `text-vibrant-glow` is 60px; `leading-tight` is 1.25 so the computed 60px is the
   inline-`style`... irrespective, four stacked lines at exactly the cap height will
   collide on long words at narrow widths (see §6 mobile).
4. **Only two font weights loaded** (400, 500, 600, 700 requested; 800 used by `h1`
   `[READ]` `index.css:25` `font-weight` from `@apply font-bold` plus an override).
   Requesting 800 that is not in the loaded set causes a synthetic bold.

### 5.2 Color `[MEASURED]`

```
body background            rgb(0, 0, 0)          <- pure black, not off-black
color-scheme               dark
accent (index.css)         #1a73e8  rgb(26,115,232)
accent (tailwind.config)   #2563eb  rgb(37,99,235)   <- DIFFERENT, and unused
--color-text-primary       #ffffff
--color-text-secondary     #000000
--color-text-muted         #71717a
```

Findings:

1. **`#000000` pure black** as the page ground. The brief's skill bans pure black; it
   kills depth and makes shadows and elevation impossible.
2. **Two conflicting accent colors** defined in two places (`#1a73e8` in CSS,
   `#2563eb` in Tailwind) and **neither reliably applied** because of §3.
3. **`--color-text-secondary: #000000`** `[READ]` `index.css:22`. Applied to `p` in the
   base layer `[READ]` `index.css:73`. Any paragraph on a dark surface is black on
   black. The current pages dodge this by wrapping paragraphs in `text-white/70` etc.
   per-instance, but the base rule is a landmine: **any new paragraph that does not
   carry an explicit colour class will be invisible.**
4. **Accent is a generic corporate blue**, which is the "safe tech blue" default the
   brief asks to move away from.
5. **Section backgrounds alternate `bg-black` / `bg-white`** with no stated principle.
   `[READ]` Confirmed in every page file. This is the "different website mid-scroll"
   effect the brief's skill warns about.

### 5.3 Spacing & layout `[MEASURED]` / `[READ]`

- Container is `max-w-6xl` (1152px) `[READ]` `Container.jsx`. Measured content width at
  a 1920px viewport is therefore capped at 1152px, leaving ~380px of dead margin each
  side. For an "oversized editorial" direction this is too conservative.
- Section rhythm is inconsistent: `.section` is `py-12 sm:py-16 lg:py-20`,
  `.section-sm` is `[READ]` **defined twice with different values**
  (`index.css:80` and `index.css:220`) — the second silently wins. A genuine duplicate
  definition bug.
- Cards are used as the default container everywhere (§4.1), so vertical rhythm is
  driven by card padding rather than by type and space.

### 5.4 Motion `[MEASURED]`

```
elements with a CSS animation   3
elements with a transition      54
prefers-reduced-motion matches  false
prefers-reduced-motion honored  NO  (no media query exists in any stylesheet)
scroll-behavior                 smooth
```

**This is the most serious accessibility finding after the focus rings.**

- `html { scroll-behavior: smooth }` `[READ]` `index.css:34` — unconditional, not gated
  behind `prefers-reduced-motion`.
- `.pulse-glow` runs an **infinite** 2s animation on 5 CTAs `[READ]`.
- `.float` runs an infinite 3s transform animation on the hero portrait `[READ]`.
- `animate-bounce-slow` on NotFound references **a class that does not exist**
  — `[MEASURED]` 0 occurrences in the built CSS.
- `animate-in fade-in zoom-in` on BackToTop `[READ]` are **Tailwind-`animate-in`
  utilities from `tailwindcss-animate`, which is not installed** — `[MEASURED]`
  0 occurrences in the built CSS. The BackToTop button's entrance animation never runs.
- `docs/color-scheme-update.md` documents these as working features. They are not.

### 5.5 Visual hierarchy `[READ]` / `[MEASURED]`

- **Every section on every page opens with a centred `h2` plus a centred paragraph.**
  `Home`, `Services`, `About`, `Contact`, `Portfolio`. There is no single left-aligned
  editorial header anywhere. This is the flattest possible hierarchy.
- **Everything is centred.** Hero text, section headers, CTA panels, card interiors,
  footer. Centred-by-default is the assembled-template signature.
- The hero's `h1` is the only large type on the site; every other heading is
  `text-3xl sm:text-4xl`.

---

## 6. Responsive audit `[MEASURED]`

Measured at four viewports with `documentElement.scrollWidth` vs `clientWidth`:

| Viewport | scrollWidth | clientWidth | Horizontal overflow | Header height |
|---|---|---|---|---|
| 375 × 812 | 360 | 360 | **none** | 69px |
| 768 × 1024 | 753 | 753 | **none** | 69px |
| 1440 × 900 | 1425 | 1425 | **none** | 69px |
| 1920 × 1080 | 1905 | 1905 | **none** | 69px |

**Good news:** no horizontal scrolling, no overflowing elements at any tested width,
and header height is a comfortable 69px. The `min-w-0` / `break-words` discipline on
project cards in `Portfolio.jsx` is doing real work and should be preserved.

**Risks to re-check after the redesign:**

1. The hero is a two-column `lg:grid-cols-2` with a `min-h-[500px]` portrait block
   `[READ]` `Home.jsx:98`. At 768px it stacks, and the portrait becomes a 500px-tall
   empty-ish block above the fold. Verified the page height jumps from 3002px (desktop)
   to **5061px (mobile)** — the mobile page is 68% longer than desktop, which is a
   symptom of stacked large blocks rather than a mobile-first composition.
2. `text-4xl` (36px) `h1` on mobile with a four-line headline will occupy most of the
   first viewport once the 69px header is subtracted.
3. Contact form `input`/`textarea` have no `id` and no `htmlFor` `[MEASURED]` — 4
   fields with no programmatic label association (`honey`, `name`, `email`, `message`).
   The visual label text is present but not linked, so screen readers announce
   unlabelled edit fields.

---

## 7. SEO and accessibility

### 7.1 SEO `[MEASURED]` / `[READ]`

| Item | Status |
|---|---|
| One `h1` per page | **Correct** — verified 1 on every route |
| Unique `<title>` per route | Correct |
| `meta description` per route | Present via `Seo.jsx` |
| `canonical` | Present |
| Heading hierarchy | `h1` → `h2` → `h3`, no skips observed |
| `robots.txt` | Present, allows all, references sitemap |
| `sitemap.xml` | Present, 5 URLs, `lastmod` all `2026-02-05` |
| `lang` attribute | `en` |
| **OG image** | **Missing.** `[READ]` `Seo.jsx` has the `og:image` and `twitter:image` lines **commented out**, and `/images/og-image.png` does not exist. Every social share renders as a bare text card. |
| **JSON-LD** | Present but wrong type `[READ]` — `ProfessionalService` with `"image": ".../images/hero/profile.png"`. `ProfessionalService` expects a business with a physical address and service area; `"address"` is given only as `addressCountry: NG`. For an individual engineer, `Person` is the accurate type. |
| **`<html>` `lang` only** | Fine, but no `og:locale`, no `twitter:site`. |
| Structured data coverage | No `ItemList`, no `CreativeWork`, nothing describing the four projects. |
| Sitemap `lastmod` | Static and stale. |

### 7.2 Accessibility `[MEASURED]`

**Confirmed good:**

- No links or buttons without an accessible name (0 of each).
- Every `<img>` has a non-empty `alt`.
- Landmarks present: exactly one `header`, `main`, `footer`, `nav`.
- Headings not skipped.

**Confirmed defects:**

| # | Issue | Evidence | Severity |
|---|---|---|---|
| A1 | **No `prefers-reduced-motion` support at all** while infinite animations run | `[MEASURED]` no reduced-motion media query in any stylesheet; 3 elements animating, `scroll-behavior: smooth` unconditional | **P1** |
| A2 | **No visible focus ring on links** | `[MEASURED]` focused `header` link computes to `outline: none 2.67px rgb(255,255,255)`, `box-shadow: none`. Only `Button.jsx` has `focus:ring-2`, and that ring is `ring-offset` based on a white offset colour on a black page | **P1** |
| A3 | **Contact form inputs have no programmatic label** | `[MEASURED]` 4 fields, no `id`/`htmlFor` pair, no `aria-label` | **P1** |
| A4 | **Focus ring on form inputs is invisible** | `[READ]` inputs use `focus:ring-2 focus:ring-vibrant` and `outline-none`; `ring-vibrant` produces no CSS (§3) | **P1** |
| A5 | Content defaults to `opacity: 0` behind a JS observer | `[READ]` `Reveal.jsx`. If JS fails or a section never intersects, content is **permanently invisible**. Also leaves `will-change: transform` on all 5 wrappers. | **P1** |
| A6 | `--color-text-secondary: #000000` applied to all `p` | `[READ]` `index.css:22`, `index.css:73`. Latent black-on-black. | **P2** |
| A7 | `scroll-behavior: smooth` unconditional | `[READ]` `index.css:34` — vestibular trigger | **P2** |
| A8 | Decorative glow blobs are not `aria-hidden` | `[READ]` `NotFound.jsx:12` has `pointer-events-none` but no `aria-hidden` | **P3** |

**Contrast — measured, with a corrected method.** An early automated pass flagged 7
apparent failures. On inspection **all 7 were false positives** caused by my
background-resolution walker refusing any colour with alpha below 0.95, which skipped
the `rgba(255,255,255,0.95)` tech chips and the `bg-black/70` gallery counters. Verified
directly: the "React" chip computes to `color: rgb(0,0,0)` on
`background: rgba(255,255,255,0.95)`, which is approximately **15.6:1** — well past AAA.
The gallery counter is white on `rgba(0,0,0,0.70)` over a screenshot, approximately
**12:1**. **No verified contrast failures remain.** This is worth stating plainly because
the first number I produced was wrong.

---

## 8. Performance `[MEASURED]`

Local dev-server timings, so treat as *relative* evidence rather than field data:

```
DOMContentLoaded      986 ms
load                  996 ms
TTFB                   32 ms
first-paint          1020 ms
first-contentful-paint 1136 ms
font requests             2
DOM nodes               217
```

The 1.1s FCP is dominated by the **Google Fonts render-blocking `<link>`** and by
serving ~1.9 MB of uncompressed PNG screenshots. TTFB at 32ms is excellent.

### 8.1 Images — the largest real opportunity `[MEASURED]`

| File | Size | Intrinsic width |
|---|---|---|
| `public/images/hero/profile.png` | **787.5 KB** | 819 px |
| `public/logo.png` | **372.6 KB** | 4000 px |
| `public/projects/portfolio/home.png` | 279.8 KB | 1024 px |
| `public/projects/majeekhub/dashboard.png` | 227.1 KB | 1024 px |
| `public/projects/village-headmaster/home2.png` | 165.0 KB | 1024 px |
| `public/projects/village-headmaster/home1.png` | 159.3 KB | 1024 px |
| `public/projects/unitrade/dashboard3.png` | 146.7 KB | 1024 px |
| `public/projects/unitrade/dashboard2.png` | 129.9 KB | 1024 px |
| `public/projects/majeekhub/home2.png` | 121.6 KB | 1024 px |
| **Total `public/` payload** | **≈ 2.9 MB** | |

Specific problems:

1. **A 4000px-wide `logo.png` displayed at 36px** — 372 KB shipped to paint a favicon
   and a nav mark. That is roughly 110× more pixels than needed.
2. **A 787 KB hero PNG displayed at 819px wide**, uncropped, with a transparent
   background. PNG is the wrong format for a photograph.
3. **Project screenshots capped at 1024px** while being displayed in a `lg:grid-cols-2`
   column that can exceed 600px CSS pixels — so on a retina display they are upscaled
   and soft. At the same time the file sizes are large, so they are simultaneously
   **too big to download and too small to look sharp**. Both problems have the same
   fix: re-export at the right dimensions in a modern format.
4. **No `width`/`height` attributes** on `logo.png` or `profile.png` `[MEASURED]`
   (all other images sit inside `aspect-video` wrappers, which does reserve space).
   Missing intrinsic dimensions on the two above-the-fold images is a CLS risk.
5. **No `loading="lazy"`** anywhere `[MEASURED]` — all 5 images on Home load eagerly,
   including the three below-the-fold project screenshots.
6. **No `srcset` / `sizes` / `<picture>`** anywhere. One asset serves 375px phones and
   4K displays.

### 8.2 Rendering cost `[READ]`

- **5 `blur-3xl` / `blur-[100px]` layers** across the app (`Home.jsx` ×2, `About.jsx`,
  `NotFound.jsx`, plus `backdrop-blur-sm`/`backdrop-blur` in `Services`, `Navbar`,
  `Home`). Large blur radii are among the most expensive GPU operations on mobile.
- `backdrop-blur` on the Navbar mobile panel and on `Services` process cards forces a
  per-frame readback of what is behind the element.
- `.glass` applies `backdrop-filter: blur(10px)`.
- `will-change: transform` is applied by `Reveal.jsx` to **every** revealed wrapper and
  never removed, so all 5 stay promoted for the life of the page.

---

## 9. Content and functionality inventory

### 9.1 Content to preserve `[READ]`

`src/data/projects.js` holds four well-documented, genuinely detailed projects. This is
the most valuable asset in the repo and must not be degraded or invented around:

| # | Project | Type | Images | Demo |
|---|---|---|---|---|
| 1 | Estate Management Platform (Village Headmaster) | Client Project | 3 | vhm-estatemgt.netlify.app |
| 2 | Music Career Management Platform (MajeekHub) | SaaS Product | 3 | majeekhub.netlify.app |
| 3 | Crypto Exchange Platform (UniTrade) | Functional MVP | 5 | unitradeupdated.netlify.app |
| 4 | Majeek Media Portfolio Website | Personal Project | 1 | majeekmedia.com |

Each carries `features[]`, `role[]`, `tech[]`, `outcome`, and project 3 carries a
`note` disclosing that trading is simulated. **That disclosure is good practice and must
be preserved and made more prominent.**

### 9.2 Functionality to preserve `[READ]` / `[MEASURED]`

| Feature | Where | Notes |
|---|---|---|
| Contact form → EmailJS | `Contact.jsx` | 3 hard-coded IDs (service, template, public key). **Works.** Must not break. |
| Honeypot spam trap | `Contact.jsx` | `honey` field, silently fakes success. Good pattern, keep. |
| Email regex validation | `Contact.jsx` | `useMemo`-guarded. Keep. |
| Form states | `Contact.jsx` | `idle` / `sending` / `success` / `error`. Genuinely well done. |
| `sending` disabled state | `Contact.jsx` | Button disables and relabels. Keep. |
| SPA fallback | `public/_redirects` | `/* /index.html 200`. Required for Netlify deep links. |
| Scroll reset on navigation | `ScrollToTop.jsx` | Correct. |
| Back to top | `BackToTop.jsx` | Works but see §5.4 and §5.5 |
| Image gallery with arrows + thumbnails | `ImageGallery.jsx` | Keyboard-reachable buttons. Keep the behaviour, restyle. |
| Per-route SEO | `Seo.jsx` | Keep the component; extend it. |

### 9.3 Verified "not working" claims

`docs/color-scheme-update.md` and `docs/task.md` mark several items complete that are
demonstrably not: the accent colour system (§3), `animate-bounce-slow` (§5.4), the
BackToTop entrance animation (§5.4), and "SEO optimized" while the OG image is
commented out (§7.1). **The docs in `docs/` describe an intended state, not the
shipped state.** Do not treat them as evidence; treat them as a wish list.

---

## 10. Must not change

Per the brief's constraint to preserve existing working functionality:

**Will not change without explicit approval:**

1. **Route slugs**: `/`, `/about`, `/services`, `/portfolio`, `/contact`.
2. **Primary nav labels**: Home, About, Services, Portfolio, Contact.
3. **EmailJS configuration**: `service_nsb8gq9`, `template_iv95phv`, public key
   `L2gBGUmcgMb6baZiH`. Hard-coded today; I will move them to environment variables
   with working defaults so nothing breaks, and flag it rather than silently change it.
4. **`public/_redirects`** and `netlify.toml` publish settings.
5. **Contact form field names**: `name`, `email`, `message` — these map to the EmailJS
   template variables `from_name`, `user_email`, `message`. Renaming them breaks email
   delivery.
6. **All four projects' factual data** — titles, tech, features, roles, demo URLs.
7. **The simulated-trading disclosure** on project 3.
8. **Social URLs** and `contact@majeekmedia.com`.
9. **`robots.txt` and `sitemap.xml`** structure (extended, not replaced).

**Will be removed** (dead code, approved implicitly by the brief's "clean component
architecture" requirement — flagging explicitly so it is a decision, not an accident):

- `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/assets/react.svg`,
  `public/vite.svg` — the unreachable Vite scaffold.

---

## 11. Prioritised findings

### P0 — blocking

None. The site is live and functional.

### P1 — fix before release

| # | Finding | File | Command |
|---|---|---|---|
| P1-1 | 92 references to a non-existent `vibrant` colour token; accent borders, tints, hover states and rings silently produce no CSS | all of `src/` | `$impeccable colorize` then `$impeccable document` |
| P1-2 | No `prefers-reduced-motion` support while infinite animations and smooth scroll run | `index.css`, `Reveal.jsx` | `$impeccable animate` |
| P1-3 | No visible focus ring on links or on form inputs | `Button.jsx`, `Contact.jsx`, `Navbar.jsx` | `$impeccable harden` |
| P1-4 | Contact inputs have no programmatic labels | `Contact.jsx` | `$impeccable harden` |
| P1-5 | Content defaults to `opacity: 0` behind an observer (invisible if JS fails) | `Reveal.jsx` | `$impeccable animate` |
| P1-6 | 2.9 MB of images; 787 KB hero, 4000px logo at 36px; no lazy loading, no dimensions on above-fold images | `public/` | `$impeccable optimize` |
| P1-7 | OG image commented out; social shares have no card | `Seo.jsx` | `$impeccable document` |
| P1-8 | Six different labels for one "contact" intent | 5 page files | `$impeccable clarify` |

### P2 — next pass

| # | Finding | Command |
|---|---|---|
| P2-1 | `bg-black` / `bg-white` section alternation with no principle — breaks theme lock | `$impeccable layout` |
| P2-2 | `--color-text-secondary: #000000` applied to all `p` — latent invisible text | `$impeccable colorize` |
| P2-3 | Inter loaded from Google Fonts via `<link>`; single type register | `$impeccable typeset` |
| P2-4 | Every section opens with a centred `h2` + centred paragraph; no editorial hierarchy | `$impeccable layout` |
| P2-5 | Two conflicting accent colours in two token systems | `$impeccable colorize` |
| P2-6 | Duplicate `.section-sm` rule; unused `.text-gradient`, `ThemeToggle`, `useTheme`, `hooks/` | `$impeccable distill` |
| P2-7 | Six emoji / dead-animation / template leftovers | `$impeccable distill` |
| P2-8 | 24 npm vulnerabilities in the toolchain | — (terminal) |

### P3 — polish

| # | Finding | Command |
|---|---|---|
| P3-1 | Undisclosed dead animations (`animate-bounce-slow`, `animate-in`) | `$impeccable animate` |
| P3-2 | Decorative blobs missing `aria-hidden` | `$impeccable harden` |
| P3-3 | 5 `blur-3xl` layers; permanent `will-change: transform` | `$impeccable optimize` |
| P3-4 | `max-w-6xl` container too narrow for an oversized editorial direction | `$impeccable layout` |
| P3-5 | Unreachable Vite scaffold files | — |
| P3-6 | `ProfessionalService` JSON-LD is the wrong schema type for an individual | `$impeccable document` |
| P3-7 | Sitemap `lastmod` stale | — |
| P3-8 | Unverifiable invented metrics (`100% Client Satisfaction`, `70% reduction`) | `$impeccable clarify` |

---

## 12. Positive findings — preserve these

Stated explicitly so the redesign does not lose them:

1. **No horizontal overflow at any tested viewport.** 375 / 768 / 1440 / 1920 all clean.
2. **Zero unlabelled interactive elements.** Every link and button has an accessible name.
3. **Every image has real `alt` text.**
4. **Correct landmark structure** and exactly one `h1` per route.
5. **The `min-w-0` + `break-words` discipline** on project cards genuinely prevents
   long-string overflow. Keep it.
6. **The contact form's full state machine** (`idle`/`sending`/`success`/`error` plus a
   honeypot) is better than most production contact forms. Preserve the logic exactly.
7. **`src/data/projects.js` is genuinely well documented** — features, role, tech,
   outcome and an honesty note about simulated trading. The redesign should present this
   material better, not replace it.
8. **Clean, fast build.** 33s build, 5.4 KB gzip CSS, no warnings from Vite.
9. **TTFB 32ms locally** — the hosting path is not a problem.
10. **`react-helmet-async` and `Seo.jsx` already exist** — the SEO work is extension, not
    greenfield.

---

## 13. Design read for the redesign

Per the brief's required skills, declared before generating anything:

> **Reading this as:** a solo software engineer's portfolio for technical hiring
> managers and startup founders, with a `High-End Digital Brutalism × Kinetic Poster ×
> Swiss Editorial` language, leaning toward native CSS + Tailwind with an oversized
> variable display face, a committed single accent, numbered editorial project spreads,
> and CSS/`Motion`-class motion rather than a heavy animation dependency.

**Dials** (from the brief, which pins them):

| Dial | Value | Rationale |
|---|---|---|
| `DESIGN_VARIANCE` | **9** | Brief asks for asymmetric, poster-like, "not assembled". Current site is a 2/10. |
| `MOTION_INTENSITY` | **6** | Brief asks for kinetic reveals but explicitly forbids scroll hijacking and heavy dependencies. |
| `VISUAL_DENSITY` | **3** | Gallery-like. The brief prioritises "intentional whitespace" and large editorial showcases over packing. |

**Design system chosen:** none. This is an aesthetic, not a system (brief's §2.B
"Brutalism" / "Editorial" / "Kinetic typography" row). Build with native CSS +
Tailwind v3 (already present) and no component library. No design-system package should
be installed — that would work against the "distinctive, not templated" goal.

---

## 14. Recommended next actions

In the order the brief specifies. Do not skip ahead.

1. **`$impeccable plan`** — turn this audit into `REDESIGN_PLAN.md`.
2. **`$impeccable shape`** — define the homepage composition and project-spread
   structure before writing components.
3. **`$impeccable typeset`** — choose and self-host the display + mono + text faces.
   Biggest visual lift for the least risk.
4. **`$impeccable colorize`** — commit the palette as real tokens and delete the
   `vibrant`/`accent` split.
5. **`$impeccable layout`** — container, grid, section rhythm, hierarchy.
6. **`$impeccable distill`** — remove the scaffold, dead animations, dead hooks, emoji.
7. **`$impeccable animate`** — the kinetic system, with reduced-motion from the start.
8. **`$impeccable harden`** — focus, labels, error states, reduced motion.
9. **`$impeccable optimize`** — re-export and lazy-load the images.
10. **`$impeccable polish`** — final pass, then re-run this audit.

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run the audit after the fixes to see the score move from **9/20**.
