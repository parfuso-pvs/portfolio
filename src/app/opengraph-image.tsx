import { ImageResponse } from "next/og";

export const alt = "Phil Arfuso, full-stack developer for web and mobile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const verticalLines = [182, 412, 642, 872, 1102];
const horizontalLines = [136, 316, 496];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "52px 58px 48px",
          background: "#14272c",
          color: "#f5f0e2",
          fontFamily: "sans-serif",
        }}
      >
        {verticalLines.map((left) => (
          <div key={`v-${left}`} style={{ position: "absolute", top: 0, bottom: 0, left, width: 1, background: "rgba(118,185,218,0.2)" }} />
        ))}
        {horizontalLines.map((top) => (
          <div key={`h-${top}`} style={{ position: "absolute", top, left: 0, right: 0, height: 1, background: "rgba(118,185,218,0.2)" }} />
        ))}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          <span>Phil Arfuso</span>
          <span style={{ color: "#76b9da" }}>Selected work</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28, color: "#76b9da", fontSize: 22, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
            <span>Full-stack developer</span>
            <span style={{ width: 72, height: 2, background: "#3e8b6f" }} />
            <span>Web &amp; mobile</span>
          </div>
          <div style={{ maxWidth: 1040, fontSize: 82, fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 0.94, textTransform: "uppercase" }}>
            I build software that works well and feels good to use.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#c4cbc4", fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <span>New Jersey / Eastern Time</span>
          <span>Work · Resume · Contact</span>
        </div>
      </div>
    ),
    size,
  );
}
