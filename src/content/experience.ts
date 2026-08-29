export type CareerDate = {
  dateTime: string;
  label: string;
};

export type CareerRole = {
  end: CareerDate;
  start: CareerDate;
  summary: string;
  title: string;
};

export const careerOrigin = {
  company: "MarketView",
  context: "Where coding started",
  role: "Online Project Supervisor",
  summary:
    "While creating online surveys, I started using CSS and JavaScript for conditional logic and custom page styling. That small opening turned into a new career.",
} as const;

export const employmentHistory = [
  {
    projectId: "earthcam",
    roles: [
      {
        title: "Junior Front-End Developer",
        start: { dateTime: "2018-03", label: "March 2018" },
        end: { dateTime: "2019-07", label: "July 2019" },
        summary:
          "Built and maintained React and JavaScript applications, turning an early interest in coding into my first professional development role.",
      },
      {
        title: "Lead Front-End Developer",
        start: { dateTime: "2019-07", label: "July 2019" },
        end: { dateTime: "2019-12", label: "December 2019" },
        summary:
          "Led a five-person frontend team while staying hands-on with architecture, implementation, planning, code review, and mentorship.",
      },
    ],
  },
  {
    projectId: "memx",
    roles: [
      {
        title: "Front-End Engineer",
        start: { dateTime: "2019-12", label: "December 2019" },
        end: { dateTime: "2023-01", label: "January 2023" },
        summary:
          "Built onboarding, connectivity, and exchange-configuration tools, then established reusable frontend patterns for market-specific behavior.",
      },
      {
        title: "Senior Full Stack Engineer",
        start: { dateTime: "2023-01", label: "January 2023" },
        end: { dateTime: "2026-08", label: "August 2026" },
        summary:
          "Expanded into server and database work, production support, and end-to-end feature ownership across eight market implementations.",
      },
    ],
  },
] as const satisfies readonly {
  projectId: "earthcam" | "memx";
  roles: readonly CareerRole[];
}[];

export const independentPractice = {
  context: "Built alongside",
  entries: [
    {
      projectId: "pixelverse-studios",
      role: "Co-Founder & Full Stack Engineer",
      start: { dateTime: "2024-01", label: "January 2024" },
      summary:
        "A small after-hours studio created to help local businesses with practical web needs. I lead engineering; Sami leads design.",
    },
    {
      projectId: "domani",
      role: "Creator & Full-Stack Engineer",
      start: { dateTime: "2025-12", label: "December 2025" },
      summary:
        "An independent planning product that grew out of that practice. I designed, built, launched, and continue to operate the iOS and Android app.",
    },
  ],
  relatedProjectId: "iffers-pictures",
} as const;
