import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";
import { writeAdminAudit } from "@/lib/admin/audit";
import { adminInquiryUpdateBodySchema } from "@/lib/validators/v1/admin-inquiry";

type RouteCtx = { params: { id: string } };

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

  const parsed = adminInquiryUpdateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const existing = await prisma.admissionInquiry.findUnique({
    where: { id: ctx.params.id },
  });
  if (!existing) {
    return jsonErr(404, "NOT_FOUND", "상담 건을 찾을 수 없습니다.");
  }

  const v = parsed.data;
  const row = await prisma.admissionInquiry.update({
    where: { id: ctx.params.id },
    data: {
      status: v.status,
      adminNotes: v.adminNotes?.trim() || null,
    },
  });

  await writeAdminAudit(user.email, "inquiry.update", ctx.params.id, {
    before: { status: existing.status },
    after: { status: row.status },
  });

  return jsonOk(row);
}
