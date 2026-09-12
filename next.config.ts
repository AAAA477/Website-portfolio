import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  // GitHub Pages project sites serve from /<repo>. Uncomment both lines if you
  // deploy to https://aaaa477.github.io/Website-portfolio/ rather than a
  // custom domain or Netlify.
  // basePath: "/Website-portfolio",
  // assetPrefix: "/Website-portfolio/",
};

export default nextConfig;
