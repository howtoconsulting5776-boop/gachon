import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";

export async function GET(req: Request) {
  if (!isDatabaseConfigured()) {
    return jsonErr(
      503,
      "DATABASE_NOT_CONFIGURED",
      "데이터베이스가 설정되지 않았습니다."
    );
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token")?.trim();
  if (!token) {
    return jsonErr(400, "MISSING_TOKEN", "token 쿼리가 필요합니다.");
  }

  const row = await prisma.newsletterSubscriber.findFirst({
    where: { verifyToken: token },
  });
  if (!row) {
    return jsonErr(404, "INVALID_TOKEN", "유효하지 않은 인증 링크입니다.");
  }

  await prisma.newsletterSubscriber.update({
    where: { id: row.id },
    data: {
      verified: true,
      verifiedAt: new Date(),
      verifyToken: null,
    },
  });

  return jsonOk({ verified: true, email: row.email });
}
