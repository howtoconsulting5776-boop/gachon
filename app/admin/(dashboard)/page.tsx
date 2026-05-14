import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

export const metadata = {
  title: "대시보드",
};

export default async function AdminDashboardPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 break-keep">
        <code className="rounded bg-white px-1">DATABASE_URL</code>이 설정되면 통계가 표시됩니다.
      </div>
    );
  }

  const [posts, inquiries, events, eventRegistrations, verifiedNl, facultyColumns] = await Promise.all([
    prisma.post.count(),
    prisma.admissionInquiry.count(),
    prisma.event.count(),
    prisma.eventRegistration.count(),
    prisma.newsletterSubscriber.count({ where: { verified: true, active: true } }),
    prisma.facultyColumn.count(),
  ]);

  const cards = [
    { label: "게시글", value: posts, href: "/admin/posts" },
    { label: "교수 칼럼", value: facultyColumns, href: "/admin/faculty-columns" },
    { label: "입학 상담", value: inquiries, href: "/admin/inquiries" },
    { label: "설명회", value: events, href: "/admin/events" },
    { label: "설명회 등록", value: eventRegistrations, href: "/admin/events" },
    { label: "뉴스레터(인증)", value: verifiedNl, href: null },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 break-keep">대시보드</h1>
      <p className="mt-2 text-sm text-slate-600 break-keep">
        공개 API는 <code className="rounded bg-slate-100 px-1">/api/v1</code>, 보호 API는{" "}
        <code className="rounded bg-slate-100 px-1">/api/v1/admin/*</code> 에서 제공됩니다.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.label}>
            {c.href ? (
              <Link
                href={c.href}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-gachon-200"
              >
                <p className="text-sm text-slate-500 break-keep">{c.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gachon-900">{c.value}</p>
              </Link>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500 break-keep">{c.label}</p>
                <p className="mt-2 text-3xl font-semibold text-gachon-900">{c.value}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
