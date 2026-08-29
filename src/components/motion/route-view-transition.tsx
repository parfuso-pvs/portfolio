import { ViewTransition, type ReactNode } from "react";

const routeTransitionClasses = {
  "route-back": "route-back",
  "route-forward": "route-forward",
  "route-switch": "route-switch",
  default: "none",
};

export function RouteViewTransition({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ViewTransition default="none" enter={routeTransitionClasses} exit={routeTransitionClasses}>
      {children}
    </ViewTransition>
  );
}
