import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { newsletterUnsubscribeBodySchema } from "@/lib/validators/v1/newsletter";
import { isDatabaseConfigured } from "@/lib/data/posts";

export async function POST(req: Request) {
  if (!isDatabaseConfigured()) {
    return jsonErr(
      503,
      "DATABASE_NOT_CONFIGURED",
      "데이터베이스가 설정되지 않았습니다."
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = newsletterUnsubscribeBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const row = await prisma.newsletterSubscriber.findFirst({
    where: { unsubToken: parsed.data.token },
  });
  if (!row) {
    return jsonErr(404, "INVALID_TOKEN", "유효하지 않은 해지 링크입니다.");
  }

  await prisma.newsletterSubscriber.update({
    where: { id: row.id },
    data: { active: false, verified: false },
  });

  return jsonOk({ unsubscribed: true });
}
