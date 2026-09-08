export const memxCaseStudy = {
  hero: {
    kicker: "Case study",
    title: "Exchange portal tools",
    lede:
      "At MEMX, I built portal tools used by market operations teams and exchange members. My role grew from frontend development into backend services, databases, architecture, and production delivery.",
    contributions: [
      {
        title: "Member and operations tools",
        detail: "Built onboarding, connectivity, risk, trading, access, and institution-management tools.",
      },
      {
        title: "Reusable frontend systems",
        detail: "Created shared systems for fields, visibility, validation, and request handling across multiple market implementations.",
      },
      {
        title: "APIs, data, and production delivery",
        detail: "Worked across backend services, databases, production fixes, and QA-supported releases.",
      },
    ],
    meta: [
      { label: "Role", value: "Frontend developer → Full-stack developer" },
      { label: "Time", value: "December 2019 to August 2026" },
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
    title: "One portal, different markets",
    body: [
      "Market operations teams, trading firms, and exchange members used the portal to manage connectivity, firm and risk settings, trading queries, and user access.",
      "Each market brought its own fields, rules, and features. Copying the application for every new market was never going to scale.",
    ],
  },
  portal: {
    eyebrow: "Portal tools",
    title: "What I built",
    body: "I built and maintained tools for onboarding, connectivity, firms, MPIDs, risk settings, trade queries, symbols, user access, and institution switching.",
    audiences: [
      {
        title: "Exchange members",
        body: "Managed firm details, connectivity, users, risk settings, and trading information.",
      },
      {
        title: "Market operations",
        body: "Supported member firms, moved between institutions, reviewed configuration, and worked across different markets.",
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
      title: "Built the frontend foundation",
      body: "I started by building onboarding and connectivity tools for ports, MPIDs, firms, risk settings, trade queries, symbols, and role-based access. I also built institution switching so market operations could support members without leaving the portal.",
    },
    {
      title: "Turned it into a reusable platform",
      body: "When the first market technology customer came on board, my manager established the database-driven market architecture. I built the frontend system around it, including reusable fields, feature flags, market visibility, validation, and request sanitization.",
    },
    {
      title: "Expanded across the stack",
      body: "My role grew to include database, server, and UI work, along with production support and fixes surfaced by customers and QA. Depending on the feature, I either contributed at a specific layer or carried the work from data and validation through the interface and release.",
    },
  ],
  configuration: {
    eyebrow: "Frontend configuration",
    title: "How one frontend supported multiple markets",
    body: "The selected market loaded its database configuration along with the few rules that could not be shared. Together, those inputs gave the frontend everything it needed to render the right fields, apply the right behavior, validate the data, and build a clean request.",
  },
} as const;
