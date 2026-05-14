import Link from "next/link";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { AdminSession } from "@/components/admin/AdminSession";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/inquiries", label: "입학 상담" },
  { href: "/admin/posts", label: "게시글" },
  { href: "/admin/faculty-columns", label: "교수 칼럼" },
  { href: "/admin/events", label: "설명회" },
  { href: "/admin/audit-logs", label: "감사 로그" },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminSession session={session}>
      <div className="flex min-h-screen">
        <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            운영 콘솔
          </p>
          <nav className="flex flex-col gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-100 break-keep"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="mb-2 truncate text-xs text-slate-500">{session.user?.email}</p>
            <AdminSignOut />
          </div>
        </aside>
        <main className="min-w-0 flex-1 overflow-auto p-6">{children}</main>
      </div>
    </AdminSession>
  );
}
