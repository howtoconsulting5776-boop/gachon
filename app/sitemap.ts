import type { MetadataRoute } from "next";
import { MOCK_FACULTY, MOCK_LABS, MOCK_NOTICES } from "@/lib/mock-data";
import { communityNoticePath } from "@/lib/post-path";
import { getPublicSiteRoot } from "@/lib/site-url";

/**
 * 공지 URL은 Prisma/DB·Edge 이슈로 500이 나지 않도록 목 데이터만 사용합니다.
 * (페이지 `/community/notice`는 DB 연동 유지. 검색용 URL 목록은 정적·안정 우선.)
 */
const STATIC_PATHS = [
  "/",
  "/about/greeting",
  "/about/vision",
  "/about/academic",
  "/about/curriculum",
  "/admissions",
  "/admissions/schedule",
  "/admissions/scholarships",
  "/admissions/faq",
  "/admissions/events",
  "/admissions/brochure",
  "/admissions/inquiry",
  "/community/notice",
  "/community/board",
  "/community/gallery",
  "/community/qna",
  "/community/network",
  "/faculty",
  "/labs",
  "/resources",
  "/search",
  "/legal/privacy",
  "/legal/terms",
  "/legal/accessibility",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const root = getPublicSiteRoot();
    const now = new Date();

    const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
      url: `${root}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    }));

    const notices = MOCK_NOTICES.slice(0, 50);
    const noticeEntries: MetadataRoute.Sitemap = notices.map((n) => {
      const parsed = new Date(n.date);
      const lastModified = Number.isNaN(parsed.getTime()) ? now : parsed;
      return {
        url: `${root}${communityNoticePath(n)}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.65,
      };
    });

    const labEntries: MetadataRoute.Sitemap = MOCK_LABS.map((l) => ({
      url: `${root}/labs/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

    const facultyEntries: MetadataRoute.Sitemap = MOCK_FACULTY.map((f) => ({
      url: `${root}/faculty/${f.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

    return [...staticEntries, ...noticeEntries, ...labEntries, ...facultyEntries];
  } catch (err) {
    console.error("[sitemap] failed, serving minimal fallback", err);
    const root = getPublicSiteRoot();
    return [
      {
        url: root,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
