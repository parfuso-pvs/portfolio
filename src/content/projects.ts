export type FeaturedProject = {
  id: string;
  artwork: "memx" | "domani" | "iffers-pictures";
  featured: boolean;
  name: string;
  discipline: string;
  role: string;
  summary: string;
  scope: readonly string[];
  route?: string;
};

export const portfolioProjects = [
  {
    id: "memx",
    artwork: "memx",
    featured: true,
    name: "MEMX",
    discipline: "Full-stack",
    role: "Full-stack developer",
    summary:
      "Member and operations tools built across reusable interfaces, APIs, data, and production systems.",
    scope: ["Portal tooling", "Full-stack systems", "Production platform"],
    route: "/work/memx",
  },
  {
    id: "domani",
    artwork: "domani",
    featured: true,
    name: "Domani",
    discipline: "Mobile development",
    role: "Co-owner & full-stack developer",
    summary:
      "A focused planning app built to make tomorrow feel intentional instead of overwhelming.",
    scope: ["App design", "Mobile development", "Release operations"],
    route: "/work/domani",
  },
  {
    id: "iffers-pictures",
    artwork: "iffers-pictures",
    featured: true,
    name: "Iffer’s Pictures",
    discipline: "Brand + web",
    role: "Designer & developer",
    summary:
      "A photography portfolio shaped from discovery and copy through visual design and implementation.",
    scope: ["Discovery", "Art direction", "Development"],
    route: "/work/iffers-pictures",
  },
] as const satisfies readonly FeaturedProject[];

// New portfolio entries can be added above with `featured: false` so the Work
// page grows without changing the three-project selection on the homepage.
export const featuredProjects: readonly FeaturedProject[] =
  portfolioProjects.filter((project) => project.featured);
