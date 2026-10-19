# QA_REPORT.md

**Majeek Media — portfolio redesign**
Tested: 2026-10-16 · Build: `dist/` production output · Server: Vite dev, `127.0.0.1:5199`

**Method:** every figure below is measured, not asserted. Where a number contradicts
something I expected, the measurement wins and is reported as-found.

**Tooling:** `docs/qa/capture.mjs`, `docs/qa/contrast.mjs`, `docs/qa/optimize-images.mjs`,
plus live browser probes for geometry, contrast, focus and reduced motion.

---

## 1. Summary

| Dimension | Before | After | Status |
|---|---|---|---|
| Audit score | **9 / 20** | **18 / 20** | Measured |
| Contrast failures | not previously checked | **0** | `[MEASURED]` |
| Horizontal overflow @ 4 viewports | 0 | **0** | `[MEASURED]` |
| Console errors | 0 | **0** | `[MEASURED]` |
| Network failures | n/a | **0** | `[MEASURED]` |
| Labels on form inputs | **0 of 4** | **3 of 3 + honeypot hidden** | `[MEASURED]` |
| `prefers-reduced-motion` support | **none** | **full** | `[MEASURED]` |
| Visible focus ring on links | **none** | **accent, all routes** | `[MEASURED]` |
| Deploy payload | 2,900 KB | **966 KB** | `[MEASURED]` |
| Image payload | 2,866 KB | **382 KB** (−87%) | `[MEASURED]` |
| JS bundle (gzip) | 80.32 KB | **77.65 KB** | `[MEASURED]` |
| CSS bundle (gzip) | 5.43 KB | **5.73 KB** | `[MEASURED]` |

Honest reading of the 18/20: the two points held back are Performance (image sources are
still only 1024px, so plates are soft on retina) and Implementation Integrity (five npm
vulnerabilities remain in dev tooling). Both are documented with fixes.

---

## 2. Viewports tested

`375 × 812` · `768 × 1024` · `1440 × 900` · `1920 × 1080`

| Viewport | Overflow | Hero height | Hero fits | CTA in view | H1 lines |
|---|---|---|---|---|---|
| 375 | **0** | 728 | **yes** | **yes** | 2 |
| 768 | **0** | 1,077 | no (by design) | yes | 2 |
| 1440 | **0** | 728 | **yes** | **yes** | 2 |
| 1920 | **0** | 799 | **yes** | **yes** | 2 |

### Notes on the two non-trivial rows

**375px.** The hero fits an 812px viewport with the primary CTA at **399px**, comfortably
above the fold, and the H1 at 2 lines (40px). This required a fix: a full-bleed 4/5 portrait
is 469px tall at 375px wide, pushing the hero to **876px** and forcing a scroll past the
CTAs. The portrait is now width-capped (`max-w-[210px]`) on small screens. Two earlier
attempts capped *height* (`max-h-[52vh]`) which improved but did not solve it.

**768px.** Hero is 1,077px against a 1,024px viewport, so it does **not** fit. This is
**reported honestly rather than engineered away.** It was 1,446px before the portrait cap,
so the fix removed 369px. Closing the remaining 53px would mean shrinking the 49.92px H1 at
a middle breakpoint, and the 768–1023px range is a narrow band that real users pass through.
A 640px-width cap at `sm` would close it if you want it closed.

---

## 3. Contrast `[MEASURED — 0 failures]`

Run `node docs/qa/contrast.mjs` to reproduce.

```
textPrimary on bg             16.40:1  AAA
textPrimary on surface        15.30:1  AAA
textPrimary on surfaceRaised  14.04:1  AAA
textMuted   on bg              6.76:1  AA
textMuted   on surface         6.31:1  AA
textMuted   on surfaceRaised   5.79:1  AA
accent      on bg             16.10:1  AAA
accent      on surface        15.02:1  AAA
accent      on surfaceRaised  13.78:1  AAA
accentDim   on bg             10.10:1  AAA
Text failures: 0
```

Independently confirmed against the rendered DOM on all four viewports: **0 text
failures**, checked across 66 elements on the homepage per viewport against the nearest
opaque background.

### Two real failures found and fixed during the build

1. **`#858585` failed.** The brief's starting muted value gives **4.42:1** on the raised
   surface `#202020` — under the 4.5:1 AA bar. Raised to **`#9a9a9a`**, verified at 5.79:1
   on the worst surface. This is the failure mode that survives review: the token looks
   fine on the page ground and only fails on a panel nobody checks.
2. **`#5a5a5a` was deleted from the text scale.** Drafted as `--mm-text-faint` for
   hairlines, it measures **2.76:1**, failing even the 3:1 non-text threshold. It was not
   subtle text, it was unreadable text. Hairlines are now a separate `line` token
   documented as decorative.

### False positives, reported as such

An early automated pass flagged 7 apparent failures (the `React`/`Supabase` tech chips and
the gallery `1 / 5` counters). **All 7 were false positives.** My background-resolution
walker rejected any colour with alpha below 0.95, which skipped `rgba(255,255,255,0.95)` and
`rgba(0,0,0,0.70)`. Verified directly: the chip is black on `rgba(255,255,255,0.95)`,
approximately **15.6:1**; the counter is white on `rgba(0,0,0,0.70)`, approximately
**12:1**. Included because a report that only lists confirmations is not a report.

---

## 4. Accessibility

| # | Check | Result |
|---|---|---|
| 1 | **Reduced motion** | **PASS** — full emulation, see §5 |
| 2 | **Focus rings** | **PASS** — 2px accent on every interactive element |
| 3 | **Form labels** | **PASS** — 3/3 resolve, honeypot `aria-hidden` |
| 4 | **Form errors** | **PASS** — per-field, `aria-describedby`, focus moves |
| 5 | **Landmarks** | **PASS** — one `header`, `main`, `footer`, `nav` per route |
| 6 | **Heading order** | **PASS** — one `h1` per route, never skipped |
| 7 | **Image alt text** | **PASS** — every image has non-empty `alt` |
| 8 | **Link/button names** | **PASS** — 0 unlabelled |
| 9 | **Tap targets** | **PASS** — minimum 34px measured |
| 10 | **Skip link** | **PASS** — present on all routes |
| 11 | **Language** | **PASS** — `lang="en"` |
| 12 | **Scroll hijacking** | **PASS** — none; native scroll preserved |

### Reduced motion `[MEASURED]`

Emulated with `prefers-reduced-motion: reduce` on all five routes:

```
route         armed  hidden  animating  scroll-behavior  marquee
/                 0       0          0             auto     none
/portfolio        0       0          0             auto     none
/services         0       0          0             auto     none
/about            0       0          0             auto     none
/contact          0       0          0             auto     none
```

**Zero elements armed, zero hidden, zero animating, native scroll behaviour.** This is the
important result. It is not achieved by a blanket CSS override hiding motion after the
fact: the JS reads the media query and **never arms the entrance state at all**, so the
reduced-motion path is the *simpler* code path. Content is present rather than animating to
present.

### Focus rings `[MEASURED]`

Tested with **real Tab key presses**, not programmatic `.focus()` — a distinction that
matters, because `.focus()` does not trigger `:focus-visible` and produces a false negative.

- First Tab reaches `Skip to content`: `outline: 2px solid rgb(198, 255, 57)`
- Sixth Tab reaches the `About` nav link: `2px solid rgb(198, 255, 57)`
- Contact `#contact-email` on focus: `box-shadow: rgb(198, 255, 57) 0px 0px 0px 2px`

The audit's A2 and A4 findings are closed.

### Form `[MEASURED]`

```
labels:  Name    → htmlFor=contact-name     resolves ✓
         Email   → htmlFor=contact-email    resolves ✓
         Project → htmlFor=contact-message  resolves ✓
honeypot: aria-hidden="true", tabIndex=-1

empty submit →  name    aria-invalid=true  describedby=contact-name-error    "Enter your name."
                email   aria-invalid=true  describedby=contact-email-error   "Enter your email address."
                message aria-invalid=true  describedby=contact-message-error "Enter a short description of the project."
                focus moved to: contact-name

bad email →     "That does not look like a valid email address."
```

---

## 5. Responsive and layout

| Check | Result |
|---|---|
| Horizontal overflow, 4 viewports | **0 everywhere** |
| Nav on one line at desktop | **PASS** |
| Nav height ≤ 80px | **PASS** — 72px, shrinking to 64px |
| Hero fits viewport | **PASS** at 375 / 1440 / 1920; fails at 768 (§2) |
| CTA on one line at desktop | **PASS** — `white-space: nowrap` enforced |
| No element visible in viewport stays hidden | **PASS** — verified after fast scroll |
| `min-h-[100dvh]` not `h-screen` | **PASS** |

### Reveal behaviour — the audit's A5 finding

The old implementation rendered `opacity: 0` and relied on a later observer callback, so
content was permanently invisible if JS failed. Verified after the rewrite, scrolling one
viewport at a time:

```
y=0     armed=13  visible=0     nothing on screen, nothing hidden
y=600   armed=13  visible=1
y=1800  armed=13  visible=6
y=5700  armed=13  visible=13    all revealed
```

Flicking straight to the bottom: `armed 13, visible 13, hidden-in-viewport 0`.

**A measurement artifact worth recording**, because it nearly caused a false alarm: an
earlier probe reported `armed 13, visible 0`. The cause was my test scrolling through the
page and back to the top faster than the browser delivers async IntersectionObserver
callbacks. The mechanism was never broken. Verified with adequate pauses, and again with
the realistic instant-scroll case.

---

## 6. Performance `[MEASURED]`

### Bundle and payload

```
before                                          after
JS    256.39 kB (gzip 80.32)                    JS    245.94 kB (gzip 77.65)
CSS    27.10 kB (gzip  5.43)                    CSS    22.57 kB (gzip  5.73)
public/ (deployed)      ~2,900 KB               dist/ total        966 KB
images                  ~2,866 KB               images            382 KB  (−87%)
fonts                        0 KB (3rd party)   fonts              55 KB  (self-hosted)
```

### The image result in detail

```
asset                          src                    -> optimized        saved
hero/profile.png               819px  787.5 KB        819px   56.3 KB     93%
projects/.../dashboard.png    1024px  227.1 KB       1024px   31.4 KB     86%
projects/.../dashboard.png    1024px   93.2 KB       1024px   24.0 KB     74%
logo.png                      4000px  372.6 KB        256px    6.6 KB     98%
--------------------------------------------------------------------------------------
TOTAL                                 2,866.3 KB              382.5 KB     87%
```

**Two problems this exposed, both fixed:**

1. **The optimization initially made the deploy bigger.** Keeping source PNGs in `public/`
   shipped originals *and* derivatives: `dist` hit **4.3 MB** vs 2.9 MB before. Fixed by
   moving sources to `assets-source/`, which stays in the repo but is not deployed.
2. **Every hero request 404'd.** Widths were duplicated between the helper and the script,
   and the helper defaulted the largest candidate to 1024 while the hero only had 480 and
   819. Fixed by having the script emit `image-manifest.json` that the helper reads, so the
   width plan exists in exactly one place.

### What is not fixed, stated plainly

**Source screenshots are only 1024px wide, so plates are soft on a retina display.** This is
a property of the assets, not something the code hides. Re-running the pipeline after
supplying larger sources widens every `srcSet` automatically. See `CONTENT_GAPS.md` D4.

---

## 7. Console and network

```
errors: []            (pageerror listeners, all 6 routes)
network failures: []  (request-failed listeners, all 6 routes)
```

No React warnings, no key warnings, no hydration issues, no 404s.

Two warnings were found and fixed during the build rather than left in:

- `fetchPriority` on a DOM element (React 18 does not recognise the camelCase prop), removed.
- Vite HMR errors from a mid-refactor missing module, transient, resolved.

---

## 8. Functional checks

| Feature | Status |
|---|---|
| Contact form validation | **PASS** — per-field, verified by submission |
| Contact form states | **PASS** — idle / sending / success / error preserved |
| Honeypot spam trap | **PASS** — preserved, now `aria-hidden` |
| EmailJS config | **PASS** — moved to env vars with working defaults |
| SPA routing | **PASS** — all 6 routes render, `*` → 404 |
| 404 page | **PASS** — sticky nav and footer intact, no dead end |
| Scroll reset on navigation | **PASS** |
| Back to top | **PASS** — appears, keyboard reachable, respects reduced motion |
| Mobile menu | **PASS** — opens, closes on navigate, `aria-expanded` |
| Image galleries | **PASS** — thumbnails select, keyboard reachable |
| Structured data | **PASS** — `Person` emitted per route |
| Sitemap / robots | **PASS** — refreshed |

**Not tested:** the EmailJS send path end-to-end, because that requires a live submission
and would send a real email. The logic is unchanged from the working version.

---

## 9. Score after

| # | Dimension | Before | After | Evidence |
|---|---|---|---|---|
| 1 | Accessibility | 2 | **4** | Focus rings, labels, per-field errors, reduced motion, skip link, 34px targets |
| 2 | Performance | 2 | **3** | 966 KB payload, self-hosted fonts, manifest-driven `srcSet`; −1 for 1024px sources |
| 3 | Responsive | 3 | **4** | 0 overflow at 4 viewports, 24px target minimum met |
| 4 | Theming | 1 | **4** | One token layer, 0 contrast failures, verified |
| 5 | Implementation integrity | 1 | **3** | Dead tokens/scaffold/animations removed; −1 for 5 dev-only npm vulns |
| **Total** | | **9 / 20** | **18 / 20** | |

---

## 10. Outstanding items

**Blocked on you:**

| Item | Blocked on |
|---|---|
| Mobile case studies | Your Expo repo URLs (D1) |
| `challenge` / `solution` per project | The real technical stories |
| OG image | 1200×630 asset |
| Vector logo | SVG, or a 512px PNG |
| Higher-res portrait | Original above 819px |
| Re-captured screenshots | Above 1024px, and refreshed for the Estate project |

**Mine to fix if you want them:**

| Item | Effort |
|---|---|
| Hero at exactly 768px (53px over) | Small — cap the portrait at `sm` too |
| 5 npm vulnerabilities in dev tooling | Small, but `--force` may break Vite |
| Converting the app to TypeScript | Large; a project in its own right |
| Replacing PNG sources with 2× captures | Needs the new assets |

**Deliberately not done:**

- **Not deployed.** Per your instruction.
- No animation library added.
- No design-system package installed; this is an aesthetic, not a system.

---

## 11. Reproducing

```bash
npm install
node docs/qa/contrast.mjs          # expect: Text failures: 0
node docs/qa/optimize-images.mjs   # expect: 87% smaller
npm run build                      # expect: ~966 KB in dist/
npm run dev                        # then open http://localhost:5173
```

Reported for review, not shipped. Nothing is live.
