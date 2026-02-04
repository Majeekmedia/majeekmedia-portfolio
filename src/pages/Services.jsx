import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ButtonLink } from "../components/Button.jsx";
import { Code, Rocket, Layers, CheckCircle2, Lightbulb, Wrench, TestTube, Globe } from "lucide-react";

function ServiceCard({ Icon, title, description }) {
  return (
    <div className="card-light group hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-3 group-hover:bg-vibrant group-hover:border-vibrant transition-all duration-300">
          <Icon size={24} className="text-vibrant group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
          <p className="text-gray-800 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-vibrant flex items-center justify-center">
          <span className="text-white font-bold text-lg">{number}</span>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
}

function TechBadge({ name }) {
  return (
    <span className="px-4 py-2 rounded-lg bg-black/5 hover:bg-vibrant hover:text-white text-black font-medium text-sm transition-all duration-200">
      {name}
    </span>
  );
}

export default function Services() {
  const services = [
    {
      Icon: Code,
      title: "Web Application Development",
      description: "Full-stack web applications built with modern frameworks like React and Node.js. Scalable, maintainable, and built for growth."
    },
    {
      Icon: Layers,
      title: "Custom Dashboard Solutions",
      description: "Admin panels and data visualization dashboards tailored to your business needs with real-time analytics and reporting."
    },
    {
      Icon: Rocket,
      title: "MVP & Startup Platforms",
      description: "Fast, focused development to get your idea to market. Core features first, iterate based on real user feedback."
    },
    {
      Icon: Globe,
      title: "API Integration & Backend",
      description: "RESTful APIs, database design, and third-party integrations. Secure, performant backend architecture."
    }
  ];

  const process = [
    {
      number: 1,
      title: "Discovery & Planning",
      description: "We discuss your goals, requirements, and timeline. I'll outline the technical approach and project scope."
    },
    {
      number: 2,
      title: "Design & Development",
      description: "Iterative development with regular check-ins. You'll see progress early and often as features come to life."
    },
    {
      number: 3,
      title: "Testing & Refinement",
      description: "Thorough testing across devices and browsers. We refine based on feedback to ensure everything works perfectly."
    },
    {
      number: 4,
      title: "Launch & Support",
      description: "Deployment to production with documentation. Post-launch support to ensure smooth operations."
    }
  ];

  const technologies = [
    "React", "Node.js", "Supabase", "PostgreSQL", 
    "Tailwind CSS", "Vite", "REST APIs", "Git"
  ];

  return (
    <>
      <Seo
        title="Services — Majeek Media"
        description="Custom web development services for startups and businesses. MVPs, dashboards, and scalable platforms built with modern technology."
        path="/services"
      />

      <PageHeader
        title="Services"
        subtitle="Custom web development tailored to your business needs — built to scale, designed to perform."
      />

      {/* What I Do Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                What I <span className="text-vibrant">Build</span>
              </h2>
              <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                From MVPs to enterprise platforms, I create web solutions that solve real problems and drive business growth.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* My Process Section */}
      <section className="py-12 bg-black">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                How I <span className="text-vibrant">Work</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                A straightforward, collaborative process focused on delivering results.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              {process.map((step) => (
                <div key={step.number} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <ProcessStep {...step} />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Technologies Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                Technologies I <span className="text-vibrant">Use</span>
              </h2>
              <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                Modern, proven tech stack for building fast, reliable applications.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why Work With Me Section */}
      <section className="py-12 bg-black">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Why Work <span className="text-vibrant">With Me</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vibrant/10 border border-vibrant/20 mb-4">
                  <CheckCircle2 className="text-vibrant" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality First</h3>
                <p className="text-white/70">Clean, maintainable code built to last. No shortcuts, just solid engineering.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vibrant/10 border border-vibrant/20 mb-4">
                  <Lightbulb className="text-vibrant" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Clear Communication</h3>
                <p className="text-white/70">Regular updates, transparent progress. You're always in the loop.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vibrant/10 border border-vibrant/20 mb-4">
                  <Rocket className="text-vibrant" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Built to Scale</h3>
                <p className="text-white/70">Architecture designed to grow with your business, not hold it back.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                Ready to Start Your <span className="text-vibrant">Project?</span>
              </h2>
              <p className="text-lg text-gray-800 mb-8">
                Let's discuss your idea and create a custom solution tailored to your needs and budget.
              </p>
              <ButtonLink to="/contact" variant="vibrant" className="pulse-glow">
                Get in Touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}