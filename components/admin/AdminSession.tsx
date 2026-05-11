"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface AdminSessionProps {
  session: Session | null;
  children: React.ReactNode;
}

export function AdminSession({ session, children }: AdminSessionProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
