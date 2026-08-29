import type { Metadata } from "next";

import { CaseStudyFrame } from "@/components/case-study/case-study-frame";
import { CaseStudyNavigation } from "@/components/case-study/case-study-navigation";
import { IffersPicturesMedia } from "@/components/case-study/iffers-pictures-media";
import { IffersPicturesNarrative } from "@/components/case-study/iffers-pictures-narrative";
import { IffersPicturesPublicProof } from "@/components/case-study/iffers-pictures-public-proof";
import { RouteViewTransition } from "@/components/motion/route-view-transition";
import { getProject } from "@/content/projects";

const project = getProject("iffers-pictures");
const nextProject = getProject("memx");

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function IffersPicturesPage() {
  return (
    <RouteViewTransition>
      <CaseStudyFrame project={project}>
        <IffersPicturesNarrative project={project} />
        <IffersPicturesMedia />
        <IffersPicturesPublicProof project={project} />
        <CaseStudyNavigation currentProject={project} nextProject={nextProject} />
      </CaseStudyFrame>
    </RouteViewTransition>
  );
}
