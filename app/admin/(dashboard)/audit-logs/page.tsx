import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

export const metadata = { title: "감사 로그" };

export default async function AdminAuditLogsPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const rows = await prisma.adminAuditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 150,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 break-keep">감사 로그</h1>
      <p className="mt-2 text-sm text-slate-600 break-keep">
        API: <code className="rounded bg-slate-100 px-1">GET /api/v1/admin/audit-logs</code>
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-3 py-2">일시</th>
              <th className="px-3 py-2">Actor</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Resource</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 align-top">
                <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-500">
                  {r.createdAt.toLocaleString("ko-KR")}
                </td>
                <td className="px-3 py-2 text-xs">{r.actorId ?? "—"}</td>
                <td className="px-3 py-2 text-xs">{r.action}</td>
                <td className="max-w-md px-3 py-2 text-xs text-slate-600">
                  {r.resource}
                  {r.diff != null && (
                    <pre className="mt-1 max-h-24 overflow-auto rounded bg-slate-50 p-2 text-[10px]">
                      {JSON.stringify(r.diff, null, 2)}
                    </pre>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
