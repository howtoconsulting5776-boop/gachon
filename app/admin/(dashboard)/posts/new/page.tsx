import Link from "next/link";
import { createNoticePostAction } from "@/app/admin/actions";

export const metadata = { title: "공지 작성" };

export default function AdminNewNoticePage() {
  return (
    <div>
      <Link href="/admin/posts" className="text-sm text-gachon-600 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 break-keep">공지 작성</h1>
      <form action={createNoticePostAction} className="mt-6 max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6">
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
          <label className="text-sm font-medium text-slate-700" htmlFor="excerpt">
            요약·본문(짧게)
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="content">
            상세 본문 (선택)
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="author">
            작성자 표시 (선택)
          </label>
          <input
            id="author"
            name="author"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
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
