# CONTENT_GAPS.md

**Everything I need from you before the redesign can be finished.**
Nothing in this document will be invented, filled with placeholders that look real, or
guessed. Where content is missing, the site will carry a clearly marked placeholder
until you supply the real thing.

Status key: **BLOCKING** = cannot build the section at all · **IMPORTANT** = can build
with a visible placeholder · **NICE** = improves quality, not required

---

## 0. DECISIONS RECORDED — 2026-10-16

Answers received. These are now the contract.

| # | Decision | Answer |
|---|---|---|
| **D1** | Mobile section | **You are supplying real Expo / React Native repos.** Each repo's README contains screenshots and full app information. I will extract from those. Awaiting URLs. |
| **D2** | Unverifiable metrics | **Label as client-reported estimates.** The figures stay, but every one is explicitly marked as reported by the client, never presented as independently verified data. |
| **D3** | Project curation | **Remove #4 Portfolio Website. Remove #2 Music Career (MajeekHub).** Keep Estate Management and Crypto Exchange, plus your mobile apps. |
| **D3b** | Project to update | **#1 Estate Management Platform** gets refreshed screenshots and updated details. |
| **D4** | Assets | **You will supply:** OG image (1200×630), higher-resolution portrait, vector (SVG) logo. **Higher-res web screenshots are deferred.** |

### Consequence of D3 that needs your attention

Removing **#2 Music Career (MajeekHub)** removes the portfolio's **only SaaS product.**
MajeekHub was the one project described as a production-ready SaaS with Stripe and
Paystack billing, and it was the sole evidence for the brief's *SaaS Products* section
(Phase 4, item 5) and for the `SaaS Builder` half of your positioning.

This leaves the web work as:

| Kept | Project | Type |
|---|---|---|
| 1 | Estate Management Platform | Client Project — refreshing |
| 2 | Crypto Exchange Platform (UniTrade) | Functional MVP |

**How I am handling it, so you are not blocked:**

The *SaaS Products* section is built to be **data-driven**. If `projects.js` contains no
project tagged as SaaS, the section renders an honest capability statement about
building and operating SaaS products rather than showing an empty shell or a fake entry.
The moment you add a SaaS project to the data file, the full section appears with no
code change.

**If the MajeekHub removal was about the work being incomplete rather than the project
being wrong, say so and I will re-add it** with the status honestly marked as
in-development. A real in-progress SaaS build is much stronger evidence for `SaaS
Builder` than a capability sentence is. Your call, and it is a one-line change either
way.

### Still needed from you

1. **The Expo / React Native repo URLs.** Once I have them I will read each README and
   extract the app name, purpose, role, platform, status, stack and screenshots.
2. **Refresh assets for #1 Estate Management** — new screenshots and the updated
   details, whenever you have them. Until then it keeps its current assets.

---

## 1. BLOCKING — Mobile app development (Phase 6)

**This is the biggest gap.** The brief asks for a dedicated React Native / Expo showcase
(Phase 6) with realistic device mockups and actual application screenshots.

I checked, and I have to be straight with you: **there is no mobile project data
anywhere in this repository.**

- `src/data/projects.js` contains four projects. All four are described as web
  platforms. None is a mobile app.
- `public/projects/` contains screenshots for four projects. All are browser
  screenshots.
- There is no `expo` or `react-native` dependency, no app config, no store links.
- I know from your other work that you have real Expo experience, but I cannot move
  that into *this* portfolio without you telling me which apps it applies to.

**I will not invent app store links, published apps, download counts, or device
screenshots.** Those are exactly the claims the brief forbids fabricating, and a fake
"Featured on the App Store" badge would be a credibility risk for you.

**What I need, per mobile project:**

1. Project name.
2. What it does, in one or two sentences.
3. Your role.
4. Platform(s) — iOS, Android, or both.
5. Status — **shipped to store** / **in development** / **internal build** /
   **prototype**. Please be accurate here; it changes how the section reads.
6. Stack — Expo SDK version, state management, backend, auth, storage.
7. App screenshots at phone resolution. **2-4 per project, PNG, ideally 1080×2340 or
   similar.** If you have one, an additional tablet screenshot is a bonus.
8. A store link, if and only if it is genuinely published.
9. Anything technically interesting: offline behaviour, push notifications, deep links,
   native modules, performance work.

**If you have no mobile project to show yet, tell me that plainly.** That is a fine
answer and I will handle it two ways:

- **Option A** — fold React Native / Expo into the "Engineering Expertise" section as a
  capability you build with, with no fake case study. Honest and still valuable.
- **Option B** — build the Phase 6 section fully, but every project slot is a visibly
  marked placeholder that says what goes there, so it is ready the moment you have the
  content.

My recommendation is **Option A now, Option B's markup ready**. A capabilities claim you
can back with real work beats a case-study slot that looks empty.

---

## 2. IMPORTANT — Metrics that are currently unverifiable

The site currently publishes these numbers. I could not find a source for any of them
in the repository:

| Claim | Location | Problem |
|---|---|---|
| `100% Client Satisfaction` | `About.jsx` | Not a claim anyone can substantiate. I recommend removing it. |
| `4+ Years Experience` | `About.jsx` | Plausible. Please confirm the number. |
| `20+ Projects Delivered` | `About.jsx` | The portfolio shows 4. Please confirm the real figure. |
| `24/7 Support Available` | `About.jsx` | Reads as an agency claim, not a solo engineer. |
| `70% reduction in administrative overhead` | `projects.js` | No measurement source given. |
| `95% payment transparency` | `projects.js` | No measurement source given. |
| `3x faster billing cycles` | `projects.js` | No measurement source given. |

**For each one I need either:**

- the real number plus how it was measured (e.g. "measured from before/after admin time
  logs over 3 months"), **or**
- permission to remove it, **or**
- permission to keep it but label it honestly as *stakeholder estimate* or
  *client-reported* rather than presenting it as verified data.

I will not silently keep unlabelled numbers. The brief's whole thesis is technical
credibility, and an unsourced percentage undermines that.

**Let me know which of these three options you want for the project outcome figures.**
It affects four project write-ups.

---

## 3. IMPORTANT — Assets I can see are missing

| Asset | Needed for | Specification |
|---|---|---|
| **Open Graph image** | Every social share. Currently the `og:image` tag is commented out in `Seo.jsx` and the file does not exist, so every link you post renders as bare text. | `1200 × 630 px`, PNG or JPG. Your name, role, and one line of positioning on brand ground. |
| **Optimised hero portrait** | Home hero + About | The current file is **787 KB at 819px wide** and it is a transparent PNG. PNG is the wrong format for a photograph. If you have the **original** at higher resolution I can produce proper WebP/AVIF derivatives and your photo will look markedly sharper. If 819px is all that exists, tell me, and I will target that size exactly instead of upscaling. |
| **Proper logo** | Navbar, favicon, social cards | Current `logo.png` is **4000 px wide and 372 KB**, displayed at 36px. If a **vector (SVG)** exists that is ideal. Otherwise a 512×512 PNG is enough for everything. |
| **Project screenshots at full width** | Project showcases | All 12 existing screenshots are capped at **1024px wide**. Since several are shown at over 600 CSS pixels in a two-column layout, they are soft on any retina display. If you can re-capture at **2560px wide** (or browser full-page captures) I can crop, build `srcset`, and they will look genuinely sharp. |
| **A screenshot of this portfolio site** | Project 4 | You have one (`/projects/portfolio/home.png`) but it shows the *old* design. After the redesign it needs re-capturing, otherwise the portfolio shows a picture of a website that no longer exists. |

---

## 4. IMPORTANT — Per-project detail I would like

The four existing projects are unusually well documented, which is a real strength. Three
things would make them stronger and match the brief's Phase 5 requirements:

### For every project

- **Technical challenge and how you solved it.** The brief asks for a "technical
  challenges / solutions implemented" section and this is currently the weakest part of
  the data. One genuinely hard problem per project would be excellent: a schema decision,
  a payment reconciliation edge case, a real-time sync problem, an iOS build issue.
  Anything specific. This is what makes an engineer's portfolio credible.
- **A confirmed category.** Current types are `Client Project`, `SaaS Product`,
  `Functional MVP`, `Personal Project`. The brief wants completed / active / work-in-
  progress distinction. Please confirm which each project is **today**.

### Specifically

- **Estate Management Platform** — is it live with real users, or is it a delivered
  build awaiting handover?
- **Music Career Management Platform (MajeekHub)** — described as "Production-ready
  SaaS". Are there paying or pilot users? If not, "production-ready" needs softening or
  a qualifier; I will flag wording either way.
- **Crypto Exchange Platform (UniTrade)** — already has an honest note that trading is
  simulated. Good. I plan to make that disclosure *more* prominent, not less. Please
  confirm you are happy with that.
- **Portfolio Website** — is this project worth a full editorial spread in an
  engineering portfolio, or should it be a small footer note so the other three get more
  room? My inclination is a small note.

---

## 5. NICE — Things that would lift the site

| Item | Why it helps |
|---|---|
| **Two or three real testimonials** | With name, role, and company. Even one or two. The brief forbids inventing them, and real ones are disproportionately persuasive. If you have none, the section is simply omitted rather than faked. |
| **A CV / résumé PDF** | A "Download CV" link is expected by hiring managers. |
| **A short written case study for one project** | 300-600 words on the Estate Management Platform, going deep on architecture. One deep case study beats four shallow ones. |
| **Your GitHub / code samples** | The brief allows "repository links, where appropriate". If any of these four have a public repo, that is strong evidence. If they are private, say so and I will omit rather than show a dead link. |
| **Timezone and working hours** | Useful for the contact section for remote clients. |
| **Rates or engagement model** | Optional, but if you want to filter enquiries, a starting range or "project-based from X" helps. Entirely your call. |

---

## 6. Decisions I need from you

Four decisions. Everything else I can proceed on.

| # | Decision | Options |
|---|---|---|
| **D1** | Mobile development section | **A)** Capability only, no case studies · **B)** Full section with marked placeholders · **C)** You supply 1-3 real mobile projects now |
| **D2** | Unverifiable metrics | **A)** Source them · **B)** Remove them · **C)** Keep, labelled as client-reported estimate |
| **D3** | Portfolio-website project | **A)** Full editorial spread · **B)** Small footer note (my recommendation) |
| **D4** | Asset supply | Can you provide the OG image, a higher-resolution portrait, a vector logo, and re-captured screenshots? If not, I will build to the existing assets' limits and note the constraint in `QA_REPORT.md`. |

---

## 7. What I will do while you decide

I do not need any of the above to start, so no time is wasted:

1. Design system and tokens — `DESIGN_SYSTEM.md`.
2. Typography — self-hosted faces, full scale.
3. Navigation, footer, layout primitives.
4. The homepage, with permanent project data for the four web projects.
5. The numbered editorial project showcases.
6. About, Services, Contact, 404.
7. Motion system with `prefers-reduced-motion` from the start.
8. SEO, structured data, OG infrastructure wired up and ready for your image.
9. Performance work on the existing assets.

Anything that depends on **D1** or **D4** gets a clearly marked placeholder that cannot
be mistaken for real content, and lands on your replacement list in `QA_REPORT.md`.
