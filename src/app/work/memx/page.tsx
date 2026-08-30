import type { Metadata } from "next";

import { CaseStudyNavigation } from "@/components/case-study/case-study-navigation";
import { MemxChapterIntro } from "@/components/case-study/memx-chapter-intro";
import { MemxNarrative } from "@/components/case-study/memx-narrative";
import { MemxSystemDiagrams } from "@/components/case-study/memx-system-diagrams";
import { getProject } from "@/content/projects";

const project = getProject("memx");
const nextProject = getProject("domani");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function MemxPage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <MemxChapterIntro project={project} />
      <MemxNarrative />
      <MemxSystemDiagrams />
      <CaseStudyNavigation currentProject={project} nextProject={nextProject} tone="quiet" />
    </main>
  );
}
