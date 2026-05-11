import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { updateInquiryAction } from "@/app/admin/actions";

export const metadata = { title: "입학 상담" };

export default async function AdminInquiriesPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const rows = await prisma.admissionInquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 break-keep">입학 상담</h1>
      <p className="mt-2 text-sm text-slate-600 break-keep">
        CSV:{" "}
        <a className="font-medium text-gachon-600 underline" href="/api/v1/admin/inquiries/export">
          다운로드
        </a>
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-[960px] w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-3 py-2">일시</th>
              <th className="px-3 py-2">이름</th>
              <th className="px-3 py-2">연락처</th>
              <th className="px-3 py-2">이메일</th>
              <th className="px-3 py-2">문의</th>
              <th className="w-56 px-3 py-2">상태·메모</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 align-top">
                <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-500">
                  {r.createdAt.toLocaleString("ko-KR")}
                </td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.phone}</td>
                <td className="max-w-[180px] truncate px-3 py-2 text-xs">{r.email}</td>
                <td className="max-w-xs px-3 py-2 text-xs text-slate-600">
                  {r.interestLab && <p className="break-keep">LAB: {r.interestLab}</p>}
                  {r.message && (
                    <p className="mt-1 line-clamp-4 whitespace-pre-wrap break-keep">{r.message}</p>
                  )}
                </td>
                <td className="px-3 py-2">
                  <form action={updateInquiryAction} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={r.id} />
                    <select
                      name="status"
                      defaultValue={r.status}
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                    <textarea
                      name="adminNotes"
                      defaultValue={r.adminNotes ?? ""}
                      rows={2}
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
                      placeholder="관리 메모"
                    />
                    <button
                      type="submit"
                      className="rounded bg-gachon-700 px-2 py-1 text-xs text-white hover:bg-gachon-800"
                    >
                      저장
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
