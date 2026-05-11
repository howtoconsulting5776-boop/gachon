import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { requireEditor } from "@/lib/admin/require-editor";
import { isEditorUser } from "@/lib/admin/is-editor-user";

export async function GET() {
  const user = await requireEditor();
  if (!isEditorUser(user)) return user;

  if (!isDatabaseConfigured()) {
    return jsonErr(503, "DATABASE_NOT_CONFIGURED", "데이터베이스가 설정되지 않았습니다.");
  }

  const [posts, inquiries, events, eventRegistrations, newsletterCount] =
    await Promise.all([
      prisma.post.count(),
      prisma.admissionInquiry.count(),
      prisma.event.count(),
      prisma.eventRegistration.count(),
      prisma.newsletterSubscriber.count({ where: { verified: true } }),
    ]);

  return jsonOk({
    posts,
    inquiries,
    events,
    eventRegistrations,
    newsletterSubscribersVerified: newsletterCount,
  });
}
