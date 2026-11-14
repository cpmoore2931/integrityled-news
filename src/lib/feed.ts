import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, getCategory, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function rfc822(date: string) {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

export function renderRss() {
  const posts = getPublishedPosts();
  const items = posts.map((post) => {
    const link = absoluteUrl(`/news/${post.slug}`);
    const category = getCategory(post.category);
    return `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="true">${escapeXml(link)}</guid>\n      <pubDate>${rfc822(post.date)}</pubDate>\n      <category>${escapeXml(category?.label ?? post.category)}</category>\n      <description>${escapeXml(post.summary)}</description>\n    </item>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(SITE_NAME)}</title>\n    <link>${escapeXml(SITE_ORIGIN)}/</link>\n    <description>Short lighting news from Integrity LED.</description>\n${items}\n  </channel>\n</rss>\n`;
}

export function renderSitemap() {
  const urls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/news`, ...getPublishedPosts().map((post) => absoluteUrl(`/news/${post.slug}`))];
  const body = urls.map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
