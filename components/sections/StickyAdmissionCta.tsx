"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SCROLL_THRESHOLD_PX = 200;
const SESSION_DISMISS_KEY = "educonsulting-sticky-cta-dismissed";

export function StickyAdmissionCta() {
  const [scrolledEnough, setScrolledEnough] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_DISMISS_KEY)) {
        setDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolledEnough(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (dismissed || !scrolledEnough) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gachon-700 bg-gachon-900/95 p-3 pt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden"
      role="region"
      aria-label="입학 상담 바로가기"
    >
      <div className="mx-auto flex max-w-screen-xl items-center gap-2 px-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-white hover:bg-white/10 hover:text-white"
          onClick={handleDismiss}
          aria-label="하단 배너 닫기"
        >
          <X className="size-4" />
        </Button>
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
