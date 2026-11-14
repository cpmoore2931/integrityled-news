import { MAIN_SITE, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted">
        <p>Integrity LED LLC</p>
        <a href={`tel:${PHONE_TEL}`} className="font-semibold text-brand-ink">{PHONE_DISPLAY}</a>
        <a href={MAIN_SITE} className="font-semibold text-brand-ink hover:underline">Back to the website</a>
      </div>
    </footer>
  );
}
