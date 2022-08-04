/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["abadis.ir", "www.svgrepo.com", "img.icons8.com"] },
  i18n: {
    locales: ["en", "ar", "es", "nl", "id"],
    defaultLocale: "ar",
    localePath: "./public/assets",
    localeDetection: false,
  },
};

module.exports = nextConfig;
