export const SITE_NAME = "Integrity LED News";
export const SITE_ORIGIN = "https://news.integrityled.info";
export const MAIN_SITE = "https://integrityled.info";
export const PHONE_DISPLAY = "(830) 538-0991";
export const PHONE_TEL = "+18305380991";

export const CATEGORIES = [
  { slug: "industry-news", label: "Industry News", description: "LED and lighting news from around the world." },
  { slug: "code-updates", label: "Code Updates", description: "NEC and electrical code changes that affect lighting work." },
  { slug: "gov-contracts", label: "Gov Contracts", description: "Government lighting bids, awards, and forecasts." },
  { slug: "electrician-news", label: "Electrician News", description: "Trade and contractor news." },
  { slug: "product-spotlight", label: "Product Spotlight", description: "Fixtures from the Integrity LED line." },
  { slug: "recalls-safety", label: "Recalls & Safety", description: "Recalls and safety notices." },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
