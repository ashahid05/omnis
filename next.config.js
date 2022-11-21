/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.eu-central-1.amazonaws.com" },
    ],
  },
  experimental: { appDir: true },
};

module.exports = nextConfig;
