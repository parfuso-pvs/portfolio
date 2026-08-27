import { featuredProjects } from "@/content/projects";

export type NavigationItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const primaryNavigation = [
  { href: "/work", label: "Work" },
  ...featuredProjects.map((project) => ({
    href: project.href,
    label: project.navigationLabel,
    ...("shortNavigationLabel" in project
      ? { shortLabel: project.shortNavigationLabel }
      : undefined),
  })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] satisfies readonly NavigationItem[];
