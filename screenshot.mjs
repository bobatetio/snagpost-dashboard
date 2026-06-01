// Screenshots a dashboard route. Reuses the playwright copy already installed
// in tokscriptv3-dashboard so we don't bloat dashboard devDeps for this.
import { chromium } from "/Users/bob/Documents/tokscript/tokscriptv3-dashboard/node_modules/playwright/index.mjs";
import { mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "temporary screenshots");
mkdirSync(outDir, { recursive: true });

const url = process.argv[2] || "http://localhost:5174";
const label = process.argv[3];

const existing = readdirSync(outDir).filter((f) => f.startsWith("screenshot-"));
const next = existing.length + 1;
const file = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const out = resolve(outDir, file);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(out);
