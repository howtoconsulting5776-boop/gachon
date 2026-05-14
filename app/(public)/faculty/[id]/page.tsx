import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFacultyById, MOCK_LABS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { facultyColumnPath, listFacultyColumns } from "@/lib/data/faculty-columns";

interface Props {
  params: { id: string };
}

/** 칼럼 목록·DB/파일 폴백이 빌드 시점에 고정되지 않도록 */
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: Props): Metadata {
  const { id } = params;
  const f = getFacultyById(id);
  if (!f) return { title: "교수 소개" };
  const path = `/faculty/${f.id}`;
  const description = f.bio.slice(0, 155);
  const ogImages = f.portraitSrc
    ? [{ url: f.portraitSrc, alt: `${f.name} 교수` }]
    : undefined;
  return {
    title: f.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${f.name} 교수`,
      description,
      url: path,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title: f.name,
      description,
      ...(ogImages ? { images: [f.portraitSrc!] } : {}),
    },
  };
}

export default async function FacultyDetailPage({ params }: Props) {
  const { id } = params;
  const f = getFacultyById(id);
  if (!f) notFound();

  const lab = f.labSlug
    ? MOCK_LABS.find((l) => l.slug === f.labSlug)
    : undefined;

  const columns = await listFacultyColumns(f.id, { limit: 5 });

  return (
    <div>
      <PageHeader
        title={f.name}
        description={f.position}
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "교수진", href: "/faculty" },
          { label: f.name },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="text-sm text-gray-500 break-keep">이메일 · {f.email}</p>
        <p className="mt-6 leading-relaxed text-gray-700 break-keep">{f.bio}</p>
        <p className="mt-4 text-sm font-medium text-gachon-900 break-keep">
          연구 분야: {f.researchArea}
        </p>
        {lab && (
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href={`/labs/${lab.slug}`}>{lab.name} 바로가기</Link>
            </Button>
          </div>
        )}

        <section className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="faculty-columns-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="faculty-columns-heading" className="text-lg font-semibold text-gachon-900 break-keep">
              교수 칼럼
            </h2>
            {columns.length > 0 && (
              <Link
                href={`/faculty/${f.id}/columns`}
                className="text-sm font-medium text-gachon-600 hover:underline break-keep"
              >
                전체 보기
              </Link>
            )}
          </div>
          {columns.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500 break-keep">등록된 칼럼이 없습니다.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {columns.map((c) => (
                <li key={c.id}>
                  <Link
                    href={facultyColumnPath(f.id, c.publicSlug)}
                    className="block rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-3 transition-colors hover:border-gachon-200 hover:bg-gachon-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gachon-500"
                  >
                    <span className="text-xs text-gray-500">{c.date}</span>
                    <span className="mt-1 block font-medium text-gachon-900 break-keep">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
