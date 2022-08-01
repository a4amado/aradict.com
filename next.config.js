/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["abadis.ir", "www.svgrepo.com", "img.icons8.com"] },
};

module.exports = nextConfig;
