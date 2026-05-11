import type { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { jsonErr } from "@/lib/api/v1/envelope";

export type EditorUser = { email: string; role: "admin" | "editor" };

export async function requireEditor(): Promise<EditorUser | NextResponse> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const role = session?.user?.role;
  if (!email || (role !== "admin" && role !== "editor")) {
    return jsonErr(401, "UNAUTHORIZED", "관리자 로그인이 필요합니다.");
  }
  return { email, role: role as "admin" | "editor" };
}
