"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MockGalleryAlbum, MockGalleryCategory } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS: { id: MockGalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "event", label: "행사" },
  { id: "workshop", label: "워크숍" },
  { id: "graduation", label: "졸업식" },
  { id: "daily", label: "일상" },
];

interface GalleryProps {
  albums: MockGalleryAlbum[];
}

export function Gallery({ albums }: GalleryProps) {
  const [category, setCategory] = React.useState<MockGalleryCategory | "all">("all");
  const [year, setYear] = React.useState<string>("all");
  const [lightbox, setLightbox] = React.useState<{
    album: MockGalleryAlbum;
    index: number;
  } | null>(null);

  const years = React.useMemo(() => {
    const y = new Set(albums.map((a) => a.date.slice(0, 4)));
    return Array.from(y).sort((a, b) => b.localeCompare(a));
  }, [albums]);

  const filtered = React.useMemo(() => {
    return albums.filter((a) => {
      const y = a.date.slice(0, 4);
      if (year !== "all" && y !== year) return false;
      if (category !== "all" && a.category !== category) return false;
      return true;
    });
  }, [albums, category, year]);

  const openAt = (album: MockGalleryAlbum, index: number) => {
    setLightbox({ album, index });
  };

  const goPrev = React.useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return null;
      const n = cur.album.images.length;
      return { ...cur, index: (cur.index - 1 + n) % n };
    });
  }, []);

  const goNext = React.useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return null;
      const n = cur.album.images.length;
      return { ...cur, index: (cur.index + 1) % n };
    });
  }, []);

  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goPrev, goNext]);

  const active = lightbox;
  const activeImg = active?.album.images[active.index];

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12">
      <div
        className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-8 md:flex-row md:items-center md:justify-between"
        role="region"
        aria-label="갤러리 필터"
      >
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="카테고리">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors break-keep",
                category === c.id
                  ? "border-gachon-700 bg-gachon-700 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gachon-200"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 break-keep">연도</span>
          <select
            aria-label="연도 필터"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="all">전체</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length}개의 갤러리가 표시됩니다.
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-gray-600 break-keep">
          선택한 조건에 맞는 갤러리가 없습니다.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((album) => {
            const cover = album.images[0];
            if (!cover) return null;
            const extra = album.images.length - 1;
            return (
              <li key={album.id}>
                <button
                  type="button"
                  onClick={() => openAt(album, 0)}
                  className="group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 text-left shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gachon-900/0 transition-colors group-hover:bg-gachon-900/45"
                      aria-hidden
                    />
                    {extra > 0 && (
                      <span className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                        +{extra}
                      </span>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm font-semibold break-keep">{album.title}</p>
                      <p className="mt-1 text-xs text-white/90">{album.date}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gachon-900 break-keep">{album.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{album.date}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog
        open={!!lightbox}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent
          showCloseButton
          className="max-h-[90vh] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              goPrev();
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              goNext();
            }
          }}
        >
          {active && activeImg && (
            <>
              <div className="relative aspect-video w-full bg-black">
                <Image
                  key={`${active.album.id}-${active.index}`}
                  src={activeImg.src}
                  alt={activeImg.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                {active.album.images.length > 1 && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      aria-label="이전 이미지"
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      aria-label="다음 이미지"
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  </>
                )}
              </div>
              <DialogHeader className="border-t bg-white p-4 text-left">
                <DialogTitle className="text-lg font-semibold text-gachon-900 break-keep">
                  {active.album.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 break-keep">
                  {active.album.description} ({active.index + 1} / {active.album.images.length}장 ·
                  방향키로 이동)
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
