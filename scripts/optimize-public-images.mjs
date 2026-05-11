/**
 * public/ 아래 주요 JPG·PNG를 압축(최대 너비 1920)하고, 같은 이름의 .webp를 생성합니다.
 * 실행: npm run images:optimize  (devDependency sharp 필요)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

async function main() {
  const sharp = (await import("sharp")).default;

  const dirs = [
    publicDir,
    path.join(publicDir, "images", "site"),
    path.join(publicDir, "images", "labs"),
    path.join(publicDir, "faculty"),
  ];

  const files = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!/\.(jpe?g|png)$/i.test(name)) continue;
      files.push(path.join(dir, name));
    }
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const buf = fs.readFileSync(file);
    let pipeline = sharp(buf).rotate();
    const meta = await pipeline.metadata();
    const w = meta.width ?? 0;
    if (w > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    if (ext === ".png") {
      const out = await pipeline.png({ quality: 82, compressionLevel: 9 }).toBuffer();
      fs.writeFileSync(file, out);
    } else {
      const out = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      fs.writeFileSync(file, out);
    }

    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const webpBuf = await sharp(fs.readFileSync(file))
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuf);

    const kb = (fs.statSync(file).size / 1024).toFixed(1);
    console.log(`${path.relative(root, file)} → ${kb} KB (+ ${path.basename(webpPath)})`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
