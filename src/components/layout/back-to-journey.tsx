import Link from "next/link";

import type { ProjectId } from "@/content/projects";

export function BackToJourney({
  projectId,
  tone = "light",
}: {
  projectId?: ProjectId;
  tone?: "dark" | "light";
}) {
  const href = projectId ? `/#experience-${projectId}` : "/#experience";

  return (
    <Link
      href={href}
      transitionTypes={projectId ? ["career-return"] : undefined}
      className={`type-label group inline-flex min-h-11 items-center gap-3 rounded-control px-1 py-3 active:translate-y-px ${
        tone === "dark"
          ? "text-paper-raised hover:text-accent-on-dark focus-visible:text-accent-on-dark"
          : "text-ink hover:text-accent focus-visible:text-accent active:text-accent-strong"
      }`}
    >
      <span
        className="transition-transform group-hover:-translate-x-1 group-focus-visible:-translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      >
        ←
      </span>
      Back to the journey
    </Link>
  );
}
