import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { publicPageMetadata } from "@/lib/seo/page-meta";

export const metadata: Metadata = publicPageMetadata(
  "/about/vision",
  "비전 및 목표",
  "에듀컨설팅 전공의 비전·교육목표·육성 역량과 학습 설계를 공식적으로 정리합니다."
);

export default function VisionPage() {
  return (
    <div>
      <PageHeader
        title="비전 및 목표"
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "전공소개", href: "/about/greeting" },
          { label: "비전 및 목표" },
        ]}
        heroImage={{
          src: "/images/site/vision-tower.jpg",
          alt: "가천대학교 비전타워와 캠퍼스 광장",
          priority: true,
        }}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12 md:px-12">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            비전
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            에듀컨설팅 전공은 경영대학원에 소속된 전문직업석사(MPS) 과정으로서, 교육·입시·진로
            산업이 겪는 구조적 전환을 경영과 교육의 통합적 언어로 읽고, 현장의 복합 문제를
            설계·실행·평가의 순환 속에서 해결할 수 있는 리더를 양성하는 것을 비전으로 한다. 우리는
            ‘가르치는 사람’의 다음 단계를 단순한 정보 전달자가 아니라, 조직과 고객의 학습 성과를
            함께 책임지는 전문가로 정의한다. 이를 위해 데이터 기반 의사결정, R&E에 기반한 문제
            설정, AI 도구의 윤리적 활용, 그리고 교육기업 경영의 핵심 기능(전략·운영·재무·마케팅·
            인사)을 균형 있게 다루며, 교실과 사무실 모두에서 설득력 있는 협업과 커뮤니케이션을
            가능하게 하는 실무 역량을 완성하는 것을 목표로 한다.
          </p>
          <p className="leading-relaxed text-gray-700 break-keep">
            나아가 본 전공은 교육을 ‘콘텐츠 산업’으로만 축소하지 않는다. 교육은 사람의 시간과
            자존감, 공정한 기회와 직결되기 때문에, 경쟁을 말하되 과장된 약속을 하지 않으며, 근거와
            절차, 투명한 피드백을 통해 신뢰를 쌓는 전문성을 지향한다. 동시에 변화의 속도를
            외면하지 않고, 기술과 제도의 이동선을 읽어 교육서비스의 품질을 높이는 실험과 개선을
            지속한다. 이러한 비전은 교수진의 연구와 현장 경험, 동문 네트워크의 살아 있는 사례,
            지역사회와의 연계를 통해 매년 점검·갱신된다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            교육목표
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            첫째, 진로·진학 컨설팅의 이론적 기초를 체계화한다. 고객 세그먼트에 따른 니즈 분석,
            상담 프로세스의 설계·기록·피드백, 프로그램 운영의 품질 관리까지를 일관된 프레임으로
            연결하여, 교육서비스의 생산과 재생산이 반복 가능한 형태로 이루어지도록 한다. 둘째,
            경영학적 도구를 교육기업의 맥락에 적용할 수 있게 한다. 원가·손익 관점의 수업 배치,
            채널·브랜드 전략, 위험과 규제에 대한 선제적 대응, 조직문화와 리더십을 통해 운영이
            감에만 의존하지 않도록 의사결정 구조를 설계하는 법을 학습한다.
          </p>
          <p className="leading-relaxed text-gray-700 break-keep">
            셋째, 연구 방법론을 실무 문제와 결합한다. 질적·양적·혼합연구의 기본을 익히고, 현장
            데이터를 연구 질문으로 전환한 뒤 윤리와 타당성을 지키며 결과를 공유하는 습관을
            체득한다. 넷째, AI 시대의 학습설계와 서비스 설계 역량을 강화한다. 도구 도입을 넘어
            학습목표·평가·근거자료와 연결된 적용 시나리오를 만들고, 학습관리와 경영 의사결정에서의
            활용 한계와 거버넌스를 성찰한다. 다섯째, 야간·주말 트랙을 통해 현직자의 학습 지속성을
            제도적으로 보장하고, 수업과 과제는 즉시 적용 가능한 산출물 중심으로 구성하여 학습이
            곧 현장 개선으로 이어지도록 한다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            육성 역량과 학습 설계
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            졸업생은 (1) 교육기관 및 에듀테크 관련 조직에서 요구되는 전략적 사고, (2) 상담·지도·
            코칭 상황에서 공감과 전문성의 균형, (3) 데이터와 R&E로 논의를 구조화하는 능력,
            (4) 다부서·다기관 협업을 이끄는 커뮤니케이션 역량을 통합적으로 보여줄 수 있어야 한다.
            이를 위해 본 전공은 여섯 가지 특화 LAB(청소년 R&E LAB, 진로진학 LAB, 에듀비즈니스 마케팅 LAB,
            에듀비즈니스 시스템 LAB, AI 테크에듀 LAB, 연구논문 LAB)을 축으로 동일한 현장 문제를 서로 다른 렌즈로
            바라보고 교차 검증하는 경험을
            제공한다. LAB은 과목의 부속이 아니라, 문제 정의부터 산출·발표까지 이어지는 학습
            생태계의 중심축으로 기능한다.
          </p>
          <p className="leading-relaxed text-gray-700 break-keep">
            교과 운영은 ‘이해—적용—통합’의 순서를 따른다. 이해 단계에서는 개념과 사례를 통해
            틀을 세우고, 적용 단계에서는 실제 데이터·상담 시나리오·운영 지표를 다루며, 통합
            단계에서는 팀 프로젝트와 심화 세미나를 통해 이질적 요구를 조율하는 연습을 한다.
            평가는 결과물의 완성도뿐 아니라 과정의 성실성, 협업의 기여도, 윤리적 판단을 함께
            본다. 이는 전문가로서의 책임이 개인의 성과를 넘어 공동체의 신뢰에 닿음을 학습자에게
            상기시키기 위함이다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-gachon-900 break-keep md:text-2xl">
            책임과 지속적 개선
          </h2>
          <p className="leading-relaxed text-gray-700 break-keep">
            본 전공은 윤리 강령과 정보 보호, 다양성 존중, 이해상충 관리의 원칙을 학습과정 전반에
            녹여, 전문성이 곧 책임임을 체화하도록 한다. 교육현장의 민감한 정보와 고객의 선택은
            최소 수집·목적 외 이용 금지·안전한 보관의 원칙 아래 다루어지며, 상담과 마케팅, 성과
            관리가 충돌할 때의 우선순위를 토론과 사례로 학습한다. 비전과 목표는 교육과정
            운영위원회의 정기 검토, 학생·동문 피드백, 외부 전문가 자문을 통해 현실성과 도전성의
            균형을 맞추며, 개정 시에는 변경 이유와 근거를 투명하게 공유한다. 이 모든 방향은
            경영과 교육의 진짜 융합이라는 전공의 정체성 위에서, 현직 전문가의 자존감을 해치지
            않는 언어와 태도로 일관되게 유지·발전될 것이다.
          </p>
          <p className="leading-relaxed text-gray-700 break-keep">
            한편 본 전공은 대학원 교육으로서의 학문적 깊이를 경시하지 않는다. 현장 의존만으로는
            지속 가능한 전문성을 확보하기 어렵기 때문에, 이론 수업과 세미나, 연구논문 작성 LAB을
            통해 주장의 근거를 쌓고 베스트 프랙티스를 비판적으로 수용하는 태도를 기른다. 디지털
            전환이 가져온 평가·채용·입시 제도의 변화를 제도 분석과 정책 맥락에서 읽는 연습을
            포함하며, 효율을 추구하되 공정성과 소외를 점검하는 질문을 훈련의 일부로 둔다. 동문과
            학회, 산업 파트너와의 네트워크를 통해 졸업 이후에도 학습이 끊기지 않는 커뮤니티를
            지향하고, 학습자가 조직과 고객에게 실질적 개선을 보고할 수 있는 증거를 남기도록
            과제를 설계하여 전문가로서의 성장이 곧 조직의 신뢰 자산으로 귀결됨을 체험하게 한다.
          </p>
        </section>
      </div>
    </div>
  );
}
