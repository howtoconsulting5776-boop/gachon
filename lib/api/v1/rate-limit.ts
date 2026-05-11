/**
 * Upstash Redis 기반 분산 레이트 리밋(환경 변수 설정 시).
 * 미설정 시 `rate-limit-memory`로 폴백.
 */
import type { Duration } from "@upstash/ratelimit";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { rateLimitHit as rateLimitMemory } from "@/lib/api/v1/rate-limit-memory";

const limiterCache = new Map<string, Ratelimit>();

function durationFromMs(windowMs: number): Duration {
  const sec = Math.max(1, Math.ceil(windowMs / 1000));
  if (sec >= 86_400 && sec % 86_400 === 0) return `${sec / 86_400} d` as Duration;
  if (sec >= 3600 && sec % 3600 === 0) return `${sec / 3600} h` as Duration;
  if (sec >= 60 && sec % 60 === 0) return `${sec / 60} m` as Duration;
  return `${sec} s` as Duration;
}

function getLimiter(max: number, windowMs: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const cacheKey = `${max}:${windowMs}`;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;

  const redis = new Redis({ url, token });
  const instance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(max, durationFromMs(windowMs)),
    prefix: `@ratelimit/${max}/${windowMs}`,
  });
  limiterCache.set(cacheKey, instance);
  return instance;
}

export async function rateLimitGuard(
  bucketKey: string,
  max: number,
  windowMs: number
): Promise<{ ok: true } | { ok: false; retryAfterMs: number }> {
  const limiter = getLimiter(max, windowMs);
  if (!limiter) {
    return rateLimitMemory(bucketKey, max, windowMs);
  }

  const { success, reset, pending } = await limiter.limit(bucketKey);
  await pending.catch(() => undefined);

  if (success) return { ok: true };
  const retryAfterMs = Math.max(0, reset - Date.now());
  return { ok: false, retryAfterMs };
}
