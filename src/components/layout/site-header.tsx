import Link from "next/link";

import { PrimaryNavigation } from "@/components/navigation/primary-navigation";

export function SiteHeader() {
  return (
    <header className="px-page-gutter absolute inset-x-0 top-0 z-40 pt-4 sm:pt-5">
      <div className="mx-auto flex w-full max-w-[90rem] items-start justify-between gap-4">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3 rounded-control focus-visible:outline-offset-4"
        >
          <span className="type-label text-ink leading-[0.95] sm:leading-none">Phil Arfuso</span>
          <span
            className="type-mono text-muted hidden border-l border-line pl-3 sm:inline"
            aria-hidden="true"
          >
            Portfolio / 2026
          </span>
        </Link>
        <PrimaryNavigation />
      </div>
    </header>
  );
}
