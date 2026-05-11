import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { createEventAdminAction } from "@/app/admin/actions";

export const metadata = { title: "설명회" };

export default async function AdminEventsPage() {
  if (!isDatabaseConfigured()) {
    return <p className="text-sm text-slate-600 break-keep">DB 미연결</p>;
  }

  const rows = await prisma.event.findMany({ orderBy: { startAt: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 break-keep">설명회</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 break-keep">일정 목록</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {rows.map((e) => (
              <li key={e.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="font-medium text-gachon-900">{e.title}</p>
                <p className="text-xs text-slate-500">
                  {e.startAt.toLocaleString("ko-KR")} · {e.type}
                </p>
                <Link
                  href={`/admin/events/${e.id}/registrations`}
                  className="mt-2 inline-block text-xs text-gachon-600 underline"
                >
                  참가자 목록
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800 break-keep">행사 추가</h2>
          <form
            action={createEventAdminAction}
            className="mt-3 space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm"
          >
            <div>
              <label className="font-medium text-slate-700" htmlFor="id">
                ID (영문·숫자·하이픈)
              </label>
              <input
                id="id"
                name="id"
                required
                pattern="[a-z0-9-]+"
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1"
                placeholder="e3-campus-day"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700" htmlFor="title">
                제목
              </label>
              <input id="title" name="title" required className="mt-1 w-full rounded border border-slate-200 px-2 py-1" />
            </div>
            <div>
              <label className="font-medium text-slate-700" htmlFor="type">
                유형
              </label>
              <select id="type" name="type" className="mt-1 w-full rounded border border-slate-200 px-2 py-1">
                <option value="online">online</option>
                <option value="offline">offline</option>
                <option value="hybrid">hybrid</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-slate-700" htmlFor="startAt">
                시작 (현지 시간)
              </label>
              <input
                id="startAt"
                name="startAt"
                type="datetime-local"
                required
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700" htmlFor="location">
                장소
              </label>
              <input id="location" name="location" className="mt-1 w-full rounded border border-slate-200 px-2 py-1" />
            </div>
            <div>
              <label className="font-medium text-slate-700" htmlFor="capacity">
                정원 (선택)
              </label>
              <input id="capacity" name="capacity" type="number" min={1} className="mt-1 w-full rounded border border-slate-200 px-2 py-1" />
            </div>
            <button type="submit" className="rounded bg-gachon-700 px-3 py-2 text-white hover:bg-gachon-800">
              추가
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
