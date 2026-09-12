/**
 * Prefixes a root-relative path with the deploy sub-path.
 *
 * Next applies `basePath` automatically to next/link and the router, but NOT to:
 *   - plain <a href="/..."> tags
 *   - next/image when `images.unoptimized` is set (static export)
 *   - metadata URLs (icons, Open Graph images)
 *
 * On a GitHub Pages project site those all resolve against the domain root and
 * 404, which is what produced the unstyled, image-less page. Anything written
 * as a root-relative URL should go through here.
 *
 * The value comes from next.config.ts, so there is one place to change it when
 * the site moves to a custom domain (set basePath to "" and this becomes a no-op).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!BASE_PATH) return path;
  // Leave absolute URLs, mailto:, tel: and fragment-only links alone.
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
