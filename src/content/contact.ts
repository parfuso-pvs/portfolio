export const contactContent = {
  hero: {
    eyebrow: "Contact",
    index: "Contact file / 01",
    title: "Bring me the problem that refuses to stay simple.",
    body: "I’m interested in senior full-stack, product-engineering, frontend-platform, and systems-oriented work where technical depth and product judgment belong in the same room.",
  },
  channels: [
    {
      index: "01",
      label: "Email",
      value: "arfusop@gmail.com",
      note: "Start with the role, product, or problem.",
      href: "mailto:arfusop@gmail.com",
      external: false,
    },
    {
      index: "02",
      label: "LinkedIn",
      value: "linkedin.com/in/phil-arfuso",
      note: "Professional history and a direct message.",
      href: "https://www.linkedin.com/in/phil-arfuso",
      external: true,
    },
    {
      index: "03",
      label: "GitHub",
      value: "github.com/parfuso-pvs",
      note: "Code, products, and ongoing experiments.",
      href: "https://github.com/parfuso-pvs",
      external: true,
    },
  ],
  fit: {
    eyebrow: "Where I’m most useful",
    title: "Complexity with consequences.",
    items: [
      "Products that have outgrown their first architecture",
      "Teams where engineering helps shape the requirement",
      "Interfaces that need rigor without losing their humanity",
    ],
    location: "New Jersey / Eastern Time",
    note: "No elaborate pitch required. A little context and a difficult problem are a good place to begin.",
  },
} as const;
