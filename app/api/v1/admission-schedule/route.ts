import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_ADMISSION_SCHEDULE } from "@/lib/mock-data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const yearRaw = searchParams.get("year");
  if (yearRaw !== null && yearRaw !== "" && yearRaw !== "2026") {
    return jsonErr(400, "INVALID_QUERY", "현재는 year=2026 일정만 제공합니다.");
  }
  return jsonOk(MOCK_ADMISSION_SCHEDULE);
}
