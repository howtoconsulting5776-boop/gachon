import { jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_FACULTY } from "@/lib/mock-data";

export async function GET() {
  return jsonOk(MOCK_FACULTY);
}
