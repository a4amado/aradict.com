const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      "abadis.ir",
      "www.svgrepo.com",
      "img.icons8.com",
      "cloudflare-ipfs.com",
      "lh3.googleusercontent.com",
      "cdn.discordapp.com"
    ],
  },
  i18n
};

module.exports = nextConfig;
