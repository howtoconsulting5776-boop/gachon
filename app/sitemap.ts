import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/data/posts";
import { MOCK_FACULTY, MOCK_LABS, MOCK_NOTICES } from "@/lib/mock-data";
import { communityNoticePath } from "@/lib/post-path";
import { getPublicSiteRoot } from "@/lib/site-url";

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
  const root = getPublicSiteRoot();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${root}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const { items: notices } = await (async () => {
    try {
      return await listPosts("notice", { limit: 50 });
    } catch {
      // DB 연결 실패 등으로 공지 조회가 깨지면 사이트맵 전체 500이 되어 검색엔진이 가져오지 못함
      return { items: MOCK_NOTICES.slice(0, 50), total: MOCK_NOTICES.length };
    }
  })();
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
}
