import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Container from "../components/Container.jsx";

/**
 * 404.
 *
 * The previous version centred a rounded icon badge, a "Page Not Found"
 * headline, and a 256px `blur-[100px]` decorative glow circle. The glow is gone:
 * it was pure decoration, and it is one of the expensive blur layers the audit
 * flagged.
 *
 * Replaced with the accent field doing the work instead, and real routes offered
 * rather than two buttons.
 */
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — Majeek Media" description="That page does not exist." path="/404" />

      <section className="mm-section-lg">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="mm-display text-mm-accent">404</p>
              <h1 className="mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)]">
                That page is not here.
              </h1>
              <p className="mt-6 text-lg text-mm-text-muted">
                The link may be old, or the address may have a typo in it.
              </p>
              <Link to="/" className="mm-btn mm-btn-accent mt-10">
                Back home
              </Link>
            </div>

            <nav className="md:col-span-4 md:col-start-9" aria-label="Site sections">
              <h2 className="mm-label mb-6">Where to go</h2>
              <ul>
                {[
                  { to: "/portfolio", label: "Work" },
                  { to: "/services", label: "Services" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.to} className="border-b border-mm-line">
                    <Link to={l.to} className="mm-underline block py-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
