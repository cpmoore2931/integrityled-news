import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogHome } from "@/components/blog-home";
import { getPublishedPosts } from "@/lib/posts";
import { getCategory, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/news/category/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, posts: getPublishedPosts().filter((post) => post.category === category.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.category.label} · ${SITE_NAME}` }] : [],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData();
  return <BlogHome posts={posts} active={category.slug} heading={category.label} lede={category.description} />;
}
