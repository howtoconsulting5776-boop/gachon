"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function NewsletterSubscribe() {
  const [email, setEmail] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    if (!agree) {
      setErr("개인정보 수집에 동의해 주세요.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/v1/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, privacyConsent: true }),
    });
    const json = (await res.json()) as {
      success?: boolean;
      error?: { message?: string };
      data?: { message?: string };
    };
    setLoading(false);
    if (!res.ok || !json.success) {
      setErr(json.error?.message ?? "구독 처리에 실패했습니다.");
      return;
    }
    setMsg(json.data?.message ?? "등록되었습니다.");
    setEmail("");
    setAgree(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3 break-keep">
      <p className="text-sm text-gray-300">
        모집·행사 소식을 이메일로 받아보세요. (DB 연결 및 메일 인증 후 활성화)
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="nl-email" className="text-xs text-gray-400">
            이메일
          </Label>
          <Input
            id="nl-email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            className="mt-1 border-white/20 bg-white/5 text-white placeholder:text-gray-500"
            placeholder="you@example.com"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="shrink-0 bg-gold-500 text-gachon-900 hover:bg-gold-500/90"
        >
          {loading ? "처리 중…" : "구독"}
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox
          id="nl-agree"
          checked={agree}
          onCheckedChange={(c) => setAgree(c === true)}
          className="mt-0.5 border-white/40 data-[state=checked]:bg-gold-500"
        />
        <Label htmlFor="nl-agree" className="text-xs font-normal leading-snug text-gray-300">
          개인정보 수집·이용에 동의합니다.
        </Label>
      </div>
      {err && <p className="text-xs text-red-300">{err}</p>}
      {msg && <p className="text-xs text-emerald-300">{msg}</p>}
    </form>
  );
}
