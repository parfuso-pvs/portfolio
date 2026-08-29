import Link from "next/link";

export function SimpleContact() {
  return (
    <section className="px-page-gutter pb-page-gutter" aria-labelledby="home-contact-title">
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <p className="type-label text-accent">What I&apos;m looking for</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-5">
          <h2 id="home-contact-title" className="type-heading text-ink max-w-[15ch] text-pretty">
            Frontend, full-stack web, or mobile development roles.
          </h2>
          <p className="type-body text-muted mt-6 max-w-2xl">
            If my experience lines up with what your team needs, I&apos;d be glad to hear more about
            the role and the product.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            <Link
              href="/contact"
              className="type-label text-ink min-h-11 border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
            >
              Contact me
            </Link>
            <Link
              href="/about"
              className="type-label text-muted min-h-11 border-b border-line-strong py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
            >
              More about me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
