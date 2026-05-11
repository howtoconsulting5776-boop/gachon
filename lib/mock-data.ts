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
    name: "박인호",
    position: "주임교수 · 교육학 · 경영학",
    researchArea: "진로진학, R&E, 서논술",
    email: "inhopark@gachon.ac.kr",
    labSlug: "rne",
    bio: "교육 현장의 데이터와 연구 설계를 아우르는 경험을 바탕으로 R&E LAB을 이끕니다.",
    portraitSrc: "/faculty/1.jpg",
  },
  {
    id: "2",
    name: "원영란",
    position: "전공교수 · 교육학 · 경영학",
    researchArea: "교육경영, 마케팅, 인사, 전략",
    email: "yywon@gachon.ac.kr",
    labSlug: "academy",
    bio: "교육기관의 경영·마케팅·인사·전략을 연구·실무 관점에서 통합해 학원경영 LAB을 이끕니다.",
    portraitSrc: "/faculty/2.jpg",
  },
  {
    id: "3",
    name: "장의웅",
    position: "전공교수 · 교육학 · 경영학 · 컨설팅학",
    researchArea: "AI 경영, 연구방법론, 통계",
    email: "uijang@gachon.ac.kr",
    labSlug: "ai-tech-edu",
    bio: "AI와 경영·교육의 접점에서 연구방법론과 통계를 활용한 분석·전략을 지도합니다.",
    portraitSrc: "/faculty/3.jpg",
  },
];

export const MOCK_LABS: MockLab[] = [
  {
    slug: "rne",
    name: "R&E LAB",
    fullName: "Research & Education LAB",
    tagline: "실무 데이터를 학문으로 잇다",
    description:
      "교육 현장의 데이터를 연구로 발전시키고, 박사 진학으로 연결되는 학술 깊이를 갖춥니다.",
    researchTopics: ["학습분석", "현장 R&E 설계", "정책·제도 분석"],
    leadFacultyId: "1",
  },
  {
    slug: "academy",
    name: "학원경영 LAB",
    fullName: "Academy Management LAB",
    tagline: "경영의 언어로 학원을 운영하다",
    description:
      "학원·교육기관의 운영, 마케팅, 재무, 인사 전반을 경영학 프레임으로 재설계합니다.",
    researchTopics: ["원가·손익", "조직·인사", "브랜드·채널"],
    leadFacultyId: "2",
  },
  {
    slug: "ai-tech-edu",
    name: "AI 테크에듀 LAB",
    fullName: "AI & Tech Education LAB",
    tagline: "AI 시대의 학습 설계자",
    description:
      "AI 도구의 교육 적용, 에듀테크 제품 기획, 학습 데이터 분석을 깊이 있게 다룹니다.",
    researchTopics: ["LLM 활용 학습설계", "제품 PMF", "윤리·거버넌스"],
    leadFacultyId: "3",
  },
  {
    slug: "research-writing",
    name: "연구논문 LAB",
    fullName: "Academic Writing LAB",
    tagline: "내 경험을 학문으로 만들다",
    description:
      "석사 논문, 학술지 투고, 박사 진학을 위한 체계적인 학술 글쓰기 훈련을 제공합니다.",
    researchTopics: ["문헌고찰", "질적·양적 분석", "학술지 투고"],
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
    publicSlug: "q1-evening-class-schedule",
    category: "qna",
    title: "야간 수업 주차는 어떻게 되나요?",
    excerpt: "평일 야간과 토요일 배정 기준을 알고 싶습니다.",
    date: "2026-04-15",
  },
];

export const MOCK_ADMISSION_SCHEDULE: MockScheduleItem[] = [
  {
    id: "s1",
    date: "2026-05-06",
    title: "원서 접수 시작",
  },
  {
    id: "s2",
    date: "2026-05-20",
    title: "원서 접수 마감",
  },
  {
    id: "s3",
    date: "2026-06-05",
    title: "서류 심사 결과",
  },
  {
    id: "s4",
    date: "2026-06-15",
    title: "면접",
  },
  {
    id: "s5",
    date: "2026-07-03",
    title: "합격자 발표",
  },
  {
    id: "s6",
    date: "2026-07-15",
    title: "등록 마감",
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
      "평일 야간 및 토요일에 집중 배정됩니다. 학기별 시간표는 사전 안내됩니다.",
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
      "R&E LAB 및 연구논문 LAB에서 지도교수와 로드맵을 설계할 수 있습니다.",
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
      "캠퍼스별 주차·셔틀 안내는 학교 홈페이지와 캠퍼스 안내를 참고해 주세요. 야간 수업 시에도 안전한 이동을 권장합니다.",
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
      "AI와 데이터를 활용한 교육·경영 과제를 다룹니다. 구체 커리큘럼은 LAB 페이지와 개설 과목 안내를 참고해 주세요.",
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
    id: "f30",
    category: "접근성",
    question: "웹사이트 이용에 불편이 있으면 어디에 알리면 되나요?",
    answer:
      "접근성 정책 페이지의 문의 경로를 이용해 주세요. 개선 요청은 운영 정책에 따라 반영됩니다.",
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
