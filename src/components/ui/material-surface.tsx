import type { ComponentPropsWithoutRef, ElementType } from "react";

type MaterialSurfaceElement = "article" | "div" | "section";
type MaterialSurfaceElevation = "flat" | "pinned" | "raised";

type MaterialSurfaceProps<TElement extends MaterialSurfaceElement = "div"> = {
  as?: TElement;
  elevation?: MaterialSurfaceElevation;
} & Omit<ComponentPropsWithoutRef<TElement>, "as">;

const elevationClasses: Record<MaterialSurfaceElevation, string> = {
  flat: "",
  pinned: "material-sheet-pinned",
  raised: "material-sheet-raised",
};

export function MaterialSurface<TElement extends MaterialSurfaceElement = "div">({
  as,
  className,
  elevation = "flat",
  ...props
}: MaterialSurfaceProps<TElement>) {
  const Surface = (as ?? "div") as ElementType;
  const classes = ["material-sheet", elevationClasses[elevation], className]
    .filter(Boolean)
    .join(" ");

  return <Surface className={classes} {...props} />;
}

type RegistrationMarkProps = Omit<ComponentPropsWithoutRef<"span">, "aria-hidden" | "children">;

export function RegistrationMark({ className, ...props }: RegistrationMarkProps) {
  const classes = ["registration-mark", className].filter(Boolean).join(" ");

  return <span aria-hidden="true" className={classes} {...props} />;
}
