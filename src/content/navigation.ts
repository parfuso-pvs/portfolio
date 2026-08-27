export type NavigationItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const primaryNavigation = [
  { href: "/work", label: "Work" },
  { href: "/work/memx", label: "MEMX" },
  { href: "/work/domani", label: "Domani" },
  { href: "/work/iffers-pictures", label: "Iffer's Pictures", shortLabel: "Iffer's" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const satisfies readonly NavigationItem[];
