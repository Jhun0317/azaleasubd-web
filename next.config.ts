/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // ⛔ completely disable static prerendering
  output: "standalone",
};

module.exports = nextConfig;
