import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_FACULTY, MOCK_LABS } from "@/lib/mock-data";

type RouteCtx = { params: { slug: string } };

export async function GET(_req: Request, ctx: RouteCtx) {
  const lab = MOCK_LABS.find((l) => l.slug === ctx.params.slug);
  if (!lab) {
    return jsonErr(404, "NOT_FOUND", "LAB을 찾을 수 없습니다.");
  }
  const lead = MOCK_FACULTY.find((f) => f.id === lab.leadFacultyId);
  return jsonOk({
    ...lab,
    leadFacultyName: lead?.name,
    leadFacultyPosition: lead?.position,
    leadFacultyEmail: lead?.email,
  });
}
