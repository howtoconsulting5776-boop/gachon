"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("이메일 또는 비밀번호를 확인해 주세요.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <form className="mx-auto mt-8 max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <div>
        <Label htmlFor="admin-email">이메일</Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="admin-password">비밀번호</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="mt-1"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600 break-keep">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "확인 중…" : "로그인"}
      </Button>
    </form>
  );
}
