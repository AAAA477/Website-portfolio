import { site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-meta text-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 px-6">
        {/* Rendered at build time, so the year is correct without client JS. */}
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <a href="#top" className="transition-colors hover:text-text">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
