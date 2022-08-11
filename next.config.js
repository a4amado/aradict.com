const { i18n } = require('./next-i18next.config');



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["abadis.ir", "www.svgrepo.com", "img.icons8.com"] },
  i18n,
};

module.exports = nextConfig;
