#!/usr/bin/env node
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log("[migrate] DATABASE_URL not set — skipping.");
  process.exit(0);
}
console.log("[migrate] DATABASE_URL is set but this news site does not use a database.");
process.exit(0);
