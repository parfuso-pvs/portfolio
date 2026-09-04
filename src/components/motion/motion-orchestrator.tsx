"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = "[data-reveal]";
const groupSelector = "[data-reveal-group]";

function revealImmediately(elements: readonly HTMLElement[]) {
  elements.forEach((element) => {
    element.dataset.revealState = "visible";
  });
}

export function MotionOrchestrator() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>(groupSelector),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const groupedElements = new Set<HTMLElement>();
    const groupChildren = new Map<HTMLElement, HTMLElement[]>();

    document.documentElement.classList.add("motion-ready");

    groups.forEach((group) => {
      const stagger = Number(group.dataset.revealStagger ?? 80);
      const children = Array.from(
        group.querySelectorAll<HTMLElement>(":scope > [data-reveal]"),
      );

      children.forEach((child, index) => {
        groupedElements.add(child);

        if (!child.style.getPropertyValue("--reveal-delay")) {
          child.style.setProperty("--reveal-delay", `${index * stagger}ms`);
        }
      });

      if (children.length > 0) {
        groupChildren.set(group, children);
      }
    });

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealImmediately(elements);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let firstFrame = 0;
    let secondFrame = 0;

    const startObserving = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            const children = groupChildren.get(element);

            if (children) {
              if (element.matches(revealSelector)) {
                element.dataset.revealState = "visible";
              }
              revealImmediately(children);
            } else {
              element.dataset.revealState = "visible";
            }

            observer?.unobserve(element);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.12,
        },
      );

      groupChildren.forEach((_, group) => observer?.observe(group));
      elements
        .filter((element) => !groupedElements.has(element))
        .forEach((element) => observer?.observe(element));
    };

    // A full refresh begins with visible server HTML. Give the hidden
    // motion-ready state one completed paint before revealing intersections.
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(startObserving);
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      revealImmediately(elements);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      observer?.disconnect();
    };

    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      observer?.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [pathname]);

  return null;
}
