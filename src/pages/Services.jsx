import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Zap, BarChart3, Settings, Wrench, Server } from "lucide-react";

function Tier({ name, bullets, price, Icon }) {
  return (
    <div className="card-light">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-2">
          <Icon size={18} className="text-vibrant" />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          {price ? <p className="mt-2 text-sm text-gray-700">{price}</p> : null}
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-gray-800">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-vibrant" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Addon({ Icon, title }) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-800">
      <Icon size={18} className="text-vibrant mt-0.5" />
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

      <section className="pb-16 bg-white">
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

            <div className="mt-10 card-light">
              <h3 className="text-lg font-semibold text-black">Add-ons</h3>
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