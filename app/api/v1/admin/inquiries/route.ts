import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { parsePageLimit } from "@/lib/api/v1/pagination";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";

export async function GET(req: Request) {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status")?.trim();
  const { page, limit, skip } = parsePageLimit(searchParams);

  const where =
    status && ["new", "contacted", "closed"].includes(status)
      ? { status }
      : {};

  const [total, rows] = await Promise.all([
    prisma.admissionInquiry.count({ where }),
    prisma.admissionInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  return jsonOk(rows, { meta: { page, limit, total } });
}
