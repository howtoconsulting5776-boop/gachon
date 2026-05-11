/**
 * LAB 섹션용 커버 이미지를 원격에서 받아 public/images/labs/ 에 저장합니다.
 * 실행: node scripts/fetch-lab-covers.mjs
 */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images", "labs");

const COVERS = [
  { slug: "rne", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75" },
  { slug: "academy", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=75" },
  { slug: "ai-tech-edu", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=75" },
  { slug: "research-writing", url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=75" },
];

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "gachon-site-lab-fetch/1.0" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error("redirect without location"));
          return resolve(download(loc));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const { slug, url } of COVERS) {
    const dest = path.join(outDir, `${slug}.jpg`);
    process.stdout.write(`Fetching ${slug}... `);
    const buf = await download(url);
    fs.writeFileSync(dest, buf);
    console.log(`${(buf.length / 1024).toFixed(1)} KB → ${path.relative(root, dest)}`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
