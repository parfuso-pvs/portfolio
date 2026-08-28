import Image from "next/image";

import { iffersPicturesMedia } from "@/content/case-studies/iffers-pictures-media";

const layoutClasses = {
  maternity: "lg:col-span-8 lg:row-start-1",
  family: "lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-24",
  engagement: "lg:col-span-5 lg:col-start-2 lg:row-start-2 lg:-mt-8",
  event: "lg:col-span-3 lg:col-start-7 lg:row-start-2 lg:mt-10",
} as const;

const imageSizes = {
  maternity: "(min-width: 1024px) 60vw, calc(100vw - 3rem)",
  family: "(min-width: 1024px) 29vw, calc(100vw - 3rem)",
  engagement: "(min-width: 1024px) 37vw, calc(100vw - 3rem)",
  event: "(min-width: 1024px) 22vw, calc(100vw - 3rem)",
} as const;

export function IffersPicturesMedia() {
  return (
    <section className="px-page-gutter pb-section" aria-labelledby="iffers-production-media">
      <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">{iffersPicturesMedia.eyebrow}</p>
            <p className="type-mono text-muted mt-3">{iffersPicturesMedia.index}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-5">
            <h2
              id="iffers-production-media"
              className="type-heading text-ink max-w-[13ch] text-pretty"
            >
              {iffersPicturesMedia.title}
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl">{iffersPicturesMedia.body}</p>
          </div>
        </header>

        <div className="material-blueprint relative mt-16 px-4 py-8 sm:px-8 sm:py-12 lg:mt-24 lg:px-12 lg:py-16">
          <span
            className="bg-accent absolute top-0 left-[10%] h-2 w-24 sm:left-[16%] sm:w-36"
            aria-hidden="true"
          />
          <div className="grid gap-7 lg:grid-cols-12 lg:items-start lg:gap-5">
            {iffersPicturesMedia.images.map((photo, index) => (
              <figure
                key={photo.id}
                className={`material-sheet material-sheet-raised relative p-2 sm:p-3 ${layoutClasses[photo.id]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={imageSizes[photo.id]}
                  className="h-auto w-full object-cover"
                />
                <figcaption className="flex items-center justify-between gap-4 px-1 pt-3 pb-1">
                  <span className="type-label text-ink">{photo.label}</span>
                  <span className="type-mono text-accent" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="type-body-small text-muted mt-7 max-w-3xl border-l border-line-strong pl-4">
          {iffersPicturesMedia.sourceNote}
        </p>
      </div>
    </section>
  );
}
