import Container from "./Container.jsx";

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="py-14">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}