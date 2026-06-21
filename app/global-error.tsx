"use client";

// Top-level error boundary for failures in the root layout itself. Must render
// its own <html>/<body> because it replaces the whole document on a hard error.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#fff", color: "#0b1220" }}>
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>Something went wrong</h1>
            <p style={{ color: "#475569", margin: "0 0 1.5rem", fontSize: "0.95rem" }}>
              GradPilot AI hit an unexpected error. Please try again.
            </p>
            <button
              onClick={reset}
              style={{ background: "#2563EB", color: "#fff", border: "none", borderRadius: 9999, padding: "0.7rem 1.5rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
            {error.digest && <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "1.5rem" }}>Reference: {error.digest}</p>}
          </div>
        </div>
      </body>
    </html>
  );
}
