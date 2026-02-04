import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ButtonLink } from "../components/Button.jsx";
import { Code, Database, Layers, Zap, CheckCircle2, MapPin, Mail, MessageSquare } from "lucide-react";

function SkillCard({ Icon, title, items }) {
  return (
    <div className="card-light">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-3">
          <Icon size={24} className="text-vibrant" />
        </div>
        <h3 className="text-xl font-bold text-black">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-black">
            <CheckCircle2 size={16} className="text-vibrant mt-1 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-extrabold text-vibrant mb-2">{number}</div>
      <div className="text-white/80">{label}</div>
    </div>
  );
}

export default function About() {
  const skills = {
    frontend: {
      title: "Frontend Development",
      items: ["React & Modern JavaScript", "Responsive UI/UX Design", "Tailwind CSS & Styling", "State Management"]
    },
    backend: {
      title: "Backend & Database",
      items: ["Node.js & Express", "Supabase & PostgreSQL", "RESTful APIs", "Authentication & Security"]
    },
    tools: {
      title: "Tools & Workflow",
      items: ["Git & Version Control", "Vite Build Tools", "Testing & Debugging", "Deployment & CI/CD"]
    }
  };

  return (
    <>
      <Seo
        title="About — Majeek Media"
        description="Full-stack developer specializing in modern web applications. Building scalable platforms for startups and businesses with React, Node.js, and Supabase."
        path="/about"
      />

      <PageHeader
        title="About Me"
        subtitle="Building modern web applications that solve real problems and drive business growth."
      />

      {/* Who I Am Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* Profile Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl border-2 border-vibrant/20">
                    <img
                      src="/images/hero/profile.png"
                      alt="Preye Tekenah - Majeek Media Founder"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-vibrant/10 rounded-full blur-3xl -z-10" />
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">
                  Hi, I'm <span className="text-vibrant">Preye Tekenah</span>
                </h2>
                <div className="space-y-4 text-black leading-relaxed">
                  <p className="text-lg text-black">
                    I'm a <strong>full-stack developer</strong> specializing in building modern web applications 
                    that solve real-world problems. With expertise spanning front-end frameworks 
                    like React to robust back-end solutions using Node.js and Supabase, I create 
                    scalable platforms tailored to business needs.
                  </p>
                  <p className="text-black">
                    Every project is an opportunity to blend <strong>creativity with technical excellence</strong>. 
                    I focus on writing clean, maintainable code and building systems designed to grow 
                    with your business—not hold it back.
                  </p>
                  <p className="text-black">
                    Based in <strong>Nigeria</strong>, I work remotely with startups and businesses worldwide, 
                    turning complex ideas into functional, user-friendly platforms using modern technology stacks.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-vibrant/5 border border-vibrant/20 p-2">
                      <MapPin size={20} className="text-vibrant" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">Location</div>
                      <div className="font-bold text-black">Nigeria</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-vibrant/5 border border-vibrant/20 p-2">
                      <Zap size={20} className="text-vibrant" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">Availability</div>
                      <div className="font-bold text-black">Remote Work</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Experience Stats Section */}
      <section className="py-12 bg-black">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Experience <span className="text-vibrant">By The Numbers</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StatCard number="4+" label="Years Experience" />
              <StatCard number="20+" label="Projects Delivered" />
              <StatCard number="100%" label="Client Satisfaction" />
              <StatCard number="24/7" label="Support Available" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Skills & Expertise Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                Skills & <span className="text-vibrant">Expertise</span>
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                A comprehensive skill set to build complete, production-ready web applications.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <SkillCard Icon={Code} title={skills.frontend.title} items={skills.frontend.items} />
              <SkillCard Icon={Database} title={skills.backend.title} items={skills.backend.items} />
              <SkillCard Icon={Layers} title={skills.tools.title} items={skills.tools.items} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What I Believe Section */}
      <section className="py-12 bg-black">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-center">
                What I <span className="text-vibrant">Believe</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Quality Over Speed</h3>
                  <p className="text-white/80">
                    Rushing leads to technical debt. I prioritize building it right the first time, 
                    with clean code and solid architecture that stands the test of time.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Communication is Key</h3>
                  <p className="text-white/80">
                    Regular updates, transparent progress tracking, and clear documentation ensure 
                    you're always in the loop and projects stay on track.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Built for Growth</h3>
                  <p className="text-white/80">
                    Every system I build is designed to scale. Your business will grow, and your 
                    platform should empower that growth, not limit it.
                  </p>
                </div>
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
                Let's Build <span className="text-vibrant">Something Great</span>
              </h2>
              <p className="text-lg text-black mb-8">
                Have a project in mind? I'd love to hear about it and explore how we can work together.
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