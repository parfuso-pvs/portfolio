import { RegistrationMark } from "@/components/ui/material-surface";
import { contactContent } from "@/content/contact";

export function ContactNarrative() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <section
        className="px-page-gutter pt-[clamp(9rem,16vw,14rem)] pb-[clamp(4rem,8vw,7rem)]"
        aria-labelledby="contact-title"
      >
        <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
          <header className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-label text-accent">{contactContent.hero.eyebrow}</p>
              <p className="type-mono text-muted mt-3">{contactContent.hero.index}</p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <h1 id="contact-title" className="type-display text-ink max-w-[11ch] text-balance">
                {contactContent.hero.title}
              </h1>
              <p className="type-body text-muted mt-10 max-w-3xl text-pretty">
                {contactContent.hero.body}
              </p>
            </div>
          </header>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="contact-channels">
        <div className="bg-media-backdrop text-media-foreground relative mx-auto w-full max-w-[90rem] overflow-hidden px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <span
            className="absolute top-0 left-[12%] h-2 w-28 bg-accent sm:left-[24%] sm:w-40"
            aria-hidden="true"
          />

          <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-6">
            <header className="lg:col-span-3">
              <RegistrationMark className="border-media-foreground/45" />
              <p className="type-label text-accent-on-dark mt-7">Direct lines</p>
              <h2
                id="contact-channels"
                className="type-heading mt-6 max-w-[8ch] text-media-foreground"
              >
                Choose the signal.
              </h2>
              <p className="type-mono text-media-foreground/55 mt-7">No form / No gatekeeping</p>
            </header>

            <ol className="border-media-foreground/25 divide-media-foreground/20 lg:col-span-8 lg:col-start-5 lg:border-y lg:divide-y">
              {contactContent.channels.map((channel) => (
                <li
                  key={channel.label}
                  className="border-media-foreground/20 border-t first:border-t lg:border-t-0 lg:first:border-t-0"
                >
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    aria-label={
                      channel.external
                        ? `${channel.label}: ${channel.value} (opens in a new tab)`
                        : undefined
                    }
                    className="group hover:bg-accent focus-visible:bg-accent active:bg-accent-strong relative grid min-h-36 gap-5 px-1 py-7 transition-colors sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:px-5 lg:min-h-40"
                  >
                    <span className="type-mono text-accent-on-dark group-hover:text-media-foreground group-focus-visible:text-media-foreground">
                      {channel.index}
                    </span>
                    <span>
                      <span className="type-label text-media-foreground/55 group-hover:text-media-foreground/80 group-focus-visible:text-media-foreground/80 block">
                        {channel.label}
                      </span>
                      <span className="type-heading mt-3 block text-[clamp(1.8rem,3vw,3.5rem)] text-media-foreground break-words">
                        {channel.value}
                      </span>
                      <span className="type-body-small text-media-foreground/60 group-hover:text-media-foreground/85 group-focus-visible:text-media-foreground/85 mt-3 block">
                        {channel.note}
                      </span>
                    </span>
                    <span
                      className="text-accent-on-dark group-hover:text-media-foreground group-focus-visible:text-media-foreground absolute top-6 right-1 text-3xl transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 sm:static"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="contact-fit">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{contactContent.fit.eyebrow}</p>
            <p className="type-mono text-muted mt-3">Working fit / 01—03</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2 id="contact-fit" className="type-heading text-ink max-w-[10ch] text-pretty">
              {contactContent.fit.title}
            </h2>
            <ol className="mt-12 border-y border-line-strong sm:mt-16">
              {contactContent.fit.items.map((item, index) => (
                <li
                  key={item}
                  className="grid gap-4 border-b border-line py-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:items-baseline"
                >
                  <span className="type-mono text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="type-body text-ink max-w-2xl">{item}</p>
                </li>
              ))}
            </ol>

            <footer className="mt-10 grid gap-8 border-l border-accent pl-5 sm:grid-cols-2 sm:items-end">
              <p className="type-body-small text-ink max-w-md">{contactContent.fit.note}</p>
              <p className="type-mono text-muted sm:text-right">{contactContent.fit.location}</p>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
