import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdmissionTimeline } from "@/components/admissions/AdmissionTimeline";
import { publicPageMetadata } from "@/lib/seo/page-meta";

export const metadata: Metadata = publicPageMetadata(
  "/admissions/schedule",
  "모집 일정",
  "원서 접수·서류·면접·합격 발표 등 후기 모집 일정을 타임라인으로 안내합니다."
);

export default function AdmissionSchedulePage() {
  return (
    <div>
      <PageHeader
        title="모집 일정"
        description="2026학년도 후기 일정 예시입니다. 확정 일정은 모집요강을 따릅니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "모집 일정" },
        ]}
      />
      <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-12">
        <AdmissionTimeline />
      </div>
    </div>
  );
}
