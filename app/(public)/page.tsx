import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { CoreValues } from "@/components/sections/CoreValues";
import { LabsQuickView } from "@/components/sections/LabsQuickView";
import { AdmissionCountdown } from "@/components/sections/AdmissionCountdown";
import { FacultyPreview } from "@/components/sections/FacultyPreview";
import { LatestNews } from "@/components/sections/LatestNews";
import { LatestNewsSkeleton } from "@/components/sections/LatestNewsSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <CoreValues />
      <LabsQuickView />
      <AdmissionCountdown />
      <FacultyPreview />
      <Suspense fallback={<LatestNewsSkeleton />}>
        <LatestNews />
      </Suspense>
      <section className="bg-gachon-900 py-12 text-center text-white md:py-16">
        <div className="mx-auto max-w-screen-xl px-6 md:px-12">
          <h2 className="text-2xl font-bold break-keep md:text-3xl">
            입학 절차와 장학금을 한곳에서 확인하세요
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 break-keep md:text-base">
            모집 일정, FAQ, 설명회 일정까지 입학 안내 허브로 연결됩니다.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gold-500 text-gachon-900 hover:bg-gold-500/90"
            >
              <Link href="/admissions/inquiry" className="gap-2 break-keep">
                입학 상담 신청
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/admissions/schedule" className="break-keep">
                모집 일정 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
