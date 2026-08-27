import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "Iffer's Pictures",
  description: "The Iffer's Pictures photography portfolio, designed and built by Phil Arfuso.",
};

export default function IffersPicturesPage() {
  return (
    <RouteIntro
      index="Case 03"
      eyebrow="Iffer's Pictures / Creative Direction"
      title="Iffer's Pictures"
      description="A photography portfolio shaped from discovery and copy through visual design and implementation."
    />
  );
}
