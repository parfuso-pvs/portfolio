export default function Home() {
  return (
    <main className="flex min-h-screen items-center px-6 py-16 sm:px-10 lg:px-16">
      <section className="mx-auto w-full max-w-6xl" aria-labelledby="page-title">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Full-Stack Software Engineer
        </p>
        <h1
          id="page-title"
          className="mt-5 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-7xl lg:text-8xl"
        >
          Phil Arfuso
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-xl leading-8 text-neutral-700 sm:text-2xl sm:leading-9">
          I turn complex systems into products that feel simple.
        </p>
        <p className="mt-12 text-sm text-neutral-500">
          Portfolio foundation online. The visual system comes next.
        </p>
      </section>
    </main>
  );
}
