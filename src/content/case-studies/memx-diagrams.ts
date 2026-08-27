export const memxSystemDiagrams = {
  configuration: {
    index: "Figure 01",
    eyebrow: "Configuration architecture",
    title: "One active market shapes the full request path.",
    summary:
      "The database supplied configuration, while market-specific classes handled rules and methods that could not be shared. Phil's frontend system translated that context into reusable fields, market-correct behavior, and sanitized requests.",
    accessibleDescription:
      "The active market selects both database configuration and market-specific rules. Those inputs establish a shared platform context that feeds reusable UI components and utilities before a validated, sanitized request reaches a server endpoint.",
    activeMarket: {
      label: "Active market",
      detail: "Select the implementation context.",
    },
    inputs: [
      {
        index: "02A",
        label: "Database configuration",
        detail: "Entities and feature-support flags.",
      },
      {
        index: "02B",
        label: "Market-specific classes",
        detail: "Rules and methods that cannot be shared.",
      },
    ],
    output: [
      {
        index: "03",
        label: "Shared platform context",
        detail: "Resolve the current market's supported behavior.",
      },
      {
        index: "04",
        label: "Reusable UI system",
        detail: "Show fields, apply rules, and reuse utilities.",
      },
      {
        index: "05",
        label: "Sanitized request",
        detail: "Send the market-correct payload to the server.",
      },
    ],
  },
  realtime: {
    index: "Figure 02",
    eyebrow: "Real-time delivery",
    title: "New exchange data, carried safely to the interface.",
    summary:
      "A later IPO requirement crossed the backend, WebSocket server, error handling, and UI. The flow below explains responsibility without exposing fields, payloads, or private exchange behavior.",
    accessibleDescription:
      "An exchange event enters a backend handler, is delivered through the WebSocket server, passes missing-and-malformed-field handling, and is folded into an efficient live interface update.",
    steps: [
      {
        index: "01",
        label: "Exchange event",
        detail: "A new real-time requirement begins at the source.",
      },
      {
        index: "02",
        label: "Backend handler",
        detail: "Extend the server path for the additional data.",
      },
      {
        index: "03",
        label: "WebSocket delivery",
        detail: "Carry the update through the live channel.",
      },
      {
        index: "04",
        label: "Field handling",
        detail: "Account for missing or malformed values.",
      },
      {
        index: "05",
        label: "Live UI update",
        detail: "Integrate the data efficiently in the interface.",
      },
    ],
  },
} as const;
