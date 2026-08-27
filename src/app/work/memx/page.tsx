import type { Metadata } from "next";

import { RouteIntro } from "@/components/layout/route-intro";
import { getProject } from "@/content/projects";

const project = getProject("memx");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function MemxPage() {
  return (
    <RouteIntro
      index={project.indexLabel}
      eyebrow={`${project.name} / ${project.discipline}`}
      title={project.name}
      description={project.summary}
    />
  );
}
