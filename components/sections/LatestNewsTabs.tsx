"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LatestNewsNoticeItem {
  id: string;
  href: string;
  title: string;
  excerpt: string;
  date: string;
}

export interface LatestNewsGalleryTabItem {
  id: string;
  href: string;
  src: string;
  caption: string;
}

interface LatestNewsTabsProps {
  notices: LatestNewsNoticeItem[];
  galleryItems: LatestNewsGalleryTabItem[];
}

type TabId = "notice" | "gallery";

const TABS: { id: TabId; label: string }[] = [
  { id: "notice", label: "공지사항" },
  { id: "gallery", label: "갤러리" },
];

export function LatestNewsTabs({ notices, galleryItems }: LatestNewsTabsProps) {
  const [tab, setTab] = React.useState<TabId>("notice");
  const tablistRef = React.useRef<HTMLDivElement>(null);

  const onTabKeyDown = (e: React.KeyboardEvent, current: TabId) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === current);
    const next =
      e.key === "ArrowRight"
        ? TABS[(i + 1) % TABS.length]!.id
        : TABS[(i - 1 + TABS.length) % TABS.length]!.id;
    setTab(next);
    const btn = tablistRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab="${next}"]`
    );
    btn?.focus();
  };

  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gachon-900 md:text-3xl break-keep">
              최신 소식
            </h2>
            <p className="mt-2 text-gray-600 break-keep">
              모집·행사 관련 공지와 현장 스케치를 빠르게 확인하세요.
            </p>
          </div>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="최신 소식 분류"
            className="flex gap-6 border-b border-gray-200"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                data-tab={t.id}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKeyDown(e, t.id)}
                className={cn(
                  "-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-200 break-keep",
                  tab === t.id
                    ? "border-gachon-700 text-gachon-900"
                    : "border-transparent text-gray-500 hover:text-gachon-800"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          id="panel-notice"
          role="tabpanel"
          aria-labelledby="tab-notice"
          hidden={tab !== "notice"}
        >
          <div className="mb-6 flex justify-end">
            <Button asChild variant="ghost" className="w-fit gap-1 text-gachon-700">
              <Link href="/community/notice" className="break-keep">
                공지 목록
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {notices.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gachon-100 hover:bg-gachon-50/30 break-keep"
                >
                  <Megaphone className="size-8 text-gachon-500" aria-hidden />
                  <p className="mt-4 text-xs text-gray-500">{n.date}</p>
                  <p className="mt-2 line-clamp-2 text-lg font-semibold text-gachon-900">
                    {n.title}
                  </p>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">
                    {n.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-medium text-gachon-600">
                    읽기 →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          id="panel-gallery"
          role="tabpanel"
          aria-labelledby="tab-gallery"
          hidden={tab !== "gallery"}
        >
          <div className="mb-6 flex justify-end">
            <Button asChild variant="ghost" className="w-fit gap-1 text-gachon-700">
              <Link href="/community/gallery" className="break-keep">
                전체 보기
                <Images className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {galleryItems.map((g) => (
              <li key={g.id}>
                <Link
                  href={g.href}
                  className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white break-keep"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={78}
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gachon-900/0 transition-colors group-hover:bg-gachon-900/35"
                      aria-hidden
                    />
                    <p className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 break-keep">
                      {g.caption}
                    </p>
                  </div>
                  <p className="p-4 text-sm font-medium text-gachon-900">{g.caption}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
