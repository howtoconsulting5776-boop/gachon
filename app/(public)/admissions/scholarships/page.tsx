import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScholarshipCards } from "@/components/admissions/ScholarshipCards";

export const metadata: Metadata = {
  title: "장학금",
};

export default function ScholarshipsPage() {
  return (
    <div>
      <PageHeader
        title="장학금 안내"
        description="순위별 감면 예시입니다. 세부 자격은 모집요강 및 학과 공지를 확인하세요."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "장학금" },
        ]}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12">
        <ScholarshipCards />
      </div>
    </div>
  );
}
