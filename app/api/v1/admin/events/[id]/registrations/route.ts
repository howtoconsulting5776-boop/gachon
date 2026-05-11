import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";

type RouteCtx = { params: { id: string } };

export async function GET(_req: Request, ctx: RouteCtx) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { id } = ctx.params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return jsonErr(404, "NOT_FOUND", "행사를 찾을 수 없습니다.");

  const rows = await prisma.eventRegistration.findMany({
    where: { eventId: id },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk(rows, { meta: { total: rows.length } });
}
