import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "MEMX",
  description: "Phil Arfuso's work on configurable exchange platforms and market technology.",
};

export default function MemxPage() {
  return (
    <RouteIntro
      index="Case 01"
      eyebrow="MEMX / Platform Engineering"
      title="MEMX"
      description="A configurable exchange platform designed to serve many markets from one evolving system."
    />
  );
}
