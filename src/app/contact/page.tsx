import type { Metadata } from "next";

import { ContactNarrative } from "@/components/contact/contact-narrative";
import { RouteViewTransition } from "@/components/motion/route-view-transition";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Phil Arfuso about software engineering and product work.",
};

export default function ContactPage() {
  return (
    <RouteViewTransition>
      <ContactNarrative />
    </RouteViewTransition>
  );
}
