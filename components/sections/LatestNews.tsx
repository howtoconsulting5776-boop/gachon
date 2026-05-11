import { communityNoticePath } from "@/lib/post-path";
import { MOCK_GALLERY_PREVIEW } from "@/lib/mock-data";
import { listPosts } from "@/lib/data/posts";
import {
  LatestNewsTabs,
  type LatestNewsGalleryTabItem,
  type LatestNewsNoticeItem,
} from "@/components/sections/LatestNewsTabs";

export async function LatestNews() {
  const { items } = await listPosts("notice", { limit: 3 });

  const notices: LatestNewsNoticeItem[] = items.map((n) => ({
    id: n.id,
    href: communityNoticePath(n),
    title: n.title,
    excerpt: n.excerpt,
    date: n.date,
  }));

  const galleryItems: LatestNewsGalleryTabItem[] = MOCK_GALLERY_PREVIEW.map((g) => ({
    id: g.id,
    href: g.href,
    src: g.src,
    caption: g.caption,
  }));

  return <LatestNewsTabs notices={notices} galleryItems={galleryItems} />;
}
