"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { primaryNavigation } from "@/content/navigation";

import styles from "./primary-navigation.module.css";

const desktopLinkClass =
  "type-label text-ink relative isolate flex min-h-11 items-center overflow-hidden border-r border-line px-4 transition-colors last:border-r-0 focus-visible:z-10 focus-visible:outline-offset-[-3px]";
const mobileLinkClass =
  "type-label text-ink relative flex min-h-11 items-center justify-between border-b border-line px-5 py-3 last:border-b-0 hover:bg-paper-deep focus-visible:z-10 focus-visible:outline-offset-[-3px]";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href;
}

export function PrimaryNavigation() {
  const pathname = usePathname();

  return <PathAwareNavigation key={pathname} pathname={pathname} />;
}

function PathAwareNavigation({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function closeRestoredMenu() {
      setIsOpen(false);
    }

    window.addEventListener("pageshow", closeRestoredMenu);
    window.addEventListener("popstate", closeRestoredMenu);

    return () => {
      window.removeEventListener("pageshow", closeRestoredMenu);
      window.removeEventListener("popstate", closeRestoredMenu);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      requestAnimationFrame(() => toggleRef.current?.focus());
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <nav aria-label="Primary" className="hidden lg:block">
        <div className="material-sheet material-sheet-raised flex overflow-hidden">
          {primaryNavigation.map((item) => {
            const current = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`${desktopLinkClass} ${styles.desktopTab} ${current ? `${styles.currentDesktopTab} bg-accent text-paper-raised hover:bg-accent-strong` : "hover:bg-paper-deep"}`}
              >
                <span className={`${styles.tabLabel} relative z-10`}>
                  {"shortLabel" in item ? item.shortLabel : item.label}
                </span>
                <span
                  className={`${styles.tabRegistration} ${current ? "bg-accent-strong" : "bg-accent"} absolute inset-x-3 bottom-0 z-10 h-0.5`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="relative lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          className="material-sheet material-sheet-raised relative grid size-11 place-items-center rounded-pill focus-visible:outline-offset-4"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{isOpen ? "Close navigation" : "Open navigation"}</span>
          <span className="relative block h-3.5 w-4" aria-hidden="true">
            <span
              className={`bg-ink absolute top-0 left-0 h-px w-4 origin-center transition-transform ${isOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`bg-ink absolute bottom-0 left-0 h-px w-4 origin-center transition-transform ${isOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>

        <nav
          id="mobile-navigation"
          aria-label="Primary"
          className={`${styles.mobileSheet} material-sheet material-sheet-pinned absolute top-14 right-0 w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden`}
          hidden={!isOpen}
        >
          {primaryNavigation.map((item, index) => {
            const current = isCurrentPath(pathname, item.href);

            return (
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`${mobileLinkClass} ${styles.mobileLink} ${current ? "bg-paper-deep" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.mobileLabel}>{item.label}</span>
                <span
                  className={`${styles.mobileMarker} ${current ? `${styles.currentMobileMarker} bg-accent` : "border border-line-strong"} size-1.5`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
