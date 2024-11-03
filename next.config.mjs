/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'react.email',
        port: '',
        pathname: '/static/**',
      },
    ],
  },
};

export default nextConfig;
