import { jsonOk } from "@/lib/api/v1/envelope";
import { MOCK_FACULTY, MOCK_LABS } from "@/lib/mock-data";

export async function GET() {
  const data = MOCK_LABS.map((lab) => {
    const lead = MOCK_FACULTY.find((f) => f.id === lab.leadFacultyId);
    return {
      ...lab,
      leadFacultyName: lead?.name,
      leadFacultyPosition: lead?.position,
    };
  });
  return jsonOk(data);
}
