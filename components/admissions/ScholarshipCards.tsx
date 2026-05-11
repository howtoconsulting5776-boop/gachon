import { MOCK_SCHOLARSHIPS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ScholarshipCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {MOCK_SCHOLARSHIPS.map((s) => (
        <Card key={s.rank} className="border-gray-200 shadow-sm">
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              {s.rank}순위
            </Badge>
            <CardTitle className="mt-2 text-xl break-keep">{s.name}</CardTitle>
            <CardDescription className="text-2xl font-bold text-gachon-700">
              등록금 {s.discountPercent}% 감면
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600 break-keep">
            <p>{s.description}</p>
            <p className="rounded-lg bg-gray-50 p-3 text-xs leading-relaxed">
              <span className="font-semibold text-gray-800">자격</span>{" "}
              {s.conditions}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
