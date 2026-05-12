/** FE 전용 목 데이터 — API 연결 시 교체 */

export interface MockFaculty {
  id: string;
  name: string;
  position: string;
  researchArea: string;
  email: string;
  labSlug?: string;
  bio: string;
  /** 메인·교수진 목록 등에 쓰는 정적 초상 (`public` 기준 경로) */
  portraitSrc?: string;
  /** 정사각·세로 크롭 시 얼굴 위치 맞춤 (`object-position`) */
  portraitObjectPosition?: string;
  /** 1보다 크면 상반신 확대(원거리 촬영), 작으면 타이트한 초상 완화 */
  portraitZoom?: number;
  /** `portraitZoom` 기준점 — 보통 머리 쪽 */
  portraitTransformOrigin?: string;
}

export interface MockLab {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  researchTopics: string[];
  leadFacultyId: string;
}

export interface MockPost {
  id: string;
  /** 공개 URL `/community/notice/[publicSlug]` (PRD id-slug) */
  publicSlug: string;
  category: "notice" | "board" | "qna";
  title: string;
  excerpt: string;
  /** 게시판 등 본문(없으면 excerpt만 사용) */
  content?: string;
  date: string;
  author?: string;
}

export interface MockScheduleItem {
  id: string;
  date: string;
  title: string;
  description?: string;
}

export interface MockScholarship {
  rank: number;
  name: string;
  discountPercent: number;
  description: string;
  conditions: string;
}

export interface MockFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface MockEvent {
  id: string;
  title: string;
  type: "online" | "offline" | "hybrid";
  startAt: string;
  location?: string;
  capacity?: number;
}

export const MOCK_FACULTY: MockFaculty[] = [
  {
    id: "1",
    name: "박인오",
    position: "주임교수 · 교육학 · 경영학",
    researchArea: "진로진학, R&E, 서논술",
    email: "inhopark@gachon.ac.kr",
    labSlug: "rne",
    bio: "교육 현장의 데이터와 연구 설계를 아우르는 경험을 바탕으로 청소년 R&E LAB과 진로진학 LAB을 이끕니다.",
    portraitSrc: "/faculty/박인오.png",
    portraitObjectPosition: "center top",
    portraitZoom: 1.2,
    portraitTransformOrigin: "center top",
  },
  {
    id: "2",
    name: "원영란",
    position: "전공교수 · 교육학 · 경영학",
    researchArea: "교육경영, 마케팅, 인사, 전략",
    email: "yywon@gachon.ac.kr",
    labSlug: "academy",
    bio: "교육기관의 경영·마케팅·인사·전략을 연구·실무 관점에서 통합해 에듀비즈니스 마케팅 LAB과 에듀비즈니스 시스템 LAB을 이끕니다.",
    portraitSrc: "/faculty/원영란.png",
    portraitObjectPosition: "center top",
    portraitZoom: 1,
    portraitTransformOrigin: "center top",
  },
  {
    id: "3",
    name: "장의웅",
    position: "전공교수 · 교육학 · 경영학 · 컨설팅학",
    researchArea: "AI 경영, 연구방법론, 통계",
    email: "uijang@gachon.ac.kr",
    labSlug: "ai-tech-edu",
    bio: "AI와 경영·교육의 접점에서 연구방법론과 통계를 활용한 분석·전략을 지도합니다.",
    portraitSrc: "/faculty/장의웅.png",
    portraitObjectPosition: "center top",
    portraitZoom: 1.06,
    portraitTransformOrigin: "center top",
  },
];

export const MOCK_LABS: MockLab[] = [
  {
    slug: "rne",
    name: "청소년 R&E LAB",
    fullName: "Youth Research & Education LAB",
    tagline: "청소년 교육 현장의 데이터를 학문으로 잇다",
    description:
      "청소년 교육 맥락에서 현장 데이터를 연구로 발전시키고, 박사 진학으로 이어지는 학술 깊이를 갖춥니다.",
    researchTopics: ["청소년 학습분석", "현장 R&E 설계", "정책·제도 분석"],
    leadFacultyId: "1",
  },
  {
    slug: "career-guidance",
    name: "진로진학 LAB",
    fullName: "Career & College Guidance LAB",
    tagline: "진로 설계와 진학 컨설팅의 전문성을 완성하다",
    description:
      "진로 탐색·진학 전략·입시 제도를 근거와 프로세스 중심으로 다루며, 컨설턴트와 기관 실무에 바로 쓰이는 설계 역량을 기릅니다.",
    researchTopics: ["진로 설계 모델", "입시·제도 분석", "프로그램·상담 설계"],
    leadFacultyId: "1",
  },
  {
    slug: "academy",
    name: "에듀비즈니스 마케팅 LAB",
    fullName: "Edu-Business Marketing LAB",
    tagline:
      "브랜드 자산 구축과 가치 제안(Value Proposition) 최적화를 통한 교육 비즈니스 성장을 설계하다",
    description:
      "급변하는 교육 환경 속에서 사회교육기관 및 교육기업의 지속 가능한 성장은 단순히 ‘잘 가르치는 것’을 넘어, 교육 서비스의 가치를 어떻게 전략적으로 커뮤니케이션하느냐에 달려 있습니다. 에듀비즈니스 마케팅 LAB은 교육 소비자의 심리와 데이터에 기반하여, 교육 기관의 서비스 품질 향상과 브랜드 가치 제고를 실현하는 방법론을 연구합니다.\n\n" +
      "본 연구실은 대형 학원, 1인 교습소, 진로진학 컨설팅 등 다양한 형태의 교육 비즈니스 모델을 포괄합니다. 원우들은 소비자 행동론, 통합 마케팅 커뮤니케이션(IMC), 고객 여정(CDJ) 등 경영학의 핵심 마케팅 이론을 횡단적으로 학습합니다. 이를 신규 유입, 등록 전환, 고객 유지라는 종단적 현장 맥락에 접목함으로써, 미래 교육 수요에 부응하는 전문인력 및 마케팅 전략가로 성장합니다.\n\n" +
      "특히 교육 서비스의 수요자인 학부모와 학생의 의사결정 여정(CDJ)을 심층 분석하고, 이를 최적의 브랜드 경험(CX)으로 통합합니다. 이를 통해 마케팅 효율성을 극대화하고, 지역사회 내에서 강력한 브랜드 팬덤(Fandom)을 구축하는 실전형 교육 경영 리더 양성을 목표로 합니다.\n\n" +
      "본 LAB은 입학 요강의 전공 심화 과정과 연계하여, 교육 현장의 성과를 극대화할 수 있는 세 가지 실무 역량을 배양합니다. 교육마케팅과 소비자 행동 분석에서는 교육 소비자(학부모·학생)의 심리를 파고드는 브랜딩 전략과 상담 등록률(Conversion Rate)을 높이는 실전 마케팅 기법을 익힙니다. 고객 경험(CX) 및 여정 최적화에서는 인지부터 등록까지의 고객 접점(MOT)을 분석하여 이탈 구간(Leaky Bucket)을 진단하고, 공간 심리학을 적용한 환경 리뉴얼을 수행합니다. 교육콘텐츠 기획 및 수익 다각화에서는 교육 서비스의 제품화(Productization)를 통해 자체 교재·콘텐츠를 상품화하고, 수업료 외 부가 수익 모델(BM)을 구축합니다.\n\n" +
      "아래 마케팅 매트릭스 커리큘럼은 세 가지 종단(성장 도메인)과 다섯 가지 횡단(마케팅 방법론)이 교차하는 구조로 짜여 있습니다. 가로는 마케팅 전략 도구 축, 세로는 교육 비즈니스 도메인 축이며, 셀에 포인터를 올리면 같은 행·열이 함께 강조됩니다. 표의 교차점은 학문적 이론을 현장에 이식하는 실천 프레임워크이며, 실제 개설 과목은 학기별 편제를 따릅니다.",
    researchTopics: [
      "종단×횡단 마케팅 매트릭스 커리큘럼",
      "가치 제안(USP)·고객 여정(CDJ)·전환율(Conversion Rate) 최적화 연동",
      "통합 커뮤니케이션(IMC)·교육 서비스 제품화(Productization)·팬덤 구축",
    ],
    leadFacultyId: "2",
  },
  {
    slug: "counseling-management",
    name: "에듀비즈니스 시스템 LAB",
    fullName: "Edu-Business System LAB",
    tagline:
      "경영 효율화와 서비스 품질 향상을 이끄는 교육 비즈니스 시스템 스케일업(Scale-up)을 설계하다",
    description:
      "미래 사회의 급격한 교육 패러다임 변화 속에서 학원·교습소·진로진학 컨설팅 센터를 비롯한 사회교육기관 및 교육기업의 생존은 ‘개인의 역량’을 넘어선 ‘경영의 시스템화’에 달려 있습니다. 에듀비즈니스 시스템 LAB은 운영자 개인의 암묵지(Tacit Knowledge)와 직관적 판단(Heuristics)에 의존하는 휴리스틱 경영의 한계를 극복하고, 교육 현장에 최적화된 경영학적 프레임워크(Management Framework)를 이식하는 방법론을 연구합니다.\n\n" +
      "본 연구실은 교육 현장의 실무자들을 전문인력 및 중간 관리자로 양성하기 위해 조직행동, 인적자원관리(HRM), 기업재무분석, 경영전략의 핵심 이론을 횡단적으로 학습합니다. 원우들은 현장의 노하우를 표준운영절차(SOP)로 정식화하고, 조직의 성과를 핵심성과지표(KPI) 기반의 데이터로 시각화하는 훈련을 통해, 어떤 위기에도 흔들리지 않는 질적 내실화(Sustainability)와 양적 스케일업(Scale-up)을 주도하는 실전형 교육 CEO로 거듭납니다.\n\n" +
      "본 LAB은 입학 요강에 명시된 공통·전공 교과목의 이론적 토대 위에, 현장 경영에서 즉시 적용 가능한 세 가지 핵심 실무 역량을 고도화합니다. 경영 진단 및 운영 효율화(Operational Excellence)에서는 교육 비즈니스 모델(BM) 분석을 통한 경쟁 우위 확보, 핵심 행정·서비스 프로세스의 매뉴얼(SOP) 구축, 에듀테크 기반의 시스템 자동화를 설계합니다. 인적자본(Human Capital) 관리 및 리더십에서는 조직행동 이론에 기반한 직무 분석과 최적화된 채용·평가 시스템을 구축하고, 강사·스태프의 생애주기별 동기부여와 코칭 리더십을 모델링합니다. 재무 및 전사적 리스크 관리(ERM)에서는 기업재무분석을 응용한 손익분기점(BEP) 시뮬레이션, 비용 누수 진단, 핵심 인력 이탈·민원·안전사고 등에 대비한 전방위적 리스크 방어 체계를 구축합니다.\n\n" +
      "아래 시스템 경영 매트릭스 커리큘럼은 세 가지 종단(경영 도메인)과 다섯 가지 횡단(경영 방법론)이 교차하는 구조입니다. 가로는 경영 전략 도구 축, 세로는 교육 비즈니스 도메인 축이며, 셀에 포인터를 올리면 같은 행·열이 함께 강조됩니다. 업무 표준화(SOP)는 경영자 1인의 머릿속에 있던 암묵지를 명시적인 조직 자산으로 변환하는 과정이며, 데이터 경영(KPI)은 직관에 의존하던 의사결정을 과학적·객관적 체계로 전환하는 핵심 축입니다. 실제 개설 과목은 학기별 편제를 따릅니다.",
    researchTopics: [
      "종단×횡단 시스템 경영 매트릭스 커리큘럼 기반 연구",
      "표준운영절차(SOP)와 핵심성과지표(KPI)의 상관관계 분석",
      "교육 비즈니스 인적자본 리더십 및 전사적 리스크 관리(ERM) 전략",
    ],
    leadFacultyId: "2",
  },
  {
    slug: "ai-tech-edu",
    name: "AI 테크에듀 LAB",
    fullName: "AI & Tech Education LAB",
    tagline:
      "기술로 교육의 본질을 재정의하고, 미래 교육의 가치를 설계한다",
    description:
      "AI 시대에 교육과 리더십은 어떻게 달라져야 할까요. AI 테크에듀 LAB은 기술을 수업을 돕는 부가 도구(EdTech)에 머무르지 않고, 교육·경영의 과제를 다시 설계하는 동력으로 다룹니다. 원우는 첨단 AI의 원리와 방법을 횡단적으로 익히고, 진로·진학·학습관리·에듀비즈니스 등 종단적 현장 맥락에 접목해 스스로 해법을 설계하는 역량을 기릅니다.\n\n" +
      "커리큘럼은 세 가지 종단(적용 도메인)과 일곱 가지 횡단(기술 방법론)이 교차하는 매트릭스 구조로 짜여 있습니다. 특히 지식 온톨로지로 진로·과목·상담·운영 영역의 개념과 관계·용어를 정식화하면, RAG·에이전트·검색이 동일한 의미 체계 위에서 동작해 데이터 품질과 설명 가능성을 높일 수 있습니다. 아래 표는 “어떤 기술로 어떤 현장 과제를 풀 것인가”를 직관적으로 보기 위한 참고 틀입니다.\n\n" +
      "예를 들어 지식 온톨로지로 입시·역량·운영 개념을 정리한 뒤 RAG와 에이전트를 연결하거나, 파인튜닝을 활용한 진로·진학 상담 에이전트 설계, RAG와 반복 시제품 제작(바이브 코딩)을 결합한 운영 대시보드 구축처럼 횡단과 종단을 묶은 실천 프로젝트를 완성해 갑니다. 기술에 끌려가지 않고 교육의 본질적 가치를 지키며 미래를 설계하는 교육 리더로 성장하는 것을 목표로 합니다.",
    researchTopics: [
      "종단×횡단 매트릭스 커리큘럼",
      "지식 온톨로지·RAG·에이전트 연동",
      "제품화·거버넌스·윤리",
    ],
    leadFacultyId: "3",
  },
  {
    slug: "research-writing",
    name: "연구논문 LAB",
    fullName: "Academic Writing LAB",
    tagline: "현장의 교육 전문가에서, 지식을 창출하는 연구자로",
    description:
      "연구논문 LAB은 학위 취득에 그치지 않고, 교육 현장을 과학적으로 분석하고 학계에 기여할 수 있는 연구 역량을 갖추도록 돕는 학문적 베이스입니다. 현장에서 바로 쓰이는 지도·글쓰기 역량과, 논문·박사 진학으로 이어지는 학술적 깊이가 서로 보완되도록 설계합니다.\n\n" +
      "세 가지 핵심 목표를 축으로 합니다. 첫째, 중·고등학생 탐구보고서와 소논문을 주제 선정부터 근거 구성까지 체계적으로 코칭할 수 있는 역량입니다. 둘째, 석사 논문을 넘어 KCI 등재지 등 학술지에 게재할 수 있는 수준의 연구 설계·집필과 투고 절차에 대한 이해입니다. 셋째, 교육학·경영학 박사과정으로 이어질 수 있도록 연구 실적과 방법론적 기초를 정리하는 준비입니다.\n\n" +
      "연구 방법론은 양적 연구(설문·통계로 변수와 관계를 검증), 질적 연구(인터뷰·관찰·사례로 맥락과 의미를 심층 규명), 혼합 연구(양·질을 결합한 설계)의 세 갈래를 주제에 맞게 선택·통합합니다. 아래 시뮬레이터에서 목표와 방법론을 골라 보시면, 이 LAB에서 다져 갈 학습 방향을 가볍게 확인해 보실 수 있습니다.",
    researchTopics: [
      "학생 탐구·소논문 지도와 학술 글쓰기",
      "양적·질적·혼합 연구 방법론",
      "학술지 게재·박사 진학 로드맵",
    ],
    leadFacultyId: "3",
  },
];

export const MOCK_NOTICES: MockPost[] = [
  {
    id: "n1",
    publicSlug: "n1-2026-admission-guide",
    category: "notice",
    title: "2026학년도 후기 모집 안내",
    excerpt: "원서 접수 일정 및 제출 서류를 안내드립니다.",
    date: "2026-05-01",
    author: "교학팀",
  },
  {
    id: "n2",
    publicSlug: "n2-info-session-registration",
    category: "notice",
    title: "설명회 사전 등록 오픈",
    excerpt: "온·오프라인 병행 설명회 일정과 사전 등록 방법입니다.",
    date: "2026-04-28",
    author: "입학팀",
  },
  {
    id: "n3",
    publicSlug: "n3-scholarship-documents-update",
    category: "notice",
    title: "장학금 신청 서류 변경",
    excerpt: "2순위 장학 관련 제출 서류가 일부 변경되었습니다.",
    date: "2026-04-20",
    author: "교학팀",
  },
];

export const MOCK_BOARD: MockPost[] = [
  {
    id: "b1",
    publicSlug: "b1-study-group-recruitment",
    category: "board",
    title: "원우회 스터디 모집",
    excerpt: "교육데이터 분석 스터디 인원을 모집합니다.",
    content: "교육데이터 분석 스터디 인원을 모집합니다.",
    date: "2026-04-10",
    author: "재학생",
  },
  {
    id: "b2",
    publicSlug: "b2-thesis-advisor-matching-review",
    category: "board",
    title: "논문 지도 교수 매칭 후기",
    excerpt: "연구논문 LAB 경험을 공유합니다.",
    content: "연구논문 LAB 경험을 공유합니다.",
    date: "2026-04-02",
    author: "동문",
  },
];

export const MOCK_QNA: MockPost[] = [
  {
    id: "q1",
    publicSlug: "q1-friday-morning-class-schedule",
    category: "qna",
    title: "수업은 어떤 요일에 진행되나요?",
    excerpt: "주1 금요일 오전(9:00~14:40) 트랙 운영 기준을 알고 싶습니다.",
    date: "2026-04-15",
  },
];

export const MOCK_ADMISSION_SCHEDULE: MockScheduleItem[] = [
  {
    id: "s1",
    date: "2026-05-06",
    title: "원서 접수 시작",
    description: "경영학과 인터넷 접수 개시 (24시간 접수 가능)",
  },
  {
    id: "s2",
    date: "2026-06-05",
    title: "원서 접수 마감",
    description: "경영학과 인터넷 접수 마감 · 6. 8.(월)까지 등기우편 도착분 인정",
  },
  {
    id: "s3",
    date: "2026-06-20",
    title: "전형일",
    description: "필기·면접 등 전형 진행",
  },
  {
    id: "s4",
    date: "2026-07-03",
    title: "합격자 발표",
    description: "14시 발표 · 합격자 등록기간 7. 3.(금) ~ 7. 8.(수)",
  },
  {
    id: "s5",
    date: "2026-07-08",
    title: "등록 마감",
    description: "합격자 등록기간 종료",
  },
];

export const MOCK_SCHOLARSHIPS: MockScholarship[] = [
  {
    rank: 1,
    name: "우수 장학",
    discountPercent: 50,
    description: "입학 전형 및 경력 우수자 대상 감면.",
    conditions: "세부 자격은 모집요강 및 입학팀 안내를 따릅니다.",
  },
  {
    rank: 2,
    name: "교육현장 장학",
    discountPercent: 30,
    description: "현직 교육기관 종사자 대상.",
    conditions: "재직 증빙 제출 필수.",
  },
  {
    rank: 3,
    name: "성적 장학",
    discountPercent: 20,
    description: "학부 성적 및 면접 결과 반영.",
    conditions: "매 학기 심사 기준 적용.",
  },
];

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: "e1",
    title: "에듀컨설팅 전공 오프라인 설명회 (서울)",
    type: "offline",
    startAt: "2026-05-10T14:00:00+09:00",
    location: "가천대 글로벌캠퍼스",
    capacity: 80,
  },
  {
    id: "e2",
    title: "온라인 라이브 Q&A",
    type: "online",
    startAt: "2026-05-14T19:30:00+09:00",
    capacity: 200,
  },
];

export interface MockGalleryPreviewItem {
  id: string;
  src: string;
  caption: string;
  href: string;
}

export const MOCK_GALLERY_PREVIEW: MockGalleryPreviewItem[] = [
  {
    id: "g1",
    src: "/images/site/group-photo.jpg",
    caption: "연합 행사",
    href: "/community/gallery",
  },
  {
    id: "g2",
    src: "/images/site/son-jueun-lecture.jpg",
    caption: "초청 강연",
    href: "/community/gallery",
  },
  {
    id: "g3",
    src: "/images/site/vision-tower.jpg",
    caption: "캠퍼스",
    href: "/community/gallery",
  },
];

export type MockGalleryCategory = "event" | "workshop" | "graduation" | "daily";

export interface MockGalleryAlbum {
  id: string;
  title: string;
  description: string;
  date: string;
  category: MockGalleryCategory;
  images: { src: string; alt: string }[];
}

/** 갤러리 페이지·라이트박스용 앨범 더미 (이미지는 `public` 정적 자산 경로) */
export const MOCK_GALLERY_ALBUMS: MockGalleryAlbum[] = [
  {
    id: "gal-1",
    title: "2026 봄 LAB 워크숍",
    description: "6개 LAB 소개와 현장 토론",
    date: "2026-03-15",
    category: "workshop",
    images: [
      { src: "/images/labs/rne.jpg", alt: "청소년 R&E LAB 현장" },
      { src: "/images/labs/academy.jpg", alt: "에듀비즈니스 마케팅 LAB" },
      { src: "/images/labs/ai-tech-edu.jpg", alt: "AI 테크에듀 LAB" },
    ],
  },
  {
    id: "gal-2",
    title: "초청 특강: 교육 산업의 다음 물결",
    description: "산업 리더 초청 강연",
    date: "2026-02-20",
    category: "event",
    images: [
      { src: "/images/site/son-jueun-lecture.jpg", alt: "강연 장면" },
      { src: "/images/site/son-jueun.jpg", alt: "연사와 참가자" },
    ],
  },
  {
    id: "gal-3",
    title: "캠퍼스 투어",
    description: "비전타워·학습 공간",
    date: "2026-01-10",
    category: "daily",
    images: [
      { src: "/images/site/vision-tower.jpg", alt: "비전타워" },
      { src: "/images/site/glass-corridor.jpg", alt: "캠퍼스 복도" },
      { src: "/images/site/industry-environment.jpg", alt: "학습 환경" },
    ],
  },
  {
    id: "gal-4",
    title: "연합 MT·네트워킹",
    description: "동문·재학생 교류",
    date: "2025-11-08",
    category: "event",
    images: [{ src: "/images/site/group-photo.jpg", alt: "단체 사진" }],
  },
  {
    id: "gal-5",
    title: "연구논문 LAB 세미나",
    description: "논문 설계 워크숍",
    date: "2025-10-22",
    category: "workshop",
    images: [
      { src: "/images/labs/research-writing.jpg", alt: "연구논문 LAB" },
      { src: "/images/site/infinity.webp", alt: "브랜드 그래픽" },
    ],
  },
  {
    id: "gal-6",
    title: "졸업 축하 행사",
    description: "수료·졸업자 축하",
    date: "2025-08-30",
    category: "graduation",
    images: [
      { src: "/images/site/group-photo.jpg", alt: "졸업 행사" },
      { src: "/images/site/vision-tower.jpg", alt: "캠퍼스" },
    ],
  },
  {
    id: "gal-7",
    title: "AI 테크에듀 데모데이",
    description: "프로토타입 발표",
    date: "2025-06-14",
    category: "workshop",
    images: [
      { src: "/images/labs/ai-tech-edu.jpg", alt: "AI LAB" },
      { src: "/images/site/industry-environment.jpg", alt: "데모 공간" },
      { src: "/images/site/glass-corridor.jpg", alt: "행사장 복도" },
    ],
  },
  {
    id: "gal-8",
    title: "일상 스케치",
    description: "수업·휴식 공간",
    date: "2025-04-05",
    category: "daily",
    images: [
      { src: "/images/site/glass-corridor.jpg", alt: "캠퍼스" },
      { src: "/images/site/son-jueun.jpg", alt: "행사 스케치" },
    ],
  },
];

export const MOCK_FAQ: MockFaq[] = [
  {
    id: "f1",
    category: "자격/지원",
    question: "비전공자도 지원할 수 있나요?",
    answer:
      "네. 교육·경영 관련 현장 경력이 있다면 지원 가능 여부를 입학팀과 상담하실 수 있습니다. 세부는 모집요강을 확인해 주세요.",
  },
  {
    id: "f2",
    category: "학사",
    question: "수업은 주로 언제 진행되나요?",
    answer:
      "학교 경영학과 전체로는 평일 야간에 수업이 편성되지만, 에듀컨설팅 전공은 주 1회 금요일 오전(9:00~14:40) 트랙으로 별도 운영되어 현직을 유지하면서 학위를 이수할 수 있습니다. 학기별 시간표는 사전 안내됩니다.",
  },
  {
    id: "f3",
    category: "학비/장학금",
    question: "장학금은 어떻게 신청하나요?",
    answer:
      "입학 시 제출 서류와 별도 신청서가 있을 수 있습니다. 장학금 안내 페이지와 모집요강을 참고해 주세요.",
  },
  {
    id: "f4",
    category: "LAB",
    question: "LAB은 입학 전에 방문할 수 있나요?",
    answer:
      "설명회 및 상담 일정에 맞춰 안내가 진행됩니다. 개별 방문은 사전 협의가 필요합니다.",
  },
  {
    id: "f5",
    category: "졸업/진로",
    question: "박사 진학 연계는 어떻게 되나요?",
    answer:
      "청소년 R&E LAB 및 연구논문 LAB에서 지도교수와 로드맵을 설계할 수 있습니다.",
  },
  {
    id: "f6",
    category: "입학/절차",
    question: "입학 전형은 어떤 단계로 진행되나요?",
    answer:
      "모집요강에 명시된 서류·면접 등 절차를 따릅니다. 연도별로 일부 항목이 달라질 수 있으니 최신 요강을 확인해 주세요.",
  },
  {
    id: "f7",
    category: "입학/절차",
    question: "원서 접수는 어디서 하나요?",
    answer:
      "대학원 통합 원서 시스템 안내에 따릅니다. 접수 기간·유의사항은 모집요강과 공지를 기준으로 합니다.",
  },
  {
    id: "f8",
    category: "입학/절차",
    question: "면접은 무엇을 준비하면 되나요?",
    answer:
      "현장 경험과 학업·연구 계획을 균형 있게 설명할 수 있도록 준비하는 것이 좋습니다. 구체적 범위는 해당 연도 안내를 따릅니다.",
  },
  {
    id: "f9",
    category: "자격/지원",
    question: "학점은행제로도 지원할 수 있나요?",
    answer:
      "지원 자격은 모집요강의 학력 요건을 따릅니다. 학점은행제 이수 내역이 요건에 부합하는지 사전에 확인이 필요합니다.",
  },
  {
    id: "f10",
    category: "학사",
    question: "석사 학위만 해당되나요?",
    answer:
      "에듀컨설팅 전공은 경영대학원 석사 과정으로 안내됩니다. 학위 유형·이수 요건은 교육과정 안내와 모집요강을 참고해 주세요.",
  },
  {
    id: "f11",
    category: "학사",
    question: "휴학·복학은 어떻게 신청하나요?",
    answer:
      "대학원 학사 규정 및 교학팀 안내에 따릅니다. 학기별 신청 기한이 있으므로 공지를 확인해 주세요.",
  },
  {
    id: "f12",
    category: "학비/장학금",
    question: "등록금은 분납이 가능한가요?",
    answer:
      "분납 가능 여부와 절차는 해당 학기 교학팀·재무 안내에 따릅니다. 모집요강의 등록 일정과 함께 확인해 주세요.",
  },
  {
    id: "f13",
    category: "학비/장학금",
    question: "장학금을 두 가지 이상 받을 수 있나요?",
    answer:
      "중복 수혜 가능 여부는 장학 규정에 따릅니다. 상세는 장학 안내 페이지와 교학팀 답변을 기준으로 합니다.",
  },
  {
    id: "f14",
    category: "학사",
    question: "출석·성적 평가 방식은 어떻게 되나요?",
    answer:
      "과목별로 교수학습계획서에 명시된 평가 비율이 적용됩니다. 결석 처리 기준은 학사 규정과 강의 공지를 따릅니다.",
  },
  {
    id: "f15",
    category: "학사",
    question: "수업 녹화나 온라인 보강이 제공되나요?",
    answer:
      "과목·강의실 환경에 따라 다를 수 있습니다. 개별 과목 담당 교수 및 교학팀 안내를 확인해 주세요.",
  },
  {
    id: "f16",
    category: "캠퍼스",
    question: "주차나 대중교통 이용은 어떻게 되나요?",
    answer:
      "캠퍼스별 주차·셔틀 안내는 학교 홈페이지와 캠퍼스 안내를 참고해 주세요. 금요일 오전 수업 등·하교 시 여유 있는 이동을 권장합니다.",
  },
  {
    id: "f17",
    category: "LAB",
    question: "LAB은 필수로 하나만 선택해야 하나요?",
    answer:
      "연구·실무 활동의 중심이 되는 LAB을 중심으로 지도를 받게 됩니다. 세부 배정은 입학 후 안내에 따릅니다.",
  },
  {
    id: "f18",
    category: "LAB",
    question: "AI 테크에듀 LAB에서는 어떤 역량을 다루나요?",
    answer:
      "진로·진학·학습관리·에듀비즈니스 등 적용 도메인(종단)과 바이브 코딩, 프롬프트, RAG, 파인튜닝, 에이전트, 지식 하네스, 지식 온톨로지 등 기술 축(횡단)을 교차해 프로젝트를 설계합니다. LAB 상세 페이지의 매트릭스와 개설 과목 안내를 함께 참고해 주세요.",
  },
  {
    id: "f19",
    category: "논문/연구",
    question: "학위논문 지도교수는 어떻게 배정되나요?",
    answer:
      "연구 주제와 지도 가능 교수진을 고려해 매칭합니다. 시기와 절차는 교학팀의 논문 안내를 따릅니다.",
  },
  {
    id: "f20",
    category: "논문/연구",
    question: "학술지 투고나 컨퍼런스 발표는 지원되나요?",
    answer:
      "연구논문 LAB 등에서 연구 설계를 함께합니다. 지원 프로그램은 학기·연도별로 달라질 수 있습니다.",
  },
  {
    id: "f21",
    category: "졸업/진로",
    question: "졸업 후 주로 어떤 분야로 가나요?",
    answer:
      "교육기관 경영, 에듀테크, 진로진학 컨설팅, 연구 등 다양한 경로가 있습니다. 개인 역량과 LAB 경험에 따라 달라집니다.",
  },
  {
    id: "f22",
    category: "입학/절차",
    question: "외국어 성적이 필요한가요?",
    answer:
      "전형·모집 단위별 요건이 다를 수 있습니다. 해당 연도 모집요강의 외국어·자격 항목을 확인해 주세요.",
  },
  {
    id: "f23",
    category: "입학/절차",
    question: "재직 증빙은 어떤 서류를 내면 되나요?",
    answer:
      "모집요강에 명시된 재직·경력 증빙 서류를 제출합니다. 회사별 형식이 다를 수 있으니 기한 내 유효한 서류를 준비해 주세요.",
  },
  {
    id: "f24",
    category: "상담",
    question: "입학 상담은 어떻게 예약하나요?",
    answer:
      "입학 상담 페이지의 신청 양식을 이용해 주세요. 연락처·희망 일정을 남기시면 순차적으로 안내됩니다.",
  },
  {
    id: "f25",
    category: "설명회",
    question: "온라인 설명회 참여 링크는 언제 받나요?",
    answer:
      "사전 등록 시 입력한 이메일 또는 공지 채널로 안내될 수 있습니다. 스팸함도 함께 확인해 주세요.",
  },
  {
    id: "f26",
    category: "개인정보",
    question: "상담·등록 시 수집한 정보는 얼마나 보관되나요?",
    answer:
      "개인정보처리방침에 명시된 보유·이용 기간을 따릅니다. 문의 목적 달성 후 파기 또는 별도 분리 보관 등 법령을 준수합니다.",
  },
  {
    id: "f27",
    category: "학사",
    question: "타 대학원 과목의 일부를 인정받을 수 있나요?",
    answer:
      "학점 인정·면제는 대학원 학칙과 교학팀 심사에 따릅니다. 사전 상담 시 가능 여부를 확인하는 것이 좋습니다.",
  },
  {
    id: "f28",
    category: "동문",
    question: "동문 네트워크나 행사가 있나요?",
    answer:
      "원우회·학과 행사 등이 안내될 수 있습니다. 공지와 커뮤니티 메뉴를 통해 최신 일정을 확인해 주세요.",
  },
  {
    id: "f29",
    category: "자료",
    question: "브로슈어나 커리큘럼 자료는 어디서 받나요?",
    answer:
      "입학·자료실 메뉴에서 제공되는 자료를 확인해 주세요. PDF 형태로 배포되며 연도별로 갱신될 수 있습니다.",
  },
  {
    id: "f31",
    category: "LAB",
    question: "연구논문 LAB에서는 무엇을 목표로 하나요?",
    answer:
      "학생 탐구·소논문 지도 역량, 학술지 논문 게재, 박사과정 진학 준비의 세 축을 두고 연구 방법론(양적·질적·혼합)을 익힙니다. LAB 상세 페이지의 로드맵 시뮬레이터와 개설 과목 안내를 참고해 주세요.",
  },
];

export const MOCK_CURRICULUM = {
  /** 과목명: 학과 안내 자료 기준. 학점은 과목당 2학점. 코드·학기는 확정 편성 시 갱신 */
  common: [
    { code: "GC01", name: "마케팅", credit: 2, semester: "—" },
    { code: "GC02", name: "경영전략", credit: 2, semester: "—" },
    { code: "GC03", name: "리더십", credit: 2, semester: "—" },
    { code: "GC04", name: "조직행동과 이론", credit: 2, semester: "—" },
    { code: "GC05", name: "인적자원관리", credit: 2, semester: "—" },
    { code: "GC06", name: "기업재무연구", credit: 2, semester: "—" },
    { code: "GC07", name: "경영학세미나", credit: 2, semester: "—" },
    { code: "GC08", name: "경영과 자료분석", credit: 2, semester: "—" },
    { code: "GC09", name: "연구조사방법론", credit: 2, semester: "—" },
    { code: "GC10", name: "경영과 기업분석", credit: 2, semester: "—" },
    { code: "GC11", name: "기업가정신세미나", credit: 2, semester: "—" },
  ],
  major: [
    { code: "MJ01", name: "진로진학컨설팅 개론", credit: 2, semester: "—" },
    { code: "MJ02", name: "진로컨설팅의 이론과 실제", credit: 2, semester: "—" },
    { code: "MJ03", name: "진학컨설팅의 이론과 실제", credit: 2, semester: "—" },
    { code: "MJ04", name: "R&E 교수학습법", credit: 2, semester: "—" },
    { code: "MJ05", name: "에듀컨설팅 교수학습방법론", credit: 2, semester: "—" },
    { code: "MJ06", name: "진로진학컨설팅 프로그램 개발", credit: 2, semester: "—" },
    { code: "MJ07", name: "에듀비즈니스 성장전략과 마케팅", credit: 2, semester: "—" },
    { code: "MJ08", name: "에듀비즈니스 시스템 경영과 리스크 관리", credit: 2, semester: "—" },
    { code: "MJ09", name: "R&E 양적연구", credit: 2, semester: "—" },
    { code: "MJ10", name: "R&E 질적연구", credit: 2, semester: "—" },
    { code: "MJ11", name: "R&E 실험연구", credit: 2, semester: "—" },
    { code: "MJ12", name: "AI 기반 진로진학 컨설팅", credit: 2, semester: "—" },
    { code: "MJ13", name: "AI 기반 학습관리 컨설팅", credit: 2, semester: "—" },
    { code: "MJ14", name: "AI 기반 경영 컨설팅", credit: 2, semester: "—" },
  ],
};

export function getFacultyById(id: string): MockFaculty | undefined {
  return MOCK_FACULTY.find((f) => f.id === id);
}

export function getLabBySlug(slug: string): MockLab | undefined {
  return MOCK_LABS.find((l) => l.slug === slug);
}

export function getLeadFacultyForLab(lab: MockLab): MockFaculty | undefined {
  return MOCK_FACULTY.find((f) => f.id === lab.leadFacultyId);
}
