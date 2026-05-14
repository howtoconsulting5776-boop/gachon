import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { facultyColumnPath, listBundledFacultyColumns } from "@/lib/data/faculty-columns";
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

  const bundled = listBundledFacultyColumns();
  const dbKeys = new Set(rows.map((r) => `${r.facultyId}:${r.publicSlug}`));
  const bundledOnly = bundled.filter((c) => !dbKeys.has(`${c.facultyId}:${c.publicSlug}`));

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
        교수진 소개 페이지에 노출되는 칼럼입니다. 본문은 마크다운(Markdown) 형식으로 작성할 수 있습니다. DB에 글이 없어도 저장소의{" "}
        <code className="rounded bg-slate-100 px-1">content/faculty-columns</code>에 있는 글은 공개 사이트에 표시될 수
        있습니다.
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500 break-keep">DB에 등록된 글이 없습니다.</p>
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

      {bundledOnly.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="bundled-columns-heading">
          <h2 id="bundled-columns-heading" className="text-lg font-semibold text-slate-900 break-keep">
            저장소 동봉 칼럼 (DB에 없을 때 공개)
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 break-keep">
            아래 글은 Git에 포함된 마크다운으로 제공됩니다. 편집은 로컬에서 해당 파일을 수정한 뒤 배포하거나, 여기서 DB에 동일
            슬러그로 새 글을 등록해 주세요. 어드민 &quot;편집&quot;은 DB 행에만 사용할 수 있습니다.
          </p>
          <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-amber-200 bg-amber-50/40">
            {bundledOnly.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs text-amber-900/80">
                    {facultyLabel(c.facultyId)} · {c.date} · <span className="font-medium">번들</span>
                  </p>
                  <p className="truncate font-medium text-slate-900 break-keep">{c.title}</p>
                  <p className="truncate text-xs text-slate-600">
                    <code>{c.publicSlug}</code> ·{" "}
                    <a
                      href={facultyColumnPath(c.facultyId, c.publicSlug)}
                      className="text-gachon-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      공개 페이지
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
