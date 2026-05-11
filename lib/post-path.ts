import type { MockPost } from "@/lib/mock-data";

export function communityNoticePath(post: Pick<MockPost, "publicSlug">): string {
  return `/community/notice/${post.publicSlug}`;
}
