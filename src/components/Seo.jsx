import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, path = "", image = "/images/og-image.png" }) {
  const site = "https://majeekmedia.com";
  const url = site + path;
  const fullImage = site + image;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || "Scalable web platforms for businesses and startups."} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={fullImage} /> */}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {/* <meta property="twitter:image" content={fullImage} /> */}
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Majeek Media",
          "image": "https://majeekmedia.com/images/hero/profile.png",
          "url": "https://majeekmedia.com",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "NG"
          },
          "priceRange": "$$",
          "description": "Scalable web platforms for startups and businesses.",
          "sameAs": [
            "https://twitter.com/majeekmedia",
            "https://facebook.com/majeekmedia",
            "https://instagram.com/preyetekenah",
            "https://linkedin.com/in/preye-tekenah-a5799313a"
          ]
        })}
      </script>
    </Helmet>
  );
}