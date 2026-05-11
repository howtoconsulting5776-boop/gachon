import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "원우회 동정",
};

export default function NetworkPage() {
  return (
    <div>
      <PageHeader
        title="원우회 동정"
        description="원우회 소식 목업입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "원우회 동정" },
        ]}
      />
      <p className="mx-auto max-w-3xl px-6 py-12 text-gray-600 md:px-12 break-keep">
        콘텐츠는 운영 단계에서 입력합니다.
      </p>
    </div>
  );
}
