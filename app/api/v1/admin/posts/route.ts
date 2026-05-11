import { randomUUID } from "node:crypto";
import type { PostCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { parsePageLimit } from "@/lib/api/v1/pagination";
import { postCategoryQuery } from "@/lib/validators/v1/post";
import { isDatabaseConfigured, postToDto } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";
import { writeAdminAudit } from "@/lib/admin/audit";
import { adminPostCreateBodySchema } from "@/lib/validators/v1/admin-post";
import { makePostPublicSlug } from "@/lib/slug";

export async function GET(req: Request) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { searchParams } = new URL(req.url);
  const catRaw = searchParams.get("category");
  const catParsed = postCategoryQuery.safeParse(catRaw);
  if (!catRaw) {
    return jsonErr(400, "INVALID_QUERY", "category 쿼리가 필요합니다.");
  }
  if (!catParsed.success) {
    return jsonErr(400, "INVALID_QUERY", "category는 notice, board, qna 중 하나여야 합니다.");
  }

  const { page, limit, skip } = parsePageLimit(searchParams);
  const category: PostCategory = catParsed.data;

  const [total, rows] = await Promise.all([
    prisma.post.count({ where: { category } }),
    prisma.post.findMany({
      where: { category },
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  return jsonOk(rows.map(postToDto), { meta: { page, limit, total } });
}

export async function POST(req: Request) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = adminPostCreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const v = parsed.data;
  const prefix = v.category === "notice" ? "n" : v.category === "board" ? "b" : "q";
  const id = `${prefix}-${randomUUID().slice(0, 10)}`;
  const title = v.title.trim();
  const text = v.excerpt.trim();
  const excerpt = text.length > 200 ? `${text.slice(0, 200)}…` : text;
  const publicSlug = makePostPublicSlug(id, title);

  const row = await prisma.post.create({
    data: {
      id,
      publicSlug,
      category: v.category as PostCategory,
      title,
      excerpt,
      content: v.content?.trim() || null,
      author: v.author?.trim() || null,
    },
  });

  await writeAdminAudit(user.email, "post.create", id, { category: v.category });

  return jsonOk(postToDto(row), { status: 201 });
}
