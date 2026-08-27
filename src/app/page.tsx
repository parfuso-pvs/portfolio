export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="px-page-gutter py-section flex min-h-screen items-center"
    >
      <section className="mx-auto w-full max-w-6xl" aria-labelledby="page-title">
        <p className="type-label text-accent">Full-Stack Software Engineer</p>
        <h1 id="page-title" className="type-display text-ink mt-5 max-w-5xl text-balance">
          Phil Arfuso
        </h1>
        <p className="type-heading text-ink mt-7 max-w-3xl text-pretty">
          I turn complex systems into products that feel simple.
        </p>
        <p className="type-mono text-muted mt-12">
          Portfolio foundation online. The visual system comes next.
        </p>
      </section>
    </main>
  );
}
