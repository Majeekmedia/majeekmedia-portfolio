import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Zap, BarChart3, Settings, Wrench, Server } from "lucide-react";

function Tier({ name, bullets, price, Icon }) {
  return (
    <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <Icon size={18} className="text-accent-700 dark:text-accent-50" />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{name}</h3>
          {price ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{price}</p> : null}
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-slate-700 dark:text-slate-200">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-600" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Addon({ Icon, title }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
      <Icon size={18} className="text-accent-700 dark:text-accent-50 mt-0.5" />
      <span>{title}</span>
    </li>
  );
}

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Majeek Media"
        description="MVPs, growth platforms, and custom systems built with modern architecture."
        path="/services"
      />

      <PageHeader
        title="Services"
        subtitle="Custom, system-driven development for startups and businesses — built to scale."
      />

      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-3">
              <Tier
                Icon={Zap}
                name="Starter / MVP"
                price="₦1.2m – ₦1.8m • $1,800 – $3,000"
                bullets={["Core features only", "Auth & dashboard", "Fast delivery"]}
              />
              <Tier
                Icon={BarChart3}
                name="Growth Platform"
                price="₦2.5m – ₦4.5m • $4,000 – $8,000"
                bullets={["Advanced workflows", "Admin analytics", "Role-based access"]}
              />
              <Tier
                Icon={Settings}
                name="Scale / Custom Systems"
                price="₦5m+ • $10,000+"
                bullets={["Full architecture", "Custom APIs", "Performance optimisation"]}
              />
            </div>

            <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-950">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add-ons</h3>
              <ul className="mt-4 space-y-3">
                <Addon Icon={Wrench} title="Monthly maintenance" />
                <Addon Icon={Server} title="Hosting & infrastructure support" />
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}