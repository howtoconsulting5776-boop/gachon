import { jsonErr, jsonOk } from "@/lib/api/v1/envelope";
import { listEvents } from "@/lib/data/events";

const statusSchema = ["upcoming", "past", "all"] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("status");
  if (raw && !statusSchema.includes(raw as (typeof statusSchema)[number])) {
    return jsonErr(
      400,
      "INVALID_QUERY",
      "status는 upcoming, past, all 중 하나여야 합니다."
    );
  }
  const status = raw === "past" || raw === "all" ? raw : "upcoming";
  const items = await listEvents(status);
  return jsonOk(items, { meta: { total: items.length } });
}
