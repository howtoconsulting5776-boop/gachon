import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MOCK_LABS } from "@/lib/mock-data";

/** LAB 주제별 커버 사진 (Unsplash, 무료 라이선스) */
const LAB_COVER_IMAGES: Record<string, string> = {
  rne: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  academy:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  "ai-tech-edu":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  "research-writing":
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
};

export function LabsQuickView() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gachon-600">
            RESEARCH LABS
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gachon-900 md:text-4xl break-keep">
            4개 특화 연구실에서 미래를 설계하세요
          </h2>
          <p className="mt-3 text-gray-600 break-keep">
            현장 문제에서 출발해 연구와 실무를 잇는 LAB별 커리큘럼과 프로젝트를
            확인해 보세요.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {MOCK_LABS.map((lab) => {
            return (
              <Link
                key={lab.slug}
                href={`/labs/${lab.slug}`}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row md:min-h-[280px]"
              >
                <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gachon-100 md:min-h-[280px] md:w-1/2">
                  <Image
                    src={LAB_COVER_IMAGES[lab.slug] ?? LAB_COVER_IMAGES.rne}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gachon-900/50 via-gachon-900/15 to-transparent md:bg-gradient-to-r"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {lab.fullName}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-gachon-900 break-keep">
                    {lab.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-gold-700 break-keep">
                    {lab.tagline}
                  </p>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 break-keep">
                    {lab.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gachon-600 transition-transform group-hover:translate-x-1">
                    자세히 보기
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
