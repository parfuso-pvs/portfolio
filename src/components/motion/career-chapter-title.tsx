import { ViewTransition, type ReactNode } from "react";

import type { ProjectId } from "@/content/projects";

export function CareerChapterTitle({
  children,
  projectId,
}: Readonly<{ children: ReactNode; projectId: ProjectId }>) {
  return (
    <ViewTransition name={`career-chapter-${projectId}`} share="career-chapter" default="none">
      {children}
    </ViewTransition>
  );
}
