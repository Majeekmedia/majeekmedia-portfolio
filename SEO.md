# SEO.md

**Preye Tekenah / Majeek Media** · Set up 2026-10-19

The goal: when someone searches **"Preye Tekenah"** or **"Majeek Media"**, this site
should be the result, and the two names should be understood as the same person.

---

## The problem this fixed

Before this pass, **"Preye Tekenah" appeared nowhere as visible text on the site.**
It existed only in:

- image `alt` attributes
- one page title
- the JSON-LD block

Alt text is a weak signal. JSON-LD is a machine hint, not content. The original site
had a literal "Hi, I'm Preye Tekenah" headline; the redesign had dropped it. So a
search engine had almost nothing tying the site to the name.

There was also a **duplicate-tag bug** that would have actively harmed rankings:
`index.html` declared a static `<link rel="canonical" href="https://majeekmedia.com/">`
while Helmet wrote the per-route one. Both appeared in `<head>`, the browser takes the
first, so **every page claimed to be the homepage**. Google would have treated the
other pages as duplicates and dropped them.

---

## What was done

### 1. The name is now real, visible content

| Location | What appears |
|---|---|
| Homepage hero | `Preye Tekenah / Majeek Media` above the headline |
| Homepage about strip | "I'm **Preye Tekenah**, a software engineer working across the whole product" |
| Every page footer | "© 2026 **Preye Tekenah**, trading as **Majeek Media**. Software engineer." |
| About page | `h1` is now **"Preye Tekenah"**, with the positioning line beneath it |
| `index.html` `<title>` | `Preye Tekenah — Software Engineer & Full-Stack Developer \| Majeek Media` |
| `noscript` block | Full identity paragraph for crawlers and JS-disabled visitors |

Measured on the homepage: **3 visible occurrences of the name, 3 of the brand.**

### 2. Every page title carries both names

```
/                              Preye Tekenah — Software Engineer & Full-Stack Developer | Majeek Media
/about                         About Preye Tekenah — Software Engineer | Majeek Media
/portfolio                     Work — Preye Tekenah | Majeek Media
/portfolio/vhm-community-...   VHM Community Management Platform — Multi-tenant SaaS by Preye Tekenah
/services                      Services — Preye Tekenah | Majeek Media
/contact                       Contact — Preye Tekenah | Majeek Media
```

Titles run **35–71 characters**, inside the 50–60 band where possible and never
truncated to the point of losing the name.

### 3. One entity graph, not per-page blobs

The Person and WebSite nodes carry stable `@id` values, so every page references the
**same** entity instead of redefining it. That is what lets a search engine consolidate
a name into a recognised entity.

```json
{
  "@type": "Person",
  "@id": "https://majeekmedia.com/#person",
  "name": "Preye Tekenah",
  "alternateName": "Majeek Media",
  "jobTitle": "Software Engineer",
  "worksFor": { "name": "Majeek Media" },
  "knowsAbout": [ 14 technologies ],
  "sameAs": [ LinkedIn, GitHub, X, Instagram, Facebook ]
}
```

`alternateName` plus `worksFor` is the mechanism that ties the two names together.
`sameAs` lists **five verified profiles**, which is how the accounts get linked to the
same person.

Project pages additionally emit `CreativeWork` and a `BreadcrumbList`, so a nested page
shows a real hierarchy in results rather than a bare URL.

### 4. Social sharing actually works now

`og:image` had always pointed at `/og-image.png`, and **that file never existed.** Every
share on LinkedIn, X, WhatsApp or Slack rendered as bare text.

`docs/qa/make-og-image.mjs` now generates a real 1200×630 card (44 KB) using the site's
own palette and type. Verified serving at 200 with `content-type: image/png`.

**Replace it** with your Canva version when ready (see `IMAGE_SPEC.md`). The generated
one is a working fallback, not a finished design asset.

### 5. Crawler access, including AI engines

`robots.txt` now names each crawler explicitly rather than relying on the wildcard.
Everything is allowed, because a portfolio wants to be cited:

`Googlebot` · `Bingbot` · `GPTBot` · `OAI-SearchBot` · `ChatGPT-User` ·
`ClaudeBot` · `Claude-Web` · `PerplexityBot` · `Google-Extended` · `Applebot` ·
`Applebot-Extended` · `CCBot`

Blocking `GPTBot` would prevent ChatGPT from citing the work, which is the opposite of
what a portfolio needs.

### 6. Sitemap covers all nine URLs

`/` · `/portfolio` · the four project pages · `/services` · `/about` · `/contact`

Each project has its own URL and canonical, so they index separately instead of
collapsing into one page.

---

## Verified

Measured across **40 combinations** (10 routes × 4 viewports: 390, 768, 1440, 1920):

| Check | Result |
|---|---|
| Exactly one `<link rel="canonical">` per route | **40/40** |
| Canonical is the page's own URL | **40/40** |
| Exactly one JSON-LD block, parseable | **40/40** |
| Exactly one `main h1` | **40/40** |
| Name present in visible text | **40/40** |
| Horizontal overflow | **0** |
| Broken images | **0** |
| Console errors | **0** |

---

## What you should do after deploying

Three things only you can do, in order of impact:

1. **Google Search Console** — add `majeekmedia.com` as a property, submit
   `https://majeekmedia.com/sitemap.xml`, then request indexing for `/` and
   `/about`. This is the single fastest way to get crawled.

2. **Bing Webmaster Tools** — same, and it also feeds ChatGPT's search index.

3. **Make your social profiles point here.** `sameAs` only works if the profiles link
   back. Add `https://majeekmedia.com` to:
   - LinkedIn → Contact info → Website
   - GitHub → Profile → Website
   - X, Instagram, Facebook → bio link

   This is the highest-leverage step for a name search. A search engine cannot connect
   "Preye Tekenah" on LinkedIn to this site until one of them links to the other.

**Optional but useful:** a Google Business Profile is not appropriate for a remote
engineer, but a consistent name/role/photo across LinkedIn, GitHub and this site does
the same entity-consolidation job.

---

## What is deliberately NOT claimed

No invented metrics, client names, ratings, review counts or awards. There is no
`aggregateRating`, no `award`, no fake `numberOfEmployees`. Structured data that lies
is a manual-action risk, and this site's whole argument is technical credibility.

`ProfessionalService` was also rejected: it describes a business with a physical address
and service area, which is not accurate for one engineer working remotely.

---

## Files

| File | Purpose |
|---|---|
| `src/data/seo.js` | Single source of truth: name, brand, profiles, IDs |
| `src/components/Seo.jsx` | Per-route head and the entity graph |
| `index.html` | Only tags Helmet does not manage, plus the `noscript` identity block |
| `public/robots.txt` | Explicit crawler allowlist |
| `public/sitemap.xml` | Nine URLs |
| `docs/qa/make-og-image.mjs` | Generates the share card |

Run `node docs/qa/make-og-image.mjs` to regenerate the OG image.
