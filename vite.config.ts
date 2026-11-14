import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

function newsPostsPlugin(): Plugin {
  const virtualId = "virtual:news-posts";
  const resolvedId = "\0virtual:news-posts";
  return {
    name: "news-posts",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return null;
      const dir = join(process.cwd(), "content/posts");
      const published: { file: string; raw: string }[] = [];
      for (const name of readdirSync(dir).filter((entry) => entry.endsWith(".md")).sort()) {
        const raw = readFileSync(join(dir, name), "utf8");
        const fence = raw.indexOf("\n---\n");
        const front = fence === -1 ? raw : raw.slice(0, fence);
        if (/^draft:\s*true\s*$/m.test(front)) continue;
        published.push({ file: name, raw });
      }
      return `export const postFiles = ${JSON.stringify(published)};`;
    },
  };
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    newsPostsPlugin(),
    tailwindcss(),
    tanstackStart(),
    nitro({ preset: "vercel" }),
    viteReact(),
  ],
});
