import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "원우회 동정",
};

const cohorts = [
  {
    name: "1기",
    term: "2024 후기",
    count: 8,
    summary: "학원 경영자와 진로·진학 컨설턴트 중심의 초기 원우 그룹",
  },
  {
    name: "2기",
    term: "2025 전기",
    count: 10,
    summary: "전공대표를 중심으로 LAB 간 교차 스터디를 운영하는 핵심 기수",
  },
  {
    name: "3기",
    term: "2025 후기",
    count: 9,
    summary: "에듀테크 기획, 상담 운영, 교육 콘텐츠 기획 분야 현직자 참여",
  },
  {
    name: "4기",
    term: "2026 전기",
    count: 12,
    summary: "신입 원우 중심으로 멘토링과 기초 연구방법론 스터디 진행",
  },
];

const activities = [
  {
    date: "2026.05",
    title: "1~4기 합동 LAB 네트워킹",
    body: "각 LAB의 학습 방향과 현장 과제를 공유하고, 기수별 멘토링 그룹을 편성했습니다.",
  },
  {
    date: "2026.04",
    title: "전공대표 선임",
    body: "2기 김승숙 원우가 전공대표로 선임되어 원우회 운영과 기수 간 소통을 맡고 있습니다.",
  },
  {
    date: "2026.03",
    title: "신입 원우 오리엔테이션",
    body: "4기 신입 원우를 대상으로 교육과정, LAB 활동, 원우회 참여 방식을 안내했습니다.",
  },
  {
    date: "2026.02",
    title: "겨울방학 연구 스터디",
    body: "논문 주제 탐색과 교육 현장 데이터 정리를 위한 자율 스터디를 운영했습니다.",
  },
];

export default function NetworkPage() {
  const totalStudents = cohorts.reduce((sum, cohort) => sum + cohort.count, 0);

  return (
    <div>
      <PageHeader
        title="원우회 동정"
        description="에듀컨설팅 전공 원우회의 기수별 현황과 활동 소식을 전합니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "원우회 동정" },
        ]}
      />
      <div className="mx-auto max-w-5xl space-y-12 px-6 py-12 md:px-12">
        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-gachon-600">
            STUDENT ASSOCIATION
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gachon-900 break-keep md:text-3xl">
            현장의 경험을 나누고, 연구의 방향을 함께 세우는 원우회
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700 break-keep">
            가천대학교 경영대학원 에듀컨설팅 전공 원우회는 교육기관 경영자,
            진로·진학 컨설턴트, 에듀테크 기획자, 교육 분야 창업 준비자가 함께
            공부하는 학습·연구 공동체입니다. 1기부터 4기까지의 원우들이 LAB
            활동과 세미나, 기수 간 멘토링을 통해 현장의 문제를 학문적 질문으로
            확장해 갑니다.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-2xl bg-gachon-900 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold text-gachon-100">전공대표</p>
            <h2 className="mt-3 text-3xl font-bold break-keep">김승숙</h2>
            <p className="mt-1 text-gachon-100">2기 · 에듀컨설팅 전공대표</p>
            <p className="mt-5 leading-relaxed text-gachon-50 break-keep">
              기수 간 소통을 돕고, LAB 활동과 원우회 행사가 실제 현장 문제를
              함께 검토하는 장이 되도록 운영을 조율합니다.
            </p>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <p className="text-sm font-semibold text-gachon-700">재학 현황</p>
            <h2 className="mt-2 text-2xl font-bold text-gachon-900 break-keep">
              1기부터 4기까지 총 {totalStudents}명의 원우가 함께 공부하고 있습니다
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700 break-keep">
              원우회는 기수별 학습 경험을 연결하고, 신입 원우가 전공과 LAB에
              안정적으로 적응할 수 있도록 멘토링과 정보 공유를 이어갑니다.
            </p>
          </article>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gachon-900 break-keep">
              기수별 현황
            </h2>
            <p className="mt-2 text-gray-600 break-keep">
              아래 인원과 직군 설명은 운영 초기 안내를 위한 예시이며, 실제 현황은
              학기별로 갱신됩니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {cohorts.map((cohort) => (
              <article
                key={cohort.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gachon-900">
                      {cohort.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{cohort.term} 입학</p>
                  </div>
                  <p className="rounded-full bg-gachon-50 px-3 py-1 text-sm font-semibold text-gachon-700">
                    {cohort.count}명
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-700 break-keep">
                  {cohort.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="text-2xl font-bold text-gachon-900 break-keep">
              주요 활동
            </h2>
            <p className="mt-2 leading-relaxed text-gray-600 break-keep">
              원우회는 정기 세미나, LAB별 소모임, 기수 간 멘토링을 중심으로
              운영됩니다. 활동 기록은 원우회와 학과 운영 상황에 맞춰 순차적으로
              업데이트됩니다.
            </p>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <article
                key={`${activity.date}-${activity.title}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-gachon-600">
                  {activity.date}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gachon-900 break-keep">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 break-keep">
                  {activity.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gold-200 bg-gold-50/60 p-8">
          <h2 className="text-2xl font-bold text-gachon-900 break-keep">
            원우회 참여 안내
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700 break-keep">
            에듀컨설팅 전공 원우는 입학 후 원우회 활동에 참여할 수 있습니다. 원우회는
            학업과 현업을 병행하는 원우들이 과도한 부담 없이 교류할 수 있도록,
            학기 중 주요 일정과 LAB 활동을 중심으로 운영됩니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/admissions/inquiry">입학 상담 문의</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/community/gallery">활동 사진 보기</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
