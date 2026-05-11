import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { postUpdateBodySchema } from "@/lib/validators/v1/post";
import { getPostById, isDatabaseConfigured, postToDto } from "@/lib/data/posts";

type RouteCtx = { params: { id: string } };

export async function GET(_req: Request, ctx: RouteCtx) {
  const { id } = ctx.params;
  const post = await getPostById(id);
  if (!post) return jsonErr(404, "NOT_FOUND", "게시글을 찾을 수 없습니다.");
  return jsonOk(post);
}

export async function PUT(req: Request, ctx: RouteCtx) {
  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { id } = ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = postUpdateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "POST_VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing || existing.category !== "board") {
    return jsonErr(404, "NOT_FOUND", "수정할 게시글을 찾을 수 없습니다.");
  }

  const v = parsed.data;
  const text = v.excerpt;
  const excerpt = text.length > 200 ? `${text.slice(0, 200)}…` : text;

  const row = await prisma.post.update({
    where: { id },
    data: {
      title: v.title.trim(),
      excerpt,
      content: text,
      author: v.author,
    },
  });

  return jsonOk(postToDto(row));
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { id } = ctx.params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing || existing.category !== "board") {
    return jsonErr(404, "NOT_FOUND", "삭제할 게시글을 찾을 수 없습니다.");
  }

  await prisma.post.delete({ where: { id } });
  return jsonOk({ deleted: true });
}
