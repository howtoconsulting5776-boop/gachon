import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { facultyColumnPath } from "@/lib/data/faculty-columns";
import { MOCK_FACULTY } from "@/lib/mock-data";

export const metadata = { title: "교수 칼럼" };

function facultyLabel(id: string): string {
  return MOCK_FACULTY.find((f) => f.id === id)?.name ?? id;
}

export default async function AdminFacultyColumnsPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const rows = await prisma.facultyColumn.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 break-keep">교수 칼럼</h1>
        <Link
          href="/admin/faculty-columns/new"
          className="rounded-lg bg-gachon-700 px-4 py-2 text-sm font-medium text-white hover:bg-gachon-800"
        >
          새 글
        </Link>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 break-keep">
        교수진 소개 페이지에 노출되는 칼럼입니다. 본문은 마크다운(Markdown) 형식으로 작성할 수 있습니다.
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500 break-keep">등록된 글이 없습니다.</p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  {facultyLabel(r.facultyId)} · {r.publishedAt.toISOString().slice(0, 10)}
                </p>
                <p className="truncate font-medium text-slate-900 break-keep">{r.title}</p>
                <p className="truncate text-xs text-slate-500">
                  <code>{r.publicSlug}</code> ·{" "}
                  <a
                    href={facultyColumnPath(r.facultyId, r.publicSlug)}
                    className="text-gachon-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    공개 페이지
                  </a>
                </p>
              </div>
              <Link href={`/admin/faculty-columns/${r.id}/edit`} className="shrink-0 text-sm text-gachon-600 underline">
                편집
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
