import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ButtonLink } from "../components/Button.jsx";
import ImageGallery from "../components/ImageGallery.jsx";
import { projects } from "../data/projects.js";
import { ListChecks, UserCog, Target, Cpu, ShieldAlert, ExternalLink } from "lucide-react";

function SectionLabel({ Icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-vibrant" />
      <h4 className="text-sm font-semibold text-black">{title}</h4>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-2 space-y-2 text-sm">
      {items.map((x) => (
        <li key={x} className="flex gap-2 text-black">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-vibrant" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="card-light">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-black">{p.title}</h3>
          <p className="text-sm text-vibrant font-medium">{p.type}</p>
        </div>

        {p.demoUrl ? (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-vibrant/20 bg-white px-3 py-2 text-sm font-semibold
                       text-vibrant hover:bg-vibrant/5 transition-all"
          >
            <ExternalLink size={16} />
            View Demo
          </a>
        ) : null}
      </div>

      <div className="mt-5">
        <ImageGallery images={p.images} title={p.title} />
      </div>

      {p.summary ? (
        <p className="mt-4 text-black leading-relaxed">{p.summary}</p>
      ) : null}

      {p.features?.length ? (
        <div className="mt-5">
          <SectionLabel Icon={ListChecks} title="Features" />
          <BulletList items={p.features} />
        </div>
      ) : null}

      {p.role?.length ? (
        <div className="mt-5">
          <SectionLabel Icon={UserCog} title="Role" />
          <BulletList items={p.role} />
        </div>
      ) : null}

      {p.outcome ? (
        <div className="mt-5">
          <SectionLabel Icon={Target} title="Outcome" />
          <p className="mt-2 text-sm text-black">{p.outcome}</p>
        </div>
      ) : null}

      {p.tech?.length ? (
        <div className="mt-5">
          <SectionLabel Icon={Cpu} title="Tech Stack" />
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                           bg-vibrant/5 text-vibrant border border-vibrant/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {p.note ? (
        <div className="mt-5 rounded-xl border border-vibrant/20 bg-vibrant/5 p-4">
          <div className="flex items-start gap-2">
            <ShieldAlert size={18} className="text-vibrant mt-0.5 flex-shrink-0" />
            <p className="text-sm text-black">
              <span className="font-medium">Note:</span> {p.note}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Portfolio() {
  return (
    <>
      <Seo
        title="Portfolio — Majeek Media"
        description="Real project experience presented as case summaries — systems, dashboards, and platforms."
        path="/portfolio"
      />

      <PageHeader
        title="Portfolio"
        subtitle="Selected work presented as case summaries — focused on systems, workflows, and outcomes."
      />

      {/* Projects Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="space-y-8">
              {projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Start <span className="text-vibrant">Your Project?</span>
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Let's discuss how I can help bring your ideas to life with clean code and scalable solutions.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <ButtonLink to="/contact" variant="vibrant" className="pulse-glow">
                  Get in Touch
                </ButtonLink>
                <ButtonLink to="/services" variant="secondary">
                  View Services
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}