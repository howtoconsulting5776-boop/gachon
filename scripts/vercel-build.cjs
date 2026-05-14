/**
 * Vercel 프로덕션 빌드: 스키마 반영 후 Next 빌드
 *
 * 1) prisma migrate deploy — pending 마이그레이션 적용
 *    (완전히 빈 DB면 faculty_columns 등 마이그레이션 SQL만 먼저 적용될 수 있음)
 * 2) 기존 DB에 테이블만 있고 마이그레이션 이력이 없으면 P3005 →
 *    prisma db push 후 migrate resolve --applied 로 이력만 정리
 * 3) 항상 prisma db push — schema.prisma 전체가 DB와 일치하도록 (신규·기존 공통)
 * 4) next build
 */
const { spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");

function runNpx(args) {
  const r = spawnSync("npx", args, {
    cwd: root,
    stdio: "pipe",
    shell: true,
    encoding: "utf8",
  });
  const stdout = r.stdout || "";
  const stderr = r.stderr || "";
  return { status: r.status ?? 1, out: stdout + stderr, stdout, stderr };
}

const MIGRATION_DIR = "20260513140000_add_faculty_columns";

function main() {
  let migrate = runNpx(["prisma", "migrate", "deploy"]);
  if (migrate.status !== 0) {
    const o = migrate.out;
    if (o.includes("P3005")) {
      console.warn(
        "[vercel-build] 비어 있지 않은 DB + 마이그레이션 이력 없음(P3005). prisma db push 후 migrate resolve 합니다."
      );
      const push = runNpx(["prisma", "db", "push"]);
      if (push.status !== 0) {
        process.stderr.write(push.stdout + push.stderr);
        process.exit(push.status);
      }
      const resolve = runNpx(["prisma", "migrate", "resolve", "--applied", MIGRATION_DIR]);
      if (resolve.status !== 0) {
        process.stderr.write(resolve.stdout + resolve.stderr);
        process.exit(resolve.status);
      }
      migrate = runNpx(["prisma", "migrate", "deploy"]);
      if (migrate.status !== 0) {
        process.stderr.write(migrate.stdout + migrate.stderr);
        process.exit(migrate.status);
      }
      console.log("[vercel-build] db push + migrate resolve + migrate deploy 완료");
    } else {
      process.stderr.write(migrate.stdout + migrate.stderr);
      process.exit(migrate.status);
    }
  } else {
    console.log("[vercel-build] prisma migrate deploy 완료");
  }

  const schemaSync = runNpx(["prisma", "db", "push"]);
  if (schemaSync.status !== 0) {
    process.stderr.write(schemaSync.stdout + schemaSync.stderr);
    process.exit(schemaSync.status);
  }
  console.log("[vercel-build] prisma db push 로 전체 스키마 동기화 완료");

  const build = runNpx(["next", "build"]);
  if (build.status !== 0) {
    process.stderr.write(build.stdout + build.stderr);
    process.exit(build.status);
  }
  process.exit(0);
}

main();
