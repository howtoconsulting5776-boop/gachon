import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InquiryForm } from "@/components/admissions/InquiryForm";

export const metadata: Metadata = {
  title: "입학 상담",
};

export default function InquiryPage() {
  return (
    <div>
      <PageHeader
        title="입학 상담 신청"
        description="필수 항목은 이름·연락처·이메일입니다. 제출 시 서버에 저장되며, DATABASE_URL이 설정된 환경에서만 동작합니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "입학 상담" },
        ]}
      />
      <div className="mx-auto max-w-screen-lg px-6 py-12 md:px-12">
        <InquiryForm />
      </div>
    </div>
  );
}
