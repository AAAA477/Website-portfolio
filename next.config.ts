import type { NextConfig } from "next";

/**
 * Single source of truth for the deploy sub-path.
 *
 * This is a GitHub Pages *project* site, served from
 * https://aaaa477.github.io/Website-portfolio/ rather than the domain root.
 *
 * Next applies basePath automatically to next/link and the router, but NOT to
 * plain <a href="/...">, to next/image when unoptimized, or to metadata URLs.
 * So it's also exported as an env var and applied by hand via lib/paths.ts.
 *
 * Moving to a custom domain (or renaming the repo to aaaa477.github.io so it
 * becomes a user site)? Set this to "" and everything follows.
 */
const basePath = "/Website-portfolio";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Pins the workspace root to this project. Without it Next.js walks up and
  // finds the stray lockfile in the home directory.
  outputFileTracingRoot: __dirname,

  // Emits a fully static site to ./out, so this deploys anywhere the current
  // site does: GitHub Pages, Netlify, S3, Vercel.
  output: "export",

  // Static export has no image optimisation server. Dimensions are still
  // declared on every image, so layout shift stays at zero.
  images: { unoptimized: true },

  // Emits /work/index.html rather than /work.html, which static hosts prefer.
  trailingSlash: true,
};

export default nextConfig;
