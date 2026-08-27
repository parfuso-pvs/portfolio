import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected systems, products, and independent work by Phil Arfuso.",
};

export default function WorkPage() {
  return (
    <RouteIntro
      index="Index 01"
      eyebrow="Selected Work"
      title="Work Index"
      description="Systems built for consequential decisions. Products shaped to feel clear, useful, and human."
    />
  );
}
