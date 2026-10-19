import { Link } from "react-router-dom";
import Container from "./Container.jsx";
import Rule from "./Rule.jsx";

/**
 * Footer.
 *
 * Replaces a single line reading "© 2026 Majeek Media · Built for performance"
 * plus four social icons. "Built for performance" was padding: it says nothing
 * a visitor needs, and it occupied the only structural slot a footer has.
 *
 * This footer is a real index: navigation, contact, and the section sequence.
 * No version string, no locale or weather strip, no scroll cue.
 */

const LINKS = [
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL = [
  { href: "https://www.linkedin.com/in/preye-tekenah-a5799313a", label: "LinkedIn" },
  { href: "http://x.com/majeekmedia", label: "X" },
  { href: "https://www.instagram.com/preyetekenah/", label: "Instagram" },
  { href: "https://web.facebook.com/majeekmedia/", label: "Facebook" },
];

const SERVICES = [
  "Web platforms",
  "Mobile applications",
  "SaaS products",
  "API integration",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mm-line">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-5">
            <p className="text-2xl font-extrabold tracking-tight text-mm-text">
              Let&rsquo;s build something
              <br />
              that has to work.
            </p>
            <a
              href="mailto:contact@majeekmedia.com"
              className="mm-underline mt-6 inline-block text-lg text-mm-accent"
            >
              contact@majeekmedia.com
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="mm-label mb-5">Pages</h2>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="mm-underline inline-flex min-h-6 items-center py-1 text-mm-text-muted hover:text-mm-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="mm-label mb-5">Builds</h2>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-mm-text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="mm-label mb-5">Elsewhere</h2>
            <ul className="space-y-3">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mm-underline inline-flex min-h-6 min-w-6 items-center py-1 text-mm-text-muted hover:text-mm-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule />

        <div className="flex flex-col gap-3 py-8 text-small text-mm-text-muted sm:flex-row sm:items-center sm:justify-between">
          {/*
           * The signature. It repeats the person AND the brand as real text, which
           * is the whole point: this string is what ties the two names together on
           * every single page of the site.
           */}
          <p className="!max-w-none">
            &copy; {year} <span className="text-mm-text">Preye Tekenah</span>, trading as{" "}
            <span className="text-mm-text">Majeek Media</span>. Software engineer.
          </p>
          <p className="!max-w-none">Nigeria, working remotely worldwide.</p>
        </div>
      </Container>
    </footer>
  );
}
