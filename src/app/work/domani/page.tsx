import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "Domani",
  description: "Domani, an independent daily planning product designed and built by Phil Arfuso.",
};

export default function DomaniPage() {
  return (
    <RouteIntro
      index="Case 02"
      eyebrow="Domani / Independent Product"
      title="Domani"
      description="A focused planning product built to make tomorrow feel intentional instead of overwhelming."
    />
  );
}
