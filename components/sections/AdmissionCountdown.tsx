"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const START = new Date("2026-05-06T00:00:00+09:00").getTime();
const END = new Date("2026-06-05T23:59:59+09:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function splitDiff(ms: number) {
  const diff = Math.max(0, ms);
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  return { days, hours, minutes, seconds };
}

export function AdmissionCountdown() {
  const [mounted, setMounted] = React.useState(false);
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const t = mounted ? now : START;
  let phase: "before" | "open" | "after" = "open";
  let target = END;
  if (t < START) {
    phase = "before";
    target = START;
  } else if (t > END) {
    phase = "after";
    target = END;
  }

  const cd = splitDiff(target - t);

  return (
    <section className="bg-gachon-900 py-10 text-white md:py-12">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
            ADMISSION 2026 LATE
          </p>
          <h2 className="mt-2 text-2xl font-bold break-keep md:text-3xl">
            {phase === "before" && "원서접수 시작까지"}
            {phase === "open" && "원서접수 마감까지"}
            {phase === "after" && "원서접수가 마감되었습니다"}
          </h2>
          <p className="mt-2 text-sm text-white/80 break-keep">
            2026년 5월 6일(수) ~ 6월 5일(금) · 일정은 모집요강을 따릅니다.
          </p>
        </div>
        {phase !== "after" && (
          <div
            className={cn(
              "flex items-center justify-center gap-2 md:gap-3",
              !mounted && "opacity-60"
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {[
              { v: mounted ? cd.days : 0, l: "일" },
              { v: mounted ? cd.hours : 0, l: "시" },
              { v: mounted ? cd.minutes : 0, l: "분" },
              { v: mounted ? cd.seconds : 0, l: "초" },
            ].map((u, i) => (
              <React.Fragment key={u.l}>
                {i > 0 && (
                  <span
                    className="text-2xl font-light text-white/40"
                    aria-hidden
                  >
                    :
                  </span>
                )}
                <div className="flex min-w-[4.5rem] flex-col items-center rounded-xl border border-white/15 bg-white/5 px-3 py-3 md:min-w-[5.5rem]">
                  <span className="text-3xl font-bold tabular-nums md:text-4xl">
                    {mounted ? pad(u.v) : "--"}
                  </span>
                  <span className="text-xs text-white/70">{u.l}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
