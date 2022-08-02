/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["abadis.ir", "www.svgrepo.com", "img.icons8.com"] },
  i18n: {
    locales: ["en-US", "ar-EG", "es-ES", "nl-NL", "id-ID"],
    defaultLocale: "ar-EG",
    localePath: "./public/assets",
    localeDetection: false,
  },
};

module.exports = nextConfig;
