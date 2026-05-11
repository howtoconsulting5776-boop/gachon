import { jsonOk } from "@/lib/api/v1/envelope";
import { listPosts } from "@/lib/data/posts";

const MAX_LIMIT = 100;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawPage = Number(searchParams.get("page") ?? "1");
  const rawLimit = Number(searchParams.get("limit") ?? "5");
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  let limit = Number.isFinite(rawLimit) && rawLimit >= 1 ? Math.floor(rawLimit) : 5;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const { items, total } = await listPosts("notice", { page, limit });
  return jsonOk(items, { meta: { page, limit, total } });
}
