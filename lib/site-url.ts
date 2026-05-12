/**
 * 공개 사이트 절대 URL 루트 (끝 슬래시·경로 없음, origin만).
 * OG·sitemap·robots·JSON-LD·메일 링크 등에 사용.
 *
 * 우선순위:
 * 1) NEXT_PUBLIC_SITE_URL — 수동 지정(검색콘솔 속성 URL과 반드시 동일 권장)
 * 2) Vercel 프로덕션 호스트 — `VERCEL_PROJECT_PRODUCTION_URL` 또는 Next용 `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`
 *    (배포별 `VERCEL_URL`보다 안정적이라 사이트맵·robots에 유리)
 * 3) VERCEL_URL — 미리보기·배포 호스트(프로덕션에선 2·1 설정 권장)
 * 4) localhost
 */
function normalizePublicOrigin(raw: string): string | null {
  let s = raw.trim().replace(/\/$/, "");
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) {
    s = `https://${s}`;
  }
  try {
    const u = new URL(s);
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

export function getPublicSiteRoot(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const normalized = normalizePublicOrigin(explicit);
    if (normalized) return normalized;
  }

  const vercelProd =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) {
    const normalized = normalizePublicOrigin(vercelProd);
    if (normalized) return normalized;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^\/+/, "").split("/")[0];
    const normalized = normalizePublicOrigin(`https://${host}`);
    if (normalized) return normalized;
  }

  return "http://localhost:3000";
}
