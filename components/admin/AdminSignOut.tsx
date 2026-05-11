"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AdminSignOut() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      로그아웃
    </Button>
  );
}
