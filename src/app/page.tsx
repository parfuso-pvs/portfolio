import { MaterialSurface, RegistrationMark } from "@/components/ui/material-surface";

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="px-page-gutter py-section relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <div
        className="material-blueprint absolute top-[8%] left-[7%] -z-10 h-[42%] w-[58%] -rotate-2 max-md:top-[12%] max-md:left-[-18%] max-md:h-[38%] max-md:w-[118%]"
        aria-hidden="true"
      />
      <div
        className="material-sheet material-sheet-raised absolute right-[7%] bottom-[9%] -z-10 h-[38%] w-[42%] rotate-2 max-md:right-[-28%] max-md:bottom-[14%] max-md:h-[30%] max-md:w-[90%]"
        aria-hidden="true"
      />

      <MaterialSurface
        as="section"
        elevation="pinned"
        className="mx-auto w-full max-w-6xl px-sheet-inset relative py-14 sm:py-20 lg:py-24"
        aria-labelledby="page-title"
      >
        <span
          className="material-tab type-label absolute -top-8 left-8 sm:left-12"
          aria-hidden="true"
        >
          System 00
        </span>
        <RegistrationMark className="absolute top-5 right-5 sm:top-7 sm:right-7" />

        <p className="type-label text-accent">Full-Stack Software Engineer</p>
        <h1 id="page-title" className="type-display text-ink mt-5 max-w-5xl text-balance">
          Phil Arfuso
        </h1>
        <p className="type-heading text-ink mt-7 max-w-3xl text-pretty">
          I turn complex systems into products that feel simple.
        </p>
        <div className="material-vellum mt-12 max-w-xl px-5 py-4 sm:px-6">
          <p className="type-mono text-muted">
            Material system online. Structure and navigation come next.
          </p>
        </div>
      </MaterialSurface>
    </main>
  );
}
