import { Link } from "react-router-dom";
import Seo, { projectsItemList } from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import Plate from "../components/Plate.jsx";
import PhoneFrame from "../components/PhoneFrame.jsx";
import {
  projects,
  projectExcerpt,
  projectMeta,
} from "../data/projects.js";

/**
 * The work index.
 *
 * WHAT CHANGED AND WHY
 * This page used to render every project's FULL spread inline: summary, problem,
 * challenge, solution, role, stack, outcome, note and a fourteen-item feature
 * list, four times over. That was roughly 6,000px of scrolling before a visitor
 * reached the second project, which made it unusable as an index.
 *
 * It also had a real bug: it filtered to `discipline === "web"`, so the two mobile
 * apps never appeared here at all.
 *
 * Now it is an index. Each project is one row: lead image, name, category, a
 * one-sentence excerpt and a link to its own page. Nothing is dropped, it is
 * moved to where it belongs.
 *
 * Route slug stays `/portfolio` per the preservation contract.
 */

function ProjectRow({ project, i }) {
  const lead = project.images?.[0];

  return (
    <Reveal as="li" delay={i * 50}>
      <Link to={`/portfolio/${project.slug}`} className="mm-pointer-row group block py-8 md:py-10">
        <div className="relative grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
          <span className="mm-index md:col-span-1" aria-hidden="true">
            {project.index}
          </span>

          {lead ? (
            project.discipline === "mobile" ? (
              /*
               * A mobile project gets a DEVICE FRAME, not a cropped plate.
               *
               * The index box is 16:10 landscape, so forcing a portrait phone
               * screenshot into it cropped the image to its middle third and made
               * it look enormously zoomed in. A small phone frame shows the whole
               * screen at a sane size and reads unmistakably as an app.
               */
              <div className="flex md:col-span-3 md:justify-center">
                <PhoneFrame
                  src={lead.src}
                  alt=""
                  width={132}
                  sizes="132px"
                />
              </div>
            ) : (
              <Plate
                src={lead.src}
                alt=""
                sizes="(min-width: 768px) 22vw, 100vw"
                className="aspect-[16/10] md:col-span-3"
              />
            )
          ) : null}

          <div className="md:col-span-8">
            <h2 className="text-2xl transition-colors duration-fast ease-mm group-hover:text-mm-accent md:text-3xl">
              {project.title}
            </h2>

            <p className="mt-2 text-small text-mm-text-muted">{projectMeta(project)}</p>

            <p className="mt-4 max-w-[62ch] text-mm-text-muted">{projectExcerpt(project)}</p>

            <span className="mm-underline mt-5 inline-block text-small text-mm-accent">
              View project
              <span className="sr-only">: {project.title}</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Work — Preye Tekenah | Majeek Media"
        description="Selected software projects by Preye Tekenah: multi-tenant SaaS platforms, trading interfaces, and cross-platform mobile applications built end to end."
        path="/portfolio"
        jsonLd={projectsItemList(projects)}
      />

      <section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="max-w-[20ch]">Work</h1>
              <p className="mt-6 max-w-[52ch] text-lg text-mm-text-muted">
                {projects.length} projects built end to end, across web platforms and mobile
                applications. Each one is a real codebase with a real data model behind it.
              </p>
            </div>

            <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
              <p className="mm-label">{String(projects.length).padStart(2, "0")} projects</p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <ul className="border-t border-mm-line">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} i={i} />
          ))}
        </ul>
      </Container>

      <section className="mm-section border-t border-mm-line">
        <Container>
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
        </Container>
      </section>
    </>
  );
}
