import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FacultyColumnMarkdown } from "@/components/faculty/FacultyColumnMarkdown";
import { getFacultyById } from "@/lib/mock-data";
import {
  facultyColumnPath,
  getFacultyColumnBySlug,
  stripLeadingMarkdownTitle,
} from "@/lib/data/faculty-columns";

interface Props {
  params: { id: string; slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFacultyById(params.id);
  const col = f ? await getFacultyColumnBySlug(f.id, params.slug) : null;
  if (!f || !col) return { title: "칼럼" };
  const description = col.excerpt.slice(0, 155);
  const path = facultyColumnPath(f.id, col.publicSlug);
  return {
    title: col.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: col.title,
      description,
      url: path,
      publishedTime: `${col.date}T09:00:00+09:00`,
    },
    twitter: {
      card: "summary",
      title: col.title,
      description,
    },
  };
}

export default async function FacultyColumnDetailPage({ params }: Props) {
  const f = getFacultyById(params.id);
  if (!f) notFound();

  const col = await getFacultyColumnBySlug(f.id, params.slug);
  if (!col) notFound();

  if (params.slug !== col.publicSlug) {
    redirect(facultyColumnPath(f.id, col.publicSlug));
  }

  const bodyMd = stripLeadingMarkdownTitle(col.content);

  return (
    <div>
      <PageHeader
        title={col.title}
        description={`${col.date} · ${f.name} 교수`}
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "교수진", href: "/faculty" },
          { label: f.name, href: `/faculty/${f.id}` },
          { label: "칼럼", href: `/faculty/${f.id}/columns` },
          { label: col.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <FacultyColumnMarkdown markdown={bodyMd} />
        <p className="mt-12 border-t border-gray-100 pt-8">
          <Link
            href={`/faculty/${f.id}/columns`}
            className="text-sm font-medium text-gachon-600 hover:underline"
          >
            ← 칼럼 목록
          </Link>
        </p>
      </article>
    </div>
  );
}
