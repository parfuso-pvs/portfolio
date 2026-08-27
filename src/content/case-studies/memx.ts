export const memxCaseStudy = {
  brief: {
    eyebrow: "The operating surface",
    title: "A portal at the operational edge of the exchange.",
    body: "Market operations, trading firms, and exchange members used the portal to configure connectivity, manage firm and risk settings, query trading activity, and control who could see or change each part of the system.",
    audience:
      "Entitlements lived at the user-role level, from read-only access to super-user capabilities. Market operations could switch institution context when supporting a member.",
  },
  marketScale: [
    {
      value: "03",
      label: "MEMX-operated markets",
      detail: "One equities exchange and two options exchanges.",
    },
    {
      value: "05",
      label: "market-technology customers",
      detail: "One crypto exchange and four equities exchanges.",
    },
  ],
  phases: [
    {
      index: "01",
      title: "Build the operating surface",
      body: "The first phase was frontend-led: onboarding and connectivity forms, then the individual tools members needed for ports, MPIDs, firms, risk, trade queries, symbols, and role entitlements.",
      detail:
        "Phil built the portal's early UI foundation and scaffolded the institution-switching experience used by market operations.",
    },
    {
      index: "02",
      title: "Make one platform serve many markets",
      body: "The first market-technology customer changed the problem. Two known markets became a growing set of implementations with shared foundations and materially different business rules.",
      detail:
        "Phil's manager scaffolded the database-driven market architecture. Phil created the corresponding frontend system for reusable fields, feature flags, market-specific visibility, validation, and request sanitization.",
    },
    {
      index: "03",
      title: "Own the full path",
      body: "The role expanded into full-stack delivery, production support, incident calls, customer requests, QA findings, and features spanning the database, server, and interface.",
      detail:
        "For a later real-time IPO requirement, Phil extended the backend and WebSocket flow, handled missing or malformed fields, and delivered the new data efficiently in the UI.",
    },
  ],
  architecture: {
    eyebrow: "The scaling decision",
    title: "Shared by default. Specific where the market demanded it.",
    body: "Database configuration determined entities and feature support for the active market. Market-specific classes handled rules that could not be shared. On the frontend, reusable components and utilities translated that configuration into the correct fields, behavior, and sanitized requests.",
    note: "The system improved with every customer: early custom additions exposed patterns, and those patterns drove continued refactoring toward a cleaner shared platform.",
  },
  operatingPractice: {
    eyebrow: "Production practice",
    title: "Treat every fix as a system change.",
    body: "The team reproduced issues manually, mapped the affected surfaces, planned the smallest safe change, tested heavily, and used detailed pull-request review before handing a development release to QA.",
    team: "The team grew from Phil and his manager to as many as seven additional developers, with engineers sometimes splitting a feature by layer and sometimes owning it end to end.",
  },
} as const;
