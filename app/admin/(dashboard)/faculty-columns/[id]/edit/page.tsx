import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { updateFacultyColumnAdminAction } from "@/app/admin/actions";
import { MOCK_FACULTY } from "@/lib/mock-data";

interface Props {
  params: { id: string };
}

export const metadata = { title: "교수 칼럼 편집" };

export default async function AdminEditFacultyColumnPage({ params }: Props) {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const row = await prisma.facultyColumn.findUnique({ where: { id: params.id } });
  if (!row) notFound();

  return (
    <div>
      <Link href="/admin/faculty-columns" className="text-sm text-gachon-600 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 break-keep">교수 칼럼 편집</h1>
      <p className="mt-1 text-xs text-slate-500 break-keep">
        공개 URL 슬러그: <code>{row.publicSlug}</code> (유지됩니다)
      </p>
      <form
        action={updateFacultyColumnAdminAction}
        className="mt-6 max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <input type="hidden" name="id" value={row.id} />
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="facultyId">
            교수
          </label>
          <select
            id="facultyId"
            name="facultyId"
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            defaultValue={row.facultyId}
          >
            {MOCK_FACULTY.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.id})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="title">
            제목
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={row.title}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="excerpt">
            목록용 요약
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            defaultValue={row.excerpt}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="content">
            본문 (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={16}
            defaultValue={row.content}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-gachon-700 px-4 py-2 text-sm font-medium text-white hover:bg-gachon-800"
        >
          저장
        </button>
      </form>
    </div>
  );
}
