import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "갤러리",
};

const photos = [
  {
    id: "group",
    src: "/images/site/group-photo.jpg",
    alt: "경영·교육 대학원 연합 행사 단체 사진",
    caption: "연합 MT·특강 단체",
  },
  {
    id: "lecture",
    src: "/images/site/son-jueun-lecture.jpg",
    alt: "손주은 회장님 초청 강연",
    caption: "초청 강연 현장",
  },
  {
    id: "speaker",
    src: "/images/site/son-jueun.jpg",
    alt: "강연 스피커와 참가자",
    caption: "강연 스케치",
  },
  {
    id: "vision",
    src: "/images/site/vision-tower.jpg",
    alt: "가천대학교 비전타워와 캠퍼스 광장",
    caption: "캠퍼스",
  },
  {
    id: "glass",
    src: "/images/site/glass-corridor.jpg",
    alt: "캠퍼스 현대식 유리 복도",
    caption: "캠퍼스 시설",
  },
  {
    id: "industry",
    src: "/images/site/industry-environment.jpg",
    alt: "교육 산업·연구 환경",
    caption: "학습 환경",
  },
  {
    id: "infinity",
    src: "/images/site/infinity.webp",
    alt: "무한대 심볼 그래픽",
    caption: "브랜드 그래픽",
    objectClass: "object-contain bg-white p-6",
  },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHeader
        title="갤러리"
        description="행사·캠퍼스·현장 사진입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "갤러리" },
        ]}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <li key={p.id}>
              <figure className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                <div className="relative aspect-video w-full bg-gray-100">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className={p.objectClass ?? "object-cover"}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </div>
                <figcaption className="px-3 py-2 text-sm font-medium text-gachon-900 break-keep">
                  {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
