import { Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import type { Post } from "@/lib/posts";
import { getCategory } from "@/lib/site";

export function PostCard({ post }: { post: Post }) {
  const category = getCategory(post.category);
  return (
    <article className="overflow-hidden border border-line bg-card shadow-sm">
      <Link to="/news/$slug" params={{ slug: post.slug }}>
        <img src={post.heroImage} alt={post.heroAlt} className="aspect-video w-full object-cover" />
        <div className="px-4 py-4">
          <p className="text-xs font-semibold tracking-widest text-brand-ink uppercase">{category?.label}</p>
          <h2 className="mt-2 font-display text-xl font-black text-ink">{post.title}</h2>
          <p className="mt-2 text-sm text-muted">{post.summary}</p>
          <time dateTime={post.date} className="mt-3 block text-xs text-muted">
            {format(parseISO(post.date), "MMMM d, yyyy")}
          </time>
        </div>
      </Link>
    </article>
  );
}
