export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="px-page-gutter py-section flex min-h-screen items-center"
    >
      <section className="mx-auto w-full max-w-6xl" aria-labelledby="page-title">
        <p className="text-accent text-sm font-semibold tracking-[0.16em] uppercase">
          Full-Stack Software Engineer
        </p>
        <h1
          id="page-title"
          className="text-display text-ink mt-5 max-w-5xl text-balance font-semibold"
        >
          Phil Arfuso
        </h1>
        <p className="text-muted mt-7 max-w-2xl text-pretty text-xl leading-8 sm:text-2xl sm:leading-9">
          I turn complex systems into products that feel simple.
        </p>
        <p className="text-muted mt-12 text-sm">
          Portfolio foundation online. The visual system comes next.
        </p>
      </section>
    </main>
  );
}
