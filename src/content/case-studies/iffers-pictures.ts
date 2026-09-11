export const iffersPicturesCaseStudy = {
  publicUrl: "https://ifferspictures.com",
  hero: {
    kicker: "Client project",
    title: "A complete client website",
    lede:
      "I took Iffer’s Pictures from an open-ended brief to a live, responsive website—shaping its structure, content, visual system, and frontend implementation.",
    meta: [
      { label: "Role", value: "Designer & developer" },
      { label: "Scope", value: "Strategy / Content / UX / Frontend" },
      { label: "Status", value: "Live production website" },
    ],
  },
  origin: {
    eyebrow: "Project framing",
    title: "Turning business needs into a clear web experience",
    body: "The photographer needed more than a gallery. The site had to explain her services, establish trust, and give local clients a clear path from discovering the work to making an inquiry.",
    calloutLabel: "Delivery",
    callout:
      "I translated those needs into the site structure, content hierarchy, and interface, then carried the work through development and launch.",
  },
  principles: [
    {
      title: "Turn requirements into structure",
      body: "I organized services, portfolio work, testimonials, investment details, FAQs, and inquiries into a clear path through the site.",
    },
    {
      title: "Create a reusable interface system",
      body: "Shared patterns keep image-led pages, service information, promotions, and supporting content consistent without making every page feel identical.",
    },
    {
      title: "Build for real devices",
      body: "Responsive layouts, intentional image treatment, and clear navigation keep the experience usable across desktop and mobile.",
    },
  ],
  media: {
    eyebrow: "Content system in practice",
    title: "A gallery designed for varied content",
    body: "Landscape, portrait, detail, and event images need different proportions. The gallery preserves those differences while keeping the experience coherent across screen sizes.",
    images: [
      {
        id: "maternity",
        src: "/images/iffers-pictures/maternity-session.jpg",
        width: 1080,
        height: 720,
        alt: "Expectant mother in a pale pink dress standing in the center of a tree-lined garden.",
        label: "Maternity / environment",
      },
      {
        id: "family",
        src: "/images/iffers-pictures/family-session.jpg",
        width: 1365,
        height: 2048,
        alt: "Parents smiling with their young daughter during an autumn family portrait session.",
        label: "Family / connection",
      },
      {
        id: "engagement",
        src: "/images/iffers-pictures/engagement-detail.jpg",
        width: 2048,
        height: 1365,
        alt: "Engaged couple holding hands in front of softly lit holiday greenery.",
        label: "Engagement / detail",
      },
      {
        id: "event",
        src: "/images/iffers-pictures/baby-shower-details.jpg",
        width: 1333,
        height: 2000,
        alt: "Decorated chair, table settings, and blue balloons prepared for a baby shower.",
        label: "Event / atmosphere",
      },
    ],
    sourceNote:
      "Production photography provided by Iffer’s Pictures. The photography remains the client’s work; I designed and built the system that presents it.",
  },
  ownership: {
    eyebrow: "End-to-end delivery",
    title: "From requirements to a live production site",
    body: "I was responsible for discovery, information architecture, copy, visual design, responsive implementation, and launch. That full-project view kept the business needs, content, and technical decisions aligned.",
    scope: [
      "Requirements discovery",
      "Information architecture",
      "Content strategy",
      "Interface design",
      "Frontend development",
      "Production launch",
    ],
  },
  proof: {
    eyebrow: "Shipped product",
    title: "Live in production",
    body: "The finished website is serving Iffer’s Pictures across its portfolio, service, and inquiry pages.",
    linkLabel: "Visit Iffer’s Pictures",
  },
} as const;
