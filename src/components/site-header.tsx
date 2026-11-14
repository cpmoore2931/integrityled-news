import { Link } from "@tanstack/react-router";
import { MAIN_SITE, PHONE_DISPLAY, PHONE_TEL, SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-lg font-black tracking-tight text-ink">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href={`tel:${PHONE_TEL}`} className="font-semibold text-brand-ink">{PHONE_DISPLAY}</a>
          <a href={MAIN_SITE} className="font-semibold text-brand-ink hover:underline">Back to the website</a>
        </div>
      </div>
    </header>
  );
}
