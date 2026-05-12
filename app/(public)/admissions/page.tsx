import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { publicPageMetadata } from "@/lib/seo/page-meta";

export const metadata: Metadata = publicPageMetadata(
  "/admissions",
  "입학 안내",
  "모집요강·일정·장학금·상담·설명회·FAQ까지 후기 모집 정보를 한곳에서 연결합니다."
);

const links = [
  { href: "/admissions/brochure", title: "모집요강", desc: "지원 자격·제출 서류" },
  { href: "/admissions/schedule", title: "모집 일정", desc: "원서·면접·합격 일정" },
  { href: "/admissions/scholarships", title: "장학금", desc: "감면율·자격 안내" },
  { href: "/admissions/inquiry", title: "입학 상담", desc: "1:1 문의 신청" },
  { href: "/admissions/events", title: "설명회", desc: "온·오프라인 일정" },
  { href: "/admissions/faq", title: "FAQ", desc: "자주 묻는 질문" },
];

export default function AdmissionsHubPage() {
  return (
    <div>
      <PageHeader
        title="입학 안내"
        description="2026학년도 후기 모집 관련 정보의 허브입니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "입학 안내" }]}
      />
      <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-12">
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                <Card className="h-full border-gray-200 transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg break-keep">{l.title}</CardTitle>
                      <CardDescription className="mt-1 break-keep">
                        {l.desc}
                      </CardDescription>
                    </div>
                    <ArrowRight className="size-5 shrink-0 text-gachon-500" aria-hidden />
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
