import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/anton/400.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "./globals.css";
import "./case-study-themes.css";
import { MotionOrchestrator } from "@/components/motion/motion-orchestrator";
import {
  createSiteBehaviourBootstrap,
  shouldEnableSiteBehaviour,
  siteBehaviourSecret,
} from "@/lib/sitebehaviour";
import { normalizeSiteUrl } from "@/lib/site-url";

const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);
const siteBehaviourEnabled = shouldEnableSiteBehaviour({
  nodeEnv: process.env.NODE_ENV,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Phil Arfuso — Full-stack developer",
    template: "%s — Phil Arfuso",
  },
  description:
    "Phil Arfuso is a full-stack developer with a frontend background who likes solving messy problems and building useful things.",
  authors: [{ name: "Phil Arfuso" }],
  creator: "Phil Arfuso",
  openGraph: {
    type: "website",
    siteName: "Phil Arfuso",
    title: "Phil Arfuso — Full-stack developer",
    description:
      "Frontend roots, full-stack range, and a practical approach to building useful things.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phil Arfuso — Full-stack developer",
    description:
      "Frontend roots, full-stack range, and a practical approach to building useful things.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionOrchestrator />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        {siteBehaviourEnabled ? (
          <Script id="sitebehaviour-bootstrap" strategy="afterInteractive">
            {createSiteBehaviourBootstrap(siteBehaviourSecret)}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
