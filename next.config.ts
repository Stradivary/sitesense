import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/presentation/utils/i18n/request.ts',
);
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com",
        protocol: "https",
      }
    ],
  }
};

export default withNextIntl(nextConfig);
