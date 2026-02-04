import Container from "./Container.jsx";

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="py-14 bg-black">
      <Container>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-white/80 text-lg">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}