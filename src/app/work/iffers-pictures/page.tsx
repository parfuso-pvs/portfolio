import type { Metadata } from "next";

import { CaseStudyFrame } from "@/components/case-study/case-study-frame";
import { IffersPicturesNarrative } from "@/components/case-study/iffers-pictures-narrative";
import { getProject } from "@/content/projects";

const project = getProject("iffers-pictures");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function IffersPicturesPage() {
  return (
    <CaseStudyFrame project={project}>
      <IffersPicturesNarrative project={project} />
    </CaseStudyFrame>
  );
}
