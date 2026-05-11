import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "웹 접근성 안내",
};

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        title="웹 접근성 안내"
        description="KWCAG 2.2 준수를 목표로 개발 중입니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "웹 접근성 안내" }]}
      />
      <p className="mx-auto max-w-3xl px-6 py-12 text-gray-700 md:px-12 break-keep">
        키보드 내비게이션, 명도 대비, 대체 텍스트 등을 점검하며 개선합니다.
        불편 사항은 학과로 연락 주시기 바랍니다.
      </p>
    </div>
  );
}
