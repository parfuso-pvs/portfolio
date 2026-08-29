export type NavigationItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const primaryNavigation = [
  { href: "/#experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] satisfies readonly NavigationItem[];
