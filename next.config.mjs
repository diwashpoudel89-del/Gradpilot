/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      // Mentor/testimonial avatars can come from arbitrary admin-supplied URLs.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
