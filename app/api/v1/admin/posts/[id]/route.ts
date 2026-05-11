import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured, postToDto } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";
import { writeAdminAudit } from "@/lib/admin/audit";
import { adminPostUpdateBodySchema } from "@/lib/validators/v1/admin-post";

type RouteCtx = { params: { id: string } };

export async function GET(_req: Request, ctx: RouteCtx) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const row = await prisma.post.findUnique({ where: { id: ctx.params.id } });
  if (!row) return jsonErr(404, "NOT_FOUND", "게시글을 찾을 수 없습니다.");
  return jsonOk(postToDto(row));
}

export async function PUT(req: Request, ctx: RouteCtx) {
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

  const parsed = adminPostUpdateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const existing = await prisma.post.findUnique({ where: { id: ctx.params.id } });
  if (!existing) return jsonErr(404, "NOT_FOUND", "게시글을 찾을 수 없습니다.");

  const v = parsed.data;
  const text = v.excerpt.trim();
  const excerpt = text.length > 200 ? `${text.slice(0, 200)}…` : text;

  const row = await prisma.post.update({
    where: { id: ctx.params.id },
    data: {
      title: v.title.trim(),
      excerpt,
      content: v.content?.trim() || null,
      author: v.author?.trim() || null,
    },
  });

  await writeAdminAudit(user.email, "post.update", ctx.params.id, {
    title: row.title,
  });

  return jsonOk(postToDto(row));
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const existing = await prisma.post.findUnique({ where: { id: ctx.params.id } });
  if (!existing) return jsonErr(404, "NOT_FOUND", "게시글을 찾을 수 없습니다.");

  await prisma.post.delete({ where: { id: ctx.params.id } });
  await writeAdminAudit(user.email, "post.delete", ctx.params.id, {});

  return jsonOk({ deleted: true });
}
