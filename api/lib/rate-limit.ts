type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

/** Rate limit in-memory por clave (IP+endpoint). Suficiente para cortar flood. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (existing.count >= MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  return false;
}
