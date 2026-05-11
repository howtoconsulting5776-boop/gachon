import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonErr } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";

function csvEscape(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const rows = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5000,
  });

  const header = [
    "id",
    "name",
    "phone",
    "email",
    "interestLab",
    "status",
    "adminNotes",
    "privacyConsent",
    "marketingConsent",
    "sourceIp",
    "createdAt",
  ].join(",");

  const lines = rows.map((r) =>
    [
      r.id,
      r.name,
      r.phone,
      r.email,
      r.interestLab ?? "",
      r.status,
      (r.adminNotes ?? "").replace(/\r?\n/g, " "),
      String(r.privacyConsent),
      String(r.marketingConsent),
      r.sourceIp ?? "",
      r.createdAt.toISOString(),
    ]
      .map((c) => csvEscape(String(c)))
      .join(",")
  );

  const csv = "\uFEFF" + [header, ...lines].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="admission-inquiries.csv"',
    },
  });
}
