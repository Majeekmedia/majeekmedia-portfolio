import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { Button } from "../components/Button.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { Mail, MessageCircle, Clock } from "lucide-react";

function OptionCard({ Icon, title, children }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-2">
          <Icon size={18} className="text-vibrant" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-black">{title}</div>
          <div className="mt-1 text-sm text-gray-700">{children}</div>
        </div>
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

    const { error } = await supabase.from("leads").insert([{ name, email, message }]);

    if (error) {
      setStatus({
        state: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
      return;
    }

    setForm({ name: "", email: "", message: "" });
    setStatus({ state: "success", message: "Message sent successfully. We’ll get back to you shortly." });
  }

  const email = "majeekmediaconcept@gmail.com";
  const whatsappLink = "https://wa.me/2349038787850";

  return (
    <>
      <Seo
        title="Contact — Majeek Media"
        description="Start a project with Majeek Media. Send a message and we’ll respond with next steps."
        path="/contact"
      />

      <PageHeader
        title="Contact"
        subtitle="Tell us what you’re building. We’ll respond with clear next steps."
      />

      <section className="pb-16 bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="card-light">
                <h2 className="text-lg font-semibold text-black">Send a message</h2>

                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-2 w-full min-h-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none
                                 focus:ring-2 focus:ring-vibrant text-black"
                      placeholder="Briefly describe what you want to build, timelines, and key requirements."
                    />
                  </div>

                  <Button type="submit" disabled={status.state === "loading"}>
                    {status.state === "loading" ? "Sending..." : "Send Message"}
                  </Button>

                  {status.state === "success" ? (
                    <p className="text-sm text-green-700 dark:text-green-400">{status.message}</p>
                  ) : null}
                  {status.state === "error" ? (
                    <p className="text-sm text-red-700 dark:text-red-400">{status.message}</p>
                  ) : null}
                </form>
              </div>

              <div className="card-light">
                <h2 className="text-lg font-semibold text-black">Other contact options</h2>

                <div className="mt-5 space-y-4">
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

                  <OptionCard Icon={Clock} title="Response time">
                    Typically within 24–48 hours (remote).
                  </OptionCard>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}