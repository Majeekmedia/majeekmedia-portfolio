import Container from "../components/Container.jsx";
import { ButtonLink } from "../components/Button.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Rocket, Layers, ShoppingCart, CheckCircle2 } from "lucide-react";

function Card({ title, desc, Icon }) {
  return (
    <div
      className="rounded-xl border border-slate-100 p-6 bg-white shadow-sm transition
                 hover:-translate-y-0.5 hover:shadow-soft
                 dark:border-slate-900 dark:bg-slate-950"
    >
      <div className="flex items-start gap-3">
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-2
                     dark:border-slate-800 dark:bg-slate-900"
        >
          <Icon className="text-accent-700 dark:text-accent-50" size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function WhyItem({ children }) {
  return (
    <li
      className="rounded-xl border border-slate-100 p-4 gap-2 flex items-start
                 bg-white shadow-sm dark:bg-slate-950 dark:border-slate-900"
    >
      <CheckCircle2 size={18} className="text-accent-700 dark:text-accent-50 mt-0.5" />
      <span className="text-slate-700 dark:text-slate-200">{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Majeek Media — Scalable Web Platforms for Businesses & Startups"
        description="Custom web applications using modern technology — from MVPs to full platforms."
        path="/"
      />

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
        <Container>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600
                         dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <span className="h-2 w-2 rounded-full bg-accent-600" />
              Custom platforms • MVPs • Dashboards
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              We Build Scalable Web Platforms for Businesses &amp; Startups
            </h1>

            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Custom web applications using modern technology — from MVPs to full platforms.
            </p>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              React • Supabase • VPS Infrastructure
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="primary">Start a Project</ButtonLink>
              <ButtonLink to="/portfolio" variant="secondary">View Our Work</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="py-14 border-t border-slate-100 dark:border-slate-900">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">What We Do</h2>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
              Majeek Media designs and develops custom web platforms for startups and growing businesses.
              We focus on performance, scalability, and long-term maintainability — not templates.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Services Preview */}
      <section className="py-14 border-t border-slate-100 dark:border-slate-900">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                Icon={Rocket}
                title="MVP Development"
                desc="Launch fast with core features, clean architecture, and room to scale."
              />
              <Card
                Icon={Layers}
                title="Custom Web Platforms"
                desc="System-driven web applications tailored to your business workflows."
              />
              <Card
                Icon={ShoppingCart}
                title="E-commerce & Dashboards"
                desc="Admin tooling, analytics, and secure dashboards built for daily use."
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why Majeek Media */}
      <section className="py-14 border-t border-slate-100 dark:border-slate-900">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Why Majeek Media</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              <WhyItem>Custom-built solutions</WhyItem>
              <WhyItem>Clear communication</WhyItem>
              <WhyItem>Modern tech stack</WhyItem>
              <WhyItem>Secure &amp; scalable deployment</WhyItem>
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-100 dark:border-slate-900">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-slate-100 bg-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-sm
                            dark:border-slate-900 dark:bg-slate-950">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Have a project in mind?</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Let’s build something solid.</p>
              </div>
              <ButtonLink to="/contact" variant="primary">Contact</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}