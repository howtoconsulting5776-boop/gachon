import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images, Megaphone } from "lucide-react";
import { communityNoticePath } from "@/lib/post-path";
import { MOCK_GALLERY_PREVIEW } from "@/lib/mock-data";
import { listPosts } from "@/lib/data/posts";
import { Button } from "@/components/ui/button";

export async function LatestNews() {
  const { items } = await listPosts("notice", { limit: 3 });

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gachon-900 md:text-3xl break-keep">
              최신 소식
            </h2>
            <p className="mt-2 text-gray-600 break-keep">
              모집·행사 관련 공지와 현장 스케치를 빠르게 확인하세요.
            </p>
          </div>
          <Button asChild variant="ghost" className="w-fit gap-1 text-gachon-700">
            <Link href="/community/notice" className="break-keep">
              공지 목록
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((n) => (
            <li key={n.id}>
              <Link
                href={communityNoticePath(n)}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:border-gachon-100 hover:bg-gachon-50/30 break-keep"
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

        <div className="mt-16 border-t border-gray-100 pt-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gachon-900 md:text-2xl break-keep">
                갤러리
              </h3>
              <p className="mt-2 text-sm text-gray-600 break-keep">
                설명회·행사·캠퍼스 현장을 엿볼 수 있는 이미지입니다.
              </p>
            </div>
            <Button asChild variant="ghost" className="w-fit gap-1 text-gachon-700">
              <Link href="/community/gallery" className="break-keep">
                전체 보기
                <Images className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {MOCK_GALLERY_PREVIEW.map((g) => (
              <li key={g.id}>
                <Link
                  href={g.href}
                  className="group block overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 break-keep"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
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
