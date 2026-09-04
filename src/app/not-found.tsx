import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <SiteHeader tone="dark" />
      <div className="not-found-layout" data-reveal-group data-reveal-stagger="110">
        <div className="not-found-code" data-reveal="scale" aria-hidden="true">
          404
        </div>
        <div className="not-found-copy" data-reveal="right" data-reveal-group data-reveal-stagger="75">
          <p data-reveal="soft">That route doesn’t go anywhere.</p>
          <h1 data-reveal="soft">Looks like this one wandered off</h1>
          <div className="not-found-actions" data-reveal="soft">
            <Link className="primary-action" href="/">
              Back home
            </Link>
            <Link className="secondary-action" href="/#work">
              Browse work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
