import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { clientIpFromHeaders } from "@/lib/api/v1/rate-limit-memory";
import { rateLimitGuard } from "@/lib/api/v1/rate-limit";
import { eventRegisterBodySchema } from "@/lib/validators/v1/event-register";
import { createEventRegistration } from "@/lib/data/events";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;

type RouteCtx = { params: { id: string } };

export async function POST(req: Request, ctx: RouteCtx) {
  const { id: eventId } = ctx.params;

  const ip = clientIpFromHeaders(req.headers);
  const rl = await rateLimitGuard(`event-reg:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
  if (!rl.ok) {
    return jsonErr(429, "RATE_LIMIT_EXCEEDED", "등록 요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.", {
      retryAfterMs: rl.retryAfterMs,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "INVALID_JSON", "요청 본문이 올바른 JSON이 아닙니다.");
  }

  const parsed = eventRegisterBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, "EVENT_REGISTER_VALIDATION_FAILED", "입력 값을 확인해 주세요.", {
      issues: parsed.error.flatten(),
    });
  }

  const v = parsed.data;
  const result = await createEventRegistration(eventId, {
    name: v.name,
    email: v.email,
    phone: v.phone,
  });

  if (!result.ok) {
    return jsonErr(result.status, result.code, result.message);
  }

  return jsonOk({ id: result.id, eventId }, { status: 201 });
}
