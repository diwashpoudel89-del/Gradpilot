import { ImageResponse } from "next/og";

// Branded social-share image used when gradpilotai.com links are posted.
export const runtime = "edge";
export const alt = "GradPilot AI — The career co-pilot for international students in the UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A8A 55%, #2563EB 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 40 }}>🎓</span> GradPilot AI
        </div>
        <div style={{ marginTop: 36, fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>
          Land the right UK job — before your visa clock runs out.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#BBD2FF", maxWidth: 900 }}>
          Visa-aware jobs, CV coaching, interview prep &amp; Graduate Route guidance for international students.
        </div>
        <div style={{ marginTop: "auto", fontSize: 26, color: "#E3ECFF" }}>gradpilotai.com</div>
      </div>
    ),
    { ...size }
  );
}
