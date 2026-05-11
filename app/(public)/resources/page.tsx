import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "자료실",
};

const files = [
  { name: "2026학년도 후기 모집요강 (예정)", type: "PDF" },
  { name: "전공 소개 브로슈어", type: "PDF" },
];

const highlights = [
  {
    href: "/community/gallery",
    src: "/images/site/group-photo.jpg",
    alt: "경영·교육 대학원 연합 행사 단체 사진",
    label: "연합 MT·특강",
  },
  {
    href: "/community/gallery",
    src: "/images/site/son-jueun-lecture.jpg",
    alt: "손주은 회장님 초청 강연 현장",
    label: "초청 강연",
  },
  {
    href: "/community/gallery",
    src: "/images/site/son-jueun.jpg",
    alt: "강연 스피커와 참가자",
    label: "현장 스케치",
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader
        title="자료실"
        description="모집요강·브로슈어 등 다운로드 목록 목업입니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "자료실" }]}
        heroImage={{
          src: "/images/site/glass-corridor.jpg",
          alt: "가천대학교 캠퍼스 현대식 유리 복도",
        }}
      />

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-10 md:px-12 md:py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gachon-900 break-keep md:text-xl">
                행사·현장
              </h2>
              <p className="mt-1 text-sm text-gray-600 break-keep">
                갤러리에서 전체 사진을 확인할 수 있습니다.
              </p>
            </div>
            <Link
              href="/community/gallery"
              className="text-sm font-medium text-gachon-600 underline-offset-4 hover:underline break-keep"
            >
              갤러리로 이동
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <li key={h.src}>
                <Link
                  href={h.href}
                  className="group block overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition hover:border-gachon-200 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={h.src}
                      alt={h.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <p className="px-3 py-2 text-sm font-medium text-gachon-900 break-keep">{h.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ul className="mx-auto max-w-2xl divide-y divide-gray-100 px-6 py-12 md:px-12">
        {files.map((f) => (
          <li
            key={f.name}
            className="flex items-center justify-between gap-4 py-4 break-keep"
          >
            <span className="flex items-center gap-3 font-medium text-gachon-900">
              <FileText className="size-5 shrink-0 text-gachon-500" aria-hidden />
              {f.name}
            </span>
            <span className="shrink-0 text-xs text-gray-500">{f.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
