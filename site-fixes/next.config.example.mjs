// MERGE this into your existing next.config.(mjs|js).
// Fixes audit findings:
//   - Missing security headers (only HSTS was set)
//   - `x-powered-by: Next.js` information disclosure
//
// NOTE on CSP: the Content-Security-Policy below is shipped as REPORT-ONLY so it
// cannot break the live site. Watch the browser console / your report endpoint,
// tighten as needed, then switch the key to "Content-Security-Policy" to enforce.
// Next.js inline bootstrap + Vercel Analytics need the script-src entries shown.

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // removes the `x-powered-by` header

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          // 'unsafe-inline' is required for Next.js's inline hydration bootstrap.
          "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-insights.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self' https://*.supabase.co https://*.vercel-insights.com https://va.vercel-scripts.com",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
