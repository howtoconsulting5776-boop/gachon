/**
 * 개발·소규모 배포용 메모리 레이트 리밋. 서버리스 다중 인스턴스에서는 Redis 등으로 교체.
 */

type Bucket = { count: number; windowStart: number };

const store = new Map<string, Bucket>();

export function rateLimitHit(
  key: string,
  max: number,
  windowMs: number,
  now = Date.now()
): { ok: true } | { ok: false; retryAfterMs: number } {
  const b = store.get(key);
  if (!b || now - b.windowStart >= windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (b.count < max) {
    b.count += 1;
    return { ok: true };
  }
  const retryAfterMs = windowMs - (now - b.windowStart);
  return { ok: false, retryAfterMs: Math.max(0, retryAfterMs) };
}

export function clientIpFromHeaders(h: Headers): string {
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = h.get("x-real-ip");
  if (real?.trim()) return real.trim();
  return "unknown";
}
