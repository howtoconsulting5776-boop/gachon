"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyAdmissionCta() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gachon-700 bg-gachon-900/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden"
      role="region"
      aria-label="입학 상담 바로가기"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-1">
        <p className="min-w-0 flex-1 text-xs font-medium text-white/90 break-keep">
          2026학년도 후기 모집 — 상담으로 시작하세요
        </p>
        <Button
          asChild
          size="sm"
          className="shrink-0 bg-gold-500 text-gachon-900 hover:bg-gold-500/90"
        >
          <Link href="/admissions/inquiry" className="gap-1 break-keep">
            상담
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}
