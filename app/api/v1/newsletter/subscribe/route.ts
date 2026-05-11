import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { clientIpFromHeaders } from "@/lib/api/v1/rate-limit-memory";
import { rateLimitGuard } from "@/lib/api/v1/rate-limit";
import { newsletterSubscribeBodySchema } from "@/lib/validators/v1/newsletter";
import { isDatabaseConfigured } from "@/lib/data/posts";
import {
  isResendConfigured,
  sendNewsletterVerificationEmail,
} from "@/lib/email/send-newsletter-verification";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

export async function POST(req: Request) {
  if (!isDatabaseConfigured()) {
    return jsonErr(
      503,
      "DATABASE_NOT_CONFIGURED",
      "데이터베이스가 설정되지 않았습니다."
    );
  }

  const ip = clientIpFromHeaders(req.headers);
  const rl = await rateLimitGuard(`newsletter:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
  if (!rl.ok) {
    return jsonErr(429, "RATE_LIMIT_EXCEEDED", "구독 요청이 너무 잦습니다.", {
      retryAfterMs: rl.retryAfterMs,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = newsletterSubscribeBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const verifyToken = randomBytes(24).toString("hex");
  const unsubToken = randomBytes(24).toString("hex");

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    create: {
      email,
      verified: false,
      active: true,
      verifyToken,
      unsubToken,
    },
    update: {
      verified: false,
      active: true,
      verifyToken,
    },
  });

  if (isResendConfigured()) {
    const sent = await sendNewsletterVerificationEmail(email, verifyToken);
    if (!sent.ok) {
      return jsonErr(502, "EMAIL_SEND_FAILED", sent.message);
    }
    return jsonOk(
      {
        message:
          "등록되었습니다. 받은편지함(또는 스팸함)에서 인증 메일을 확인해 주세요.",
      },
      { status: 201 }
    );
  }

  return jsonOk(
    {
      message:
        "등록되었습니다. 메일 발송(RESEND_API_KEY) 설정 후 자동 인증 메일이 발송됩니다. 설정 전에는 관리자에게 문의하거나 API로 인증할 수 있습니다.",
    },
    { status: 201 }
  );
}
