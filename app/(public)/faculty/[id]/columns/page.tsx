import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFacultyById } from "@/lib/mock-data";
import { facultyColumnPath, listFacultyColumns } from "@/lib/data/faculty-columns";

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFacultyById(params.id);
  if (!f) return { title: "교수 칼럼" };
  return {
    title: `${f.name} 교수 칼럼`,
    description: `${f.name} 교수의 칼럼·집필 글 목록입니다.`,
    alternates: { canonical: `/faculty/${f.id}/columns` },
  };
}

export default async function FacultyColumnsListPage({ params }: Props) {
  const f = getFacultyById(params.id);
  if (!f) notFound();

  const columns = await listFacultyColumns(f.id);

  return (
    <div>
      <PageHeader
        title={`${f.name} 교수 칼럼`}
        description="교육·경영 현장을 바탕으로 한 집필 글입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "교수진", href: "/faculty" },
          { label: f.name, href: `/faculty/${f.id}` },
          { label: "칼럼" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        {columns.length === 0 ? (
          <p className="text-gray-600 break-keep">등록된 글이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {columns.map((c) => (
              <li key={c.id} className="py-6 first:pt-0">
                <Link
                  href={facultyColumnPath(f.id, c.publicSlug)}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gachon-500 focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-gray-500">{c.date}</p>
                  <h2 className="mt-1 text-lg font-semibold text-gachon-900 group-hover:text-gachon-700 break-keep">
                    {c.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 break-keep">
                    {c.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-10">
          <Link href={`/faculty/${f.id}`} className="text-sm font-medium text-gachon-600 hover:underline">
            ← 교수 소개로
          </Link>
        </p>
      </div>
    </div>
  );
}
