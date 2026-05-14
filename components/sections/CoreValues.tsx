import { Compass, FlaskConical, Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "경영 × 교육의 진짜 융합",
    body: "가천대학교 경영대학원에 소속되어, 전략·조직·마케팅 등 경영 관점으로 교육 산업의 구조와 운영을 읽고 교수학습·교육정책·진로 등 교육 전문 영역을 함께 다룹니다. 학원·에듀테크·기관에서 마주하는 실무 과제와 학위 연구가 요구하는 학문적 깊이를 한 트랙에서 쌓을 수 있도록 설계되어 있습니다.",
    icon: Compass,
  },
  {
    title: "6개 특화 연구실",
    body: "청소년 R&E LAB · 진로진학 LAB · 에듀비즈니스 마케팅 LAB · 에듀비즈니스 시스템 LAB · AI 테크에듀 LAB · 연구논문 LAB이 연구 주제의 스펙트럼을 나눕니다. 운영·기획·상담·연구 등 본인의 커리어 축에 맞춰 문제를 정의하고, 지도교수와 함께 설계·실행·정리하는 깊이 있는 연구 활동을 이어갈 수 있습니다.",
    icon: FlaskConical,
  },
  {
    title: "현직을 위한 주1 금요일 오전 트랙",
    body: "대면 수업은 주 1회 금요일 오전(9:00~14:40)에 집중 배치되어, 매일 캠퍼스에 출석해야 하는 형태보다 일정 설계가 단순합니다. 현직에서의 사업·직무를 유지한 채 학위 과정을 밟을 수 있도록 성인 학습자의 생애주기를 전제로 한 트랙입니다.",
    icon: Clock,
  },
  {
    title: "진로·진학 전문가 양성",
    body: "진로·진학 상담은 기법만으로는 충분히 설명되기 어렵고, 제도·정책·윤리와 근거 자료가 곧 서비스 품질로 연결됩니다. 이를 체계적으로 다루고, 사례 연구와 데이터를 활용해 방향을 설계하는 연습을 커리큘럼과 LAB에 녹여, 재현 가능한 전문성을 갖춘 진로진학 전문가로 성장할 수 있도록 돕습니다.",
    icon: GraduationCap,
  },
];

export function CoreValues() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-700">
            WHY US
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gachon-900 md:text-4xl break-keep">
            왜 가천대 에듀컨설팅인가
          </h2>
          <p className="mt-3 text-gray-600 break-keep">
            교육 산업 현직자의 다음 커리어를 위해 설계된 경영대학원 전공입니다.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className={cn(
                "rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-md"
              )}
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gachon-50 text-gachon-500">
                <item.icon className="size-8" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gachon-900 break-keep">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600 break-keep">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
