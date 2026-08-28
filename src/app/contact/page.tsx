import type { Metadata } from "next";

import { ContactNarrative } from "@/components/contact/contact-narrative";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Phil Arfuso about software engineering and product work.",
};

export default function ContactPage() {
  return <ContactNarrative />;
}
