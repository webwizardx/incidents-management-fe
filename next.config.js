/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [{ source: '/', destination: '/incidents', permanent: false }];
  },
};

module.exports = nextConfig;
