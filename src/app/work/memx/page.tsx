import type { Metadata } from "next";

import { CaseStudyFrame } from "@/components/case-study/case-study-frame";
import { MemxNarrative } from "@/components/case-study/memx-narrative";
import { MemxSystemDiagrams } from "@/components/case-study/memx-system-diagrams";
import { getProject } from "@/content/projects";

const project = getProject("memx");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function MemxPage() {
  return (
    <CaseStudyFrame project={project}>
      <MemxNarrative />
      <MemxSystemDiagrams />
    </CaseStudyFrame>
  );
}
