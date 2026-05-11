import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "전공소개",
};

export default function GreetingPage() {
  return (
    <div>
      <PageHeader
        title="전공소개"
        description="에듀컨설팅 전공의 소개, 교육 목표, 졸업 후 진로와 혜택을 정리합니다."
        breadcrumb={[{ label: "홈", href: "/" }, { label: "전공소개" }]}
        heroImage={{
          src: "/images/site/industry-environment.jpg",
          alt: "교육·산업 연구 및 학습 환경",
        }}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12 md:px-12">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            전공소개
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            4차 산업혁명 시대를 맞이하여 미래사회에 필요한 창의적 인재양성을 목표로 한 진로교육의
            중요성이 강조되고 있다. 진로교육의 확대는 자유학기제, 고교학점제와 같은 교육과정의
            개편과 맞물리면서 상급학교 진학의 패러다임을 시험 대비를 위한 교과목 중심에서 진로를
            위한 학교활동 중심으로 바꾸어 놓았다. 따라서 진로와 진학을 통합하는 교육, 즉 자신의
            진로를 결정하고 계획하고 준비하는 과정에 대한 지도와 진학에 대한 목표를 연결하는
            교육의 중요성이 부각되었다. 이에 본 과정은 진로와 진학을 연결하는 교수-학습법 및
            상담기법에 대한 이해를 바탕으로 실제 교육현장에서 적용하는 프로그램 실습을 통해
            진로·진학컨설팅의 전문성을 높이도록 지원한다. 또한 AI 도구의 활용 능력을 배양하기
            위한 수업을 병행하여 에듀컨설팅 기업의 경영 효율화와 진로·진학 및 학습관리 서비스
            품질 향상을 도모한다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            교육 목표
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            에듀컨설팅 전공은 진로 및 진학과 관련된 이론적 기초와 실무적 상담기법을 습득할 수
            있는 과정으로, 사회교육기관 및 교육기업에서 진로·진학컨설팅 교육 프로그램을 성공적으로
            운영할 수 있는 전문인력 양성을 목표로 한다. 이론적 측면에서는 인간과 교육에 대한
            체계적인 교육을 통해 목표 고객에 최적화된 교육서비스를 생산·제공할 수 있는 토대를
            구축한다. 경영적 측면에서는 교육기업 경영과 관련하여 에듀비즈니스 성장전략과
            마케팅 등을 통해 경영자나 중간 관리자로서의 경쟁력을 높인다. 실무적으로는
            진로·진학컨설팅 실습, AI 진로·진학컨설팅 프로그램 개발 등을 통해 전문가로서의
            능력을 개발하고자 한다.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            졸업 후 진로 및 혜택
          </h2>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gachon-800 break-keep">1. 진로</h3>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
              <li>사회교육분야 창업: 학원, 입시연구소 등</li>
              <li>상담 및 입시 관련 취업: 중간관리자, 상담실장, 입시연구소장 등</li>
              <li>진로·진학 전문 컨설턴트 활동: 상담, 강연, 프로그램 개발 등</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gachon-800 break-keep">2. 특전</h3>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
              <li>진로·진학 컨설턴트 자격증 부여</li>
              <li>전문가 네트워크 구성(교수진, 전문경영인, 원우회, 학회 등)</li>
              <li>외부 기업과의 연계를 통한 전문성 향상 기회 제공(실습 및 교육)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
