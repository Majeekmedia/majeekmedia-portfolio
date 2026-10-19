# REDESIGN_PLAN.md

**Majeek Media — portfolio redesign**
Derived from `PORTFOLIO_AUDIT.md` (score 9/20) and `CONTENT_GAPS.md`
Direction: High-End Digital Brutalism × Kinetic Poster × Swiss Editorial
Mode: **Redesign — Overhaul.** New visual language, preserved content, function and IA.

> **STATUS: this plan has been executed.** All ten phases are complete and measured.
> Results are in `IMPLEMENTATION_LOG.md` and `QA_REPORT.md`. Where reality diverged from
> this plan, the divergence is recorded in the log rather than quietly edited out here.
> Audit score moved **9/20 → 18/20**.

---

## 1. The three things this redesign must fix

Everything else is craft. These are the jobs.

**1. The site must stop looking assembled.**
`[MEASURED]` Every page alternates `bg-black` / `bg-white` sections, centres every
section header, and groups content into rounded cards. That arrangement is the template
signature, and no amount of surface polish removes it. The fix is structural: one colour
field for the whole page, an asymmetric grid, rules instead of cards, and editorial
project spreads instead of a card grid.

**2. The accent styling must actually work.**
`[MEASURED]` **92 source references to a `vibrant` colour token that does not exist in
`tailwind.config.cjs`.** Confirmed against the built CSS: `bg-vibrant` → 0 occurrences,
`border-vibrant` → 0, `hover:bg-vibrant` → 0, `ring-vibrant` → 0. Accent borders,
tinted panels, all hover states and all focus rings on the contact form currently
produce no CSS at all. This is a real user-visible bug, not a preference, and it means
**what you see today is not the design anyone intended.**

**3. The site must say what you build.**
`CODING WITH A PASSION, CREATING WITH PURPOSE` describes an attitude. The brief's
positioning is `Software Engineer | Full-Stack Developer | SaaS Builder` who ships
complete products. The hero becomes `I BUILD DIGITAL PRODUCTS.` and everything below it
proves the claim with work rather than restating it.

---

## 2. Preservation contract

Fixed before any code is written. These do not change.

| Preserved | Detail |
|---|---|
| **Route slugs** | `/`, `/about`, `/services`, `/portfolio`, `/contact` |
| **Nav labels** | Home, About, Services, Portfolio, Contact |
| **Form field names** | `name`, `email`, `message` — these map to the EmailJS template variables `from_name`, `user_email`, `message`. Renaming breaks email delivery. |
| **EmailJS config** | `service_nsb8gq9` / `template_iv95phv` / key `L2gBGUmcgMb6baZiH`, moved to env vars with working defaults |
| **Honeypot spam trap** | The `honey` field and its fake-success behaviour |
| **Contact form states** | `idle` / `sending` / `success` / `error` and the disabled-sending button |
| **All four projects' data** | Titles, tech, features, roles, demo URLs |
| **Simulated-trading disclosure** | Project 3's `note` — made *more* prominent, not less |
| **`public/_redirects`** | `/* /index.html 200` SPA fallback |
| **`netlify.toml`** | Build command and publish dir |
| **Social URLs, `contact@majeekmedia.com`** | Unchanged |
| **`robots.txt`, `sitemap.xml`** | Extended, not replaced |
| **`min-w-0` / `break-words` discipline** | It is measurably preventing overflow. Keep it. |
| **ImageGallery behaviour** | Keep arrows + thumbnails + keyboard reachability; restyle |

**Deleted** (unreachable Vite scaffold — flagged as a decision, not an accident):
`src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/assets/react.svg`, `public/vite.svg`.

**Not deployed.** All work stays local until you approve.

---

## 3. Decisions required before Phase 4

From `CONTENT_GAPS.md`. Only two actually block progress:

| # | Decision | Blocks | Fallback if unanswered |
|---|---|---|---|
| **D1** | Mobile section: capability-only, or placeholders for real projects? | The Phase 6 showcase | Build capability-only. Honest, and ready to upgrade. |
| **D2** | Unverifiable metrics: source, remove, or label as client-reported? | About + 4 project write-ups | Label as *client-reported*. Never presented as verified. |
| **D3** | Portfolio-website project: full spread or footer note? | Home + Portfolio composition | Small footer note. It is not an engineering showcase next to the other three. |
| **D4** | Can you supply a 1200×630 OG image, a higher-res portrait, a vector logo and re-captured screenshots? | Asset quality only | Build to the existing assets' limits and record the constraint in `QA_REPORT.md`. |

**None of these block Phase 1–3 or the web-project work.** I will start immediately and
use the fallbacks above unless you say otherwise.

---

## 4. Phases

### Phase 0 — Foundation
- Delete the unreachable Vite scaffold.
- `npm audit fix`, refresh Browserslist.
- Move EmailJS keys to `VITE_*` env vars with the current values as defaults, so
  nothing breaks if the env file is absent.

**Exit:** build passes, app behaves identically.

---

### Phase 1 — Design tokens and type
- Replace the whole token layer in `index.css` with the `--mm-*` tokens in
  `DESIGN_SYSTEM.md` §8.
- Delete `bg-vibrant` / `border-vibrant` / `hover:bg-vibrant` / `ring-vibrant` /
  `from-vibrant` etc. across all 12 files, and the `accent.50/600/700` Tailwind scale.
- Self-host Archivo (variable) and JetBrains Mono. Remove the Google Fonts `<link>`.
- Extend `tailwind.config.cjs` to read the tokens (`bg`, `surface`, `line`, `text`,
  `muted`, `accent`, `radius`, `section`).
- Add the reduced-motion block **now**, not later.

**Exit:** `docs/qa/contrast.mjs` passes with 0 failures; `node -e` grep confirms zero
remaining `vibrant` references; font requests are same-origin.

---

### Phase 2 — Primitives
Rebuild `Container` (1600px), `Button`, `Reveal` (visible by default), `Rule`,
`SectionIndex`, `Plate`, plus a `useReducedMotion` hook.

**Exit:** each primitive renders correctly in isolation; `Reveal` is visible with JS
disabled; focus rings are visible on a real Tab press.

---

### Phase 3 — System chrome
`Navbar` (≤72px, single line at desktop, accent underline on active and hover, sticky
with a height transition only) and `Footer` (structural, indexed, no "Built for
performance" filler). `ScrollToTop` and `BackToTop` rebuilt with a visible focus ring.

**Exit:** no layout shift on scroll; Tab order is logical; every focus ring visible.

---

### Phase 4 — Homepage
The nine-section journey from the brief, rebuilt as an editorial sequence. Section
layouts are drawn from **five different families** so no two sections repeat:

| # | Section | Layout family |
|---|---|---|
| 01 | Hero | Asymmetric split, type bleeding past the container edge |
| 02 | Selected projects | Full-bleed plates, alternating offset |
| 03 | Web development | Two-column offset list with rules |
| 04 | Mobile app development | Device-mockup row, or capability statement (per D1) |
| 05 | SaaS products | Sticky-stack, three plates |
| 06 | Engineering expertise | Indexed capability list, mono metadata, no cards |
| 07 | Development process | Numbered vertical sequence with a drawn rule |
| 08 | About | Portrait plate offset against a type column |
| 09 | Contact | Accent field — the one full-colour region on the page |

**Eyebrow budget:** max 3 across the whole page (9 sections ÷ 3). Hero counts as one.
Mechanically checked before shipping.

**Marquee:** one, maximum, in the expertise section.

**Exit:** hero fits one viewport with the primary action visible; headline ≤ 2 lines at
desktop; subtext ≤ 20 words; the reduced-motion pass shows everything present.

---

### Phase 5 — Project presentation
`ProjectSpread` replaces `ProjectCard` + `ImageGallery`. Each of the four web projects
becomes a numbered editorial spread: large plate, accent index numeral, mono metadata
row, description, role, tech, and a challenge/solution block where you have supplied one
(`CONTENT_GAPS.md` §4). Completed / active / in-progress is stated explicitly per the
brief. Placeholders are visually obvious and listed for replacement.

**Exit:** every claim traces to `projects.js`; no invented metric, client or screenshot.

---

### Phase 6 — Mobile showcase
Per **D1**. Capability-only by default, with the placeholder markup ready.

---

### Phase 7 — Remaining pages
`About`, `Services`, `Contact`, `NotFound` rebuilt in the system. Contact keeps its
entire logic and gains real labels, a visible accent focus ring, and inline error text.
404 gets the accent field and no glow blob.

---

### Phase 8 — Motion
The seven moments in `DESIGN_SYSTEM.md` §7. CSS plus `IntersectionObserver`. No library
added. Every gesture has a stated communicative job; anything that cannot be justified
in one sentence is dropped.

**Exit:** `transform`/`opacity` only; zero `window.addEventListener('scroll')`;
`prefers-reduced-motion` verified by emulation.

---

### Phase 9 — Performance and SEO
- Re-export images: WebP, `.png` kept only as a fallback where useful. Target: hero
  under 120 KB (from 787 KB), logo under 10 KB (from 372 KB at 4000px).
- `srcset` + `sizes` on every plate. `loading="lazy"` below the fold.
  Explicit `width`/`height` on all of them.
- Preload the hero plate. Self-hosted fonts with `font-display: swap`.
- Extend `Seo.jsx`: OG image, `twitter:site`, correct schema.
- Change JSON-LD from `ProfessionalService` to `Person` + `WebSite`, and add an
  `ItemList` for the projects.
- Refresh `sitemap.xml` `lastmod`.

**Exit:** measured transfer sizes recorded in `QA_REPORT.md`, with before/after.

---

### Phase 10 — QA and documentation
Test at **375 / 768 / 1440 / 1920**. Measure contrast, overflow, focus, tab order,
reduced motion, console errors, build. Capture before/after with
`docs/qa/capture.mjs`. Write `IMPLEMENTATION_LOG.md` and `QA_REPORT.md`.

**Exit:** final audit score, with the actual number reported whether or not it improved.

---

## 5. Order of work, and why

```
Phase 0  scaffold cleanup      ─┐
Phase 1  tokens + type         ─┤ no visual output, unblocks everything
Phase 2  primitives            ─┘
Phase 3  navbar + footer       ─┐
Phase 4  homepage              ─┤ visible progress, fastest feedback
Phase 5  project spreads       ─┘
Phase 6  mobile (per D1)        ──  needs D1
Phase 7  remaining pages
Phase 8  motion                 ──  after layout is settled, so nothing re-animates
Phase 9  performance + SEO
Phase 10 QA + docs
```

Typography first because it is the largest visual return per unit of risk, and because
every later decision is measured against it. Motion after layout, because animating a
layout that then changes means animating it twice.

---

## 6. Honest risks

| Risk | Mitigation |
|---|---|
| **Abandoning card/white-section structure is the biggest change** and may feel unfamiliar | Structure is what makes it read as designed. Rules and space replace cards; the page never inverts. |
| **The accent could overwhelm** | Committed at the region scale, capped at one accent field per page, four sanctioned roles in `DESIGN_SYSTEM.md` §2. |
| **Display type can overflow** | Fluid `clamp()` with `overflow: hidden` on the bleed containers, plus the mechanical overflow check at four viewports. |
| **Only 1024px screenshots** means plates may still look soft on retina | Flagged in `CONTENT_GAPS.md` §3 as D4. Held to a max display width of 1024 CSS px until you supply better. |
| **No mobile content** | D1. Never invented. |
| **Six contact CTAs currently** — consolidating to one changes muscle memory | Consolidation is a stated fix (P1-8), and route slugs are untouched. |
| **Self-hosting fonts adds ~2 files to the repo** | Removes a render-blocking third-party request and is required for the typographic direction. Trade is documented. |

---

## 7. Definition of done

- [ ] Zero references to a non-existent colour token.
- [ ] `docs/qa/contrast.mjs` reports 0 text failures.
- [ ] Every interactive element has a visible focus ring, verified by real Tab presses.
- [ ] `prefers-reduced-motion` verified by emulation, not by reading the CSS.
- [ ] No horizontal overflow at 375 / 768 / 1440 / 1920.
- [ ] Zero console errors or warnings in the production build.
- [ ] Hero fits one viewport with its primary action visible.
- [ ] One label per call-to-action intent across the whole site.
- [ ] Total image payload under 1 MB, from 2.9 MB, measured.
- [ ] No unverifiable claim presented as verified data.
- [ ] No invented project, client, screenshot, metric or store link.
- [ ] `IMPLEMENTATION_LOG.md` and `QA_REPORT.md` written with real measurements.
- [ ] Not deployed.
