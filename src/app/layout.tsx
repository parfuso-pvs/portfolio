import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  axes: ["wdth"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const newsreader = Newsreader({
  axes: ["opsz"],
  display: "swap",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const newsreaderItalic = Newsreader({
  axes: ["opsz"],
  display: "swap",
  preload: false,
  style: "italic",
  subsets: ["latin"],
  variable: "--font-newsreader-italic",
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  preload: false,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "600"],
});

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
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} ${newsreaderItalic.variable} ${ibmPlexMono.variable}`}
    >
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
