import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BoardView } from "@/components/community/BoardView";
import { listPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "전공 게시판",
};

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const { items } = await listPosts("board", { limit: 100 });

  return (
    <div>
      <PageHeader
        title="전공 게시판"
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "전공 게시판" },
        ]}
        heroImage={{
          src: "/images/site/group-photo.jpg",
          alt: "경영·교육 대학원 연합 행사 단체 사진",
          layout: "intrinsic",
          intrinsicWidth: 1400,
          intrinsicHeight: 1050,
        }}
      />
      <BoardView initialPosts={items} />
    </div>
  );
}
