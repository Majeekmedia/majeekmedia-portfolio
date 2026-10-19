import { Link, useParams } from "react-router-dom";
import Seo, { projectCreativeWork } from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import ProjectSpread from "../components/ProjectSpread.jsx";
import Reveal from "../components/Reveal.jsx";
import { getProjectBySlug, getProjectNeighbours } from "../data/projects.js";

/**
 * A single project page at `/portfolio/:slug`.
 *
 * Each project gets its own URL now. That matters for three reasons, in order of
 * importance:
 *
 *  1. The index became a genuine index: four full spreads inline meant ~6,000px
 *     of scrolling before the second project.
 *  2. A project is now linkable on its own. You can send someone the weather app
 *     rather than telling them to scroll.
 *  3. Each project gets its own title, description and canonical URL, so it can
 *     be indexed separately instead of everything collapsing into one page.
 *
 * An unknown slug renders a real not-found state rather than an empty shell.
 */
export default function Project() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Seo title="Project not found — Majeek Media" description="That project does not exist." path={`/portfolio/${slug}`} />
        <section className="mm-section-lg">
          <Container>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="mm-display text-mm-accent">404</p>
                <h1 className="mt-6 max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)]">
                  That project is not here.
                </h1>
                <p className="mt-6 text-lg text-mm-text-muted">
                  The link may be old, or the address may have a typo in it.
                </p>
                <Link to="/portfolio" className="mm-btn mm-btn-accent mt-10">
                  All work
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const { previous, next } = getProjectNeighbours(project.slug);

  return (
    <>
      <Seo
        title={`${project.title} — ${project.category} by Preye Tekenah`}
        description={project.summary?.slice(0, 155)}
        path={`/portfolio/${project.slug}`}
        type="article"
        jsonLd={projectCreativeWork(project)}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ]}
      />

      {/* Back link, so the route is reversible without the browser button. */}
      <section className="pt-10 md:pt-14">
        <Container>
          <Link to="/portfolio" className="mm-underline text-small text-mm-text-muted">
            <span aria-hidden="true">&larr;</span> All work
          </Link>
        </Container>
      </section>

      <Container>
        <ProjectSpread project={project} headingLevel="h1" />
      </Container>

      {/* Prev / next, so reading continues rather than dead-ending. */}
      <nav aria-label="Other projects" className="border-b border-mm-line">
        <Container>
          <div className="grid gap-px md:grid-cols-2">
            {previous ? (
              <Link
                to={`/portfolio/${previous.slug}`}
                className="mm-pointer-row group block border-t border-mm-line py-10"
              >
                <div className="relative">
                  <span className="mm-label">Previous</span>
                  <p className="mt-3 text-xl transition-colors duration-fast ease-mm group-hover:text-mm-accent md:text-2xl">
                    {previous.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="border-t border-mm-line py-10" />
            )}

            {next ? (
              <Link
                to={`/portfolio/${next.slug}`}
                className="mm-pointer-row group block border-t border-mm-line py-10 md:text-right"
              >
                <div className="relative">
                  <span className="mm-label">Next</span>
                  <p className="mt-3 text-xl transition-colors duration-fast ease-mm group-hover:text-mm-accent md:text-2xl">
                    {next.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="border-t border-mm-line py-10" />
            )}
          </div>
        </Container>
      </nav>

      <section className="mm-section">
        <Container>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <h2 className="max-w-[18ch]">Tell me what you need built.</h2>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <Link to="/contact" className="mm-btn mm-btn-accent">
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
