import { createFileRoute } from "@tanstack/react-router";
import { renderRss } from "@/lib/feed";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => new Response(renderRss(), { headers: { "content-type": "application/rss+xml; charset=utf-8" } }),
    },
  },
});
