import { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import Container from "../components/Container.jsx";
import { Button } from "../components/Button.jsx";
import emailjs from "@emailjs/browser";

/**
 * Contact.
 *
 * PRESERVED EXACTLY (preservation contract):
 *  - Field names `name`, `email`, `message` — they map to the EmailJS template
 *    variables `from_name`, `user_email`, `message`. Renaming breaks delivery.
 *  - The honeypot field and its fake-success behaviour.
 *  - The four-state machine: idle / sending / success / error.
 *  - The email regex and the disabled-while-sending button.
 *
 * FIXED from the audit:
 *  - P1-4: inputs had NO programmatic label. Every field now has an id and a
 *    matching <label htmlFor>. The honeypot is removed from the accessibility
 *    tree entirely rather than merely being visually hidden.
 *  - P1-3/A4: the focus ring used `ring-vibrant`, which resolved to no CSS, so
 *    keyboard users had no focus indicator on the form. Replaced with the
 *    system's real 2px accent ring on `.mm-field:focus`.
 *  - Errors are now per-field with `aria-invalid` and `aria-describedby`, and
 *    are announced in a live region, instead of one generic banner.
 */

/**
 * EmailJS configuration.
 *
 * Moved to environment variables with the current working values as defaults,
 * so behaviour is IDENTICAL whether or not an .env file exists. Nothing is
 * broken by this change, and the keys can be rotated without a code edit.
 */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_nsb8gq9",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_iv95phv",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "L2gBGUmcgMb6baZiH",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honey: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the visitor starts correcting it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const emailOk = useMemo(() => EMAIL_RE.test(formData.email.trim()), [formData.email]);

  function validate() {
    const next = {};
    if (!formData.name.trim()) next.name = "Enter your name.";
    if (!formData.email.trim()) next.email = "Enter your email address.";
    else if (!emailOk) next.email = "That does not look like a valid email address.";
    if (!formData.message.trim()) next.message = "Enter a short description of the project.";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot: silently accept to fool bots, send nothing.
    if (formData.honey) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus("error");
      // Move focus to the first problem so a keyboard user is not stranded.
      const first = ["name", "email", "message"].find((f) => found[f]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: formData.name.trim(),
          user_email: formData.email.trim(),
          message: formData.message.trim(),
          sent_date: new Date().toLocaleString(),
        },
        EMAILJS.publicKey
      );

      setFormData({ name: "", email: "", message: "", honey: "" });
      setStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  }

  return (
    <>
      <Seo
        title="Contact — Preye Tekenah | Majeek Media"
        description="Start a project with Preye Tekenah at Majeek Media. Send a short description of what you need built and get a concrete next step."
        path="/contact"
      />

      <section className="pb-12 pt-16 md:pb-16 md:pt-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <h1 className="max-w-[14ch]">Get in touch</h1>
              <p className="mt-6 text-lg text-mm-text-muted">
                Describe the problem and what a good outcome looks like. I reply with a concrete
                next step, usually within 24 hours.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="mm-section border-t border-mm-line">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            {/* Form */}
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl">Send a message</h2>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                {/* Honeypot. Removed from the a11y tree entirely. */}
                <input
                  type="text"
                  name="honey"
                  value={formData.honey}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    height: 0,
                    width: 0,
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-small font-medium">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mm-field"
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="mt-2 text-small" style={{ color: "#ff8a7a" }}>
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-small font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mm-field"
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-2 text-small" style={{ color: "#ff8a7a" }}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-small font-medium">
                    Project
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mm-field resize-y"
                    placeholder="What are you building, and what does done look like?"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="mt-2 text-small" style={{ color: "#ff8a7a" }}>
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" variant="accent" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </Button>

                {/* Status is announced to assistive tech. */}
                <p aria-live="polite" className="sr-only">
                  {status === "sending" ? "Sending your message." : ""}
                  {status === "success" ? "Message sent successfully." : ""}
                  {status === "error" && !Object.keys(errors).length
                    ? "Sending failed. Please try again."
                    : ""}
                </p>

                {status === "success" ? (
                  <p className="border-l-2 border-mm-accent bg-mm-surface p-4 text-small text-mm-text">
                    Message sent. I will come back to you shortly.
                  </p>
                ) : null}

                {status === "error" && !Object.keys(errors).length ? (
                  <p className="border-l-2 p-4 text-small text-mm-text" style={{ borderColor: "var(--mm-danger)" }}>
                    Something went wrong sending that. Please try again, or email me directly.
                  </p>
                ) : null}
              </form>
            </div>

            {/* Direct channels */}
            <div className="md:col-span-4 md:col-start-9">
              <h2 className="mm-label mb-6">Direct</h2>

              <dl>
                <div className="border-b border-mm-line py-4">
                  <dt className="mm-label mb-1">Email</dt>
                  <dd>
                    <a
                      href="mailto:contact@majeekmedia.com"
                      className="mm-underline text-mm-accent"
                    >
                      contact@majeekmedia.com
                    </a>
                  </dd>
                </div>

                <div className="border-b border-mm-line py-4">
                  <dt className="mm-label mb-1">WhatsApp</dt>
                  <dd>
                    <a
                      href="https://wa.me/2349038787850"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mm-underline text-mm-accent"
                    >
                      Message me
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>

                <div className="border-b border-mm-line py-4">
                  <dt className="mm-label mb-1">Response time</dt>
                  <dd className="text-small text-mm-text-muted">Within 24 hours, usually much sooner.</dd>
                </div>

                <div className="py-4">
                  <dt className="mm-label mb-1">Location</dt>
                  <dd className="text-small text-mm-text-muted">Nigeria, working remotely.</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* What happens next — real sequence, not "Stage 1 / Stage 2". */}
      <section className="mm-section border-t border-mm-line">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="mm-label md:col-span-3">What happens next</h2>
            <ol className="md:col-span-8">
              {[
                ["Reply", "I read it and reply with questions or a first read on the scope."],
                ["Scope call", "A short call to pin down requirements, constraints and timeline."],
                ["Proposal", "A written scope with milestones and cost, before any work starts."],
                ["Build", "Work begins, with progress visible in the product rather than a report."],
              ].map(([title, body], i) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-mm-line py-5 last:border-b-0"
                >
                  <span className="mm-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg">{title}</h3>
                    <p className="mt-1 text-small text-mm-text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
