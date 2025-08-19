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
  // GitHub Pages requires trailing slash for proper routing
  trailingSlash: true,

  // If your repository name is 'my-app', uncomment the lines below
  basePath: '/anynote',
  assetPrefix: '/anynote',
};

export default withPWA(nextConfig);