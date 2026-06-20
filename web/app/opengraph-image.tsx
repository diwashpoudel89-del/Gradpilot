import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GradPilot AI — The AI Operating System for International Students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1220 0%, #1d4ed8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #60a5fa, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            ✈
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>GradPilot AI</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
          The AI Operating System for International Students
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#bbd2ff", maxWidth: 880 }}>
          Find visa-sponsored jobs, fix your CV, ace interviews, and build your UK career.
        </div>
      </div>
    ),
    { ...size }
  );
}
