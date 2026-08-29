import Link from "next/link";

export function HomeContactClose() {
  return (
    <section
      className="px-page-gutter pb-page-gutter relative isolate"
      aria-labelledby="home-contact-title"
    >
      <div className="bg-media-backdrop text-media-foreground relative mx-auto w-full max-w-[90rem] overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
        />
        <span
          aria-hidden="true"
          className="bg-accent absolute top-0 left-[12%] h-2 w-24 sm:left-[18%] sm:w-36"
        />

        <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent-on-dark">Open to the next hard problem</p>
            <p className="type-mono text-media-foreground/55 mt-3">Contact sheet / 01</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id="home-contact-title"
              className="type-heading text-media-foreground max-w-[12ch] text-pretty"
            >
              Let&apos;s make the complex feel clear.
            </h2>
            <p className="type-body text-media-foreground/70 mt-7 max-w-2xl">
              For senior full-stack, product-engineering, frontend-platform, and systems-oriented
              roles.
            </p>

            <div className="border-media-foreground/20 mt-12 flex flex-col gap-4 border-t pt-7 sm:mt-16 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <Link
                href="/contact"
                transitionTypes={["route-switch"]}
                className="type-label text-media-foreground hover:bg-media-foreground focus-visible:bg-media-foreground group flex min-h-11 w-full items-center justify-between gap-8 bg-accent px-5 py-3.5 transition-colors hover:text-ink focus-visible:text-ink active:bg-paper-deep active:text-ink sm:w-auto sm:min-w-64"
              >
                Start a conversation
                <span
                  aria-hidden="true"
                  className="text-lg transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                >
                  →
                </span>
              </Link>

              <Link
                href="/about"
                transitionTypes={["route-switch"]}
                className="type-label border-media-foreground/45 text-media-foreground active:text-media-foreground/70 hover:border-accent-on-dark hover:text-accent-on-dark focus-visible:border-accent-on-dark focus-visible:text-accent-on-dark min-h-11 self-start border-b py-3 transition-colors sm:self-auto"
              >
                Read the profile
              </Link>
            </div>
          </div>
        </div>

        <footer className="border-media-foreground/20 relative mt-20 grid gap-3 border-t pt-5 sm:grid-cols-2 lg:mt-28">
          <p className="type-mono text-media-foreground/60">
            Phil Arfuso / Full-Stack Software Engineer
          </p>
          <p className="type-mono text-media-foreground/60 sm:text-right">
            New Jersey / Working across layers
          </p>
        </footer>
      </div>
    </section>
  );
}
