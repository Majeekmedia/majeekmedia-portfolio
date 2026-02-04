import Container from "./Container.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100">
      <Container className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-slate-600">
          © {year} Majeek Media. Built for performance and maintainability.
        </div>
        <div className="text-sm text-slate-600">
          Nigeria • Remote
        </div>
      </Container>
    </footer>
  );
}