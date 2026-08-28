import type { Metadata } from "next";

import { CaseStudyFrame } from "@/components/case-study/case-study-frame";
import { DomaniNarrative } from "@/components/case-study/domani-narrative";
import { getProject } from "@/content/projects";

const project = getProject("domani");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function DomaniPage() {
  return (
    <CaseStudyFrame project={project}>
      <DomaniNarrative project={project} />
    </CaseStudyFrame>
  );
}
