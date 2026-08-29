import Link from "next/link";

export function CareerLedIntro() {
  return (
    <section
      className="px-page-gutter pt-[clamp(8.5rem,14vw,11rem)] pb-[clamp(4rem,8vw,7rem)]"
      aria-labelledby="home-title"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <p className="type-label text-accent">Full-Stack Software Engineer</p>
          <p className="type-mono text-muted mt-3">New Jersey / Web and mobile</p>
        </div>

        <div className="lg:col-span-7 lg:col-start-5">
          <h1 id="home-title" className="type-heading text-ink max-w-[14ch] text-pretty">
            I started in frontend and gradually took on more of the stack.
          </h1>

          <div className="type-body text-muted mt-8 max-w-[64ch] space-y-5">
            <p>
              I&apos;ve been building software for about eight years, most recently as a Senior Full
              Stack Engineer at MEMX working on financial technology and market infrastructure.
            </p>
            <p>
              Outside of full-time work, I co-founded a small development studio where I handle the
              engineering, and I built and launched my own mobile app. I like getting deep into the
              technical side of a product while staying close to how people use it and whether
              we&apos;re solving the right problem.
            </p>
          </div>

          <nav className="mt-9 flex flex-wrap gap-x-7 gap-y-3" aria-label="Introduction actions">
            <Link
              href="#experience"
              className="type-label text-ink min-h-11 border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
            >
              See my experience
            </Link>
            <Link
              href="/contact"
              className="type-label text-muted min-h-11 border-b border-line-strong py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
