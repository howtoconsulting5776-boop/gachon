/**
 * 프로덕션(또는 지정 URL)에서 /robots.txt, /sitemap.xml HTTP 200 및 기본 내용 검사.
 *
 * 사용:
 *   node scripts/verify-public-seo.mjs https://예시.vercel.app
 *   VERIFY_SITE_URL=https://... node scripts/verify-public-seo.mjs
 *   npm run seo:verify -- https://...
 */

function normalizeOrigin(raw) {
  const s = String(raw || "")
    .trim()
    .replace(/\/$/, "");
  if (!s) return null;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

const origin =
  normalizeOrigin(process.argv[2]) ||
  normalizeOrigin(process.env.VERIFY_SITE_URL) ||
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeOrigin("https://gachon-educonsulting-site.vercel.app");

if (!origin) {
  console.error(
    "사용할 사이트 URL이 없습니다. 인자 또는 VERIFY_SITE_URL / NEXT_PUBLIC_SITE_URL 을 지정하세요."
  );
  process.exit(1);
}

const checks = [
  { path: "/robots.txt", label: "robots.txt" },
  { path: "/sitemap.xml", label: "sitemap.xml" },
];

let failed = false;

for (const { path, label } of checks) {
  const url = `${origin}${path}`;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "gachon-site-seo-verify/1.0" },
    });
    const ok = res.status === 200;
    const ct = res.headers.get("content-type") || "";
    console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${url}`);
    if (!ok) {
      failed = true;
      continue;
    }
    const body = await res.text();
    if (path === "/robots.txt") {
      if (!/sitemap:\s*https?:\/\//i.test(body)) {
        console.warn(`  [warn] ${label}: Sitemap: 줄이 없거나 형식이 예상과 다릅니다.`);
      } else if (!body.includes(`${origin}/sitemap.xml`)) {
        console.warn(
          `  [warn] ${label}: Sitemap URL이 이 origin(${origin})과 다를 수 있습니다.`
        );
      }
    }
    if (path === "/sitemap.xml") {
      if (!ct.includes("xml") && !body.trimStart().startsWith("<?xml")) {
        console.warn(`  [warn] ${label}: XML이 아닌 응답일 수 있습니다. content-type=${ct}`);
      }
      if (!body.includes("<urlset") && !body.includes("<sitemapindex")) {
        console.warn(`  [warn] ${label}: urlset/sitemapindex 가 없습니다.`);
      }
    }
  } catch (e) {
    console.error(`FAIL ${url}`, e.message || e);
    failed = true;
  }
}

console.log("");
console.log("--- Google Search Console ---");
console.log(`1) 속성 URL이 위과 동일한지 확인: ${origin}`);
console.log(`2) 사이트맵 제출: ${origin}/sitemap.xml`);
console.log("3) URL 검사로 위 두 경로를 각각 열어 색인 요청(선택)");

process.exit(failed ? 1 : 0);
