import { Compass, FlaskConical, Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "경영 × 교육의 진짜 융합",
    body: "경영대학원에 소속되어 경영학 기반 위에 교육학 전문성을 더합니다. 학원·기관 운영의 실무와 학문적 깊이를 모두 갖춥니다.",
    icon: Compass,
  },
  {
    title: "6개 특화 연구실",
    body: "청소년 R&E LAB · 진로진학 LAB · 에듀비즈니스 마케팅 LAB · 에듀비즈니스 시스템 LAB · AI 테크에듀 LAB · 연구논문 LAB에서 자신의 진로에 맞는 깊이 있는 연구를 수행합니다.",
    icon: FlaskConical,
  },
  {
    title: "현직을 위한 주1 금요일 오전 트랙",
    body: "평일 오전 수업으로 현재 사업 직장을 유지하면서 학위를 이수할 수 있습니다.",
    icon: Clock,
  },
  {
    title: "진로·진학 전문가 양성",
    body: "진로·진학 상담의 방법론과 정책·제도를 체계적으로 다루며, 사례 연구와 데이터 기반 컨설팅 역량을 갖춘 진로진학 전문가로 성장할 수 있도록 커리큘럼과 LAB 활동을 설계합니다.",
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
