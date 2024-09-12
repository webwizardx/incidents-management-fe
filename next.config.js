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
        hostname: 'scontent.fccs4-2.fna.fbcdn.net',
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
