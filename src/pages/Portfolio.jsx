import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ButtonLink } from "../components/Button.jsx";
import { projects } from "../data/projects.js";
import { ListChecks, UserCog, Target, Cpu, ShieldAlert, ExternalLink, Images } from "lucide-react";

function SectionLabel({ Icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-accent-700 dark:text-accent-50" />
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-2 space-y-2 text-sm">
      {items.map((x) => (
        <li key={x} className="flex gap-2 text-slate-700 dark:text-slate-200">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-600" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function ScreenshotStrip({ images = [], title }) {
  if (!images.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-900 dark:bg-slate-900/30">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Screenshots will be added.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="max-w-full overflow-x-auto overscroll-x-contain">
        <div className="flex flex-nowrap gap-3 p-3 snap-x snap-mandatory">
          {images.map((src, idx) => (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="snap-start shrink-0 block"
              title={`Open screenshot ${idx + 1} for ${title}`}
            >
              <img
                src={src}
                alt={`${title} screenshot ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="
                  block h-44 sm:h-48 object-cover rounded-lg
                  border border-slate-100 bg-white
                  dark:border-slate-900 dark:bg-slate-950
                  w-[78vw] max-w-[360px]
                "
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-100 p-6 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{p.type}</p>
        </div>

        {p.demoUrl ? (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold
                       text-slate-900 hover:bg-slate-50 transition
                       dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <ExternalLink size={16} />
            View Demo
          </a>
        ) : null}
      </div>

      <div className="mt-5">
        <ScreenshotStrip images={p.images} title={p.title} />
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Tip: click a screenshot to open full size.
        </p>
      </div>

      {p.summary ? (
        <p className="mt-4 text-slate-700 dark:text-slate-200">{p.summary}</p>
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
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{p.outcome}</p>
        </div>
      ) : null}

      {p.tech?.length ? (
        <div className="mt-5">
          <SectionLabel Icon={Cpu} title="Tech" />
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{p.tech.join(" + ")}</p>
        </div>
      ) : null}

      {p.note ? (
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-900 dark:bg-slate-900/40">
          <div className="flex items-start gap-2">
            <ShieldAlert size={18} className="text-accent-700 dark:text-accent-50 mt-0.5" />
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <span className="font-medium text-slate-900 dark:text-white">Note:</span> {p.note}
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

      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}