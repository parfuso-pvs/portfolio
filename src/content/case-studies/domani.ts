export const domaniSnapshotDate = "September 2, 2026";

export const domaniCaseStudy = {
  hero: {
    kicker: "Case study",
    title: "A planning app for tomorrow",
    lede:
      "Domani is a live iOS and Android app built around one small evening ritual: decide what matters tomorrow before the day begins.",
    meta: [
      { label: "Role", value: "Co-owner & full-stack developer" },
      { label: "Work", value: "Mobile development / Design / Release operations" },
      { label: "Status", value: "Live on iOS and Android" },
    ],
  },
  origin: {
    eyebrow: "Why I made it",
    title: "I wanted planning to feel lighter",
    body: [
      "Most productivity apps I tried came with a tradeoff: too much setup, an endless backlog, or a daily list that grew faster than it could be finished.",
      "Domani started with a smaller idea. Plan tomorrow in the evening, choose the one thing that matters most, and make an active decision about anything that carries forward.",
    ],
  },
  principles: [
    {
      label: "Tonight",
      title: "Plan before the day begins",
      body: "It’s easier to plan tomorrow the night before than in the middle of a busy morning.",
    },
    {
      label: "One thing",
      title: "Pick one priority",
      body: "A single top-priority task stays separate while categories organize the rest.",
    },
    {
      label: "Tomorrow",
      title: "Carry forward on purpose",
      body: "Rollover is a choice, and progress analytics make patterns visible over time.",
    },
  ],
  media: {
    eyebrow: "Real production UI",
    title: "The Today screen",
    body: "The Today view keeps the hierarchy simple: overall progress, one visible top priority, and the rest of the day organized with category and priority cues.",
    alt: "Domani Today screen showing Thursday, January 8, a daily progress summary, a top-priority task, and three planned tasks with category and priority labels.",
    note: "This is real public product media. The visible name, tasks, date, and values are demonstration content—not user records or portfolio analytics.",
    observations: [
      ["Daily progress", "Completed and remaining work share one summary."],
      ["Top priority", "The most important task stays distinct."],
      ["Useful context", "Category and priority cues support each task."],
    ],
  },
  ownership: {
    eyebrow: "Shared ownership",
    title: "Shared decisions, clear responsibility",
    body: "I own Domani with a friend who is a UX designer. We make the product and design decisions together, and I carry the engineering work through development, releases, analytics, and production support.",
    stages: ["Plan", "Design together", "Build", "Release", "Learn"],
  },
  boundary: {
    eyebrow: "What exists now",
    title: "What’s live and what we’re considering",
    shipped: [
      "Evening planning for the following day",
      "One top-priority task",
      "Task categories",
      "Intentional task rollover",
      "Progress analytics",
    ],
    exploring: ["Nested checklists", "Bullet lists", "Planning templates"],
  },
  evidence: {
    eyebrow: "Production snapshot",
    title: "Early production signals",
    body: `A dated snapshot of real product use as of ${domaniSnapshotDate}. These numbers establish that Domani is live and used; they are not presented as a growth or conversion claim.`,
    metrics: [
      {
        value: "63",
        label: "active accounts",
        detail: "66 registered accounts; 63 remained active and non-deleted.",
        source: "Production Supabase",
      },
      {
        value: "641",
        label: "current task records",
        detail: "238 are completed, or 37.1% of the task rows that currently exist.",
        source: "Production Supabase",
      },
      {
        value: "31 / 9",
        label: "monthly / weekly active users",
        detail: "Unique people with any event in the preceding rolling 30 / 7 days.",
        source: "PostHog",
      },
      {
        value: "89",
        label: "sessions in 30 days",
        detail: "An average of 2.9 sessions per identified monthly active user.",
        source: "PostHog",
      },
      {
        value: "8",
        label: "recorded lifetime transactions",
        detail: "Four App Store and four Play Store transactions; seven granted access and no refunds were recorded.",
        source: "RevenueCat webhook ledger",
      },
    ],
    caveats: [
      "Account figures exclude profiles recorded as deleted.",
      "Activity figures count identified users, not shared anonymous identifiers.",
      "The task count is a current row count, not a recoverable lifetime creation total; PostHog recorded 534 task-created events during the tracked period.",
      "One App Store transaction could not be matched to an account and did not grant access.",
      "Revenue was not retrieved.",
      "No conversion rate is shown because accounts span different tracking eras.",
    ],
  },
} as const;
