import type { MetadataRoute } from "next";
import { getPublicSiteRoot } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const root = getPublicSiteRoot();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${root}/sitemap.xml`,
  };
}
