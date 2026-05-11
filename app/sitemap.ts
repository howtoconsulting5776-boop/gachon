import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/data/posts";
import { MOCK_FACULTY, MOCK_LABS } from "@/lib/mock-data";
import { communityNoticePath } from "@/lib/post-path";

function siteRoot(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

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
  const root = siteRoot();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${root}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const { items: notices } = await listPosts("notice", { limit: 50 });
  const noticeEntries: MetadataRoute.Sitemap = notices.map((n) => ({
    url: `${root}${communityNoticePath(n)}`,
    lastModified: new Date(n.date),
    changeFrequency: "weekly",
    priority: 0.65,
  }));

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
