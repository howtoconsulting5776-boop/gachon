import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "모집요강",
};

export default function BrochurePage() {
  return (
    <div>
      <PageHeader
        title="모집요강"
        description="PDF 링크는 추후 자료실 또는 학교 공식 파일로 연결합니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "모집요강" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="text-gray-700 break-keep">
          현재는 프론트엔드 목업입니다. 실제 모집요강 PDF는 운영진이 확정한
          URL로 교체합니다.
        </p>
        <Button className="mt-6 gap-2" type="button" disabled variant="secondary">
          <Download className="size-4" aria-hidden />
          PDF 다운로드 (준비 중)
        </Button>
      </div>
    </div>
  );
}
