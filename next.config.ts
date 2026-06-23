/**
 * Next.js configuration.
 *
 * `remotePatterns` whitelists the external domains that the built-in
 * <Image> optimisation pipeline is allowed to fetch and process.
 * Any domain not listed here will throw a runtime error when used with
 * next/image — add new domains here rather than switching back to <img>.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
