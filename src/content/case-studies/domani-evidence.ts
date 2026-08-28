import type { MetricSource } from "@/content/projects";

export const domaniEvidence = {
  eyebrow: "Production evidence",
  title: "Early traction, measured without pretending certainty.",
  body: "The useful signal is not scale alone. Accounts, planning behavior, repeat use, and production store transactions can each be examined—but only within the limits of the system that recorded them.",
  sourceLabels: {
    "production-database": "Production database",
    "product-analytics": "Product analytics",
    "store-verification": "Store verification",
  } satisfies Record<MetricSource, string>,
  caveats: [
    "Account figures exclude profiles recorded as deleted.",
    "Activity figures count identified production users rather than shared anonymous identifiers.",
    "Store evidence counts verified production transactions; revenue was not retrieved.",
    "No conversion rate is shown because some lifetime-access profiles predate current webhook tracking.",
  ],
  signals: {
    eyebrow: "Behavior beyond totals",
    title: "Evidence of planning more than once.",
    body: "The strongest early signals are behavioral: people returned to plan on multiple days, and a meaningful subset used the product across longer spans.",
  },
} as const;
