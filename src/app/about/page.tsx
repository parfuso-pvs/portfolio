import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "About",
  description: "About Phil Arfuso, a full-stack software engineer and product builder.",
};

export default function AboutPage() {
  return (
    <RouteIntro
      index="Profile 01"
      eyebrow="About Phil"
      title="Engineer by craft."
      description="Builder by curiosity. Product thinker by practice. Human by design."
    />
  );
}
