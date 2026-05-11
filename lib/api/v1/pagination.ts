const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function parsePageLimit(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const rawPage = Number(searchParams.get("page") ?? "1");
  const rawLimit = Number(searchParams.get("limit") ?? String(DEFAULT_LIMIT));
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  let limit = Number.isFinite(rawLimit) && rawLimit >= 1 ? Math.floor(rawLimit) : DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
