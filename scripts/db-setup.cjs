/**
 * Supabase .env 의 [YOUR-PASSWORD] 치환 후 prisma db push + seed
 * 사용: npm run db:setup -- "데이터베이스비밀번호"
 * 또는: set SUPABASE_DB_PASSWORD=... (cmd) / $env:SUPABASE_DB_PASSWORD="..." (pwsh) 후 npm run db:setup
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env");

function main() {
  if (!fs.existsSync(envPath)) {
    console.error("[가천대] .env 파일이 없습니다. .env.example 을 참고해 .env 를 만드세요.");
    process.exit(1);
  }

  let text = fs.readFileSync(envPath, "utf8");
  const pwd = (process.argv[2] && String(process.argv[2]).trim()) || (process.env.SUPABASE_DB_PASSWORD && String(process.env.SUPABASE_DB_PASSWORD).trim()) || "";

  if (text.includes("[YOUR-PASSWORD]")) {
    if (!pwd) {
      console.error(`
[가천대] .env 안에 Supabase 기본 플레이스홀더 [YOUR-PASSWORD] 가 남아 있습니다.

  Supabase → Settings → Database → Database password 확인 후, 아래처럼 한 번 실행하세요.

    npm run db:setup -- "여기에-DB-비밀번호"

  (비밀번호에 특수문자가 있어도 됩니다. 스크립트가 URL 인코딩합니다.)
`);
      process.exit(1);
    }
    const encoded = encodeURIComponent(pwd);
    const next = text.split("[YOUR-PASSWORD]").join(encoded);
    fs.writeFileSync(envPath, next, "utf8");
    console.log("[가천대] [YOUR-PASSWORD] 를 치환했습니다. prisma db push 를 진행합니다.\n");
    text = next;
  }

  const run = (args) =>
    spawnSync("npx", args, {
      cwd: root,
      stdio: "inherit",
      shell: true,
      env: process.env,
    });

  const push = run(["prisma", "db", "push"]);
  if (push.status !== 0) {
    process.exit(push.status ?? 1);
  }
  const seed = run(["prisma", "db", "seed"]);
  process.exit(seed.status ?? 0);
}

main();
