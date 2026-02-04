import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { MapPin, Laptop, Building2, User } from "lucide-react";

function DetailRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
        <Icon size={18} className="text-accent-700 dark:text-accent-50" />
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
        <div className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About — Majeek Media"
        description="Majeek Media is led by Preye Tekenah, building scalable web platforms for startups and businesses."
        path="/about"
      />

      <PageHeader
        title="About"
        subtitle="Professional, system-driven web development — built for maintainability and growth."
      />

      <section className="pb-16">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-accent-700 dark:text-accent-50" />
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      Preye Tekenah — Founder &amp; Lead Developer
                    </h2>
                  </div>

                  <p className="mt-4 text-slate-700 dark:text-slate-200">
                    Majeek Media is led by Preye Tekenah, a web developer with over 3 years experience
                    building custom web applications.
                  </p>
                  <p className="mt-4 text-slate-700 dark:text-slate-200">
                    Preye specializes in turning complex ideas into functional, scalable platforms using modern technologies.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Details</h3>
                  <div className="mt-5 space-y-4">
                    <DetailRow Icon={MapPin} label="Location" value="Nigeria" />
                    <DetailRow Icon={Laptop} label="Availability" value="Remote" />
                    <DetailRow Icon={Building2} label="Business structure" value="Business Name (LLC planned)" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
                <h3 className="font-semibold text-slate-900 dark:text-white">Photo</h3>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-900">
                  <img
                    src="/preye.jpg"
                    alt="Preye Tekenah"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  Founder &amp; Lead Developer at Majeek Media.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}