/**
 * 공개 사이트 절대 URL 루트 (끝 슬래시·경로 없음, origin만).
 * OG·sitemap·robots·JSON-LD·메일 링크 등에 사용.
 *
 * 우선순위: NEXT_PUBLIC_SITE_URL → (Vercel) VERCEL_URL → localhost
 * 프로덕션에서는 가능하면 고정 도메인을 NEXT_PUBLIC_SITE_URL 로 두는 것이 권장입니다.
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

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^\/+/, "").split("/")[0];
    const normalized = normalizePublicOrigin(`https://${host}`);
    if (normalized) return normalized;
  }

  return "http://localhost:3000";
}
