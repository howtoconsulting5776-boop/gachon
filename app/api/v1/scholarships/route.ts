import { jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_SCHOLARSHIPS } from "@/lib/mock-data";

export async function GET() {
  return jsonOk(MOCK_SCHOLARSHIPS);
}
