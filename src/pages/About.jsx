import PageHeader from "../components/PageHeader.jsx";
import Container from "../components/Container.jsx";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { MapPin, Laptop, Building2, User } from "lucide-react";

function DetailRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg border border-vibrant/20 bg-vibrant/5 p-2">
        <Icon size={18} className="text-vibrant" />
      </div>
      <div>
        <div className="text-xs text-gray-600">{label}</div>
        <div className="mt-1 text-sm font-bold text-black">{value}</div>
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

      <section className="pb-16 bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="card-light">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-vibrant" />
                    <h2 className="text-xl font-semibold tracking-tight text-black">
                      Preye Tekenah — Founder &amp; Lead Developer
                    </h2>
                  </div>

                  <p className="mt-4 text-gray-800">
                    Majeek Media is led by Preye Tekenah, a web developer with over 3 years experience
                    building custom web applications.
                  </p>
                  <p className="mt-4 text-gray-700">
                    Preye specializes in turning complex ideas into functional, scalable platforms using modern technologies.
                  </p>
                </div>

                <div className="card-light">
                  <h3 className="font-semibold text-black">Details</h3>
                  <div className="mt-5 space-y-4">
                    <DetailRow Icon={MapPin} label="Location" value="Nigeria" />
                    <DetailRow Icon={Laptop} label="Availability" value="Remote" />
                    <DetailRow Icon={Building2} label="Business structure" value="Business Name (LLC planned)" />
                  </div>
                </div>
              </div>

              <div className="card-light">
                <h3 className="font-semibold text-black">Photo</h3>
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src="/images/hero/profile.png"
                    alt="Preye Tekenah"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-700">
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