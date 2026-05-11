import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <p className="text-center text-sm text-slate-500">
        <Link href="/" className="text-gachon-600 hover:underline">
          ← 사이트로 돌아가기
        </Link>
      </p>
      <h1 className="mt-6 text-center text-2xl font-bold text-slate-900 break-keep">
        운영 콘솔 로그인
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600 break-keep">
        환경 변수 <code className="rounded bg-slate-100 px-1">ADMIN_EMAIL</code> /{" "}
        <code className="rounded bg-slate-100 px-1">ADMIN_PASSWORD</code> 계정으로 로그인합니다.
      </p>
      <LoginForm />
    </div>
  );
}
