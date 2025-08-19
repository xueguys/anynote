import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // other PWA options...
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub Pages, configure static export
  output: 'export',
  images: {
    unoptimized: true,
  },

  // If your repository name is 'my-app', uncomment the lines below
  // basePath: '/my-app',
  // assetPrefix: '/my-app',
};

export default withPWA(nextConfig);
