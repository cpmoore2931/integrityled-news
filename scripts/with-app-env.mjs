#!/usr/bin/env node
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const VITE_PREFIX = "VITE_";

function readAppEnv(root) {
  try {
    const parsed = JSON.parse(readFileSync(join(root, ".grok/app-env.json"), "utf8"));
    const env = {};
    if (parsed && typeof parsed === "object") {
      for (const [key, value] of Object.entries(parsed)) {
        if (key.startsWith(VITE_PREFIX) && typeof value === "string") env[key] = value;
      }
    }
    return env;
  } catch {
    return {};
  }
}

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error("usage: node scripts/with-app-env.mjs <command> [args]");
  process.exit(2);
}
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const child = spawn(command, args, { stdio: "inherit", env: { ...readAppEnv(root), ...process.env } });
child.on("exit", (code) => process.exit(code ?? 1));
