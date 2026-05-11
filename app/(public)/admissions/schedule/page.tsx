import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AdmissionTimeline } from "@/components/admissions/AdmissionTimeline";

export const metadata: Metadata = {
  title: "모집 일정",
};

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
