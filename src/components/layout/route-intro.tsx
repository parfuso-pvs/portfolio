import { MaterialSurface, RegistrationMark } from "@/components/ui/material-surface";

type RouteIntroProps = {
  description: string;
  eyebrow: string;
  index: string;
  title: string;
};

export function RouteIntro({ description, eyebrow, index, title }: RouteIntroProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="px-page-gutter py-section relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <div
        className="material-blueprint absolute top-[14%] right-[8%] -z-10 h-[48%] w-[44%] rotate-2 max-md:top-[10%] max-md:right-[-24%] max-md:h-[46%] max-md:w-[108%]"
        aria-hidden="true"
      />
      <MaterialSurface
        as="section"
        elevation="pinned"
        className="px-sheet-inset relative mx-auto w-full max-w-5xl py-16 sm:py-24"
        aria-labelledby="page-title"
      >
        <span
          className="material-tab type-label absolute -top-8 left-8 sm:left-12"
          aria-hidden="true"
        >
          {index}
        </span>
        <RegistrationMark className="absolute top-5 right-5 sm:top-7 sm:right-7" />
        <p className="type-label text-accent">{eyebrow}</p>
        <h1 id="page-title" className="type-display text-ink mt-5 max-w-4xl text-balance">
          {title}
        </h1>
        <p className="type-heading text-ink mt-8 max-w-3xl text-pretty">{description}</p>
      </MaterialSurface>
    </main>
  );
}
