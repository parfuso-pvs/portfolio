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
    "While creating online surveys, I started using CSS and JavaScript to add conditional logic and custom styling. That work is what led me toward software development.",
} as const;

export const employmentHistory = [
  {
    detailHref: "/about#earthcam",
    projectId: "earthcam",
    roles: [
      {
        title: "Junior Front-End Developer",
        start: { dateTime: "2018-03", label: "March 2018" },
        end: { dateTime: "2019-07", label: "July 2019" },
        summary:
          "Built and maintained web applications in React and JavaScript, turning an early interest in coding into my first professional development role.",
      },
      {
        title: "Lead Front-End Developer",
        start: { dateTime: "2019-07", label: "July 2019" },
        end: { dateTime: "2019-12", label: "December 2019" },
        summary:
          "Led a five-person frontend team while staying hands-on with architecture, implementation, code review, planning, and mentorship.",
      },
    ],
  },
  {
    detailHref: "/work/memx",
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
  detailHref: string;
  projectId: "earthcam" | "memx";
  roles: readonly CareerRole[];
}[];

export const independentPractice = {
  context: "Built outside full-time work",
  entries: [
    {
      detailHref: "/about#pixelverse-studios",
      projectId: "pixelverse-studios",
      role: "Co-Founder & Full Stack Engineer",
      start: { dateTime: "2024-01", label: "January 2024" },
      summary:
        "A small, after-hours development studio created to help local businesses that needed practical web support. I lead the engineering work.",
    },
    {
      detailHref: "/work/domani",
      projectId: "domani",
      role: "Creator & Full-Stack Engineer",
      start: { dateTime: "2025-12", label: "December 2025" },
      summary:
        "An independent planning product that grew out of that practice. I designed, built, launched, and continue to operate the iOS and Android app.",
    },
  ],
} as const;
