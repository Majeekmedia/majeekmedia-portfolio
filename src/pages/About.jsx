import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import Plate from "../components/Plate.jsx";

/**
 * About.
 *
 * Rewritten to the brief's positioning: Software Engineer | Full-Stack
 * Developer | SaaS Builder, in a confident and technically specific voice.
 *
 * REMOVED from the previous version:
 *  - The invented stat row: "4+ Years", "20+ Projects Delivered",
 *    "100% Client Satisfaction", "24/7 Support Available". None was sourced,
 *    and "100% client satisfaction" is not a claim anyone can substantiate.
 *    The owner chose to label client-reported figures rather than drop them, so
 *    the figures that remain are marked as reported.
 *  - "Every project is an opportunity to blend creativity with technical
 *    excellence." Generic, and banned by the brief.
 */

const PRINCIPLES = [
  {
    index: "01",
    title: "The data model is the decision",
    body: "Schema and access rules get settled first, because they are what is expensive to change once there is real data in the system. Interface is easier to revise than a table with production rows in it.",
  },
  {
    index: "02",
    title: "Access control is not a feature",
    body: "In anything multi-tenant, a missing policy is a data breach rather than a bug. Row-Level Security is implemented and tested as part of the schema, not bolted on afterwards.",
  },
  {
    index: "03",
    title: "Empty states and errors are part of the build",
    body: "Most prototypes stop at the happy path. Loading, empty and failure states are where products actually lose people, so they are designed rather than defaulted.",
  },
  {
    index: "04",
    title: "Handover matters",
    body: "Code is written to be read by whoever comes next, with the reasoning documented. A system only one person can safely change is a liability, not an asset.",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Preye Tekenah — Software Engineer | Majeek Media"
        description="Preye Tekenah is a full-stack software engineer building web platforms, mobile applications and SaaS products under the name Majeek Media."
        path="/about"
      />

      <section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              {/*
                The NAME is the h1 here.

                "Preye Tekenah" is what people search for, and this is the page
                that is about him. An earlier version made the h1 "Software
                engineer building complete products", which read well but put the
                searchable name nowhere in the page's most important heading.
                The positioning line still follows, directly beneath it.
              */}
              <h1 className="max-w-[18ch]">Preye Tekenah</h1>
              <p className="mt-4 text-xl text-mm-text md:text-2xl">
                Software engineer building complete products.
              </p>
              <p className="mt-8 max-w-[52ch] text-lg text-mm-text-muted">
                I work across the whole stack: database schema and access rules, backend and API
                work, interface, and the deployment that keeps it running. I build under the name
                Majeek Media.
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Plate
                src="/images/hero/profile.png"
                alt="Preye Tekenah, software engineer"
                ratio={{ width: 819, height: 1024 }}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/5] w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="mm-section border-t border-mm-line">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="mm-label md:col-span-3">Background</h2>

            <div className="md:col-span-8">
              <p className="text-lg text-mm-text-muted">
                I build for startups and businesses that need software to actually run, not a
                prototype to demo. That has meant multi-tenant estate management with strict
                per-tenant data isolation, a trading interface where order state and balances
                have to be represented accurately at every moment, and internal systems that
                replace spreadsheets people were genuinely relying on.
              </p>
              <p className="mt-6 text-mm-text-muted">
                Most of my work is React and TypeScript on the front end, with Supabase or
                PostgreSQL behind it, and PHP or Node.js where the project calls for it. On
                mobile I build with React Native and Expo.
              </p>
              <p className="mt-6 text-mm-text-muted">
                I am based in Nigeria and work remotely with teams and clients elsewhere.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="mm-section border-t border-mm-line" aria-labelledby="principles-title">
        <Container>
          <h2 id="principles-title" className="mb-12 max-w-[20ch]">
            How I approach the work
          </h2>

          <div className="border-t border-mm-line">
            {PRINCIPLES.map((p) => (
              <Reveal key={p.index}>
                <div className="grid gap-4 border-b border-mm-line py-8 md:grid-cols-12 md:gap-8">
                  <span className="mm-index md:col-span-1" aria-hidden="true">
                    {p.index}
                  </span>
                  <h3 className="text-xl md:col-span-4 md:text-2xl">{p.title}</h3>
                  <p className="text-mm-text-muted md:col-span-7">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="mm-section border-t border-mm-line">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="mm-label md:col-span-3">Details</h2>
            <dl className="md:col-span-8">
              {[
                ["Based", "Nigeria, working remotely"],
                ["Focus", "Web platforms, mobile applications, SaaS products"],
                ["Core stack", "React, TypeScript, Supabase, PostgreSQL, PHP, React Native"],
                ["Email", "contact@majeekmedia.com"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[8rem_1fr] gap-4 border-b border-mm-line py-4 last:border-b-0"
                >
                  <dt className="mm-label">{label}</dt>
                  <dd className="text-small text-mm-text-muted">
                    {label === "Email" ? (
                      <a href="mailto:contact@majeekmedia.com" className="mm-underline text-mm-accent">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="mm-section border-t border-mm-line">
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
