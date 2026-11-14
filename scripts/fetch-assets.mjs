#!/usr/bin/env node
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname } from "node:path";

const files = [
  "/logo.png",
  "/favicon.png",
  "/og.jpg",
  "/heroes/industry.jpg",
  "/heroes/gov.jpg",
  "/heroes/code.jpg",
];
const origin = "https://news.integrityled.info";

for (const path of files) {
  const local = `public${path}`;
  try {
    await access(local);
    continue;
  } catch {}
  const res = await fetch(`${origin}${path}`);
  if (!res.ok) {
    console.warn(`[assets] skip ${path}: ${res.status}`);
    continue;
  }
  await mkdir(dirname(local), { recursive: true });
  await writeFile(local, Buffer.from(await res.arrayBuffer()));
  console.log(`[assets] fetched ${path}`);
}
