import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { clientIpFromHeaders } from "@/lib/api/v1/rate-limit-memory";
import { rateLimitGuard } from "@/lib/api/v1/rate-limit";
import { sendInquiryNotificationEmail } from "@/lib/email/send-inquiry-notification";
import { admissionInquiryBodySchema } from "@/lib/validators/v1/inquiry";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL?.trim()) {
    return jsonErr(
      503,
      "DATABASE_NOT_CONFIGURED",
      "데이터베이스가 설정되지 않았습니다. 관리자에게 문의해 주세요."
    );
  }

  const ip = clientIpFromHeaders(req.headers);
  const rl = await rateLimitGuard(`inquiry:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
  if (!rl.ok) {
    return jsonErr(429, "RATE_LIMIT_EXCEEDED", "상담 신청은 시간당 최대 5건까지 가능합니다.", {
      retryAfterMs: rl.retryAfterMs,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = admissionInquiryBodySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const field = Object.keys(first)[0] ?? "unknown";
    return jsonErr(400, "INQUIRY_VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      field,
      issues: parsed.error.flatten(),
    });
  }

  const v = parsed.data;
  const row = await prisma.admissionInquiry.create({
    data: {
      name: v.name,
      phone: v.phone.trim(),
      email: v.email.trim().toLowerCase(),
      interestLab: v.interestLab?.trim() || null,
      message: v.message?.trim() || null,
      privacyConsent: v.privacyConsent,
      marketingConsent: v.marketingConsent ?? false,
      sourceIp: ip === "unknown" ? null : ip,
    },
  });

  // 관리자 알림 메일 — 실패해도 사용자 응답에는 영향을 주지 않는다.
  try {
    const result = await sendInquiryNotificationEmail({
      inquiryId: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      interestLab: row.interestLab,
      message: row.message,
      marketingConsent: row.marketingConsent,
      submittedAt: row.createdAt ?? new Date(),
    });
    if (!result.ok) {
      console.warn("[inquiry] notification email skipped:", result.message);
    }
  } catch (err) {
    console.error("[inquiry] notification email error:", err);
  }

  return jsonOk({ id: row.id }, { status: 201 });
}
