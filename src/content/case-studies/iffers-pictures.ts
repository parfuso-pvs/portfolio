export const iffersPicturesCaseStudy = {
  publicUrl: "https://ifferspictures.com",
  hero: {
    kicker: "Case study",
    title: "A portfolio for a photographer",
    lede:
      "I created Iffer’s Pictures as a Christmas gift for my sister-in-law and led the project from our first conversation through the finished site.",
    meta: [
      { label: "Role", value: "Designer & developer" },
      { label: "Ownership", value: "Discovery / Copy / Design / Code" },
      { label: "Collaboration", value: "Directly with the photographer" },
    ],
  },
  origin: {
    eyebrow: "A personal brief",
    title: "It started as a Christmas gift",
    body: [
      "I worked directly with my sister-in-law to understand her photography, the clients she wanted to reach, and how she wanted the business to feel. From there, I built the brand, wrote the copy, designed the experience, and developed the site.",
      "Unlike most PixelVerse Studios projects, I worked directly with the client and led the full creative and technical process.",
    ],
  },
  principles: [
    {
      title: "Build a brand that fits the work",
      body: "I started with her color preference and built the palette, typography, layout, and visual direction around it. The brand needed to feel connected to her photography without competing with it.",
    },
    {
      title: "Find the voice together",
      body: "Our conversations shaped copy that sounds like her, not like a photography template.",
    },
    {
      title: "Make it work on every screen",
      body: "I designed the gallery and supporting content for desktop and mobile so the smaller experience felt just as intentional.",
    },
  ],
  media: {
    eyebrow: "Selected photography",
    title: "A gallery shaped around the photography",
    body: "Portraits, details, family sessions, and events each have their own rhythm instead of being forced into the same frame.",
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
      "Approved production photography from Iffer’s Pictures. The photography remains the client’s work. I designed and built the site that presents it.",
  },
  ownership: {
    eyebrow: "Project scope",
    title: "From a color preference to a complete brand",
    body: "She started with a color preference, but no existing brand system. I turned that starting point into the palette, typography, visual direction, and interface, then built the portfolio around her photography.",
    scope: [
      "Discovery",
      "Copy",
      "Art direction",
      "Interface design",
      "Development",
    ],
  },
  proof: {
    eyebrow: "The public result",
    title: "See the live site",
    body: "The full photography portfolio is live at ifferspictures.com.",
    linkLabel: "Visit Iffer’s Pictures",
  },
} as const;
