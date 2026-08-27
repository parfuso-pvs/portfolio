import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Phil Arfuso about software engineering and product work.",
};

export default function ContactPage() {
  return (
    <RouteIntro
      index="Connect 01"
      eyebrow="Contact"
      title="Let's build something that matters."
      description="For product engineering roles, thoughtful collaborations, and difficult systems worth making simpler."
    />
  );
}
