import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Phil Arfuso — Full-Stack Software Engineer",
    template: "%s — Phil Arfuso",
  },
  description:
    "The portfolio of Phil Arfuso, a full-stack software engineer who turns complex systems into products that feel simple.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
