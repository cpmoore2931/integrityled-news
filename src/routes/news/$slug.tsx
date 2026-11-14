import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { Markdown } from "@/lib/markdown";
import { getPublishedPost } from "@/lib/posts";
import { absoluteUrl, getCategory, MAIN_SITE, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = getPublishedPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const url = absoluteUrl(`/news/${loaderData.slug}`);
    const image = absoluteUrl(loaderData.heroImage);
    return {
      meta: [
        { title: `${loaderData.title} · ${SITE_NAME}` },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.title },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const category = getCategory(post.category);
  const url = `${SITE_ORIGIN}/news/${post.slug}`;
  return (
    <main id="content" className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <p className="text-sm text-muted">
        <Link to="/" className="font-medium text-brand-ink hover:underline">News</Link>
        {category ? <span> / {category.label}</span> : null}
      </p>
      <p className="mt-4 text-xs font-semibold tracking-widest text-brand-ink uppercase">{category?.label}</p>
      <h1 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">{post.title}</h1>
      <time dateTime={post.date} className="mt-3 block text-sm text-muted">{format(parseISO(post.date), "MMMM d, yyyy")}</time>
      <img src={post.heroImage} alt={post.heroAlt} className="mt-6 aspect-video w-full object-cover" />
      <div className="mt-8"><Markdown source={post.body} /></div>
      <aside className="mt-8 border-l-4 border-accent bg-card px-4 py-4">
        <p className="text-xs font-semibold tracking-widest text-ink uppercase">Why it matters</p>
        <p className="mt-2 text-ink">{post.whyItMatters}</p>
      </aside>
      <div className="mt-6 border border-line bg-card px-4 py-4">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">Source</p>
        <a href={post.sourceUrl} className="mt-2 inline-flex text-lg font-semibold text-brand-ink underline" rel="noopener noreferrer">{post.sourceName}</a>
      </div>
      <div className="mt-10 border-t border-line pt-8">
        <a href={MAIN_SITE} className="inline-flex bg-brand-ink px-5 py-3 font-display text-base font-bold text-paper">Request a quote</a>
      </div>
      <p className="mt-6 text-xs text-muted">Share: {url}</p>
    </main>
  );
}
