import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

/**
 * 프로덕션에서 `*.vercel.app` 으로 들어온 방문을 공식 도메인(`NEXT_PUBLIC_SITE_URL`)으로 보냅니다.
 * (Vercel 대시보드 주소와 실제 홍보·검색용 도메인이 다를 때 주소를 하나로 맞춤)
 */
function canonicalHostRedirect(req: NextRequest): NextResponse | null {
  if (process.env.VERCEL_ENV !== "production") return null;
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  let canonical: URL;
  try {
    canonical = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host = req.nextUrl.hostname;
  if (!host.endsWith(".vercel.app")) return null;
  if (host === canonical.hostname) return null;
  const dest = new URL(req.nextUrl.pathname + req.nextUrl.search, canonical.origin);
  return NextResponse.redirect(dest, 308);
}

export default withAuth(
  function middleware(req) {
    const redirect = canonicalHostRedirect(req);
    if (redirect) return redirect;
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const path = req.nextUrl.pathname;
        if (!path.startsWith("/admin")) return true;
        if (path === "/admin/login" || path.startsWith("/admin/login/")) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * API·정적 자산·파일 확장자 경로 제외 (MIME/성능)
     */
    "/((?!api/|_next/static|_next/image|_next/webpack-hmr|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
