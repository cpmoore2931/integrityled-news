import { createFileRoute } from "@tanstack/react-router";
import { renderSitemap } from "@/lib/feed";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => new Response(renderSitemap(), { headers: { "content-type": "application/xml; charset=utf-8" } }),
    },
  },
});
