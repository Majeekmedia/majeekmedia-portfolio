import Container from "../components/Container.jsx";
import { ButtonLink } from "../components/Button.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Code, Palette, Layers, ShoppingCart } from "lucide-react";

function SkillCard({ title, icon: Icon }) {
  return (
    <div className="card-light group cursor-pointer">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-xl bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
          <Icon size={32} className="text-black" />
        </div>
        <h3 className="text-lg font-bold text-black">{title}</h3>
      </div>
    </div>
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

      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20">
                <span className="accent-dot"></span>
                <span className="text-sm text-white/80">Available for Projects</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                CODING WITH{" "}
                <span className="text-vibrant-glow block mt-2">
                  A PASSION,
                </span>{" "}
                <span className="block mt-2">CREATING WITH</span>{" "}
                <span className="text-vibrant-glow block mt-2">PURPOSE</span>
              </h1>

              {/* Tagline */}
              <p className="text-xl text-white/70 leading-relaxed max-w-xl">
                Building scalable web platforms, custom dashboards, and MVPs for businesses and startups using modern technology stacks.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {["React", "Supabase", "Node.js", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="skill-badge">
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <ButtonLink to="/contact" variant="vibrant" className="pulse-glow">
                  Start a Project
                </ButtonLink>
                <ButtonLink to="/portfolio" variant="secondary">
                  View My Work
                </ButtonLink>
              </div>
            </div>

            {/* Right: Profile Image */}
            <div className="relative">
              <div className="relative z-10 float">
                <img
                  src="/images/hero/profile.png"
                  alt="Majeek Media Developer"
                  className="w-full max-w-md mx-auto lg:max-w-full rounded-3xl"
                />
              </div>
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant/20 to-transparent blur-3xl -z-10"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="section-sm">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                I SPECIALIZE IN A{" "}
                <span className="text-vibrant">RANGE OF SKILLS</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <SkillCard icon={Code} title="Web Development" />
              <SkillCard icon={Palette} title="UI/UX Design" />
              <SkillCard icon={Layers} title="Custom Platforms" />
              <SkillCard icon={ShoppingCart} title="E-commerce" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Projects Preview */}
      <section className="section-sm">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                HERE'S A GLIMPSE OF{" "}
                <span className="text-vibrant">SOME RECENT PROJECTS</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Selected work showcasing real-world applications, from e-commerce platforms to custom dashboards.
              </p>
            </div>

            {/* We'll update this section when we redesign the portfolio */}
            <div className="text-center pt-8">
              <ButtonLink to="/portfolio" variant="vibrant">
                View All Projects
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <Reveal>
            <div className="card-dark border-2 border-vibrant/20 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant/10 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 lg:p-12">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    LET'S WORK{" "}
                    <span className="text-vibrant">TOGETHER</span>
                  </h2>
                  <p className="text-white/70 text-lg">
                    Have a project in mind? Let's build something exceptional.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <ButtonLink to="/contact" variant="vibrant" className="pulse-glow text-lg px-8 py-4">
                    Get In Touch
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}