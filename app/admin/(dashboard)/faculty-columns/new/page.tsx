import Link from "next/link";
import { createFacultyColumnAdminAction } from "@/app/admin/actions";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { MOCK_FACULTY } from "@/lib/mock-data";

export const metadata = { title: "교수 칼럼 작성" };

export default function AdminNewFacultyColumnPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  return (
    <div>
      <Link href="/admin/faculty-columns" className="text-sm text-gachon-600 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 break-keep">교수 칼럼 작성</h1>
      <form
        action={createFacultyColumnAdminAction}
        className="mt-6 max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="facultyId">
            교수
          </label>
          <select
            id="facultyId"
            name="facultyId"
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            defaultValue="3"
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
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="publicSlug">
            URL 슬러그 (선택, 영문·숫자·하이픈)
          </label>
          <input
            id="publicSlug"
            name="publicSlug"
            placeholder="비우면 제목 기반으로 자동 생성"
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
            placeholder="첫 줄에 `# 제목`을 두면 공개 페이지 헤더와 중복되므로, 여기서는 본문만 쓰거나 첫 줄 제목을 페이지와 맞추세요."
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
