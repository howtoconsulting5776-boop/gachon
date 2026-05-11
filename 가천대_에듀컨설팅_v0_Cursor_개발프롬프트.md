# 가천대 에듀컨설팅 홈페이지

## v0 / Cursor 개발용 프롬프트 모음 v1.0

> 본 문서는 PRD v2.0에 기반하여 작성되었으며, v0(vercel)·Cursor·Claude 등 AI 코딩 도구에 그대로 복사하여 사용할 수 있는 프롬프트 모음입니다.

---

## 📌 사용 가이드

1. **프롬프트 1번(전역 컨텍스트)을 채팅의 첫 메시지로 항상 넣으세요.** v0/Cursor가 디자인 시스템과 톤을 이해합니다.
2. **컴포넌트 단위로 순차 생성하세요.** Header → Hero → LAB 카드 → ... 순으로 진행하면 일관성이 유지됩니다.
3. **각 프롬프트는 독립 실행 가능**하지만, 의존 컴포넌트가 있을 경우 명시되어 있습니다.
4. **수정 요청 시**: "[이전 컴포넌트 이름]의 [수정 부분]을 [원하는 방향]으로 변경해줘" 패턴이 가장 잘 작동합니다.
5. **이미지가 필요한 부분**은 `/placeholder.svg?height=600&width=800` 형태의 플레이스홀더를 사용하도록 안내되어 있습니다.

---

## 📚 프롬프트 목차

| # | 프롬프트 | 용도 |
|---|---|---|
| 1 | 전역 컨텍스트 | 모든 채팅의 첫 메시지 |
| 2 | 디자인 토큰 & 글로벌 스타일 | 프로젝트 셋업 |
| 3 | Header / Top Navigation | 공통 레이아웃 |
| 4 | Footer | 공통 레이아웃 |
| 5 | Hero 섹션 | 메인 페이지 |
| 6 | 핵심 가치 3종 섹션 | 메인 페이지 |
| 7 | LAB 퀵뷰 카드 (4개) | 메인 페이지 |
| 8 | 모집 카운트다운 배너 | 메인 페이지 |
| 9 | 교수진 슬라이드 | 메인 페이지 |
| 10 | 최신 소식 위젯 | 메인 페이지 |
| 11 | 입학 CTA 배너 (Sticky) | 메인 페이지 |
| 12 | 모집 일정 타임라인 | 입학 안내 |
| 13 | 장학금 안내 카드 | 입학 안내 |
| 14 | 입학 상담 신청 폼 | 입학 안내 (★ 핵심) |
| 15 | FAQ 아코디언 | 입학 안내 |
| 16 | 설명회 등록 카드 + 모달 | 입학 안내 |
| 17 | 교수진 카드 그리드 | 교수진 페이지 |
| 18 | 교수 상세 페이지 | 교수진 페이지 |
| 19 | LAB 상세 페이지 | LAB 페이지 |
| 20 | 커리큘럼 표 | 전공 소개 |
| 21 | 게시판 리스트 | 커뮤니티 |
| 22 | 게시글 상세 + 글쓰기 폼 | 커뮤니티 |
| 23 | 갤러리 그리드 + 라이트박스 | 커뮤니티 |
| 24 | 검색 페이지 | 검색 |
| 25 | 어드민 대시보드 | 관리자 |
| 26 | 상담 관리 테이블 | 관리자 |

---

## 1️⃣ 전역 컨텍스트 (모든 채팅의 첫 메시지)

```
가천대학교 경영대학원 에듀컨설팅 전공의 공식 홈페이지를 만들고 있어. 
앞으로 보낼 컴포넌트 요청은 모두 아래 프로젝트 사양을 따라야 해.

## 프로젝트 사양
- **프레임워크**: Next.js 14 (App Router) + TypeScript
- **스타일링**: Tailwind CSS
- **컴포넌트 라이브러리**: shadcn/ui
- **아이콘**: lucide-react
- **폰트**: 한글 Pretendard Variable, 영문 Inter
- **애니메이션**: Framer Motion (필요 시)
- **폼**: react-hook-form + zod
- **반응형**: Mobile-first (360px → 1440px)

## 브랜드 가이드
- **Primary 컬러**: Gachon Navy (#002C62)
- **Secondary**: Gold (#C9A86A) — 학위 권위감을 위한 액센트
- **Tone**: 신뢰감 있고 전문적이면서도 현대적. 학원·취업 사이트 느낌 절대 금지.
- **타겟**: 30~40대 교육산업 종사자(학원 경영자, 에듀테크 기획자, 진로진학 컨설턴트, 교육 분야 창업 준비자)

## Tailwind 컬러 토큰 (이미 tailwind.config에 설정되어 있다고 가정)
- primary-50 ~ primary-900 (navy 계열)
- secondary-500 (gold)
- 그 외 Tailwind 기본 neutral 사용

## 핵심 메시지 (사이트 전반 일관 반영)
1. 경영과 교육의 진짜 융합 — 경영대학원 소속 + 교육 전문성
2. 4개 특화 LAB (R&E / 학원경영 / AI 테크에듀 / 연구논문 작성)
3. 현직 전문가를 위한 야간·주말 트랙
4. 실무 데이터 기반 연구 (R&E)
5. AI 시대 교육 리더 양성

## 코드 작성 규칙
- 모든 컴포넌트는 함수형 + TypeScript 인터페이스로 props 정의
- 'use client'는 인터랙션 필요한 경우에만
- 한글 텍스트는 break-keep 클래스로 단어 단위 줄바꿈 처리
- 접근성: alt 텍스트, ARIA, 키보드 네비게이션 모두 포함
- 반응형: 모바일 → 데스크톱 순으로 작성

이해했으면 "준비 완료"라고 답하고, 첫 컴포넌트 요청을 기다려줘.
```

---

## 2️⃣ 디자인 토큰 & 글로벌 스타일 셋업

```
프로젝트 초기 셋업을 도와줘. 다음 파일들을 작성해줘.

## 1) tailwind.config.ts
- Pretendard, Inter 폰트 패밀리 등록
- Gachon Navy 컬러 5단계(50~900)
- Gold secondary 컬러
- shadcn/ui 토큰 호환
- container 설정 (max-w-screen-xl)
- 애니메이션 keyframes: fade-in-up, fade-in

## 2) app/globals.css
- Pretendard CDN 로드 (https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/variable/pretendardvariable.css)
- 기본 body: font-pretendard, antialiased, text-gray-900
- 한글 줄바꿈 유틸리티 .break-keep { word-break: keep-all; overflow-wrap: break-word; }
- 스크롤바 스타일 (얇고 navy)
- focus-visible 글로벌 스타일

## 3) lib/utils.ts
- cn() 유틸 (clsx + tailwind-merge)

## 4) types/index.ts
- 공통 타입: Faculty, Lab, Post, Inquiry, Event 인터페이스 (PRD에 기반)

각 파일을 별도 코드 블록으로 출력해줘.
```

---

## 3️⃣ Header / Top Navigation

```
사이트 공통 헤더 컴포넌트를 만들어줘. 파일명: components/layout/Header.tsx

## 요구사항
- **데스크톱 (1024px+)**:
  - 좌측: 가천대학교 경영대학원 로고 + "에듀컨설팅 전공" 텍스트
  - 중앙: 6개 주메뉴 (전공소개 / 교수진 / 연구실 / 입학안내 / 커뮤니티 / 자료실)
  - 각 메뉴는 호버 시 드롭다운 (서브메뉴 노출, 부드러운 페이드)
  - 우측: 검색 아이콘, "입학 상담" 버튼 (primary, sm)
  
- **모바일 (~767px)**:
  - 좌측: 로고
  - 우측: 검색 아이콘, 햄버거 메뉴
  - 햄버거 클릭 시 풀스크린 드로어 (오른쪽에서 슬라이드)
  - 드로어 안에 메뉴 + 입학상담 CTA

- **공통**:
  - 스크롤 시 배경 white/90 + backdrop-blur + subtle border-bottom
  - 스크롤 전: 투명 배경 (메인페이지에서만)
  - 높이: 모바일 56px, 데스크톱 72px
  - sticky top-0, z-50

## 인터랙션
- 메뉴 호버 시 underline 애니메이션 (좌→우)
- 현재 페이지 메뉴는 navy 강조
- 검색 아이콘 클릭 시 검색 모달 오픈 (모달 컴포넌트는 placeholder로)
- Framer Motion 사용

## 접근성
- 햄버거 메뉴 aria-expanded, aria-controls
- 키보드 Tab으로 모든 메뉴 접근
- ESC로 드로어 닫기

## 메뉴 데이터
const menus = [
  { 
    label: "전공소개", 
    href: "/about",
    submenu: [
      { label: "인사말", href: "/about/greeting" },
      { label: "비전 및 목표", href: "/about/vision" },
      { label: "커리큘럼", href: "/about/curriculum" },
      { label: "학사 운영", href: "/about/academic" }
    ]
  },
  { label: "교수진", href: "/faculty" },
  { 
    label: "연구실", 
    href: "/labs",
    submenu: [
      { label: "R&E LAB", href: "/labs/rne" },
      { label: "학원경영 LAB", href: "/labs/academy" },
      { label: "AI 테크에듀 LAB", href: "/labs/ai-tech-edu" },
      { label: "연구논문 작성 LAB", href: "/labs/research-writing" }
    ]
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
      { label: "FAQ", href: "/admissions/faq" }
    ]
  },
  // ... 등
];
```

---

## 4️⃣ Footer

```
사이트 푸터를 만들어줘. 파일명: components/layout/Footer.tsx

## 구조 (데스크톱 4 컬럼, 모바일 1 컬럼)
1. **좌측 컬럼 (학과 정보)**:
   - 가천대학교 로고
   - 주소: 경기도 성남시 수정구 성남대로 1342
   - 대표 연락처
   - 학과 사무실 이메일
   - SNS 아이콘 4종 (인스타그램, 유튜브, 페이스북, 블로그)

2. **사이트맵 컬럼 1**: 전공소개, 교수진, 연구실
3. **사이트맵 컬럼 2**: 입학안내, 커뮤니티, 자료실
4. **약관/링크 컬럼**: 
   - 개인정보처리방침 (강조: bold + underline)
   - 이용약관
   - 웹 접근성 안내
   - 가천대 메인 페이지

## 하단 바
- 좌측: © 2026 Gachon University Graduate School of Business. All rights reserved.
- 우측: 사업자등록번호, 대표자, 사이트 운영자

## 스타일
- 배경: bg-primary-900 (deep navy)
- 텍스트: text-gray-300 (가독성), 링크 호버 시 white
- 패딩: py-16 데스크톱, py-10 모바일
- 상단 border: secondary-500/20 하단에 얇은 골드 라인 (1px)
- 폰트 사이즈: 본문 14px, 캡션 12px

## 접근성
- footer role 명시
- 모든 링크 의미 있는 텍스트
```

---

## 5️⃣ Hero 섹션 (메인 페이지)

```
메인 페이지의 Hero 섹션을 만들어줘. 파일명: components/sections/Hero.tsx

## 요구사항
- **풀스크린 (min-h-[700px] 데스크톱, min-h-[600px] 모바일)**
- 배경: 그라데이션 오버레이 + 배경 이미지 (placeholder)
  - 이미지: /placeholder.svg?height=900&width=1600 (학생들이 협업하는 모습을 가정)
  - 오버레이: from-primary-900/80 via-primary-700/60 to-primary-500/40
- 콘텐츠 중앙 정렬, max-w-screen-xl

## 콘텐츠 (위에서부터)
1. **상단 작은 라벨**: "2026학년도 후기 모집 진행 중" 
   - 골드 점 + 텍스트, secondary-500 + bg-white/10 backdrop-blur로 pill 형태
2. **메인 헤드라인**: "교육을 경영하라, 미래를 설계하라"
   - 모바일 36px, 데스크톱 64px
   - font-bold, break-keep
   - 두 줄로 자연스럽게 떨어지도록
3. **서브 카피**: 
   "가천대학교 경영대학원 에듀컨설팅 전공은
   교육 산업의 다음 세대 리더를 양성합니다."
   - 모바일 16px, 데스크톱 20px
   - text-white/85
4. **CTA 버튼 2개 (가로 배치, 모바일 세로)**:
   - Primary: "입학 상담 신청" (size lg, 골드 배경 + navy 텍스트)
   - Outline: "모집요강 다운로드" (size lg, white border + white 텍스트)
   - 각 버튼에 lucide 아이콘 (ArrowRight, Download)

## 인터랙션
- Framer Motion으로 페이지 로드 시 순차 페이드인:
  - 라벨 → 헤드라인 → 서브카피 → 버튼 (각 0.15초 간격)
- 헤드라인은 위에서 살짝 슬라이드인
- 하단에 스크롤 다운 인디케이터 (작은 화살표 + 바운스 애니메이션)

## 반응형
- 모바일: 콘텐츠 left-aligned, 패딩 px-6
- 데스크톱: center-aligned, 패딩 px-12

## 접근성
- 헤드라인 h1
- 배경 이미지 alt
- 키보드 포커스로 CTA 접근 가능
```

---

## 6️⃣ 핵심 가치 3종 섹션

```
Hero 다음에 오는 "핵심 가치 3종" 섹션을 만들어줘. 파일명: components/sections/CoreValues.tsx

## 구조
- 섹션 패딩: py-20 데스크톱, py-14 모바일, 배경 white
- 상단 헤더:
  - 골드 작은 라벨 "WHY US"
  - h2: "왜 가천대 에듀컨설팅인가" (32px / 데스크톱 40px)
  - 부제: 한 줄, gray-600
- 3개 카드 (데스크톱 3 컬럼, 태블릿 2 컬럼, 모바일 1 컬럼, gap-8)

## 3개 카드 내용
1. **경영 × 교육의 진짜 융합**
   - 아이콘: lucide Compass (navy 원형 배경)
   - 본문: "경영대학원에 소속되어 경영학 기반 위에 교육학 전문성을 더합니다. 학원·기관 운영의 실무와 학문적 깊이를 모두 갖춥니다."
   
2. **4개 특화 연구실**
   - 아이콘: lucide FlaskConical
   - 본문: "R&E · 학원경영 · AI 테크에듀 · 연구논문 작성 네 가지 LAB에서 자신의 진로에 맞는 깊이 있는 연구를 수행합니다."

3. **현직을 위한 주1일·오전전 트랙**
   - 아이콘: lucide Clock
   - 본문: "평일 목요일 오전 수업(9:00~14:40)으로 현재 직장·사업을 유지하면서 학위를 이수할 수 있습니다."

## 카드 스타일
- 배경: white
- border: 1px solid gray-200
- 라운드: 16px
- 호버: -translate-y-1 + 그림자 강화 (300ms transition)
- 패딩: p-8
- 아이콘 컨테이너: 64px square, bg-primary-50, primary-500 아이콘, rounded-2xl
- 제목: 20px / font-semibold / mt-6
- 본문: 16px / text-gray-600 / leading-relaxed / mt-3 / break-keep

## 인터랙션
- 스크롤 진입 시 카드 순차 페이드인 (stagger 0.15초)
- IntersectionObserver 또는 Framer Motion useInView 사용
```

---

## 7️⃣ LAB 퀵뷰 카드 (4개)

```
4개 LAB을 보여주는 퀵뷰 섹션을 만들어줘. 파일명: components/sections/LabsQuickView.tsx

## 구조
- 섹션: bg-gray-50, py-24
- 상단 헤더:
  - 라벨 "RESEARCH LABS"
  - h2: "4개 특화 연구실에서 미래를 설계하세요"
  - 부제 1줄

## 4개 LAB 카드 (데스크톱 2x2 그리드, 태블릿 2x2, 모바일 1열)
gap-6

각 카드 데이터:
const labs = [
  {
    slug: 'rne',
    name: 'R&E LAB',
    fullName: 'Research & Education LAB',
    tagline: '실무 데이터를 학문으로 잇다',
    description: '교육 현장의 데이터를 연구로 발전시키고, 박사 진학으로 연결되는 학술 깊이를 갖춥니다.',
    image: '/placeholder.svg?height=400&width=600',
    icon: 'FlaskConical',
    color: 'blue'
  },
  {
    slug: 'academy',
    name: '학원경영 LAB',
    fullName: 'Academy Management LAB',
    tagline: '경영의 언어로 학원을 운영하다',
    description: '학원·교육기관의 운영, 마케팅, 재무, 인사 전반을 경영학 프레임으로 재설계합니다.',
    image: '/placeholder.svg?height=400&width=600',
    icon: 'Building2',
    color: 'amber'
  },
  {
    slug: 'ai-tech-edu',
    name: 'AI 테크에듀 LAB',
    fullName: 'AI & Tech Education LAB',
    tagline: 'AI 시대의 학습 설계자',
    description: 'AI 도구의 교육 적용, 에듀테크 제품 기획, 학습 데이터 분석을 깊이 있게 다룹니다.',
    image: '/placeholder.svg?height=400&width=600',
    icon: 'Sparkles',
    color: 'purple'
  },
  {
    slug: 'research-writing',
    name: '연구논문 작성 LAB',
    fullName: 'Academic Writing LAB',
    tagline: '내 경험을 학문으로 만들다',
    description: '석사 논문, 학술지 투고, 박사 진학을 위한 체계적인 학술 글쓰기 훈련을 제공합니다.',
    image: '/placeholder.svg?height=400&width=600',
    icon: 'BookText',
    color: 'green'
  }
];

## 카드 디자인 (큰 가로형, 이미지 좌 + 콘텐츠 우)
- 데스크톱: 카드 내부 좌 50%/우 50% (높이 280px)
- 모바일: 이미지 위, 콘텐츠 아래
- 배경 white, 라운드 20px, overflow-hidden
- subtle border + 호버 시 그림자 강조
- 콘텐츠 영역 패딩 p-8

## 콘텐츠 영역 구성
- 상단: 아이콘 (48px, color별 배경) + LAB 영문명 (작은 캡션)
- 중간: LAB 한글명 (h3, 24px, font-bold)
- 태그라인: 16px, secondary-700, font-medium, mt-2
- 본문: 14px, text-gray-600, mt-3
- 하단: "자세히 보기 →" 링크 (primary, mt-4)

## 호버 인터랙션
- 카드 전체 호버 시:
  - 이미지 영역 scale-105 (overflow-hidden 안에서)
  - "자세히 보기" 화살표 오른쪽 4px 이동
  - 카드 그림자 강조 + 살짝 위로 이동
- transition-all duration-300

## 접근성
- 카드 전체가 클릭 가능 (Link로 감싸기)
- 키보드 포커스 시 outline
```

---

## 8️⃣ 모집 카운트다운 배너

```
원서접수 시작/마감일까지의 카운트다운을 보여주는 배너를 만들어줘. 
파일명: components/sections/AdmissionCountdown.tsx ('use client' 필요)

## 요구사항
- 섹션: bg-primary-900, py-12, 텍스트 white
- 좌측: 
  - 라벨 "ADMISSION 2026 LATE"
  - 제목 "원서접수 마감까지" 또는 "원서접수 시작까지" (날짜에 따라 자동)
  - 부제: "5월 6일 ~ 5월 20일"
- 우측:
  - 4개 박스 (일/시/분/초)
  - 각 박스: 큰 숫자 (48px font-bold) + 라벨 (12px)
  - 박스 사이 콜론(:) 또는 구분선

## Props
interface Props {
  targetDate: string; // ISO format
  startDate?: string;
  endDate?: string;
}

## 로직
- targetDate가 미래면 카운트다운, 지났으면 "원서접수 진행 중" 또는 "접수 종료" 표시
- 1초마다 setInterval로 업데이트, useEffect cleanup
- 클라이언트 hydration 이슈 방지 위해 mounted 상태 사용

## 우측에 CTA
- "원서 접수하러 가기" 버튼 (secondary-500 골드 배경)

## 반응형
- 모바일: 세로 스택, 카운트다운 박스는 가로 유지하되 사이즈 축소
- 데스크톱: 좌우 분할

## 인터랙션
- 숫자 변경 시 살짝 페이드 (선택)
```

---

## 9️⃣ 교수진 슬라이드

```
메인페이지의 "교수진 미리보기" 섹션을 만들어줘. 
파일명: components/sections/FacultyPreview.tsx

## 구조
- 섹션: py-24, bg-white
- 상단 헤더:
  - 라벨 "FACULTY"
  - h2 "현장과 학문을 잇는 교수진"
  - 우측에 "전체 보기 →" 링크
- 가로 스크롤 슬라이드 (또는 그리드)
  - 데스크톱: 4명 가로 배치
  - 태블릿: 3명
  - 모바일: 가로 스와이프 슬라이드 (peek 다음 카드)

## 교수 카드
- 너비: 280px
- 사진: 정사각형 16:9 아니라 1:1, rounded-2xl, overflow-hidden
- 사진 위에 그라데이션 오버레이 (하단에서 위로 navy)
- 사진 위 좌하단에 직위 뱃지 ("주임교수" 등) — secondary 배경, white 텍스트
- 사진 아래:
  - 이름 (18px, font-semibold)
  - 직위 (14px, gray-500)
  - 연구분야 (12px, gray-600, mt-1, 한 줄 ellipsis)

## 호버
- 사진 scale-105
- 카드 전체 라이트 상승

## 더미 데이터 8명
가상의 교수 데이터로 placeholder 채워줘. 사진은 /placeholder.svg?height=400&width=400

## 라이브러리
- 가로 스와이프: embla-carousel-react 사용
- 모바일에서만 carousel, 데스크톱에서는 그리드로 분기

## 접근성
- 각 카드 Link로 /faculty/[id]
- 사진에 alt
- 슬라이드 좌우 화살표 + 키보드 화살표 지원
```

---

## 🔟 최신 소식 위젯

```
메인페이지의 "최신 소식" 섹션을 만들어줘. 파일명: components/sections/LatestNews.tsx

## 구조
- 섹션: py-24, bg-gray-50
- 상단:
  - h2 "최신 소식"
  - 우측 탭: "공지사항" / "갤러리" (활성 탭에 navy underline, useState)
- 카드 그리드:
  - 데스크톱 3컬럼, 태블릿 2컬럼, 모바일 1컬럼
  - 카테고리별 최신 3개씩

## 공지사항 카드
- 배경: white, 패딩 p-6, 라운드 16px
- 상단: 카테고리 뱃지 ("공지" / "학사" / "행사") — outline 스타일
- 제목: h3, 18px, font-semibold, 2줄 ellipsis (line-clamp-2)
- 본문 미리보기: 14px, gray-600, 2줄 ellipsis
- 하단: 날짜 (gray-500, 12px) + 우측 "더보기 →"

## 갤러리 카드
- 이미지 카드 (4:3 비율)
- 호버 시 이미지 scale + 어두운 오버레이 + 타이틀 노출
- 클릭 시 라이트박스 (placeholder)

## 인터랙션
- 탭 전환 시 콘텐츠 페이드 트랜지션 (200ms)
- 카드 호버 시 살짝 상승

## 더미 데이터
공지 5개, 갤러리 6개 더미 데이터로 채워줘.

## 접근성
- 탭에 role="tablist", role="tab", aria-selected
- 키보드 좌우 화살표로 탭 전환
```

---

## 1️⃣1️⃣ 입학 CTA 배너 (Sticky 가능)

```
페이지 하단에 들어갈 "입학 상담 CTA" 배너를 만들어줘. 
파일명: components/sections/AdmissionCTABanner.tsx

## 디자인
- 섹션: 큰 비주얼 배너 (높이 모바일 400px, 데스크톱 480px)
- 배경: bg-primary-900 + 우측에 추상 그래픽 (SVG 또는 그라데이션 블롭)
- 좌측 콘텐츠:
  - 라벨 "GET STARTED"
  - h2: "준비된 사람만이 다음 단계로 나아갑니다."
  - 부제: "지금 무료 입학 상담을 신청하세요. 24시간 내에 답변 드립니다."
  - 버튼 2개:
    - Primary: "입학 상담 신청 →" (golden background)
    - Outline: "1:1 카카오톡 상담" (white border)
- 우측: 
  - 통계 3개 카드 (white/10 backdrop-blur):
    - "200+ 누적 졸업생"
    - "85% 1순위 장학생 수혜"
    - "4개 LAB 운영"

## 인터랙션
- 스크롤 진입 시 페이드인
- 버튼 호버 시 살짝 상승 + 그림자

## 추가 옵션: Sticky 모바일 CTA
- 모바일에서만, 화면 하단에 고정된 mini bar 추가
- "입학 상담" 버튼 + 닫기 X
- 페이지 스크롤 200px 이후 등장
- 이 컴포넌트는 별도 파일 components/ui/StickyMobileCTA.tsx

두 컴포넌트 모두 출력해줘.
```

---

## 1️⃣2️⃣ 모집 일정 타임라인

```
입학안내 페이지의 모집 일정 타임라인 컴포넌트를 만들어줘. 
파일명: components/admissions/AdmissionTimeline.tsx

## 데이터
const schedule = [
  { date: '2026-05-06', phase: 'application_start', title: '원서 접수 시작', icon: 'FileEdit' },
  { date: '2026-05-20', phase: 'application_end', title: '원서 접수 마감', icon: 'FileX' },
  { date: '2026-06-05', phase: 'document_review', title: '서류 심사 결과', icon: 'FileCheck' },
  { date: '2026-06-15', phase: 'interview', title: '면접', icon: 'Users' },
  { date: '2026-07-03', phase: 'result', title: '합격자 발표', icon: 'Trophy' },
  { date: '2026-07-15', phase: 'registration_deadline', title: '등록 마감', icon: 'CheckCircle' }
];

## 디자인
- **데스크톱 (가로 타임라인)**:
  - 6개 노드를 가로로 배치
  - 노드 간 연결선 (현재 진행 중인 단계까지는 secondary-500 골드, 미래는 gray-300)
  - 각 노드:
    - 원형 아이콘 (64px), 현재/완료/미래 상태에 따라 색상 다름
      - 완료: bg-primary-500 + 체크 아이콘 white
      - 현재: bg-secondary-500 + 펄스 애니메이션 + 아이콘 white
      - 미래: bg-white + border-2 primary-200
    - 아이콘 아래: 날짜 (font-medium), 제목 (font-bold)

- **모바일 (세로 타임라인)**:
  - 좌측에 세로 라인 + 노드
  - 우측에 콘텐츠 (날짜, 제목, 추가 설명)
  - 현재 진행 중인 단계는 강조

## 인터랙션
- 노드 호버 시 추가 정보 툴팁 (선택)
- 현재 진행 중 노드: 펄스 애니메이션 (Tailwind animate-ping 활용 또는 Framer Motion)

## 로직
- 오늘 날짜와 비교하여 자동으로 상태 결정
- new Date()로 비교

## 접근성
- 각 단계에 aria-label
- 현재 단계에 aria-current="step"
```

---

## 1️⃣3️⃣ 장학금 안내 카드

```
입학안내 페이지의 장학금 안내 섹션을 만들어줘. 
파일명: components/admissions/ScholarshipCards.tsx

## 데이터
const scholarships = [
  { 
    rank: 1, 
    name: '1순위 장학금', 
    discount: 50, 
    description: '학과 우수 입학자', 
    conditions: ['관련 분야 5년 이상 경력자', '추천서 1부 제출', '...추후 명시'] 
  },
  { 
    rank: 2, 
    name: '2순위 장학금', 
    discount: 30, 
    description: '특별 지원 대상', 
    conditions: ['...추후 명시'] 
  },
  { 
    rank: 3, 
    name: '3순위 장학금', 
    discount: 20, 
    description: '일반 지원자', 
    conditions: ['...추후 명시'] 
  }
];

## 디자인
- 3개 카드 가로 배치 (모바일 세로)
- 1순위 카드는 더 강조 (scale 1.05 + secondary border + "BEST" 라벨)
- 카드 구조:
  - 상단: 큰 할인율 ("50%" 등) — 매우 큰 폰트 (72px), secondary-500 color
  - 라벨: "등록금 감면"
  - 구분선
  - 장학금 이름
  - 설명 1줄
  - 조건 리스트 (체크 아이콘 + 텍스트)
  - 하단: "자세히 보기" 링크

## 카드 스타일
- 1순위: bg-primary-900 + 텍스트 white + 골드 액센트
- 2~3순위: bg-white + border + 텍스트 dark

## 상단에 안내 텍스트
"가천대 에듀컨설팅 전공은 학습 의지와 잠재력을 갖춘 인재에게 폭넓은 장학 혜택을 제공합니다."

## 하단에 면책 문구
"※ 장학금 세부 기준은 모집요강을 우선 적용하며, 매 학기 학사 위원회 심의에 따라 결정됩니다."

## 인터랙션
- 스크롤 진입 시 1순위 → 2순위 → 3순위 순서로 페이드인
- 카드 호버 시 살짝 상승
```

---

## 1️⃣4️⃣ 입학 상담 신청 폼 ⭐️ (가장 중요)

```
입학 상담 신청 폼을 만들어줘. 이 폼은 모집 성과를 좌우하는 가장 중요한 컴포넌트야.
파일명: components/admissions/InquiryForm.tsx ('use client')

## 라이브러리
- react-hook-form
- zod (스키마 검증)
- @hookform/resolvers/zod

## 폼 필드
1. 이름 (필수, 2-20자)
2. 연락처 (필수, 한국 휴대폰 정규식 010-xxxx-xxxx 자동 포맷팅)
3. 이메일 (필수, email 정규식)
4. 관심 LAB (선택, select):
   - 아직 결정하지 못함 / R&E LAB / 학원경영 LAB / AI 테크에듀 LAB / 연구논문 작성 LAB
5. 문의 내용 (선택, textarea, 최대 500자, 글자수 카운터)
6. 개인정보 수집·이용 동의 (필수, checkbox)
   - 동의 문구 클릭 시 모달로 전문 표시
7. 마케팅 정보 수신 동의 (선택, checkbox)

## 디자인
- 좌측 (모바일에서는 상단): 신뢰 강화 영역
  - h2: "입학 상담 신청"
  - 부제: "24시간 내에 운영팀이 연락 드립니다."
  - 체크 리스트 3개:
    ✓ 24시간 이내 답변 약속
    ✓ 무료 1:1 학사 상담
    ✓ 개인정보 안전 보관
  - 통계 또는 졸업생 한 줄 후기 (선택)
  - 연락처: 전화/카카오톡 직접 채널 안내

- 우측 (메인 폼):
  - 흰 배경 카드, shadow-xl, p-8 데스크톱 / p-6 모바일
  - 라운드 24px
  - 각 입력 필드:
    - 라벨 (14px, font-medium, mb-2)
    - shadcn Input/Textarea/Select 사용
    - 에러 메시지 빨간색 + AlertCircle 아이콘, 12px
  - 동의 체크박스:
    - 폼 하단에 배치
    - 필수 동의는 별표 + 빨강
    - "자세히 보기" 링크로 모달
  - 제출 버튼:
    - Full width, size lg, primary-500 background
    - 제출 중 spinner + "전송 중..."
    - 비활성 시 opacity-50

## 검증 스키마 (zod)
const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다").max(20),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "올바른 휴대폰 번호 형식이 아닙니다"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  interestLab: z.string().optional(),
  message: z.string().max(500).optional(),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: "개인정보 수집·이용에 동의해주세요" }) }),
  marketingConsent: z.boolean().optional()
});

## 연락처 자동 포맷팅
- onChange 시 010-xxxx-xxxx 형태로 자동 변환
- 숫자만 입력받기

## 제출 동작
- POST /api/v1/inquiries
- 성공: 폼 영역이 success state로 전환 (체크 아이콘 + "신청이 완료되었습니다!" + "운영팀이 24시간 내 연락드립니다")
- 실패: Toast 에러 메시지 (shadcn Toast)

## reCAPTCHA v3
- 제출 시 reCAPTCHA token 받아서 함께 전송
- 환경변수 NEXT_PUBLIC_RECAPTCHA_SITE_KEY 사용

## 접근성
- 모든 필드에 명확한 라벨 + aria-required
- 에러 메시지 aria-live="polite"
- 키보드 Tab 순서 자연스럽게
- 폼 제출 후 success state에 focus 이동

## 디자인 디테일
- 입력 필드 포커스 시 primary-500 ring + 부드러운 transition
- 채워진 필드는 옅은 secondary-50 배경 (선택)
- 모바일에서 각 필드 사이 간격 충분히 (gap-5)
- 한 손 입력 가능하도록 버튼 큰 사이즈
```

---

## 1️⃣5️⃣ FAQ 아코디언

```
입학안내 페이지의 FAQ 컴포넌트를 만들어줘. 
파일명: components/admissions/FAQAccordion.tsx ('use client')

## 데이터 구조
const faqs = [
  {
    category: '자격 및 지원',
    items: [
      { q: '학사 학위가 없어도 지원 가능한가요?', a: '...' },
      { q: '직장 재직 중에도 학업이 가능한가요?', a: '...' },
      ...
    ]
  },
  {
    category: '학사 운영',
    items: [...]
  },
  {
    category: '학비 및 장학금',
    items: [...]
  },
  {
    category: 'LAB 운영',
    items: [...]
  },
  {
    category: '졸업 및 진로',
    items: [...]
  }
];

각 카테고리별 5~6개씩, 총 25~30개의 그럴듯한 더미 Q&A 작성해줘.

## 구조
- 상단: 검색 input ("FAQ 검색...")
  - 입력 시 실시간 필터링 (q, a 모두 검색)
- 카테고리 탭 (가로 스크롤 가능):
  - 전체 / 자격 및 지원 / 학사 운영 / ...
  - 활성 탭: primary 배경 + white text
  - 비활성: bg-white + border
- 아코디언 리스트:
  - shadcn/ui Accordion 사용
  - 각 아이템: 
    - 클릭하면 부드러운 펼침 (Framer Motion 또는 CSS height 트랜지션)
    - 좌측에 카테고리 작은 라벨 (옵션)
    - 질문: font-semibold
    - 답변: text-gray-600, leading-relaxed, mt-3
    - 우측 +/- 아이콘 (펼침 시 회전)

## 인터랙션
- 검색 시 결과 없으면 "검색 결과가 없습니다" 메시지 + 추천 카테고리
- 검색어 하이라이트 (선택)

## 하단 CTA
"원하는 답을 찾지 못하셨나요?
→ 1:1 입학 상담 신청하기"

## 접근성
- Accordion ARIA 자동 처리 (shadcn)
- 검색 input aria-label
```

---

## 1️⃣6️⃣ 설명회 등록 카드 + 모달

```
설명회 일정을 표시하고 등록을 받는 컴포넌트를 만들어줘. 
파일명: components/admissions/EventsList.tsx + components/admissions/EventRegistrationModal.tsx

## EventsList 디자인
- 섹션 헤더: "입학 설명회 일정"
- 필터: 전체 / 온라인 / 오프라인 (탭)
- 카드 리스트 (1열 세로):

## 각 카드
- 좌측 (모바일에서는 상단):
  - 날짜 박스 (월, 일 큰 표시)
  - "MAY" / "15"
- 중앙 (메인):
  - 상태 뱃지: "모집 중" (green) / "마감 임박" (amber) / "정원 마감" (red)
  - 제목 (18px, font-semibold)
  - 메타 정보 (icon + 텍스트):
    - 시간 (lucide Clock)
    - 장소 또는 "Zoom 온라인" (MapPin/Video)
    - 현재 등록자 / 정원 (Users)
  - 설명 (한 줄)
- 우측 (모바일 하단):
  - "신청하기" 버튼 (마감인 경우 disabled + "정원 마감")

## EventRegistrationModal
- shadcn Dialog 사용
- 폼 필드:
  - 이름, 연락처, 이메일, 참석 방식(온라인일 경우)
  - 개인정보 동의
- 디자인은 InquiryForm과 일관성 유지
- 제출 후: success 메시지 + 캘린더 추가 안내

## 더미 데이터
upcoming 3개, completed 2개

## 인터랙션
- "신청하기" 클릭 시 모달 오픈
- 제출 성공 시 모달 닫고 토스트 "신청 완료. 등록 메일을 확인해주세요"
```

---

## 1️⃣7️⃣ 교수진 카드 그리드

```
교수진 페이지의 카드 그리드를 만들어줘. 파일명: components/faculty/FacultyGrid.tsx

## 구조
- 상단: 페이지 헤더
  - h1 "교수진"
  - 부제: "현장 경험과 학문적 깊이를 모두 갖춘 ..."
- 필터 영역 (모바일에서 collapsible):
  - 직위 필터: 전체 / 주임교수 / 전임 / 겸임/초빙
  - 연구분야 필터: 전체 / 교육경영 / AI/에듀테크 / 학습설계 / ...
  - 검색 input

- 그리드: 데스크톱 4컬럼, 태블릿 3, 모바일 2, gap-6

## 카드 디자인
- 정사각형 사진 (1:1)
- 사진: rounded-2xl + overflow-hidden
- 사진 위 우상단에 직위 뱃지
- 사진 아래:
  - 이름 (18px font-bold)
  - 직위 (14px gray-500)
  - 연구분야 키워드 (12px, 최대 3개, "#" 형태로)
  - 호버 시 "프로필 보기 →" 노출

## 호버 효과
- 사진 zoom + 어두운 오버레이 + "프로필 보기" 노출
- 카드 살짝 상승

## 더미 데이터 12명
- 각각 다른 직위, 연구분야로 다양하게
- 사진은 /placeholder.svg?height=400&width=400

## 접근성
- 카드 전체 Link
- 필터에 aria-label
- 검색 결과 카운트 announcement
```

---

## 1️⃣8️⃣ 교수 상세 페이지

```
교수 상세 페이지를 만들어줘. 파일명: app/faculty/[id]/page.tsx + 관련 컴포넌트

## 레이아웃
좌측 (sticky, 데스크톱 33%, 모바일 풀):
- 큰 사진 (1:1, rounded-3xl)
- 이름 + 영문명
- 직위
- 연구분야 키워드
- 연락 정보 (이메일, 연구실 위치)
- "이메일 보내기" 버튼

우측 (66%, 모바일 하단):
- 탭 네비게이션 (sticky):
  - 소개 / 학력 / 경력 / 연구실적 / 강의과목 / 담당 LAB
- 각 섹션 (탭 또는 anchor 스크롤):

### 소개
- 자기소개 텍스트 (마크다운 렌더링)
- 핵심 연구 관심사

### 학력
- 타임라인 (가장 최근부터)
- 각 항목: 년도, 학위, 학교, 전공

### 경력
- 타임라인
- 학계 경력, 산업 경력 구분

### 연구실적
- 논문 리스트 (저널, 년도, 제목)
- 저서, 프로젝트 분리 탭

### 강의과목
- 카드 형태

### 담당 LAB
- LAB 카드로 링크 (LAB 퀵뷰 카드 재사용)

## 인터랙션
- 탭 클릭 시 부드러운 스크롤
- 우측 스크롤 시 좌측 정보 sticky
- 모바일에서는 탭만, sticky 동작 단순화

## 더미 데이터
한 명의 가상 교수에 대해 풍부한 데이터 채워서 보여줘.

## SEO
- generateMetadata로 동적 메타 태그
- Open Graph 이미지: 사진
- 구조화 데이터(JSON-LD) Person 타입
```

---

## 1️⃣9️⃣ LAB 상세 페이지

```
LAB 상세 페이지를 만들어줘. 파일명: app/labs/[slug]/page.tsx 및 컴포넌트들

## 페이지 구조 (위에서부터)

### Hero 섹션 (LAB 전용)
- 풀폭, 높이 60vh
- 배경: LAB별 컬러 그라데이션 + 배경 이미지 (placeholder)
- 좌측 콘텐츠:
  - 라벨 "RESEARCH LAB"
  - h1: "AI 테크에듀 LAB"
  - 영문명
  - 한 줄 비전: "AI 시대의 학습 설계자를 양성합니다."
- 우측: LAB 아이콘 큰 일러스트 또는 일러스트 이미지

### 책임 교수
- 가로 카드: 사진 + 이름 + 직위 + 짧은 소개 + 프로필 링크
- bg-gray-50

### 연구 주제 (Research Topics)
- 헤더 "이 LAB에서는 무엇을 연구하나요?"
- 3~5개 주제 카드 그리드
- 각 카드: 아이콘 + 주제명 + 1~2문장 설명

### 진행 중인 프로젝트
- 가로 슬라이드 또는 리스트
- 프로젝트명, 기간, 참여자 수, 진행률 (선택)

### 관련 논문/자료
- 리스트 형태
- 다운로드 또는 외부 링크

### 참여 학생 후기
- 카드 슬라이드 (인용구 + 학생 이름 + 학년)
- bg-primary-900 + white 텍스트 강조 섹션

### 갤러리
- 4컬럼 이미지 그리드 (라이트박스)

### CTA
- "이 LAB이 궁금하다면" 
- 입학 상담 / 설명회 신청 CTA

## 디자인
- LAB별로 액센트 컬러를 약간씩 다르게 (PRD 데이터 활용)
- 섹션 간 충분한 여백 (py-20)
- 일관된 섹션 헤더 스타일

## 더미 데이터
"AI 테크에듀 LAB" 기준으로 풍부하게 채워줘.

## SEO
- generateMetadata
- 구조화 데이터: ResearchProject 또는 EducationalOrganization
```

---

## 2️⃣0️⃣ 커리큘럼 표

```
전공 소개 페이지의 커리큘럼 컴포넌트를 만들어줘. 파일명: components/about/CurriculumTable.tsx

## 데이터 구조
const curriculum = {
  common: [
    { code: 'EDU501', name: '교육경영의 이해', credit: 3, semester: '1-1' },
    { code: 'BUS501', name: '경영전략론', credit: 3, semester: '1-1' },
    ...
  ],
  major: [
    { code: 'EDU601', name: 'AI 학습 분석', credit: 3, semester: '1-2', lab: 'ai-tech-edu' },
    ...
  ],
  elective: [...]
};

각 영역 8~10과목씩 작성해줘.

## 디자인 (탭 + 표)
- 탭: 공통과목 / 전공과목 / 선택과목 (각 탭에 과목 수 뱃지)
- 표:
  - 헤더: 과목코드, 과목명, 학점, 학기, 연계 LAB(전공 한정)
  - 정렬: 학기 → 과목코드
  - 행 호버 시 bg-gray-50
  - LAB 컬럼: LAB 색상 도트 + LAB명
- 데스크톱: 표 형태
- 모바일: 카드 형태로 변환 (table 깨짐 방지)

## 추가 정보 박스
- "졸업 요건" 박스 (상단 또는 우측)
  - 총 이수학점, 필수 이수 LAB 수 등 요약

## 인터랙션
- 표 헤더 클릭으로 정렬 (선택)
- 검색/필터 (선택)

## 접근성
- table 의미적 마크업
- 모바일 카드도 적절한 ARIA
```

---

## 2️⃣1️⃣ 게시판 리스트

```
커뮤니티 게시판 리스트 페이지를 만들어줘. 파일명: app/community/[category]/page.tsx + 컴포넌트

## 구조
- 페이지 헤더:
  - h1 카테고리명 (공지사항 / 전공 게시판 / Q&A / 원우회 동정)
  - 부제: 카테고리 설명
- 컨트롤 바:
  - 좌측: 카테고리 탭 또는 sub-filter
  - 우측: 검색 input + "글쓰기" 버튼 (인증된 경우)
- 게시글 리스트

## 게시글 리스트 디자인
- 행 단위 (table 아닌 div 기반):
  - [No.] [상태 뱃지(필요시)] [제목 + 첨부 아이콘] [작성자] [조회수] [날짜]
  - 호버: bg-gray-50
  - 공지/고정 글: 상단 별도 영역, bg-primary-50, 핀 아이콘
- 모바일: 카드 형태
  - 상태 뱃지 + 제목 (2줄 ellipsis)
  - 메타: 작성자 · 날짜 · 조회수
- 페이지네이션 하단

## 더미 데이터 20개
- 일부는 공지(고정)
- 일부는 첨부파일 아이콘 표시
- 일부는 "NEW" 뱃지 (24시간 이내)

## 페이지네이션
- shadcn Pagination 컴포넌트
- 페이지당 10개

## 인터랙션
- 행 클릭 → /community/[category]/[id]
- 검색 시 URL 쿼리 (?q=)
- 정렬 (최신순/조회순) (선택)

## 접근성
- 키보드 Enter로 행 진입
- 검색 결과 카운트 announcement
```

---

## 2️⃣2️⃣ 게시글 상세 + 글쓰기 폼

```
게시글 상세 페이지와 글쓰기 폼을 만들어줘.

## 1) 게시글 상세 (app/community/[category]/[id]/page.tsx)
- 카테고리 breadcrumb
- 제목 (h1, 32px)
- 메타 정보 라인: 작성자 (아바타+이름) · 작성일 · 조회수 · 카테고리
- 본문 영역 (max-w-prose):
  - 마크다운 렌더링 (react-markdown 또는 unified)
  - 첨부파일 리스트 (다운로드 가능)
- 본문 하단:
  - 좋아요 / 공유 버튼 (선택)
  - 본인 글이면 수정/삭제 버튼
- 댓글 영역 (선택, Q&A에서만 활성)
  - 댓글 리스트 (트리 구조)
  - 댓글 작성 폼
- 하단 네비게이션: "이전 글 | 목록으로 | 다음 글"

## 2) 글쓰기/수정 폼 (components/community/PostForm.tsx, 'use client')
- 라이브러리: react-hook-form + zod
- 필드:
  - 카테고리 선택 (Select)
  - 제목 (input)
  - 본문 (마크다운 에디터 — @uiw/react-md-editor 또는 textarea + 미리보기 탭)
  - 첨부파일 (드래그&드롭, 다중)
  - 공개 설정 (전체 / 회원만)
- 버튼: 임시저장 / 발행
- 임시저장은 localStorage 활용
- 발행 시: POST /api/v1/posts → 성공 시 /community/[category]/[newId] 이동

## 인증 처리
- 인증 안 된 사용자에게는 글쓰기 진입 차단
- 401 시 로그인 페이지로 redirect (callbackUrl)

## 접근성
- 모든 폼 필드 라벨
- 마크다운 에디터 키보드 단축키 안내
```

---

## 2️⃣3️⃣ 갤러리 그리드 + 라이트박스

```
갤러리 페이지를 만들어줘. 파일명: app/community/gallery/page.tsx + components/community/Gallery.tsx ('use client')

## 데이터
const galleries = [
  {
    id: '1',
    title: '2026년 봄 LAB 워크숍',
    description: '...',
    date: '2026-03-15',
    category: 'workshop',
    images: ['/placeholder.svg?height=600&width=800', ...]
  },
  ...
];

12개 정도 더미 작성. 각 갤러리는 1~5장의 이미지.

## 그리드 디자인
- Masonry 또는 정렬된 그리드
- 데스크톱 3컬럼, 태블릿 2, 모바일 1
- 각 카드:
  - 대표 이미지 (16:9)
  - 호버 시 어두운 오버레이 + 제목 + 날짜
  - 이미지가 여러 장이면 우상단에 "+3" 표시
- 카드 클릭 시 라이트박스 오픈

## 필터
- 카테고리 탭: 전체 / 행사 / 워크숍 / 졸업식 / 일상
- 연도 필터 (선택)

## 라이트박스
- 라이브러리: yet-another-react-lightbox 또는 자체 구현
- ESC, 좌우 화살표 키보드 지원
- 다중 이미지 시 캐러셀
- 모바일 스와이프 지원
- 이미지 다운로드 버튼 (옵션)

## 접근성
- 모든 이미지 alt
- 라이트박스 ARIA (role="dialog", aria-modal)
- 키보드 트랩
```

---

## 2️⃣4️⃣ 검색 페이지

```
통합 검색 페이지를 만들어줘. 파일명: app/search/page.tsx

## 구조
- 상단: 검색 input (큰 사이즈)
  - URL 쿼리(?q=)와 동기화
  - 자동 포커스
- 결과 요약: ""교육경영" 검색 결과 24건"
- 카테고리 탭:
  - 전체 / 공지 / 게시판 / 교수진 / LAB / Q&A
  - 각 탭에 결과 수 뱃지
- 결과 리스트:
  - 각 결과 카드:
    - 카테고리 뱃지
    - 제목 (검색어 하이라이트 — mark 태그)
    - 본문 미리보기 (검색어 주변 컨텍스트, 50자 ± 키워드)
    - 메타 (날짜, 작성자 등)
  - 카드 클릭 → 해당 상세 페이지
- 결과 없음 상태:
  - 일러스트 + "검색 결과가 없습니다"
  - 추천 카테고리/키워드

## API
- GET /api/v1/search?q=&type=
- debounce 300ms로 자동 검색 (선택)

## 디자인
- 각 카테고리별 결과 상위 5개씩 미리보기 + "더보기"
- 또는 탭별로 분리

## 접근성
- aria-live로 결과 변경 알림
- 검색 input aria-label
```

---

## 2️⃣5️⃣ 어드민 대시보드

```
관리자 대시보드 페이지를 만들어줘. 
파일명: app/admin/page.tsx + components/admin/dashboard/*

## 사전 조건
- /admin 하위는 NextAuth 미들웨어로 admin 권한 검증
- 미들웨어 파일도 함께 생성: middleware.ts

## 대시보드 레이아웃
- 좌측 사이드바 (data-driven, sticky):
  - 로고/타이틀 "에듀컨설팅 ADMIN"
  - 메뉴:
    - 대시보드 (LayoutDashboard)
    - 상담 관리 (MessageCircle) — 미처리 건수 뱃지
    - 설명회 (Calendar)
    - 게시글 (FileText)
    - 교수진 (Users)
    - LAB 관리 (FlaskConical)
    - 사이트 설정 (Settings)
    - 감사 로그 (Shield)
  - 하단: 사용자 정보 + 로그아웃
- 상단 바: 페이지 제목 + 검색 + 알림 + 프로필 드롭다운
- 메인 영역: bg-gray-50, p-8

## 대시보드 콘텐츠

### 상단 통계 카드 4개 (가로)
- 신규 상담 (지난 7일): 숫자 + 전주 대비 % (증가/감소 아이콘)
- 신규 설명회 등록 (지난 7일)
- 일간 UV (어제)
- 평균 응답 시간 (시간 단위)

각 카드:
- 라벨 + 큰 숫자 + 변화율
- 우상단에 아이콘

### 그래프 영역 (2 컬럼)
- 좌측: 일별 상담 추이 (최근 30일) — Line Chart (recharts)
- 우측: 트래픽 소스 도넛 차트 (네이버/구글/직접/SNS)

### 하단 (2 컬럼)
- 좌측: 최근 상담 신청 5개 리스트 (우측 "전체 보기 →")
- 우측: 인기 페이지 TOP 5

### 알림 / 할 일
- 우측에 alert 박스: "미답변 Q&A 3건 · 마감 임박 설명회 1건"

## 디자인
- shadcn/ui 기반
- 카드: bg-white, rounded-xl, shadow-sm, p-6
- 폰트 명료, 데이터 가시성 우선
- 차트 컬러: navy + secondary + 보조 컬러

## 접근성
- 사이드바 키보드 네비게이션
- 차트 데이터 표 대체 제공 (선택)
- 알림 aria-live

## 더미 데이터로 풍부하게 채워줘.
```

---

## 2️⃣6️⃣ 상담 관리 테이블

```
어드민의 상담 관리 페이지를 만들어줘. 
파일명: app/admin/inquiries/page.tsx + components/admin/InquiriesTable.tsx

## 상단 컨트롤
- 필터:
  - 상태: 전체 / 대기 / 진행중 / 완료 / 종료 (탭)
  - 기간: Date Range Picker
  - 담당자: Select (관리자 목록)
  - 관심 LAB: Select
- 검색: 이름 / 연락처 / 이메일
- 우측: "CSV 내보내기" 버튼

## 테이블
- 컬럼:
  - 체크박스 (다중 선택)
  - 신청일시
  - 이름
  - 연락처 (마스킹: 010-****-1234)
  - 이메일
  - 관심 LAB
  - 상태 (뱃지)
  - 담당자 (Avatar + 이름)
  - 응답 시간 (대기일 경우 경과 시간)
  - 액션 (점 3개 메뉴)
- 행 클릭 시 우측 슬라이드 패널 오픈 (상세 보기)
- 정렬: 신청일시 기본 desc

## 슬라이드 패널 (상세)
- 신청자 전체 정보 (전화번호 평문 노출 — 권한 확인)
- 문의 내용 전문
- 동의 항목 확인
- IP, source 정보 (관리자만)
- 상태 변경 드롭다운
- 담당자 변경
- 메모 영역 (markdown 입력 가능)
- 응답 이력 (메모 + 타임스탬프)
- "고객에게 이메일 발송" 버튼 (템플릿 선택)

## 다중 액션
- 체크박스 선택 후:
  - 상태 일괄 변경
  - 담당자 일괄 배정
  - CSV 내보내기

## 페이지네이션
- 페이지당 20개

## 접근성
- 테이블 키보드 탐색
- 슬라이드 패널 모달 ARIA
- 상태 변경 announcement

## 보안
- 전화번호 표시는 권한별 차등 (마스킹 vs 평문)
- 모든 변경은 AdminAuditLogs에 기록 (서버 측)

## 더미 데이터 30개 (다양한 상태로)
```

---

## 📎 부록 A: v0 활용 팁

1. **첫 메시지에 반드시 "1번 전역 컨텍스트" 프롬프트 전체를 붙여 넣으세요.** 이후 컴포넌트 요청은 짧게 해도 컨텍스트가 유지됩니다.

2. **v0에서 만든 컴포넌트는 즉시 "Copy to Code" 후 로컬 프로젝트에 붙여 넣고 빌드를 확인하세요.** 의존성(framer-motion, embla-carousel 등) 누락 가능성이 있습니다.

3. **이미지 placeholder는 차후 일괄 교체**:
   - `/placeholder.svg?height=600&width=800` 패턴을 사용했으므로 실제 이미지로 교체 시 grep으로 찾기 쉽습니다.

4. **shadcn/ui는 CLI로 먼저 설치**:
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button card input textarea select dialog accordion tabs toast badge avatar
   ```

5. **수정 요청 패턴**:
   - ✅ "Hero의 헤드라인 색상을 골드로 변경하고, 서브카피 크기를 한 단계 키워줘"
   - ❌ "더 예쁘게 만들어줘" (모호함)

6. **다크모드는 1차 출시 제외이므로**, v0에서 다크모드 토글이 자동 생성되면 제거하세요.

7. **API 연결 단계 (FE 완성 후)**:
   - 더미 데이터를 `lib/mock-data.ts`로 분리
   - 추후 `lib/api/*.ts`로 교체
   - TanStack Query로 캐싱·로딩 상태 관리 통일

---

## 📎 부록 B: Cursor 활용 팁 (코드베이스 연속 작업)

1. **`.cursorrules` 파일 생성** — 1번 전역 컨텍스트의 핵심 부분을 정리해서 프로젝트 루트에 두면 모든 채팅에 자동 적용됩니다.

2. **@-mention 적극 활용**:
   - `@PRD.md` — PRD 문서 참조
   - `@components/sections/Hero.tsx` — 기존 컴포넌트 참조
   - `@types/index.ts` — 타입 일관성 유지

3. **Composer 모드 (Cmd+I)**로 여러 파일을 한 번에 생성/수정하세요.

4. **테스트 코드 자동 생성**: 컴포넌트 작성 후 "이 컴포넌트의 테스트 코드(Vitest + Testing Library)를 작성해줘" 요청.

---

## 📎 부록 C: 개발 순서 권장 로드맵

```
[Day 1-2]  프롬프트 #1, #2 — 셋업 + 디자인 토큰
[Day 3]    프롬프트 #3, #4 — Header + Footer
[Day 4-6]  프롬프트 #5-#11 — 메인 페이지 전체
[Day 7-9]  프롬프트 #12-#16 — 입학 안내 페이지 (가장 중요)
[Day 10-11] 프롬프트 #17-#18 — 교수진
[Day 12-13] 프롬프트 #19-#20 — LAB + 커리큘럼
[Day 14-15] 프롬프트 #21-#23 — 커뮤니티
[Day 16]   프롬프트 #24 — 검색
[Day 17-19] 프롬프트 #25-#26 — 어드민 (병행 가능)
[Day 20-]  API 연결 → 콘텐츠 입력 → QA
```

---

**[문서 종료]**

> 추가 컴포넌트(설명회 후기 슬라이드, 챗봇 UI, 자가 진단 도구 등)나 프롬프트 개선이 필요하시면 알려주세요.
