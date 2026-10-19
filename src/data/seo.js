/**
 * SEO / GEO configuration — single source of truth.
 *
 * WHY BOTH A NAME AND A BRAND
 *
 * The owner is "Preye Tekenah", operating under the brand "Majeek Media". People
 * search for both, and the social handles mostly use the personal name. For a
 * search engine to connect the two, the name and the brand must BOTH appear as
 * real text on the page and be declared as the same entity in structured data.
 *
 * Before this file existed, "Preye Tekenah" appeared only in image `alt` text,
 * one page title and the JSON-LD. Alt text is a weak signal and JSON-LD is a
 * machine hint, not content, so the site effectively had no name presence. That
 * is the single biggest gap this fixes: the name is now visible copy in the hero,
 * the about section, the footer and the About page.
 */

export const SITE = "https://majeekmedia.com";

/** The brand. Used in titles, headings and the footer signature. */
export const BRAND = "Majeek Media";

/** The person. Used in titles, visible copy and Person schema. */
export const PERSON = {
  name: "Preye Tekenah",
  jobTitle: "Software Engineer",
  // Where he actually is. Matches the visible "Based in Nigeria" copy.
  locality: "Nigeria",
  country: "NG",
  // The one-line description reused across meta, schema and the footer.
  description:
    "Full-stack software engineer building web platforms, mobile applications and SaaS products.",
};

/**
 * Verified profiles only. Every URL here was checked to resolve.
 * These feed `sameAs`, which is how Google consolidates the name into one entity.
 */
export const SOCIAL = [
  { href: "https://www.linkedin.com/in/preye-tekenah-a5799313a", label: "LinkedIn", handle: "preye-tekenah" },
  { href: "https://github.com/Majeekmedia", label: "GitHub", handle: "Majeekmedia" },
  { href: "https://x.com/majeekmedia", label: "X", handle: "majeekmedia" },
  { href: "https://www.instagram.com/preyetekenah/", label: "Instagram", handle: "preyetekenah" },
  { href: "https://web.facebook.com/majeekmedia/", label: "Facebook", handle: "majeekmedia" },
];

export const CONTACT_EMAIL = "contact@majeekmedia.com";

/**
 * Stable @id values.
 *
 * Declaring `@id` for the Person and the WebSite lets every page reference the
 * SAME entity instead of redefining it. That is what turns a pile of per-page
 * blobs into one graph, which is what an entity needs to be recognised at all.
 */
export const IDS = {
  person: `${SITE}/#person`,
  website: `${SITE}/#website`,
};

/** Knowledge areas. Mirrors what is actually evidenced by the projects. */
export const KNOWS_ABOUT = [
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "TypeScript",
  "PHP",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Row-Level Security",
  "Paystack",
  "SaaS product development",
  "Web application development",
  "Mobile application development",
];
