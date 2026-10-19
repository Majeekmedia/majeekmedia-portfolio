# IMPLEMENTATION_LOG.md

**Majeek Media — portfolio redesign**
Working period: 2026-10-16 · Mode: Redesign (Overhaul)
Everything below was executed and measured. Nothing is projected.

---

## Phase 0 — Foundation

**Deleted the unreachable Vite scaffold.** The repo contained two parallel entry points:
`index.html` loaded `main.jsx` → `App.jsx` (the real app), while `main.tsx` → `App.tsx`
(the untouched "Vite + React" counter demo) plus `App.css` and `assets/react.svg` were
never reached at runtime.

Removed: `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/assets/react.svg`,
`public/vite.svg`, `src/assets/`.

**Removed the dead theme layer.** `ThemeToggle.jsx` and `hooks/useTheme.js` existed but
were never imported, while `tailwind.config.cjs` declared `darkMode: "class"` and nothing
ever added the class. Removed both; the site is deliberately single-theme and now says so.

**Fixed the build script.** `"build": "tsc -b && vite build"` — but after deleting the
unreferenced TypeScript scaffold the project contained **zero** `.ts` files, so `tsc`
failed with `TS18003: No inputs were found`. The app has always been JavaScript with a
TypeScript toolchain bolted on. Changed to `"build": "vite build"` and removed
`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.

**Consequence, stated plainly:** the brief asks for "strong TypeScript practices where
applicable". The codebase is JavaScript and had a TypeScript config that compiled nothing.
Rather than convert a working six-page app to TypeScript mid-redesign (a large, risky
change the brief explicitly warns against with "do not rewrite the entire project merely
for aesthetics"), the dead toolchain was removed and the true state recorded. **Converting
to TypeScript is available as a follow-up, and would be its own project.**

---

## Phase 1 — Design tokens and typography

**Replaced the entire token layer** with the `--mm-*` system. This simultaneously fixed
the audit's P1-1: **92 references to a `vibrant` colour token that did not exist in
`tailwind.config.cjs`**, so accent borders, tinted panels, all hover states and the contact
form focus rings produced no CSS whatsoever.

**Self-hosted the fonts.** Added `@fontsource-variable/archivo` and
`@fontsource/jetbrains-mono`. Two import lines in `index.css`, and the render-blocking
Google Fonts `<link>` is gone from `index.html`.

**Measured the font trade-off rather than guessing.** Fontsource ships a weight-only
Archivo at **34 KB** latin and a weight+width variant at **88 KB**. The width axis was
**rejected**: 54 extra KB for two display moments is not repayable. Weight 100–900 carries
the contrast instead.

**Added the reduced-motion block in Phase 1, not Phase 8.** Retrofitting accessibility is
how it ends up missing.

**Verified:** `docs/qa/contrast.mjs` reports **0 text failures** across 10 token pairs, and
the standalone Tailwind compile confirms `--mm-*`, both `@font-face` families, and the
reduced-motion block all reach the output.

---

## Phase 2 — Primitives

`Reveal`, `Container`, `Button`, `Rule`, `SectionIndex`, `Plate`, `SkipLink`,
`useReducedMotion`.

**`Reveal` was the important one.** The audit's A5 finding: the old version rendered
`opacity: 0` immediately and relied on a later IntersectionObserver callback, so **content
was permanently invisible if JS failed or an observer never fired**. This also blanked
full-page screenshots, which is how it was discovered.

The rewrite inverts the default. Content renders **visible**, and the entrance state is
only armed inside `useEffect` after confirming the element is off-screen *and* motion is
permitted. Reduced motion therefore takes the **simpler** code path rather than an
override.

**Verified** after the fact, because this is exactly the kind of thing that silently
regresses:

```
scroll position   armed   visible
y=0                 13        0     <- nothing on screen, nothing hidden
y=600               13        1
y=1800              13        6
y=5700              13       13     <- all revealed
```

And with the user flicking straight to the bottom: `armed 13, visible 13, hidden-in-
viewport 0`.

---

## Phase 3 — Chrome

**Navbar:** 72px desktop / 60px mobile, shrinking to 64px on scroll. The old header was a
flat 69px with no state. Scroll state is driven by an **IntersectionObserver on a sentinel
element, not a `window.scroll` listener**, which the brief bans.

**Footer:** the old footer was one line reading `© 2026 Majeek Media · Built for
performance` plus four social icons. Replaced with a real index: contact, pages, builds,
elsewhere. "Built for performance" was padding; it said nothing a visitor needs and used
the only structural slot a footer has.

**BackToTop** was rebuilt twice over. The old version used the banned
`window.addEventListener('scroll')`, and its `animate-in fade-in zoom-in` classes came from
`tailwindcss-animate`, **which is not installed**, so the entrance animation never ran.

**Added `SkipLink`.** The old site had none.

---

## Phase 4 — Homepage

Six sections: hero, capability marquee, selected work, expertise, mobile, process, about,
contact.

**The hero is where the brief's constraints were enforced literally:**

| Constraint | Result `[MEASURED]` |
|---|---|
| Headline max 2 lines desktop | **2** |
| Subtext under 20 words | **18** |
| Primary action visible without scroll | **yes**, CTA bottom at 399px in an 812px viewport |
| Max 4 text elements | 3: heading, subtext, actions |
| Top padding capped | `pt-12 md:pt-20` |
| No eyebrow, no tagline under CTA, no trust strip | Confirmed |

**Copy rewritten.** `CODING WITH A PASSION, CREATING WITH PURPOSE` became
`I build / digital products.` — the brief's own recommended direction.

**Six contact CTA labels collapsed to one.** The incumbent shipped `Start a Project`,
`Get In Touch`, `Get in Touch`, `Let's Work Together`, `Let's Build Something Great` and
`Read More About Me`. There is now one label, *Get in touch*, in the nav, hero and footer.

**Section rhythm tightened after measuring.** The first build produced a 6,473px homepage.
`--mm-section` was reduced from `clamp(6rem,12vw,10rem)` to `clamp(4.5rem,9vw,8rem)`,
giving 5,921px at desktop — a 9% reduction with no loss of breathing room.

### A mistake made and corrected here

I first added section index numerals (`01`–`05`) above every section heading. Then
measured the output and realised they **collided with the project numbering**, printing
`A, B, 01, 02, 03, 04, 05` in one page. Worse, the craft-floor guidance explicitly bans
section-number eyebrows.

Both were removed. Numbering now exists in exactly one place: the project spreads, where
`01` and `02` identify real referable work. Recorded in `DESIGN_SYSTEM.md` §7 so it does
not get reintroduced.

---

## Phase 5 — Project presentation

`ProjectSpread` replaces `ProjectCard` + `ImageGallery`. Each project is a numbered
editorial spread: plate, gallery strip, description, problem, role, stack, outcome, and a
rule-separated feature list.

**The honesty machinery is the real work here:**

- `outcomeIsReported: true` renders client-reported figures with an explicit
  *"Reported by the client. Not independently measured."* qualifier. This is decision **D2**.
- `challenge` and `solution` render **only** when the owner has supplied them. Both are
  currently `null` and nothing is invented to fill the slots.
- A `null` link renders nothing, so no dead links exist.
- The status mark distinguishes completed / active / in-progress, as the brief requires.
- The crypto project's simulated-trading disclosure is **more** prominent than before,
  moved into an accent-marked block rather than a footnote.

**Curation applied (D3):** MajeekHub and the Portfolio Website were removed. The removals
are recorded in `data/projects.js` as `removedProjects` and rendered as a short "No longer
listed" note, so a curation decision does not look like data loss.

---

## Phase 6 — Mobile

**No mobile project data exists in this repo**, and the owner is supplying Expo repos
separately (D1). Nothing was invented.

The section renders an honest capability statement: what is built with React Native and
Expo, and five concrete specifics (shared logic, token storage, offline handling, native
modules, store submission). `data/projects.js` exports `mobileProjects` as a filtered list,
so **adding one real mobile project makes the full showcase render with no code change**.

---

## Phases 7–9 — Remaining pages, motion, performance

**Contact** preserves its entire working logic (field names, honeypot, four-state machine,
disabled-while-sending) and fixes three audit findings:

- **P1-4:** four inputs had **no programmatic label**. Now every field has an `id` and a
  matching `htmlFor`; the honeypot is removed from the accessibility tree entirely rather
  than merely visually hidden. Verified: all three labels resolve.
- **P1-3 / A4:** the focus ring used `ring-vibrant`, which resolved to no CSS, so keyboard
  users had no focus indicator on the form. Now a real 2px accent ring, measured live as
  `rgb(198, 255, 57) 0px 0px 0px 2px`.
- Errors are now **per-field** with `aria-invalid` and `aria-describedby`, announced in a
  live region, and focus moves to the first invalid field. Verified by submitting empty:
  three fields marked invalid, each with its own resolved error text, focus on
  `contact-name`.

**Image pipeline.** `docs/qa/optimize-images.mjs` produces WebP derivatives and writes
`src/lib/image-manifest.json`.

### Two mistakes made and corrected here

1. **Duplicate width plans.** The widths were hard-coded in the helper *and* the script,
   and the helper defaulted the largest candidate to 1024. The hero portrait only has 480
   and 819 derivatives, so **every hero request 404'd**. Fixed by making the script emit a
   manifest that the helper reads, so the plan exists in exactly one place and a component
   cannot request a width that was never produced.

2. **The optimization made the deploy bigger.** Keeping the 2.9 MB of source PNGs in
   `public/` meant `dist/` shipped **both** originals and derivatives: **4.3 MB**, versus
   2.9 MB before. Fixed by moving sources to `assets-source/` (still in the repo, so the
   script is re-runnable) and deploying only `public/optimized/`.

**Result `[MEASURED]`: 2,866 KB of sources → 382 KB of derivatives, an 87% reduction.**
Deploy payload **966 KB**, down from 2.9 MB.

**SEO.** Wired up `og:image` and `twitter:image`, which the audit found **commented out**
with a file that did not exist, meaning every social share rendered as bare text. Changed
the JSON-LD from `ProfessionalService` to `Person` with `knowsAbout`, since
`ProfessionalService` describes a business with a physical address, not an individual
engineer. Refreshed the sitemap `lastmod`.

---

## Later revision — project pages, blue palette, real project data

Added after the first review round, once the owner supplied the real product
screenshots and the VHM README.

### 1. Every project now has its own page

`/portfolio` used to render all four projects' **full spreads inline**: summary,
problem, challenge, solution, role, stack, outcome, note and a fourteen-item feature
list, four times over. That was roughly **6,000px of scrolling before the second
project appeared**, which makes a page useless as an index.

And it had a straight bug: the page filtered to `discipline === "web"`
(`Portfolio.jsx:20`), so **neither mobile app appeared on the work page at all**.

Now:

| Route | Renders |
|---|---|
| `/portfolio` | An index. One row per project: lead image, name, category, one-sentence excerpt, link. **2,796px**, down from ~6,000px. |
| `/portfolio/:slug` | The full spread for one project. |

Four new URLs, each with its own `<title>`, description and canonical, so a project
is linkable on its own and indexable separately. There is also prev/next navigation
so reading continues instead of dead-ending, and an unknown slug renders a real
not-found state rather than an empty shell.

### 2. A missing `h1` on project pages

Caught while verifying the new routes. `ProjectSpread` rendered the project title
as an `h3`, so on `/portfolio/:slug` — where that title IS the page title — the page
had **no `h1` at all**. The `h1` is what names a document for screen readers and
search engines, so this was a genuine defect rather than a style choice.

The heading level is now a prop: `h1` on a detail page, `h2` when the spread sits
inside a page that already has its own `h1`. Sub-headings derive from it, so heading
order cannot skip. Verified across all ten routes: exactly one `h1` each, zero skips.

### 3. Blue palette
The brand blue is `#2470f0`, extracted programmatically from the logo rather than
eyeballed. It is a deep saturated blue: excellent as a button fill, but as small
text on a near-black ground it measures **4.19:1** and fails AA. So the roles are
split: the brand blue owns fills, a brighter `#6ba4fa` owns accent text at **7.49:1**
(AAA). The control-border token was also separated out after the ghost-button border
measured 1.89:1 against the 3:1 that WCAG 1.4.11 requires.

### 4. Real project data
The VHM README replaced the previous thin entry. It is a far more substantial
product than the portfolio was showing: six role portals, a three-tier property
hierarchy, Paystack split payments with dual receiver wallets, RLS on every table.
The identity-versus-authorisation split (`profiles` for identity, `memberships` for
authorisation context, `resident_relationships` for household) is the strongest
engineering content on the site.

Both Expo apps were added from their own READMEs, using the genuinely interesting
material: the weather app's two providers disagreeing about what a forecast is, and
the notes app's debounced-autosave flush and storage-key migration decision.
**13 screenshots were fetched from the repos** rather than captured by tooling.

### 5. Motion, kept minimal
Three effects only, per the owner's instruction. See `DESIGN_SYSTEM.md` §9 for the
scroll-driven-animation failure that had to be worked around, and why the parallax
was dropped rather than fixed.

---

## Phase 10 — QA

Full results in `QA_REPORT.md`. A QA harness was written at `docs/qa/`:

| File | Purpose |
|---|---|
| `capture.mjs` | Screenshot harness that settles entrance animations before capturing |
| `contrast.mjs` | Palette contrast verification, runnable |
| `optimize-images.mjs` | Image pipeline and manifest generator |
| `solve-muted.mjs` | Solved the muted-text contrast failure |

---

## Decisions I made and would flag

1. **JavaScript, not TypeScript.** Explained above. The dead TS config was removed rather
   than the app converted.
2. **Tailwind v3 kept.** Migrating to v4 mid-redesign risks the working build and
   `_redirects` for no visual gain.
3. **No animation library.** GSAP and Motion were both considered and deliberately not
   added; at intensity 6, CSS plus `IntersectionObserver` covers every gesture for 0 KB.
4. **Sources moved out of `public/`.** A structural change to where assets live, made
   because the alternative shipped 4.3 MB. Documented in `DESIGN_SYSTEM.md` §10.
5. **EmailJS keys moved to `VITE_*` env vars with the current values as defaults.** Nothing
   breaks whether or not an `.env` exists, and the keys can be rotated without a code edit.
   The original hard-coded values are still the fallback.
6. **Removed-project note rendered on `/portfolio`.** A judgement call that documenting the
   curation is better than projects silently vanishing.
7. **Zero eyebrows.** The cap is one per three sections; using none is the cleanest way to
   satisfy it.

---

## Not done, and why

| Item | Why |
|---|---|
| Mobile case studies | No mobile data in this repo. Awaiting the owner's Expo repos (D1). |
| `challenge` / `solution` per project | The owner must supply the real technical stories. Inventing them would be the exact failure the brief forbids. |
| Higher-resolution screenshots | Deferred by the owner (D4). Sources are 1024px, so plates are soft on retina. |
| TypeScript migration | Deliberately out of scope. See above. |
| Five npm vulnerabilities in dev tooling | In the Vite/esbuild chain, do not ship to production. `npm audit fix --force` would force breaking changes and was not run without approval. |
| Deployment | **Not deployed.** Per the brief. |
