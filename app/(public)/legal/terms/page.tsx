import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "이용약관",
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="이용약관"
        description="목업입니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "이용약관" }]}
      />
      <p className="mx-auto max-w-3xl px-6 py-12 text-gray-700 md:px-12 break-keep">
        정식 약관은 운영 준비 단계에서 게시됩니다.
      </p>
    </div>
  );
}
