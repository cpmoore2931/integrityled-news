import { CategoryFilter } from "@/components/category-filter";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";
import type { CategorySlug } from "@/lib/site";

export function BlogHome({
  posts,
  active,
  heading,
  lede,
}: {
  posts: Post[];
  active: CategorySlug | null;
  heading: string;
  lede: string;
}) {
  return (
    <main id="content" className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl font-black text-ink sm:text-4xl">{heading}</h1>
      <p className="mt-3 max-w-2xl text-pretty text-muted">{lede}</p>
      <div className="mt-6">
        <CategoryFilter active={active} />
      </div>
      {posts.length === 0 ? (
        <p className="mt-10 text-muted">No posts in this category yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
