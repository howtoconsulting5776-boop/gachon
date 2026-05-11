import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { clientIpFromHeaders, rateLimitHit } from "@/lib/api/v1/rate-limit-memory";
import { newsletterSubscribeBodySchema } from "@/lib/validators/v1/newsletter";
import { isDatabaseConfigured } from "@/lib/data/posts";

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
  const rl = rateLimitHit(`newsletter:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
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

  return jsonOk(
    {
      message:
        "등록되었습니다. 이메일 인증은 Resend 등 메일 연동 후 발송됩니다. 개발 중에는 DB의 verify_token으로 GET /api/v1/newsletter/verify 를 호출해 인증을 완료할 수 있습니다.",
    },
    { status: 201 }
  );
}
