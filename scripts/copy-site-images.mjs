import fs from "fs";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "public", "images", "site");
const map = [
  ["단체사진.jpg", "group-photo.jpg"],
  ["무한대.webp", "infinity.webp"],
  ["비전타워.jpg", "vision-tower.jpg"],
  ["산업환경.jpg", "industry-environment.jpg"],
  ["손주은 특강.jpg", "son-jueun-lecture.jpg"],
  ["손주은.jpg", "son-jueun.jpg"],
  ["유리.jpg", "glass-corridor.jpg"],
];

fs.mkdirSync(outDir, { recursive: true });
for (const [from, to] of map) {
  const src = path.join(root, from);
  const dest = path.join(outDir, to);
  if (!fs.existsSync(src)) {
    console.error("Missing:", from);
    process.exitCode = 1;
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log("OK", to);
}
