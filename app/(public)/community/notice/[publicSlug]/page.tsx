import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { communityNoticePath } from "@/lib/post-path";
import { getNoticeByPublicSlugParam } from "@/lib/data/posts";

interface Props {
  params: { publicSlug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = await getNoticeByPublicSlugParam(params.publicSlug);
  if (!n || n.category !== "notice") {
    return { title: "공지" };
  }
  const description = n.excerpt.slice(0, 155);
  const path = communityNoticePath(n);
  return {
    title: n.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: n.title,
      description,
      url: path,
      publishedTime: `${n.date}T09:00:00+09:00`,
    },
    twitter: {
      card: "summary",
      title: n.title,
      description,
    },
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const n = await getNoticeByPublicSlugParam(params.publicSlug);
  if (!n || n.category !== "notice") notFound();

  if (params.publicSlug !== n.publicSlug) {
    redirect(communityNoticePath(n));
  }

  const body = (n.content && n.content.trim()) || n.excerpt;

  return (
    <div>
      <PageHeader
        title={n.title}
        description={`${n.date} · ${n.author ?? "교학팀"}`}
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "공지사항", href: "/community/notice" },
          { label: n.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-700 break-keep">{body}</p>
        <p className="mt-8">
          <Link href="/community/notice" className="text-sm font-medium text-gachon-600">
            ← 목록으로
          </Link>
        </p>
      </article>
    </div>
  );
}
