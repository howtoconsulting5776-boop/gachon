import { jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_CURRICULUM } from "@/lib/mock-data";

export async function GET() {
  return jsonOk(MOCK_CURRICULUM);
}
