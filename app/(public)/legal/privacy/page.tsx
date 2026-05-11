import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="개인정보처리방침"
        description="법무 검토 전 목업 텍스트입니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "개인정보처리방침" }]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 leading-relaxed text-gray-700 md:px-12 break-keep">
        <p>
          가천대학교 경영대학원 에듀컨설팅 전공 웹사이트는 입학 상담 등 서비스
          제공을 위해 필요한 최소한의 개인정보만을 수집합니다. 본 문서는
          정식 오픈 전 법무·학과 검토로 대체됩니다.
        </p>
      </div>
    </div>
  );
}
