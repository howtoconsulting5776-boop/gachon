import type { MetadataRoute } from "next";
import { getPublicSiteRoot } from "@/lib/site-url";

/** `public/robots.txt` 대신 사용 — Sitemap URL이 항상 `getPublicSiteRoot()`와 동일 호스트가 되도록 함 */
export default function robots(): MetadataRoute.Robots {
  const base = getPublicSiteRoot();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
