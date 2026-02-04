import Container from "../components/Container.jsx";
import { ButtonLink } from "../components/Button.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Code, Database, Server, Wrench } from "lucide-react";

function SkillCategory({ title, skills, highlight }) {
  return (
    <div className="card-light text-center">
      <h3 className="text-xl font-bold text-black mb-4">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-vibrant">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-sm font-medium bg-black/5 text-black hover:bg-vibrant hover:text-black transition-all duration-200"
          >
            {skill}
          </span>
        ))}
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

      {/* Hero Section - BLACK BACKGROUND */}
      <section className="section relative overflow-hidden bg-black">
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
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

      {/* About Me Section - WHITE BACKGROUND */}
      <section className="section-sm bg-white">
        <Container>
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">
                A BIT <span className="text-vibrant">ABOUT ME</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                I'm a full-stack developer specializing in building modern web applications 
                that solve real-world problems. With expertise spanning front-end frameworks 
                like React to robust back-end solutions using Node.js and Supabase, I create 
                scalable platforms tailored to business needs. Every project is an opportunity 
                to blend creativity with technical excellence.
              </p>
              <ButtonLink to="/about" variant="vibrant">
                Read More About Me
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Skills Section - WHITE BACKGROUND */}
      <section className="section-sm bg-white border-t border-gray-100">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                I SPECIALIZE IN A RANGE OF 💪{" "}
                <span className="text-vibrant">SKILLS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SkillCategory
                title="Front-End Development"
                skills={["HTML", "CSS", "JavaScript", "React"]}
                highlight="Front-End"
              />
              <SkillCategory
                title="Back-End Development"
                skills={["Node.js", "PHP", "Supabase"]}
                highlight="Back-End"
              />
              <SkillCategory
                title="Database Management"
                skills={["MySQL", "PostgreSQL", "Supabase"]}
                highlight="Database"
              />
              <SkillCategory
                title="Tools & Workflow"
                skills={["Git", "Vite", "Tailwind CSS", "REST APIs"]}
                highlight="Tools"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Projects Preview - WHITE BACKGROUND */}
      <section className="section-sm bg-white border-t border-gray-100">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                HERE'S A GLIMPSE OF{" "}
                <span className="text-vibrant">SOME RECENT PROJECTS</span>
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Selected work showcasing real-world applications, from e-commerce platforms to custom dashboards.
              </p>
            </div>

            {/* Project Grid - We'll populate this with actual data later */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Placeholder for projects - will update when you provide project info */}
              <div className="card-light overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 mb-4 rounded-xl"></div>
                <h3 className="text-lg font-bold text-black mb-2">Sample Project</h3>
                <p className="text-sm text-gray-600 mb-3">Brief project description goes here</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-black/5 rounded text-xs text-black">React</span>
                  <span className="px-2 py-1 bg-black/5 rounded text-xs text-black">Supabase</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <ButtonLink to="/portfolio" variant="vibrant">
                View All Projects
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA Section - BLACK BACKGROUND */}
      <section className="section bg-black">
        <Container>
          <Reveal>
            <div className="card-dark border-2 border-vibrant/20 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-vibrant/10 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 lg:p-12">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
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