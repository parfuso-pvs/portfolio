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
      "A multi-market portal built to handle member operations, trading workflows, and complex configuration without duplicating the platform.",
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
    scope: ["Technical architecture", "Mobile development", "Release operations"],
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
      "A photography portfolio I shaped from early discovery and copy through visual design and development.",
    scope: ["Discovery", "Art direction", "Development"],
    route: "/work/iffers-pictures",
  },
] as const satisfies readonly FeaturedProject[];

// New portfolio entries can be added above with `featured: false` so the Work
// page grows without changing the three-project selection on the homepage.
export const featuredProjects: readonly FeaturedProject[] =
  portfolioProjects.filter((project) => project.featured);
