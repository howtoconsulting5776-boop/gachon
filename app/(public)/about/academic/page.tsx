import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "학사 운영",
};

export default function AcademicPage() {
  return (
    <div>
      <PageHeader
        title="학사 운영 안내"
        description="수업 운영, 출석, 논문 등 학사 관련 안내의 목업입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "전공소개", href: "/about/greeting" },
          { label: "학사 운영" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="text-gray-700 break-keep">
          학기별 시간표, 휴학·복학 절차, 졸업 요건 등은 추후 학과 공지와
          연동하여 상세 페이지로 확장합니다.
        </p>
      </div>
    </div>
  );
}
