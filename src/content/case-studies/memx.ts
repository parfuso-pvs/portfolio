export const memxCaseStudy = {
  hero: {
    kicker: "Case study",
    title: "Exchange portal tools",
    lede:
      "At MEMX, I work on the portal used by market operations teams and exchange members. I started on the frontend and now build across interfaces, backend services, databases, architecture, and production delivery.",
    contributions: [
      {
        title: "Member and operations tools",
        detail: "Onboarding, connectivity, risk, trading queries, access, and institution switching.",
      },
      {
        title: "Reusable frontend systems",
        detail: "Shared fields, visibility, validation, and request handling across market implementations.",
      },
      {
        title: "APIs, data, and production delivery",
        detail: "Backend services, database work, production fixes, and QA-supported releases.",
      },
    ],
    meta: [
      { label: "Role", value: "Frontend developer → Full-stack developer" },
      { label: "Time", value: "2019 — present" },
      { label: "Focus", value: "Reusable UI / APIs + data / Production systems" },
    ],
  },
  scale: {
    total: "8",
    label: "market implementations",
    groups: [
      {
        value: "3",
        label: "MEMX-operated",
        detail: "One equities market and two options markets",
      },
      {
        value: "5",
        label: "Technology customers",
        detail: "One crypto market and four equities markets",
      },
    ],
  },
  context: {
    eyebrow: "The portal",
    title: "Who uses it and why",
    body: [
      "Market operations teams, trading firms, and exchange members use the portal to manage connectivity, firm and risk settings, trading queries, and user access.",
      "Adding another market couldn’t mean copying the application again. Each one had different fields, rules, and features.",
    ],
  },
  portal: {
    eyebrow: "Portal tools",
    title: "What I built in the portal",
    body: "Over time, I built and maintained tools for onboarding, connectivity, firms, MPIDs, risk settings, trade queries, symbols, user access, and institution switching.",
    audiences: [
      {
        title: "Exchange members",
        body: "Manage their firms, connectivity, users, risk settings, and trading information.",
      },
      {
        title: "Market operations",
        body: "Support member firms, switch between institutions, review configuration, and work across different markets.",
      },
    ],
    groups: [
      {
        title: "Connectivity and onboarding",
        items: ["Ports", "MPIDs", "Firms", "Member setup"],
      },
      {
        title: "Trading and risk",
        items: ["Risk settings", "Trade queries", "Symbol tools"],
      },
      {
        title: "Access and support",
        items: ["Users", "Roles", "Institution switching"],
      },
    ],
  },
  phases: [
    {
      title: "Build the frontend foundation",
      body: "I started with onboarding and connectivity tools for ports, MPIDs, firms, risk settings, trade queries, symbols, and role-based access. I also built institution switching so market operations could support members without leaving the portal.",
    },
    {
      title: "Make it reusable",
      body: "When the first market-technology customer arrived, my manager scaffolded a database-driven market architecture. I built the corresponding frontend configuration system: reusable fields, feature flags, market visibility, validation, and request sanitization.",
    },
    {
      title: "Work across the full stack",
      body: "My role expanded into database, server, and UI work, along with production support and issues found by customers or QA. Depending on the feature, I now contribute at one layer or own the path from data and validation through the interface and release.",
    },
  ],
  configuration: {
    eyebrow: "Frontend configuration",
    title: "How the shared frontend worked",
    body: "The active market selected database configuration and any rules that genuinely could not be shared. Those inputs became one platform context that reusable UI could turn into the correct fields, behavior, validation, and sanitized request.",
  },
} as const;
