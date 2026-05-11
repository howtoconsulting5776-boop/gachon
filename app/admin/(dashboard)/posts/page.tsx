import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { communityNoticePath } from "@/lib/post-path";
import { deletePostAdminAction } from "@/app/admin/actions";

export const metadata = { title: "게시글" };

export default async function AdminPostsPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const rows = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 break-keep">게시글</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-gachon-700 px-4 py-2 text-sm font-medium text-white hover:bg-gachon-800"
        >
          새 글 (공지)
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-3 py-2">분류</th>
              <th className="px-3 py-2">제목</th>
              <th className="px-3 py-2">공개 URL</th>
              <th className="px-3 py-2">편집</th>
              <th className="px-3 py-2">삭제</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              return (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{r.category}</td>
                  <td className="max-w-xs px-3 py-2 break-keep">{r.title}</td>
                  <td className="px-3 py-2">
                    {r.category === "notice" ? (
                      <a
                        href={communityNoticePath({ publicSlug: r.publicSlug })}
                        className="text-gachon-600 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        보기
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Link href={`/admin/posts/${r.id}/edit`} className="text-gachon-600 underline">
                      편집
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <form action={deletePostAdminAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="text-xs text-red-600 hover:underline">
                        삭제
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
