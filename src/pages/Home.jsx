import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import Rule from "../components/Rule.jsx";
import SectionIndex from "../components/SectionIndex.jsx";
import Plate from "../components/Plate.jsx";
import PointerRow from "../components/PointerRow.jsx";
import PhoneFrame from "../components/PhoneFrame.jsx";
import {
  projects,
  capabilities,
  process,
  mobileProjects,
  projectExcerpt,
  projectMeta,
} from "../data/projects.js";

/* ---------------------------------------------------------------------------
   HERO — asymmetric split, type carrying the page.

   Constraints from the brief, all enforced:
     - Headline is 2 lines at desktop (never 4).
     - Subtext is under 20 words.
     - The primary action is visible without scrolling.
     - Max 4 text elements: heading, subtext, actions. No eyebrow label, no
       tagline under the CTA, no trust strip, no tech-chip row in the hero.
     - Top padding capped at pt-24, so content does not float mid-viewport.

   The headline is rendered VISIBLE, not armed. It is the first thing on screen,
   so animating it in would mean the visitor watches the page assemble itself
   before they can read it. The reveal moment is spent on section headings
   further down instead, where it does actual work.
   ------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="pb-20 pt-12 md:pb-28 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/*
              THE NAME, AS REAL TEXT, ABOVE THE HEADLINE.
              
              People search for "Preye Tekenah" as often as for the brand, and the
              social handles mostly use the personal name. Before this line, the
              name appeared NOWHERE in visible copy: only in image alt text, one
              page title and the JSON-LD, none of which is body content. This is a
              brand signature, not an eyebrow label about the section, so it does
              not fall under the no-eyebrow rule.
            */}
            <p className="mb-6 text-small font-medium tracking-wide text-mm-text-muted">
              <span className="text-mm-text">Preye Tekenah</span>
              <span className="mx-2 text-mm-line-control" aria-hidden="true">
                /
              </span>
              <span>Majeek Media</span>
            </p>

            <h1>
              <span className="block">I build</span>
              <span className="block text-mm-accent">digital products.</span>
            </h1>

            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed md:text-xl">
              Full-stack software engineer building web platforms, mobile applications and SaaS
              products for real-world use.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="mm-btn mm-btn-accent">
                Get in touch
              </Link>
              <Link to="/portfolio" className="mm-btn mm-btn-ghost">
                See the work
              </Link>
            </div>
          </div>

          {/* Portrait: offset into the right column, no chrome around it.
              Bounded by WIDTH on small screens. A full-bleed 4/5 portrait is
              469px tall at 375px wide, which pushed the hero to ~880px and
              forced a scroll past the CTAs. Capping the width keeps the whole
              hero inside one phone viewport. */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Plate
              src="/images/hero/profile.png"
              alt="Preye Tekenah, software engineer"
              priority
              ratio={{ width: 819, height: 1024 }}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="mx-auto aspect-[4/5] w-full max-w-[210px] sm:max-w-[260px] lg:mx-0 lg:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   CAPABILITY MARQUEE — exactly ONE marquee on the page.
   ------------------------------------------------------------------------- */
function CapabilityStrip() {
  const items = [
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "PHP",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "Stripe",
    "Paystack",
    "REST APIs",
    "VPS deployment",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="mm-marquee" aria-hidden="true">
      <div className="mm-marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="mm-label px-6 whitespace-nowrap">
            {item}
            <span className="ml-6 text-mm-line-control">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SELECTED WORK — full-bleed plates, numbered, asymmetric.
   ------------------------------------------------------------------------- */
function SelectedWork() {
  return (
    <section className="mm-section" aria-labelledby="work-title">
      <Container>
        <SectionIndex
          id="work-title"
          titleLines={["Selected work"]}
          lead="Systems built end to end: data model, access control, interface and deployment."
        />

        <div className="border-t border-mm-line">
          {projects.map((p) => {
            const lead = p.images?.[0];
            const isMobile = p.discipline === "mobile";

            return (
              <Reveal key={p.slug}>
                <PointerRow to={`/portfolio/${p.slug}`} className="py-8">
                  <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
                    <span className="mm-index md:col-span-1" aria-hidden="true">
                      {p.index}
                    </span>

                    <div className="md:col-span-5">
                      <h3 className="text-2xl transition-colors duration-fast ease-mm group-hover:text-mm-accent md:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-small text-mm-text-muted">
                        {projectMeta(p)}
                      </p>
                    </div>

                    {/*
                     * The EXCERPT, not the problem statement.
                     *
                     * This used to render `p.problem.split(".")[0]`, which took the
                     * first sentence of the PROBLEM field. For Majeek Weather that
                     * produced "Most weather apps are welded to a single API." on
                     * the homepage: a complaint about the industry, presented as if
                     * it described the project. `projectExcerpt` uses the summary,
                     * which is what a one-line description should be.
                     */}
                    <p className="text-mm-text-muted md:col-span-3">
                      {projectExcerpt(p)}
                    </p>

                    {/*
                     * A mobile project gets a DEVICE FRAME here too, matching the
                     * work index. It was previously forced into the same 16:10
                     * landscape box as the web projects, which cropped a portrait
                     * screenshot to its middle third and blew it up.
                     */}
                    {lead ? (
                      isMobile ? (
                        <div className="flex md:col-span-3 md:justify-center">
                          <PhoneFrame src={lead.src} alt="" width={132} sizes="132px" />
                        </div>
                      ) : (
                        <Plate
                          src={lead.src}
                          alt=""
                          sizes="(min-width: 768px) 25vw, 100vw"
                          className="aspect-[16/10] md:col-span-3"
                        />
                      )
                    ) : null}
                  </div>
                </PointerRow>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10">
          <Link to="/portfolio" className="mm-underline text-mm-accent">
            All projects
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   ENGINEERING EXPERTISE — indexed list, rules, no cards.
   ------------------------------------------------------------------------- */
function Expertise() {
  return (
    <section className="mm-section border-t border-mm-line" aria-labelledby="expertise-title">
      <Container>
        <SectionIndex
          id="expertise-title"
          titleLines={["What I", "work with"]}
          lead="The stack is chosen per project, not by habit."
        />

        <div className="border-t border-mm-line">
          {capabilities.map((group) => (
            <Reveal key={group.group}>
              <div className="grid gap-3 border-b border-mm-line py-6 md:grid-cols-12 md:gap-8">
                <h3 className="text-lg md:col-span-3">{group.group}</h3>
                <ul className="flex flex-wrap gap-2 md:col-span-9">
                  {group.items.map((item) => (
                    <li key={item} className="mm-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   MOBILE — honest capability statement.
   No mobile project data exists yet, so this states capability rather than
   inventing a case study. It renders the full showcase automatically once a
   mobile project is added to the data file. See CONTENT_GAPS.md §1.
   ------------------------------------------------------------------------- */
function Mobile() {
  if (mobileProjects.length) return null;

  return (
    <section className="mm-section border-t border-mm-line" aria-labelledby="mobile-title">
      <Container>
        <SectionIndex
          id="mobile-title"
          titleLines={["Mobile", "applications"]}
          lead="Cross-platform builds with React Native and Expo. One codebase, both stores, native behaviour where it matters."
        />

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-mm-text-muted">
              I build mobile applications on React Native and Expo, and that includes the
              release pipeline as much as the interface: authenticated sessions, offline
              handling, API integration, and getting a build through review on both platforms.
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <ul className="border-t border-mm-line">
              {[
                "Shared logic across iOS and Android",
                "Authentication and secure token storage",
                "Offline-tolerant data handling",
                "Native module and permission work",
                "App store submission and release builds",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-mm-line py-3 text-small text-mm-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   PROCESS — numbered vertical sequence with rules.
   ------------------------------------------------------------------------- */
function Process() {
  return (
    <section className="mm-section border-t border-mm-line" aria-labelledby="process-title">
      <Container>
        <SectionIndex
          id="process-title"
          titleLines={["How I work"]}
          lead="Five stages. The awkward ones are not skipped."
        />

        <ol className="border-t border-mm-line">
          {process.map((step) => (
            <Reveal key={step.index} as="li">
              <div className="grid gap-4 border-b border-mm-line py-8 md:grid-cols-12 md:gap-8">
                <span className="mm-index md:col-span-1" aria-hidden="true">
                  {step.index}
                </span>
                <h3 className="text-xl md:col-span-3 md:text-2xl">{step.title}</h3>
                <p className="text-mm-text-muted md:col-span-7">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   ABOUT — heading left, prose right, offset column.
   ------------------------------------------------------------------------- */
function AboutStrip() {
  return (
    <section className="mm-section border-t border-mm-line" aria-labelledby="about-title">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="about-title" className="max-w-[16ch]">
              An engineer, not a website builder.
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg text-mm-text-muted">
              I&rsquo;m <strong className="font-medium text-mm-text">Preye Tekenah</strong>, a
              software engineer working across the whole product: schema design and access rules,
              API and integration work, interface, and the deployment that keeps it running. Fewer
              handoffs, and no layer that nobody owns.
            </p>
            <p className="mt-6 text-mm-text-muted">
              Based in Nigeria, working remotely with startups and businesses.
            </p>
            <Link to="/about" className="mm-underline mt-8 inline-block text-mm-accent">
              More about me
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   CONTACT
   ------------------------------------------------------------------------- */
function ContactField() {
  return (
    <section className="mm-section" aria-labelledby="cta-title">
      <Container>
        <Rule />
        <div className="grid gap-8 pt-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 id="cta-title" className="max-w-[18ch]">
              Tell me what you need built.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-mm-text-muted">
              Send a short description of the problem and I will reply with a concrete next step.
            </p>
            <div className="mt-6">
              <Link to="/contact" className="mm-btn mm-btn-accent">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Preye Tekenah — Software Engineer & Full-Stack Developer | Majeek Media"
        description="Preye Tekenah is a full-stack software engineer building web platforms, mobile applications and SaaS products. React, Next.js, React Native, PHP, Supabase."
        path="/"
      />

      <Hero />
      <CapabilityStrip />
      <SelectedWork />
      <Expertise />
      <Mobile />
      <Process />
      <AboutStrip />
      <ContactField />
    </>
  );
}
