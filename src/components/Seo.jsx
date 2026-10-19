import { Helmet } from "react-helmet-async";
import {
  SITE,
  BRAND,
  PERSON,
  SOCIAL,
  CONTACT_EMAIL,
  IDS,
  KNOWS_ABOUT,
} from "../data/seo.js";

const DEFAULT_OG = "/og-image.png";

/**
 * Per-route document head and structured data.
 *
 * DESIGN NOTES
 *
 * 1. ONE ENTITY GRAPH, NOT PER-PAGE BLOBS.
 *    The Person and WebSite are declared with stable `@id` values and every page
 *    references them. That is how a search engine consolidates "Preye Tekenah"
 *    and "Majeek Media" into a single recognisable entity rather than treating
 *    each page as an unrelated document.
 *
 * 2. THE NAME IS THE BRAND'S OWNER.
 *    `Person.name` is the real name, `alternateName` carries the brand, and
 *    `worksFor` ties the brand to the person. `sameAs` lists only profiles that
 *    actually resolve, which is what allows the accounts to be linked.
 *
 * 3. BREADCRUMBS.
 *    Added so nested project pages show a real hierarchy in results instead of a
 *    bare URL.
 *
 * 4. HONESTY.
 *    Nothing here claims a metric, a client or a rating that was not supplied.
 *    `ProfessionalService` was deliberately NOT used: it describes a business
 *    with a physical address and service area, which is not accurate for one
 *    engineer working remotely.
 */
export default function Seo({
  title,
  description,
  path = "",
  image = DEFAULT_OG,
  type = "website",
  /** Extra schema merged into the page graph, e.g. ItemList or BreadcrumbList. */
  jsonLd = null,
  /** Marks the page as a project detail rather than a general page. */
  breadcrumbs = null,
}) {
  const url = `${SITE}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE}${image}`;
  const fullTitle = title ?? `${PERSON.name} — ${PERSON.jobTitle} | ${BRAND}`;
  const desc = description ?? PERSON.description;

  /*
   * The person node. Declared with an @id so other pages can point at it
   * rather than repeating it.
   */
  const personNode = {
    "@type": "Person",
    "@id": IDS.person,
    name: PERSON.name,
    // The brand is how the same entity is known commercially.
    alternateName: BRAND,
    url: SITE,
    jobTitle: PERSON.jobTitle,
    email: `mailto:${CONTACT_EMAIL}`,
    description: PERSON.description,
    knowsAbout: KNOWS_ABOUT,
    address: {
      "@type": "PostalAddress",
      addressCountry: PERSON.country,
    },
    // Ties the brand to the person so searching either name finds both.
    worksFor: {
      "@type": "Organization",
      name: BRAND,
      url: SITE,
    },
    sameAs: SOCIAL.map((s) => s.href),
  };

  const websiteNode = {
    "@type": "WebSite",
    "@id": IDS.website,
    url: SITE,
    name: BRAND,
    alternateName: PERSON.name,
    description: PERSON.description,
    inLanguage: "en",
    publisher: { "@id": IDS.person },
  };

  const webpageNode = {
    "@type": type === "article" ? "WebPage" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: fullTitle,
    description: desc,
    isPartOf: { "@id": IDS.website },
    about: { "@id": IDS.person },
    primaryImageOfPage: fullImage,
    inLanguage: "en",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [personNode, websiteNode, webpageNode],
  };

  // Merge page-specific schema into the same graph rather than a second script.
  if (jsonLd) {
    const extra = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const node of extra) {
      graph["@graph"].push({ "@context": undefined, ...node });
    }
  }

  if (breadcrumbs?.length) {
    graph["@graph"].push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${SITE}${crumb.path}`,
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc.slice(0, 158)} />
      <link rel="canonical" href={url} />

      {/*
        Name keywords.
        Not a ranking factor on its own, and not stuffed: this is the exact set of
        forms a person would type when looking for this developer, which is what
        the tag was designed for.
      */}
      <meta
        name="author"
        content={`${PERSON.name} — ${BRAND}`}
      />
      <meta
        name="keywords"
        content={`Preye Tekenah, Majeek Media, Preye Tekenah software engineer, Majeek Media developer, full-stack developer Nigeria, React developer, React Native developer, SaaS developer`}
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${PERSON.name} — ${BRAND}, ${PERSON.jobTitle}`} />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@majeekmedia" />
      <meta name="twitter:site" content="@majeekmedia" />

      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

/** Structured data for the work index. */
export function projectsItemList(projects) {
  return {
    "@type": "ItemList",
    name: `${BRAND} — selected work`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.excerpt ?? p.summary,
      url: `${SITE}/portfolio/${p.slug}`,
    })),
  };
}

/** Structured data for a single project page. */
export function projectCreativeWork(project) {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt ?? project.summary,
    url: `${SITE}/portfolio/${project.slug}`,
    creator: { "@id": IDS.person },
    keywords: project.tech?.join(", "),
    genre: project.category,
  };
}
