import Image from "next/image";

import { domaniProductMedia } from "@/content/case-studies/domani-media";

export function DomaniProductMedia() {
  return (
    <section className="px-page-gutter pb-section" aria-labelledby="domani-product-view">
      <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">{domaniProductMedia.eyebrow}</p>
            <p className="type-mono text-muted mt-3">{domaniProductMedia.index}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="domani-product-view" className="type-heading text-ink max-w-[13ch] text-pretty">
              A real view of the product in use.
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl">
              One production screen is enough to show how the planning model becomes interface.
            </p>
          </div>
        </header>

        <figure className="material-blueprint mt-16 grid gap-12 px-6 py-8 sm:px-10 sm:py-12 lg:mt-24 lg:grid-cols-12 lg:items-stretch lg:gap-6 lg:px-14 lg:py-16">
          <div className="bg-media-backdrop relative flex min-h-[34rem] items-center justify-center overflow-hidden px-4 pt-10 sm:min-h-[42rem] sm:px-8 lg:col-span-5 lg:min-h-[48rem]">
            <div
              className="border-media-foreground/15 absolute -top-[18%] -right-[28%] aspect-square w-[88%] rounded-pill border"
              aria-hidden="true"
            />
            <div
              className="border-media-foreground/10 absolute -bottom-[24%] -left-[30%] aspect-square w-[78%] rounded-pill border"
              aria-hidden="true"
            />
            <span
              className="bg-accent absolute top-0 left-[18%] h-2 w-24 sm:w-36"
              aria-hidden="true"
            />
            <Image
              src="/images/domani/today-screen.png"
              alt={domaniProductMedia.alt}
              width={1008}
              height={2126}
              sizes="(min-width: 1024px) 31rem, (min-width: 640px) 24rem, calc(100vw - 5.5rem)"
              className="relative h-auto max-h-[44rem] w-auto max-w-full object-contain drop-shadow-[0_1.5rem_2rem_color-mix(in_srgb,var(--media-backdrop)_28%,transparent)] lg:max-h-[52rem]"
            />
          </div>

          <figcaption className="flex flex-col justify-between lg:col-span-6 lg:col-start-7 lg:py-4">
            <div>
              <p className="type-mono text-accent">Figure / Today</p>
              <h3 className="type-heading text-ink mt-7 max-w-[12ch] text-pretty">
                {domaniProductMedia.title}
              </h3>
              <p className="type-body text-ink mt-8 max-w-2xl">{domaniProductMedia.body}</p>
            </div>

            <div className="mt-14 lg:mt-20">
              <ol className="divide-y divide-line border-y border-line-strong">
                {domaniProductMedia.observations.map((observation) => (
                  <li
                    key={observation.index}
                    className="grid gap-3 py-5 sm:grid-cols-[3rem_minmax(0,1fr)]"
                  >
                    <p className="type-mono text-accent">{observation.index}</p>
                    <div>
                      <p className="type-label text-ink">{observation.label}</p>
                      <p className="type-body-small text-muted mt-2">{observation.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="type-body-small text-muted mt-6 max-w-2xl border-l border-line-strong pl-4">
                {domaniProductMedia.sourceNote}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
