import { contactContent } from "@/content/contact";

export function HomeContact() {
  const email = contactContent.channels[0];
  const linkedin = contactContent.channels[1];

  return (
    <section className="px-page-gutter pb-page-gutter" aria-labelledby="home-contact-title">
      <div className="mx-auto w-full max-w-[90rem] rounded-[clamp(2rem,6vw,5rem)] bg-ink px-6 py-10 text-paper-raised sm:px-10 sm:py-14 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent-on-dark">What comes next</p>
            <p className="type-mono text-paper-raised/55 mt-3">New Jersey / Eastern Time</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2
              id="home-contact-title"
              className="type-heading max-w-[12ch] text-[clamp(3rem,6vw,6rem)] text-paper-raised text-pretty"
            >
              I&apos;m looking for frontend, full-stack web, or mobile development roles.
            </h2>
            <p className="type-body mt-7 max-w-[58ch] text-paper-raised/70">
              If my experience lines up with what your team needs, I&apos;d be glad to hear about
              the role, the product, and the problem you&apos;re trying to solve.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={email.href}
                className="type-label inline-flex min-h-11 items-center rounded-pill bg-accent px-6 py-3 text-paper-raised transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 active:translate-y-px motion-reduce:transition-none"
              >
                Email me
              </a>
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="type-label inline-flex min-h-11 items-center rounded-pill border border-paper-raised/30 px-6 py-3 text-paper-raised hover:border-accent-on-dark hover:text-accent-on-dark focus-visible:border-accent-on-dark focus-visible:text-accent-on-dark active:translate-y-px"
              >
                LinkedIn
                <span className="ml-2" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
            <p className="type-mono mt-10 text-paper-raised/55">
              Résumé link coming after private contact details are removed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
