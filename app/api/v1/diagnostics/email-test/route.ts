import { sendInquiryNotificationEmail } from "@/lib/email/send-inquiry-notification";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";

export const dynamic = "force-dynamic";

/**
 * 입학 상담 알림 메일 발송이 실패할 때 실제 Resend 에러를 확인하기 위한 진단 엔드포인트.
 *
 * 사용:
 *   curl -s "https://<도메인>/api/v1/diagnostics/email-test?token=<ADMIN_PASSWORD>"
 *
 * 응답:
 *   { config: { hasResendApiKey, hasResendFromEmail, notifyTo, apiKeyTail }, send: { ok, message } }
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const expected = process.env.ADMIN_PASSWORD?.trim();

  if (!expected) {
    return jsonErr(503, "ADMIN_PASSWORD_NOT_SET", "ADMIN_PASSWORD 미설정.");
  }
  if (!token || token !== expected) {
    return jsonErr(403, "FORBIDDEN", "관리자 토큰이 필요합니다.");
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEnv = process.env.RESEND_FROM_EMAIL?.trim();
  const toEnv =
    process.env.INQUIRY_NOTIFY_EMAIL?.trim() || "bear5776@gachon.ac.kr (default)";

  const config = {
    hasResendApiKey: Boolean(apiKey),
    apiKeyTail: apiKey ? `…${apiKey.slice(-4)}` : null,
    apiKeyLength: apiKey?.length ?? 0,
    apiKeyStartsWithRe: apiKey?.startsWith("re_") ?? false,
    hasResendFromEmail: Boolean(fromEnv),
    fromEmail: fromEnv || "(default: onboarding@resend.dev)",
    notifyTo: toEnv,
  };

  if (!apiKey) {
    return jsonOk({
      config,
      send: { ok: false, message: "RESEND_API_KEY 미설정 — 발송 시도 안 함" },
    });
  }

  const result = await sendInquiryNotificationEmail({
    inquiryId: "DIAG-" + Date.now().toString(36).toUpperCase(),
    name: "진단 테스트",
    phone: "010-0000-0000",
    email: "diagnostic@example.com",
    interestLab: null,
    message:
      "이 메일은 사이트 진단 엔드포인트(/api/v1/diagnostics/email-test)에서 발송한 테스트 메일입니다. 회신할 필요는 없습니다.",
    marketingConsent: false,
    submittedAt: new Date(),
  });

  return jsonOk({
    config,
    send: result.ok
      ? { ok: true, message: "발송 성공 (수신자 메일함을 확인하세요)" }
      : { ok: false, message: result.message },
  });
}
