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

/** slug별 주제에 맞는 스톡 커버 (Unsplash). `npm run images:lab-covers` 로 동기화 */
const COVERS = [
  {
    slug: "rne",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "career-guidance",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "academy",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "counseling-management",
    url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ai-tech-edu",
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "research-writing",
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
  },
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
