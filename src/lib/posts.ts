import { postFiles } from "virtual:news-posts";
import { CATEGORIES, type CategorySlug } from "@/lib/site";

export type Post = {
  title: string;
  slug: string;
  date: string;
  category: CategorySlug;
  summary: string;
  heroImage: string;
  heroAlt: string;
  sourceName: string;
  sourceUrl: string;
  whyItMatters: string;
  draft: boolean;
  sample: boolean;
  body: string;
};

const REQUIRED = ["title", "slug", "date", "category", "summary", "hero_image", "source_name", "source_url", "why_it_matters", "draft"] as const;

function asString(value: string | boolean | undefined, file: string, key: string) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${file}: front matter "${key}" must be a non-empty string`);
  }
  return value;
}

function parseFrontMatter(raw: string, file: string) {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) throw new Error(`${file}: must start with front matter`);
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) throw new Error(`${file}: unterminated front matter`);
  const data: Record<string, string | boolean> = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const match = /^([a-z0-9_]+):\s*(.*)$/.exec(line);
    if (!match) throw new Error(`${file}: cannot read front matter line "${line}"`);
    const key = match[1] ?? "";
    const rawValue = (match[2] ?? "").trim();
    if (rawValue === "true" || rawValue === "false") data[key] = rawValue === "true";
    else if ((rawValue.startsWith('"') && rawValue.endsWith('"')) || (rawValue.startsWith("'") && rawValue.endsWith("'"))) data[key] = rawValue.slice(1, -1);
    else data[key] = rawValue;
  }
  return { data, body: text.slice(end + 5).trim() };
}

function parsePost(file: string, raw: string): Post {
  const { data, body } = parseFrontMatter(raw, file);
  for (const key of REQUIRED) if (!(key in data)) throw new Error(`${file}: missing front matter "${key}"`);
  const slug = asString(data.slug, file, "slug");
  const summary = asString(data.summary, file, "summary");
  if (summary.length > 160) throw new Error(`${file}: summary is ${summary.length} characters; the max is 160`);
  const date = asString(data.date, file, "date");
  const category = asString(data.category, file, "category");
  if (!CATEGORIES.some((item) => item.slug === category)) throw new Error(`${file}: unknown category "${category}"`);
  const sourceUrl = asString(data.source_url, file, "source_url");
  const heroImage = asString(data.hero_image, file, "hero_image");
  if (typeof data.draft !== "boolean") throw new Error(`${file}: draft must be true or false`);
  return {
    title: asString(data.title, file, "title"),
    slug,
    date,
    category: category as CategorySlug,
    summary,
    heroImage,
    heroAlt: typeof data.hero_alt === "string" ? data.hero_alt : asString(data.title, file, "title"),
    sourceName: asString(data.source_name, file, "source_name"),
    sourceUrl,
    whyItMatters: asString(data.why_it_matters, file, "why_it_matters"),
    draft: data.draft,
    sample: data.sample === true,
    body,
  };
}

export function getAllPosts() {
  return postFiles.map(({ file, raw }) => parsePost(file, raw)).sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
}
export function getPublishedPosts() { return getAllPosts().filter((post) => !post.draft); }
export function getPublishedPost(slug: string) { return getPublishedPosts().find((post) => post.slug === slug); }
