import { createFileRoute } from "@tanstack/react-router";
import { BlogHome } from "@/components/blog-home";
import { getPublishedPosts } from "@/lib/posts";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

const HOME_DESCRIPTION = "Short lighting briefs for electrical contractors, facility managers, and government buyers. Newest posts first.";

export const Route = createFileRoute("/news/")({
  loader: () => getPublishedPosts(),
  head: () => ({
    meta: [
      { title: SITE_NAME },
      { name: "description", content: HOME_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/` }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  const posts = Route.useLoaderData();
  return (
    <BlogHome
      posts={posts}
      active={null}
      heading="Lighting news you can read between jobs."
      lede="Short briefs for electrical contractors, facility managers, and public buyers. Each post is our summary, with a link to the original source."
    />
  );
}
