import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Button } from "../components/Button.jsx";
import emailjs from '@emailjs/browser';
import { Mail, MessageCircle, Clock, Zap, Target, Headphones, CheckCircle2 } from "lucide-react";

function OptionCard({ Icon, title, children }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-2">
          <Icon size={18} className="text-vibrant" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-black">{title}</div>
          <div className="mt-1 text-sm text-black">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ Icon, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vibrant/10 border border-vibrant/20 mb-4">
        <Icon className="text-vibrant" size={32} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
}

function ProcessCard({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-vibrant flex items-center justify-center">
          <span className="text-white font-bold">{number}</span>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-black mb-1">{title}</h4>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const emailOk = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "idle", message: "" });

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus({ state: "error", message: "Please fill in all fields." });
      return;
    }
    if (!emailOk) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ state: "loading", message: "" });

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_nsb8gq9',      // Service ID
        'template_iv95phv',     // Template ID
        {
          from_name: name,
          user_email: email,
          message: message,
          sent_date: new Date().toLocaleString()
        },
        'L2gBGUmcgMb6baZiH'     // Public Key
      );

      setForm({ name: "", email: "", message: "" });
      setStatus({ state: "success", message: "Message sent successfully. We'll get back to you shortly." });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        state: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    }
  }

  const email = "contact@majeekmedia.com";
  const whatsappLink = "https://wa.me/2349038787850";

  return (
    <>
      <Seo
        title="Contact — Majeek Media"
        description="Start a project with Majeek Media. Send a message and we'll respond with clear next steps."
        path="/contact"
      />

      <PageHeader
        title="Get in Touch"
        subtitle="Ready to start your project? Let's discuss your idea and turn it into reality."
      />

      {/* Contact Form & Options Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="card-light">
                <h2 className="text-2xl font-bold text-black mb-2">Send a Message</h2>
                <p className="text-black mb-6">
                  Tell me about your project and I'll get back to you within 24-48 hours.
                </p>

                <form className="space-y-5" onSubmit={onSubmit}>
                  <div>
                    <label className="text-sm font-semibold text-black">Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black transition-all
                                 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:text-black
                                 [&:-webkit-autofill]:[-webkit-text-fill-color:black]
                                 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset]"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-black">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black transition-all
                                 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:text-black
                                 [&:-webkit-autofill]:[-webkit-text-fill-color:black]
                                 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset]"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-black">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-2 w-full min-h-32 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black transition-all resize-none"
                      placeholder="Briefly describe your project, timeline, and key requirements..."
                    />
                  </div>

                  <Button type="submit" disabled={status.state === "loading"} className="w-full !py-4 text-base">
                    {status.state === "loading" ? "Sending..." : "Send Message"}
                  </Button>

                  {status.state === "success" ? (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-800">{status.message}</p>
                    </div>
                  ) : null}
                  {status.state === "error" ? (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-sm text-red-800">{status.message}</p>
                    </div>
                  ) : null}
                </form>
              </div>

              {/* Contact Options */}
              <div className="card-light">
                <h2 className="text-2xl font-bold text-black mb-2">Other Ways to Reach Me</h2>
                <p className="text-black mb-6">
                  Prefer a different method? Here are more ways to get in touch.
                </p>

                <div className="space-y-4">
                  <OptionCard Icon={Mail} title="Email">
                    <a className="font-medium text-vibrant hover:underline" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </OptionCard>

                  <OptionCard Icon={MessageCircle} title="WhatsApp">
                    <a
                      className="font-medium text-vibrant hover:underline"
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </OptionCard>

                  <OptionCard Icon={Clock} title="Response Time">
                    Typically within 24–48 hours during business days.
                  </OptionCard>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Why Contact Me Section */}
      <section className="py-12 bg-black">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Why Work <span className="text-vibrant">With Me?</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <ValueCard
                Icon={Zap}
                title="Fast Response"
                description="Quick turnaround on quotes and clear communication throughout the project."
              />
              <ValueCard
                Icon={Target}
                title="Focused Solutions"
                description="I focus on solving your specific problems, not selling unnecessary features."
              />
              <ValueCard
                Icon={Headphones}
                title="Ongoing Support"
                description="Post-launch support to ensure everything runs smoothly as your platform grows."
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                  What to <span className="text-vibrant">Expect</span>
                </h2>
                <p className="text-lg text-black">
                  Here's what happens after you reach out:
                </p>
              </div>

              <div className="space-y-6">
                <div className="card-light">
                  <ProcessCard
                    number="1"
                    title="Initial Response"
                    description="I'll respond within 24-48 hours to acknowledge your message and ask any clarifying questions."
                  />
                </div>
                <div className="card-light">
                  <ProcessCard
                    number="2"
                    title="Discovery Call"
                    description="We'll schedule a call to discuss your project requirements, timeline, and budget in detail."
                  />
                </div>
                <div className="card-light">
                  <ProcessCard
                    number="3"
                    title="Custom Proposal"
                    description="You'll receive a detailed proposal outlining the scope, timeline, and investment for your project."
                  />
                </div>
                <div className="card-light">
                  <ProcessCard
                    number="4"
                    title="Let's Build"
                    description="Once approved, we kick off development with clear milestones and regular updates."
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}