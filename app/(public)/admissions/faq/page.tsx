import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqAccordion } from "@/components/admissions/FaqAccordion";
import { publicPageMetadata } from "@/lib/seo/page-meta";

export const metadata: Metadata = publicPageMetadata(
  "/admissions/faq",
  "FAQ",
  "입학·학사·LAB 등 자주 묻는 질문과 답변을 모았습니다. 최종 해석은 모집요강과 교학팀 안내를 따릅니다."
);

export default function FaqPage() {
  return (
    <div>
      <PageHeader
        title="자주 묻는 질문"
        description="입학·학사·LAB 등 자주 묻는 질문을 검색해 보실 수 있습니다. 세부는 모집요강과 교학팀 안내를 따릅니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "FAQ" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <FaqAccordion />
      </div>
    </div>
  );
}
