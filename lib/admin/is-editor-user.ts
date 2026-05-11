import type { NextResponse } from "next/server";
import type { EditorUser } from "@/lib/admin/require-editor";

export function isEditorUser(u: EditorUser | NextResponse): u is EditorUser {
  return typeof (u as EditorUser).email === "string";
}
