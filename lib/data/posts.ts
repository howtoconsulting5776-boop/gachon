import type { Post as PrismaPost, PostCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { MockPost } from "@/lib/mock-data";
import { MOCK_BOARD, MOCK_NOTICES, MOCK_QNA } from "@/lib/mock-data";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function pickMock(category: PostCategory): MockPost[] {
  if (category === "notice") return MOCK_NOTICES;
  if (category === "board") return MOCK_BOARD;
  return MOCK_QNA;
}

export function postToDto(p: PrismaPost): MockPost {
  return {
    id: p.id,
    publicSlug: p.publicSlug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content ?? undefined,
    date: p.publishedAt.toISOString().slice(0, 10),
    author: p.author ?? undefined,
  };
}

export async function listPosts(
  category: PostCategory,
  opts?: { page?: number; limit?: number }
): Promise<{ items: MockPost[]; total: number }> {
  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 100;
  const skip = (page - 1) * limit;

  if (!isDatabaseConfigured()) {
    const all = pickMock(category);
    const total = all.length;
    const items = all.slice(skip, skip + limit);
    return { items, total };
  }

  const [total, rows] = await Promise.all([
    prisma.post.count({ where: { category } }),
    prisma.post.findMany({
      where: { category },
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
  ]);
  return { items: rows.map(postToDto), total };
}

export async function getPostById(id: string): Promise<MockPost | null> {
  if (!isDatabaseConfigured()) {
    const all = [...MOCK_NOTICES, ...MOCK_BOARD, ...MOCK_QNA];
    return all.find((p) => p.id === id) ?? null;
  }
  const row = await prisma.post.findUnique({ where: { id } });
  return row ? postToDto(row) : null;
}

/** 공지 상세: `publicSlug` 또는 레거시 `id`만으로 조회 */
export async function getNoticeByPublicSlugParam(
  param: string
): Promise<MockPost | null> {
  if (!isDatabaseConfigured()) {
    return (
      MOCK_NOTICES.find((p) => p.publicSlug === param || p.id === param) ??
      null
    );
  }
  const row = await prisma.post.findFirst({
    where: {
      category: "notice",
      OR: [{ publicSlug: param }, { id: param }],
    },
  });
  return row ? postToDto(row) : null;
}
