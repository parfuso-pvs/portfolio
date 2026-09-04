import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14272c",
          color: "#f5f0e2",
          border: "3px solid #76b9da",
          fontFamily: "sans-serif",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        PA
      </div>
    ),
    size,
  );
}
