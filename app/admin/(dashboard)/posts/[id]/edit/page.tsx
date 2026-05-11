import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { updatePostAdminAction } from "@/app/admin/actions";

interface Props {
  params: { id: string };
}

export const metadata = { title: "게시글 편집" };

export default async function AdminEditPostPage({ params }: Props) {
  if (!isDatabaseConfigured()) notFound();

  const row = await prisma.post.findUnique({ where: { id: params.id } });
  if (!row) notFound();

  return (
    <div>
      <Link href="/admin/posts" className="text-sm text-gachon-600 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 break-keep">게시글 편집</h1>
      <p className="mt-1 text-xs text-slate-500 break-keep">
        공개 슬러그: <code>{row.publicSlug}</code> (제목 변경 시 URL은 유지됩니다.)
      </p>
      <form action={updatePostAdminAction} className="mt-6 max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <input type="hidden" name="id" value={row.id} />
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
            요약
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={4}
            defaultValue={row.excerpt}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="content">
            본문
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            defaultValue={row.content ?? ""}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="author">
            작성자
          </label>
          <input
            id="author"
            name="author"
            defaultValue={row.author ?? ""}
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
