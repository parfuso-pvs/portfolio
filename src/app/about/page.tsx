import type { Metadata } from "next";

import { AboutNarrative } from "@/components/about/about-narrative";
import { getProject } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Phil Arfuso, a full-stack software engineer, systems thinker, and independent product builder.",
};

const workingContexts = [
  getProject("memx"),
  getProject("domani"),
  getProject("pixelverse-studios"),
  getProject("earthcam"),
];

export default function AboutPage() {
  return <AboutNarrative projects={workingContexts} />;
}
