/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // CMS may paste any https image URL — allow remote hosts.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
