import { ImageResponse } from "next/og";
export const alt = "Agustín Diaz: real problems, useful software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0e0818",
        color: "#fcf6d9",
        width: "100%",
        height: "100%",
        padding: "65px 75px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28 }}>
        Agustín Diaz
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 100,
          letterSpacing: -5,
          lineHeight: 1.05,
        }}
      >
        <span>Real problems.</span>
        <span style={{ color: "#fe9f6d" }}>Useful software.</span>
      </div>
      <div style={{ display: "flex", fontSize: 23 }}>
        Sr. AI Software Engineer at Mercado Libre. Co-founder & CTO, Lessio & Co.
      </div>
    </div>,
    size,
  );
}
