import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Phil Arfuso — Full-Stack Software Engineer",
    template: "%s — Phil Arfuso",
  },
  description:
    "The portfolio of Phil Arfuso, a full-stack software engineer who turns complex systems into products that feel simple.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-50 -translate-y-24 bg-ink px-4 py-3 text-sm font-semibold text-canvas transition-transform focus:translate-y-0 motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
