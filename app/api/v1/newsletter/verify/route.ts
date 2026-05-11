import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { verifyNewsletterSubscriberByToken } from "@/lib/newsletter/verify-subscriber";

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

  const result = await verifyNewsletterSubscriberByToken(token);
  if (result.ok === false && result.code === "MISSING") {
    return jsonErr(400, "MISSING_TOKEN", "token 쿼리가 필요합니다.");
  }
  if (result.ok === false && result.code === "NOT_FOUND") {
    return jsonErr(404, "INVALID_TOKEN", "유효하지 않은 인증 링크입니다.");
  }
  if (result.ok === false) {
    return jsonErr(503, "VERIFY_UNAVAILABLE", "인증을 처리할 수 없습니다.");
  }

  return jsonOk({ verified: true, email: result.email });
}
