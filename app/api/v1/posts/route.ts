import { randomUUID } from "node:crypto";
import type { PostCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { parsePageLimit } from "@/lib/api/v1/pagination";
import { postCreateBodySchema, postCategoryQuery } from "@/lib/validators/v1/post";
import { isDatabaseConfigured, listPosts, postToDto } from "@/lib/data/posts";
import { makePostPublicSlug } from "@/lib/slug";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const catRaw = searchParams.get("category");
  const cat = postCategoryQuery.safeParse(catRaw);
  if (!cat.success) {
    return jsonErr(400, "INVALID_QUERY", "category 쿼리는 notice, board, qna 중 하나여야 합니다.");
  }

  const { page, limit } = parsePageLimit(searchParams);
  const { items, total } = await listPosts(cat.data, { page, limit });
  return jsonOk(items, { meta: { page, limit, total } });
}

export async function POST(req: Request) {
  if (!isDatabaseConfigured()) {
    return jsonErr(
      503,
      "DATABASE_NOT_CONFIGURED",
      "데이터베이스가 설정되지 않았습니다. 관리자에게 문의해 주세요."
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = postCreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "POST_VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const v = parsed.data;
  const text = v.excerpt;
  const excerpt = text.length > 200 ? `${text.slice(0, 200)}…` : text;
  const id = `b-${randomUUID().slice(0, 8)}`;
  const titleTrim = v.title.trim();
  const publicSlug = makePostPublicSlug(id, titleTrim);

  const row = await prisma.post.create({
    data: {
      id,
      publicSlug,
      category: "board" as PostCategory,
      title: titleTrim,
      excerpt,
      content: text,
      author: v.author,
    },
  });

  return jsonOk(postToDto(row), { status: 201 });
}
