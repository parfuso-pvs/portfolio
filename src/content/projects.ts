export type MetricSource = "product-analytics" | "production-database" | "store-verification";

export type ProjectMetric = {
  detail: string;
  label: string;
  snapshotDate: string;
  source: MetricSource;
  value: string;
};

export type ProjectMediaPolicy = {
  allowed: readonly string[];
  prohibited: readonly string[];
  strategy:
    | "approved-client-photography"
    | "original-diagrams-only"
    | "public-product-media"
    | "public-site-media"
    | "public-streaming-media";
};

export type ProjectArtifactCopy = {
  accessibleDescription: string;
  primaryLabel: string;
  secondaryDetail?: string;
  secondaryLabel?: string;
  statement?: string;
};

type ProjectFoundation = {
  approvedFeatures: readonly string[];
  attribution: string;
  discipline: string;
  id: string;
  indexLabel: string;
  mediaPolicy: ProjectMediaPolicy;
  metaDescription: string;
  metrics: readonly ProjectMetric[];
  name: string;
  ownership: string;
  proofPoints: readonly string[];
  roadmap: readonly string[];
  role: string;
  summary: string;
};

export type FeaturedProject = ProjectFoundation & {
  artifactCopy: ProjectArtifactCopy;
  caseStudyStatus: "intro" | "published";
  href: `/work/${string}`;
  navigationLabel: string;
  prominence: "featured";
  shortNavigationLabel?: string;
};

export type SupportingProject = ProjectFoundation & {
  caseStudyStatus: "supporting-only";
  href: null;
  prominence: "supporting";
};

export type PortfolioProject = FeaturedProject | SupportingProject;

export const projects = [
  {
    id: "memx",
    name: "MEMX",
    prominence: "featured",
    caseStudyStatus: "intro",
    href: "/work/memx",
    navigationLabel: "MEMX",
    indexLabel: "Case 01",
    artifactCopy: {
      accessibleDescription: "Eight market implementations supported from one evolving system.",
      primaryLabel: "08 / markets",
    },
    discipline: "Platform Engineering",
    role: "Full-Stack Software Engineer",
    summary:
      "A configurable exchange platform designed to serve many markets from one evolving system.",
    metaDescription: "Phil Arfuso's work on configurable exchange platforms and market technology.",
    ownership:
      "Phil established the portal's frontend configuration architecture and reusable UI foundation, then expanded into full-stack feature ownership, incident support, and production maintenance.",
    attribution:
      "The initial database-driven market architecture was scaffolded by Phil's manager. Phil built the corresponding frontend configuration system and helped evolve the shared platform with the wider team.",
    approvedFeatures: [
      "Member onboarding and exchange configuration workflows",
      "Port, MPID, firm, risk, query, symbol, and role-entitlement tools",
      "Market-specific feature flags and reusable UI fields",
      "Real-time IPO auction data delivered through WebSockets",
      "File transmission and symbol-processing systems",
    ],
    proofPoints: [
      "Supported eight market implementations: three MEMX-operated markets and five market-technology customers.",
      "Worked across a team that grew from Phil and his manager to as many as seven additional developers.",
      "The member portal and its continuing architecture work represented approximately 70% of Phil's work at MEMX.",
    ],
    metrics: [],
    roadmap: [],
    mediaPolicy: {
      strategy: "original-diagrams-only",
      allowed: [
        "Original diagrams explaining configuration, feature flags, reusable UI, entitlements, and WebSocket flow",
      ],
      prohibited: [
        "Private screenshots",
        "Reconstructed interfaces",
        "Order books or matching-engine displays",
        "Fake exchange data",
      ],
    },
  },
  {
    id: "domani",
    name: "Domani",
    prominence: "featured",
    caseStudyStatus: "intro",
    href: "/work/domani",
    navigationLabel: "Domani",
    indexLabel: "Case 02",
    artifactCopy: {
      accessibleDescription: "Plan tomorrow intentionally around one clear top-priority task.",
      primaryLabel: "Tomorrow / intentional",
      statement: "Plan the day before it begins.",
      secondaryLabel: "Top priority",
      secondaryDetail: "One clear thing",
    },
    discipline: "Independent Product",
    role: "Creator & Full-Stack Engineer",
    summary:
      "A focused planning product built to make tomorrow feel intentional instead of overwhelming.",
    metaDescription:
      "Domani, an independent daily planning product designed and built by Phil Arfuso.",
    ownership:
      "Phil conceived, designed, built, and operates Domani as an independent product and a deliberate expansion into mobile development.",
    attribution:
      "Domani is Phil's independent product. Production figures must retain their snapshot date and must not combine shared analytics identifiers with verified accounts or downloads.",
    approvedFeatures: [
      "Evening planning for the following day",
      "One top-priority task",
      "Task categories",
      "Intentional task rollover",
      "Progress analytics",
    ],
    proofPoints: [
      "62 accounts registered since December 12, 2025; 59 remained active and non-deleted at the August 26, 2026 snapshot.",
      "19 of 28 task creators planned on multiple days.",
      "Task-creator retention proxies reached 39% across at least seven days and 32% across at least 30 days.",
    ],
    metrics: [
      {
        value: "59",
        label: "active accounts",
        detail: "62 registered accounts; 59 remained active and non-deleted.",
        snapshotDate: "2026-08-26",
        source: "production-database",
      },
      {
        value: "636",
        label: "tasks created",
        detail: "238 of those tasks were completed, a 37.4% completion rate.",
        snapshotDate: "2026-08-26",
        source: "production-database",
      },
      {
        value: "15 / 6",
        label: "monthly / weekly active users",
        detail: "Identified active users in the production snapshot.",
        snapshotDate: "2026-08-26",
        source: "product-analytics",
      },
      {
        value: "69",
        label: "sessions in 30 days",
        detail: "An average of 4.6 sessions per identified monthly active user.",
        snapshotDate: "2026-08-26",
        source: "product-analytics",
      },
      {
        value: "7",
        label: "verified lifetime transactions",
        detail:
          "Three App Store and four Play Store production transactions, with no recorded refunds.",
        snapshotDate: "2026-08-26",
        source: "store-verification",
      },
    ],
    roadmap: ["Nested checklists", "Bullet lists", "Planning templates"],
    mediaPolicy: {
      strategy: "public-product-media",
      allowed: ["Real production screenshots", "Faithful code-native product compositions"],
      prohibited: [
        "Shared analytics identifiers presented as downloads",
        "Unsupported conversion rates",
        "Roadmap features presented as shipped",
      ],
    },
  },
  {
    id: "iffers-pictures",
    name: "Iffer's Pictures",
    prominence: "featured",
    caseStudyStatus: "intro",
    href: "/work/iffers-pictures",
    navigationLabel: "Iffer's Pictures",
    shortNavigationLabel: "Iffer's",
    indexLabel: "Case 03",
    artifactCopy: {
      accessibleDescription:
        "Full ownership across copy, visual design, and code, shaped around light, composition, and story.",
      primaryLabel: "Light / composition / story",
      secondaryLabel: "Full ownership",
      secondaryDetail: "Copy / design / code",
    },
    discipline: "Creative Direction",
    role: "Designer & Developer",
    summary:
      "A photography portfolio shaped from discovery and copy through visual design and implementation.",
    metaDescription:
      "The Iffer's Pictures photography portfolio, designed and built by Phil Arfuso.",
    ownership:
      "Phil independently owned discovery, copy, visual design, implementation, and direct client collaboration.",
    attribution:
      "This project was a personal gift for Phil's sister-in-law and is the PixelVerse exception: Phil, not Sami, owned its design.",
    approvedFeatures: [
      "Photography-led portfolio art direction",
      "Responsive gallery and content presentation",
      "Client-centered discovery, copy, and implementation",
    ],
    proofPoints: ["The complete public experience was designed and coded by Phil."],
    metrics: [],
    roadmap: [],
    mediaPolicy: {
      strategy: "approved-client-photography",
      allowed: ["Approved real photography from the Iffer's Pictures project"],
      prohibited: [
        "Generated family photography",
        "Generated maternity photography",
        "Generated couple, portrait, or event photography",
      ],
    },
  },
  {
    id: "pixelverse-studios",
    name: "PixelVerse Studios",
    prominence: "supporting",
    caseStudyStatus: "supporting-only",
    href: null,
    indexLabel: "Support 01",
    discipline: "After-Hours Studio",
    role: "Lead Developer",
    summary:
      "An after-hours studio for helping local small businesses and experimenting beyond full-time product work.",
    metaDescription:
      "PixelVerse Studios, Phil Arfuso's after-hours development studio for local small businesses.",
    ownership:
      "Phil leads all coding. Phil and Sami share administration, sales, and general client support.",
    attribution:
      "Sami leads design and Phil leads development. Iffer's Pictures is the exception and was designed by Phil.",
    approvedFeatures: [
      "Client discovery and technical planning",
      "Frontend and backend implementation",
      "Maintenance, performance, and search-oriented experimentation",
    ],
    proofPoints: ["Public client work includes Iffer's Pictures and Jones Pressure Washing NJ."],
    metrics: [],
    roadmap: [],
    mediaPolicy: {
      strategy: "public-site-media",
      allowed: ["Approved public client-site imagery and code-native page compositions"],
      prohibited: ["Unapproved client assets", "Private client analytics"],
    },
  },
  {
    id: "earthcam",
    name: "EarthCam",
    prominence: "supporting",
    caseStudyStatus: "supporting-only",
    href: null,
    indexLabel: "Support 02",
    discipline: "Earlier Career",
    role: "Frontend Developer & Team Lead",
    summary:
      "Earlier-career frontend and team leadership work on EarthCam's public live-streaming player.",
    metaDescription:
      "Phil Arfuso's earlier frontend and team-lead work on EarthCam's public streaming player.",
    ownership:
      "Phil contributed to product requirements and architecture, scoped and delegated work across a five-person team, mentored developers, and implemented parts of the player himself.",
    attribution:
      "EarthCam is supporting earlier-career context and should remain concise relative to the three featured projects.",
    approvedFeatures: [
      "Public live-streaming player controls and navigation",
      "Reusable player, form, and layout components",
      "Screenshot annotation and social-sharing workflow",
    ],
    proofPoints: ["Led and mentored a five-person frontend team during a high-turnover period."],
    metrics: [],
    roadmap: [],
    mediaPolicy: {
      strategy: "public-streaming-media",
      allowed: ["Public player imagery and original diagrams of frontend component systems"],
      prohibited: ["Private client streams", "Unsupported historical performance claims"],
    },
  },
] as const satisfies readonly PortfolioProject[];

export type ProjectId = (typeof projects)[number]["id"];
export type ProjectRecord = (typeof projects)[number];
export type FeaturedProjectRecord = Extract<ProjectRecord, { prominence: "featured" }>;

export const featuredProjects = projects.filter(
  (project): project is FeaturedProjectRecord => project.prominence === "featured",
);

export const supportingProjects = projects.filter(
  (project): project is Extract<ProjectRecord, { prominence: "supporting" }> =>
    project.prominence === "supporting",
);

export function getProject(projectId: ProjectId): ProjectRecord {
  const project = projects.find(({ id }) => id === projectId);

  if (!project) {
    throw new Error(`Unknown portfolio project: ${projectId}`);
  }

  return project;
}
