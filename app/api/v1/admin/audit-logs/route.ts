import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";

const MAX = 200;

export async function GET(req: Request) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { searchParams } = new URL(req.url);
  const actor = searchParams.get("user")?.trim();

  const rows = await prisma.adminAuditLog.findMany({
    where: actor ? { actorId: actor } : {},
    orderBy: { createdAt: "desc" },
    take: MAX,
  });

  return jsonOk(rows, { meta: { total: rows.length, limit: MAX } });
}
