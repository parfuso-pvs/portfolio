import type { Metadata } from "next";

import { CaseStudyFrame } from "@/components/case-study/case-study-frame";
import { CaseStudyNavigation } from "@/components/case-study/case-study-navigation";
import { DomaniNarrative } from "@/components/case-study/domani-narrative";
import { DomaniProductMedia } from "@/components/case-study/domani-product-media";
import { DomaniProductionEvidence } from "@/components/case-study/domani-production-evidence";
import { RouteViewTransition } from "@/components/motion/route-view-transition";
import { getProject } from "@/content/projects";

const project = getProject("domani");
const nextProject = getProject("iffers-pictures");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function DomaniPage() {
  return (
    <RouteViewTransition>
      <CaseStudyFrame project={project}>
        <DomaniNarrative project={project} />
        <DomaniProductMedia />
        <DomaniProductionEvidence project={project} />
        <CaseStudyNavigation currentProject={project} nextProject={nextProject} />
      </CaseStudyFrame>
    </RouteViewTransition>
  );
}
