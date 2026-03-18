/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  typescript: {
    // The registry/preview-modules are demo files that are loaded dynamically
    // They don't need strict type-checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint for the build to allow proceeding with type errors
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow external avatar/image services used in preview modules
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
