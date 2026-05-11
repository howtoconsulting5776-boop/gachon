import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

interface Props {
  params: { id: string };
}

export const metadata = { title: "설명회 참가자" };

export default async function EventRegistrationsPage({ params }: Props) {
  if (!isDatabaseConfigured()) notFound();

  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) notFound();

  const regs = await prisma.eventRegistration.findMany({
    where: { eventId: params.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Link href="/admin/events" className="text-sm text-gachon-600 hover:underline">
        ← 설명회 목록
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 break-keep">참가자</h1>
      <p className="mt-1 text-sm text-slate-600 break-keep">{event.title}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-600">
            <tr>
              <th className="px-3 py-2">등록일시</th>
              <th className="px-3 py-2">이름</th>
              <th className="px-3 py-2">이메일</th>
              <th className="px-3 py-2">연락처</th>
            </tr>
          </thead>
          <tbody>
            {regs.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-500">
                  {r.createdAt.toLocaleString("ko-KR")}
                </td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.phone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
