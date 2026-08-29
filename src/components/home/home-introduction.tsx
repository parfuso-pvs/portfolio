import Link from "next/link";

export function HomeIntroduction() {
  return (
    <section
      className="px-page-gutter pt-7 pb-[clamp(5rem,10vw,9rem)] sm:pt-9"
      aria-labelledby="home-title"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="flex min-h-11 items-center justify-between gap-6">
          <p className="type-label text-ink">Phil Arfuso</p>
          <p className="type-mono text-muted hidden text-right sm:block">
            New Jersey / Web and mobile
          </p>
        </header>

        <div className="mt-[clamp(4rem,9vw,8rem)] grid items-start gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="type-label text-accent">Full-stack software engineer</p>
            <h1
              id="home-title"
              className="type-heading text-ink mt-7 max-w-[13ch] text-[clamp(3.5rem,7.5vw,7.5rem)] text-pretty"
            >
              I started in frontend and gradually took on more of the stack.
            </h1>
            <div className="type-body text-muted mt-8 max-w-[62ch] space-y-5 sm:mt-10">
              <p>
                I&apos;ve been building software for about eight years, most recently as a Senior
                Full Stack Engineer at MEMX working on financial technology and market
                infrastructure.
              </p>
              <p>
                I also build outside of full-time work. That has taken me from helping local
                businesses through a small development studio to designing, launching, and operating
                my own mobile app.
              </p>
            </div>
            <Link
              href="#experience"
              className="type-label text-ink group mt-9 inline-flex min-h-11 items-center gap-3 rounded-control px-1 py-3 hover:text-accent focus-visible:text-accent active:translate-y-px active:text-accent-strong"
            >
              Follow the work
              <span
                className="text-accent text-base transition-transform group-hover:translate-y-1 group-focus-visible:translate-y-1 motion-reduce:transition-none"
                aria-hidden="true"
              >
                ↓
              </span>
            </Link>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 lg:pt-10" aria-label="Role focus">
            <div className="relative overflow-hidden rounded-[clamp(2.5rem,7vw,6.5rem)] bg-accent px-8 py-12 text-paper-raised shadow-sheet sm:px-10 sm:py-14 lg:min-h-[28rem] lg:px-12 lg:py-14">
              <div
                className="absolute -right-20 -bottom-28 h-64 w-64 rounded-full border border-paper-raised/20"
                aria-hidden="true"
              />
              <p className="type-mono text-paper-raised/70">What I&apos;m looking for</p>
              <p className="type-heading mt-10 max-w-[9ch] text-[clamp(2.5rem,4vw,4.25rem)] text-paper-raised">
                Frontend, full-stack web, or mobile roles.
              </p>
              <p className="type-label mt-16 text-paper-raised/75">
                Frontend / Full stack / Mobile
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
