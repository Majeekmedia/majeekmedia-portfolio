import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionIndex from "../components/SectionIndex.jsx";
import { process } from "../data/projects.js";

/**
 * Services.
 *
 * Rebuilt around what is actually delivered rather than around four equal
 * icon cards. Each service is a numbered entry with a description and a
 * concrete list of what it includes, so a visitor can judge scope.
 */

const SERVICES = [
  {
    index: "01",
    title: "Web platforms",
    body: "Full-stack applications built to run in production: authentication, access control, data modelling, admin surfaces and deployment.",
    includes: [
      "React, Next.js and Vite front ends",
      "PHP and Node.js back ends",
      "REST API design and integration",
      "Role-based access control",
      "Admin dashboards and internal tools",
    ],
  },
  {
    index: "02",
    title: "Mobile applications",
    body: "Cross-platform iOS and Android apps on React Native and Expo, from authenticated sessions through to release builds.",
    includes: [
      "Shared logic across both platforms",
      "Authentication and secure storage",
      "Offline-tolerant data handling",
      "Native modules and permissions",
      "App store submission",
    ],
  },
  {
    index: "03",
    title: "SaaS products",
    body: "Multi-tenant products with subscription billing, where the same codebase has to serve many customers without their data touching.",
    includes: [
      "Multi-tenancy and data isolation",
      "Subscription billing with Stripe and Paystack",
      "Row-Level Security policies",
      "Usage and plan management",
      "Onboarding and account lifecycle",
    ],
  },
  {
    index: "04",
    title: "Backend and integration",
    body: "The unglamorous layer that decides whether a product holds up: schema design, migrations, third-party services and payment flows.",
    includes: [
      "PostgreSQL and Supabase schema design",
      "Migrations and data integrity",
      "Payment gateway integration",
      "Third-party API integration",
      "VPS and cloud deployment",
    ],
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Preye Tekenah | Majeek Media"
        description="Web platforms, mobile applications, SaaS products and backend integration by Preye Tekenah, a full-stack software engineer."
        path="/services"
      />

      <section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="max-w-[16ch]">What I build</h1>
              <p className="mt-6 text-lg text-mm-text-muted">
                Four kinds of work, mostly in combination. Scope is agreed in writing before
                anything else happens.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="border-t border-mm-line">
          {SERVICES.map((service) => (
            <Reveal key={service.index}>
              <article className="grid gap-6 border-b border-mm-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
                <span className="mm-index md:col-span-1" aria-hidden="true">
                  {service.index}
                </span>

                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-3xl">{service.title}</h2>
                  <p className="mt-4 text-mm-text-muted">{service.body}</p>
                </div>

                <div className="md:col-span-5 md:col-start-8">
                  <h3 className="mm-label mb-4">Includes</h3>
                  <ul>
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="border-b border-mm-line py-3 text-small text-mm-text-muted last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Process — the same five stages as the homepage, stated once. */}
      <section className="mm-section border-t border-mm-line" aria-labelledby="process-title">
        <Container>
          <SectionIndex
            id="process-title"
            titleLines={["How an", "engagement runs"]}
            lead="The order matters. Data model before interface, hardening before launch."
          />

          <ol className="border-t border-mm-line">
            {process.map((step) => (
              <li
                key={step.index}
                className="grid gap-4 border-b border-mm-line py-6 md:grid-cols-12 md:gap-8"
              >
                <span className="mm-index md:col-span-1" aria-hidden="true">
                  {step.index}
                </span>
                <h3 className="text-lg md:col-span-3">{step.title}</h3>
                <p className="text-small text-mm-text-muted md:col-span-7">{step.body}</p>
              </li>
            ))}
          </ol>
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
