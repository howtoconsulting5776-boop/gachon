/**
 * 공개 사이트 절대 URL 루트 (끝 슬래시 없음).
 * OG·sitemap·robots·JSON-LD·메일 링크 등에 사용.
 *
 * 우선순위: NEXT_PUBLIC_SITE_URL → (Vercel) VERCEL_URL → localhost
 * 프로덕션에서는 가능하면 고정 도메인을 NEXT_PUBLIC_SITE_URL 로 두는 것이 권장됩니다.
 */
export function getPublicSiteRoot(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^\/+/, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}
