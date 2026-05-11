import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Gallery } from "@/components/community/Gallery";
import { MOCK_GALLERY_ALBUMS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "갤러리",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHeader
        title="갤러리"
        description="행사·워크숍·캠퍼스 현장 사진입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "갤러리" },
        ]}
      />
      <Gallery albums={MOCK_GALLERY_ALBUMS} />
    </div>
  );
}
