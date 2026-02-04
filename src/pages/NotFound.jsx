import Container from "../components/Container.jsx";
import { ButtonLink } from "../components/Button.jsx";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — Majeek Media" path="/404" />
      <section className="py-20">
        <Container>
          <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-slate-600">The page you’re looking for doesn’t exist.</p>
          <div className="mt-6">
            <ButtonLink to="/" variant="primary">Go Home</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}