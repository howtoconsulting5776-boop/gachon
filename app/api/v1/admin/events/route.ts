import { prisma } from "@/lib/prisma";
import type { EventType } from "@prisma/client";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";
import { writeAdminAudit } from "@/lib/admin/audit";
import { adminEventCreateBodySchema } from "@/lib/validators/v1/admin-event";

export async function GET() {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const rows = await prisma.event.findMany({ orderBy: { startAt: "asc" } });
  return jsonOk(rows);
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

  const parsed = adminEventCreateBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const v = parsed.data;
  const start = new Date(v.startAt);
  if (Number.isNaN(start.getTime())) {
    return jsonErr(400, "INVALID_DATE", "startAt 날짜 형식을 확인해 주세요.");
  }

  try {
    const row = await prisma.event.create({
      data: {
        id: v.id,
        title: v.title.trim(),
        type: v.type as EventType,
        startAt: start,
        location: v.location?.trim() || null,
        capacity: v.capacity ?? null,
      },
    });
    await writeAdminAudit(user.email, "event.create", v.id, { title: row.title });
    return jsonOk(row, { status: 201 });
  } catch {
    return jsonErr(409, "EVENT_ID_CONFLICT", "동일한 id의 행사가 이미 있습니다.");
  }
}
