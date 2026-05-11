import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { listPosts } from "@/lib/data/posts";
import { communityNoticePath } from "@/lib/post-path";

export const metadata: Metadata = {
  title: "공지사항",
};

export const dynamic = "force-dynamic";

export default async function NoticeListPage() {
  const { items } = await listPosts("notice", { limit: 50 });

  return (
    <div>
      <PageHeader
        title="공지사항"
        description="학과 공지입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "공지사항" },
        ]}
      />
      <div className="mx-auto max-w-3xl divide-y divide-gray-100 px-6 py-12 md:px-12">
        {items.map((n) => (
          <Link
            key={n.id}
            href={communityNoticePath(n)}
            className="block py-6 first:pt-0 hover:text-gachon-700 break-keep"
          >
            <p className="text-xs text-gray-500">{n.date}</p>
            <h2 className="mt-1 text-lg font-semibold text-gachon-900">{n.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{n.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
