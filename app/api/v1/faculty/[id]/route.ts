import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { getFacultyById } from "@/lib/mock-data";

type RouteCtx = { params: { id: string } };

export async function GET(_req: Request, ctx: RouteCtx) {
  const row = getFacultyById(ctx.params.id);
  if (!row) return jsonErr(404, "NOT_FOUND", "교수 정보를 찾을 수 없습니다.");
  return jsonOk(row);
}
