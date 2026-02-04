import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, path = "" }) {
  const site = "https://majeekmedia.com";
  const url = site + path;

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}