import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { searchSite } from "@/lib/site-search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  if (!q) {
    return jsonErr(400, "MISSING_QUERY", "검색어 q가 필요합니다.");
  }
  const data = searchSite(q);
  const total = data.notices.length + data.faculty.length + data.labs.length;
  return jsonOk(data, { meta: { total } });
}
