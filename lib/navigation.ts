export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: "전공소개",
    href: "/about/greeting",
    submenu: [
      { label: "전공소개", href: "/about/greeting" },
      { label: "비전 및 목표", href: "/about/vision" },
      { label: "커리큘럼", href: "/about/curriculum" },
      { label: "학사 운영", href: "/about/academic" },
    ],
  },
  { label: "교수진", href: "/faculty" },
  {
    label: "연구실",
    href: "/labs",
    submenu: [
      { label: "청소년 R&E LAB", href: "/labs/rne" },
      { label: "진로진학 LAB", href: "/labs/career-guidance" },
      { label: "에듀비즈니스 LAB", href: "/labs/academy" },
      { label: "상담관리 LAB", href: "/labs/counseling-management" },
      { label: "AI 테크에듀 LAB", href: "/labs/ai-tech-edu" },
      { label: "연구논문 LAB", href: "/labs/research-writing" },
    ],
  },
  {
    label: "입학안내",
    href: "/admissions",
    submenu: [
      { label: "모집요강", href: "/admissions/brochure" },
      { label: "모집 일정", href: "/admissions/schedule" },
      { label: "장학금", href: "/admissions/scholarships" },
      { label: "입학 상담", href: "/admissions/inquiry" },
      { label: "설명회 안내", href: "/admissions/events" },
      { label: "FAQ", href: "/admissions/faq" },
    ],
  },
  {
    label: "커뮤니티",
    href: "/community/notice",
    submenu: [
      { label: "공지사항", href: "/community/notice" },
      { label: "전공 게시판", href: "/community/board" },
      { label: "Q&A", href: "/community/qna" },
      { label: "원우회 동정", href: "/community/network" },
      { label: "갤러리", href: "/community/gallery" },
    ],
  },
  { label: "자료실", href: "/resources" },
];
