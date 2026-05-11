# 가천대학교 경영대학원 에듀컨설팅 전공 공식 홈페이지

## 제품 요구사항 정의서 (PRD v2.0)

---

### 📋 문서 정보

| 항목 | 내용 |
|---|---|
| **문서 버전** | v2.0 |
| **최종 수정일** | 2026-05-11 |
| **문서 상태** | Draft for Review |
| **대상 독자** | 기획자, 디자이너, 프론트엔드/백엔드 개발자, 학과 운영진 |
| **선행 문서** | PRD v1.0 |
| **후속 문서** | UI 디자인 시스템 명세서, API 스펙(OpenAPI), DB ERD, 와이어프레임 |

---

## 1. 프로젝트 개요

### 1.1 프로젝트명
가천대학교 경영대학원 에듀컨설팅 전공 공식 홈페이지 구축

### 1.2 배경
2026학년도 후기 신입생 모집(원서접수 5/6~, 합격발표 7/3)을 위한 핵심 마케팅 자산이자, 전공 정체성·교수진 역량·동문 네트워크를 일관되게 전달하는 디지털 허브를 구축한다.

### 1.3 비전
"교육과 경영의 융합을 통해 교육 산업의 다음 세대 리더를 양성하는 대한민국 대표 에듀컨설팅 전공"

### 1.4 미션
- 교육 산업 종사자에게 **전공의 가치와 차별성**을 명확히 전달한다
- 잠재 지원자가 **24시간 내 의사결정에 필요한 정보**를 얻을 수 있도록 한다
- 재학생·동문이 **자부심을 느끼는 디지털 공간**으로 기능한다
- 교수진과 LAB의 **연구·교육 성과**를 효과적으로 외부에 공유한다

### 1.5 프로젝트 범위 (Scope)

**In Scope (포함)**
- 반응형 웹사이트(데스크톱·태블릿·모바일)
- 콘텐츠 관리 시스템(CMS) 어드민
- 입학상담·설명회 등록 폼 및 관리 패널
- 게시판(공지, 원우회, 갤러리, Q&A)
- 분석·SEO 인프라

**Out of Scope (제외 — 추후 단계)**
- 네이티브 모바일 앱
- 학사관리 시스템(LMS) 연동
- 결제 시스템
- 실시간 화상 강의 플랫폼

---

## 2. 비즈니스 목표 및 성공 지표 (KPI)

### 2.1 비즈니스 목표
1. **2026학년도 후기 모집 정원의 110% 이상 지원자 확보**
2. **전공 인지도 향상** — 검색 트래픽으로 측정
3. **재학생·동문 결속 강화** — 커뮤니티 활성도로 측정

### 2.2 KPI 매트릭스

| 단계 | 지표 | 측정 도구 | 목표 (모집기간 2개월 기준) |
|---|---|---|---|
| **인지** | 월간 순방문자(UV) | GA4 | 3,000명+ |
| **인지** | 검색 노출(Impression) | Naver/Google Search Console | 50,000회+ |
| **인지** | 평균 세션 시간 | GA4 | 2분 30초+ |
| **관심** | 모집요강 PDF 다운로드 | GA4 이벤트 | 500건+ |
| **관심** | LAB 페이지 평균 방문 깊이 | GA4 | 페이지뷰/세션 3+ |
| **관심** | 설명회 등록 | DB | 100명+ |
| **전환** | 입학상담 신청 | DB | 80건+ |
| **전환** | 상담→원서접수 전환율 | DB + 모집 결과 매칭 | 30%+ |
| **유지** | 게시판 월간 활성 사용자 | DB | 재학생 50%+ |
| **품질** | Lighthouse Performance | Lighthouse | 90+ |
| **품질** | 핵심 페이지 LCP | Web Vitals | 2.5초 이하 |

### 2.3 측정 주기
- **일간 대시보드**: UV, 상담신청, 설명회 등록
- **주간 리뷰**: 트래픽 소스, 페이지별 이탈률, CTA 클릭률
- **모집 종료 후**: 전체 전환 깔때기 회고

---

## 3. 사용자 분석

### 3.1 페르소나

#### 페르소나 1: "이수진" — 학원 경영자
- **연령/직업**: 39세, 중형 입시학원 부원장(원생 200명 규모)
- **경력**: 강사 12년 → 부원장 3년
- **핵심 페인포인트**:
  - 학원 운영 데이터를 직관에 의존하여 의사결정
  - AI·에듀테크 도입 압박은 받지만 전략 부재
  - 동종업계 네트워크가 강사 중심에 머물러 있음
- **의사결정 기준**: ① 실무 적용 가능성 ② 야간·주말 수업 ③ 동문 네트워크 ④ 학비 대비 효과
- **사이트에서 찾는 정보**: 커리큘럼 실용성, 학원경영 LAB 성과, 동문 진로, 야간 수업 여부

#### 페르소나 2: "박민호" — 에듀테크 기획자
- **연령/직업**: 33세, 에듀테크 스타트업 PM
- **경력**: 마케팅 4년 → 교육콘텐츠 기획 3년
- **핵심 페인포인트**:
  - 교육학 이론 기반 부재로 PMF 검증에 한계
  - AI 도구 활용은 능숙하나 학습설계 원리 부족
  - 이직·창업 옵션을 위한 학력 보강 필요
- **의사결정 기준**: ① AI 테크에듀 LAB 깊이 ② 연구 환경 ③ 졸업 후 진로 다양성
- **사이트에서 찾는 정보**: AI 테크에듀 LAB 연구주제, 교수 연구 실적, 논문 작성 지원

#### 페르소나 3: "최영아" — 진로진학 컨설턴트
- **연령/직업**: 45세, 프리랜서 진로진학 컨설턴트
- **경력**: 고교 교사 15년 → 컨설팅 8년
- **핵심 페인포인트**:
  - 자격증·경력만으로 차별화 한계
  - 박사과정 또는 R&E 역량으로 전문성 강화 필요
  - 컨설팅 사업 확장을 위한 이론·연구 기반 부재
- **의사결정 기준**: ① R&E LAB의 학술 깊이 ② 박사 진학 가능성 ③ 교수와의 연구 협업
- **사이트에서 찾는 정보**: R&E LAB, 논문 작성 LAB, 교수 연구 분야, 박사 진학 트랙

#### 페르소나 4: "김태우" — 교육 분야 창업 준비자
- **연령/직업**: 36세, 대기업 HRD 6년 차, 창업 준비 중
- **핵심 페인포인트**: 교육 사업 도메인 전문성과 경영 역량을 동시에 확보 필요
- **의사결정 기준**: 사업화 가능성, 멘토링, 교수진 산학 네트워크

### 3.2 사용자 여정 (User Journey)

```
[1] 인지(Awareness)
    └─ 네이버/구글 검색 → 블로그 → 카카오톡 추천
       │
       ▼
[2] 첫 방문(First Visit)
    └─ 메인 → Hero 카피 → LAB 카드 클릭
       │
       ▼
[3] 탐색(Exploration)
    └─ LAB 상세 → 교수진 → 커리큘럼 → 장학금
       │   (이 지점에서 60% 이상이 이탈 — 최우선 개선 대상)
       ▼
[4] 검증(Validation)
    └─ FAQ → 동문 후기 → 갤러리 → 설명회 일정
       │
       ▼
[5] 행동(Action)
    └─ 입학상담 신청 / 설명회 등록 / 모집요강 다운로드
       │
       ▼
[6] 전환(Conversion)
    └─ 24시간 내 운영진 회신 → 원서접수 → 합격
```

### 3.3 전환 깔때기(Conversion Funnel)

| 단계 | 목표 비율 | 핵심 장치 |
|---|---|---|
| 방문 → LAB 페이지 진입 | 50% | Hero 하단 LAB 카드 4종 |
| LAB → 교수진/커리큘럼 | 40% | 사이드바 빠른 이동 |
| 정보 페이지 → 입학안내 | 30% | 페이지 하단 Sticky CTA |
| 입학안내 → 상담신청 폼 시작 | 20% | 폼 상단 신뢰 요소(졸업생 후기) |
| 폼 시작 → 폼 완료 | 70% | 3필드 이내, 모바일 최적화 |

---

## 4. 차별화 전략 및 핵심 메시지

### 4.1 경쟁 환경 분석

| 경쟁 프로그램 | 강점 | 약점 (가천대 기회) |
|---|---|---|
| 연세대 교육대학원 | 브랜드, 동문 | 교육행정 중심, 경영 약함 |
| 한양대 교육공학 | 테크 중심 | 경영 융합 부족 |
| 사이버대 교육경영 | 접근성 | 학위 가치, 연구 환경 약함 |

### 4.2 차별화 5대 메시지 (사이트 카피 전반에 일관 반영)

1. **"경영과 교육의 진짜 융합"** — 경영대학원 소속으로 경영학 기반 위에 교육학 전문성
2. **"4개 특화 LAB"** — R&E / 학원경영 / AI 테크에듀 / 연구논문 작성
3. **"현직 전문가를 위한 야간·주말 트랙"** — 풀타임 경력 유지 가능
4. **"실무 데이터 기반 연구"** — 자기 사업·기관 데이터를 논문화하는 R&E 프로그램
5. **"AI 시대 교육 리더 양성"** — 단순 강의가 아닌 AI 도구 활용 실습

### 4.3 핵심 카피 후보 (Hero 섹션)
- A안: "**교육을 경영하라, 미래를 설계하라**"
- B안: "**데이터로 가르치고, 데이터로 성장한다**"
- C안: "**가르치는 사람의 다음 단계, 에듀컨설팅**"
- *최종안 A/B 테스트로 결정 권장*

---

## 5. 정보 구조 (IA) 및 사이트맵

```
홈 (Home)
├── 전공 소개
│   ├── 인사말
│   ├── 비전 및 목표
│   ├── 커리큘럼
│   └── 학사 운영 안내
├── 교수진
│   ├── 전임 교수
│   └── 겸임/초빙 교수
├── 연구실 (LAB)
│   ├── R&E LAB
│   ├── 학원경영 LAB
│   ├── AI 테크에듀 LAB
│   └── 연구논문 작성 LAB
├── 입학 안내
│   ├── 모집요강
│   ├── 모집 일정
│   ├── 장학금 안내
│   ├── 입학 상담 신청
│   ├── 설명회 안내·등록
│   └── FAQ
├── 커뮤니티
│   ├── 공지사항
│   ├── 전공 게시판
│   ├── Q&A
│   ├── 원우회 동정
│   └── 갤러리
├── 자료실
│   ├── 모집요강 PDF
│   ├── 교수 연구 자료
│   └── 학과 소식지
├── 검색
└── 관리자 (별도 경로 /admin)
```

### 5.1 URL 정책
- 한국어 슬러그 대신 영문 슬러그 사용: `/labs/ai-tech-edu`, `/admissions/scholarships`
- 모든 URL은 kebab-case
- 게시글 URL: `/community/notice/[id]-[slug]`

---

## 6. 페이지별 기능 요구사항

### 6.1 우선순위 (MoSCoW)
- **M (Must)** — 1차 출시(MVP)에 필수
- **S (Should)** — 1차 출시에 포함이 강력 권장
- **C (Could)** — 2차 출시에 포함
- **W (Won't)** — 이번 사이클에서는 제외

### 6.2 메인 페이지 (Home) — M

| 섹션 | 요구사항 | 우선순위 |
|---|---|---|
| Top Navigation | 로고, 주메뉴 6개, 검색 아이콘, 입학상담 CTA | M |
| Hero 섹션 | 풀스크린 배경(영상 또는 이미지), 헤드라인, 서브카피, CTA 2종(상담/모집요강) | M |
| 핵심 가치 3종 | 아이콘 + 짧은 카피로 차별점 강조 | M |
| LAB 퀵뷰 | 4개 LAB 카드(이미지·1줄 소개·하단 화살표), 호버 시 확대 | M |
| 모집 카운트다운 | 원서접수 시작/마감일까지 D-Day | S |
| 교수진 슬라이드 | 프로필 카드 가로 스크롤 | S |
| 최신 소식 | 공지 3건 + 갤러리 3건 카드 형태 | M |
| 동문/재학생 인터뷰 | 영상 또는 인용구 슬라이드 | C |
| 입학 CTA 배너 | 페이지 하단 Sticky 또는 고정 섹션 | M |
| Footer | 학과 정보, SNS, 약관, 개인정보처리방침 | M |

### 6.3 전공 소개 — M
- 인사말(주임교수 사진·서명·영상 옵션)
- 비전·미션 다이어그램
- 커리큘럼 표(공통과목/전공과목 × 학점/학기)
- 졸업 요건·학위 요건
- 야간·주말 운영 시간표

### 6.4 교수진 페이지 — M
- 카드 그리드(사진·이름·직위·연구분야·이메일)
- 상세 페이지: 학력, 경력, 연구실적(논문·저서·프로젝트), 강의과목, 담당 LAB
- 검색·연구분야 필터

### 6.5 LAB 페이지 — M
- 각 LAB 공통 구조:
  - Hero(LAB명·짧은 비전)
  - 책임 교수 프로필
  - 연구 주제 3~5개
  - 진행 중인 프로젝트
  - 갤러리(세미나·워크숍)
  - 관련 논문/자료
  - 참여 학생 소개(선택 동의자)
  - 문의 CTA

### 6.6 입학 안내 — M (★ 가장 중요)

#### 6.6.1 모집 일정 타임라인 (M)
인터랙티브 타임라인 컴포넌트로 표시. 모바일에서는 세로 타임라인.

```
2026/05/06 ─────● 원서 접수 시작
2026/05/20 ─────● 원서 접수 마감
2026/06/05 ─────● 서류 심사 결과
2026/06/15 ─────● 면접
2026/07/03 ─────● 합격자 발표
2026/07/15 ─────● 등록 마감
```

#### 6.6.2 장학금 안내 (M)
| 순위 | 감면율 | 자격 요건 |
|---|---|---|
| 1순위 | 50% | 추후 명시 |
| 2순위 | 30% | 추후 명시 |
| 3순위 | 20% | 추후 명시 |

#### 6.6.3 입학 상담 신청 폼 (M)
- 필드: 이름(필수), 연락처(필수), 이메일(필수), 관심 LAB(선택), 문의 내용(선택)
- 필수 필드 최소화 (3개 이내)
- 개인정보 수집·이용 동의(필수), 마케팅 활용 동의(선택)
- 제출 후 자동 회신 이메일 발송
- reCAPTCHA v3 적용

#### 6.6.4 설명회 등록 (S)
- 설명회 일정 리스트(온라인/오프라인 표시)
- 등록 폼: 이름, 연락처, 이메일, 참석 방식
- 등록 완료 시 캘린더 .ics 파일 첨부 메일

#### 6.6.5 FAQ (M)
- 아코디언 UI
- 카테고리: 자격/지원, 학사, 학비/장학금, LAB, 졸업/진로
- 검색 가능
- 최소 30개 항목 준비

### 6.7 커뮤니티 — M
- 공지(읽기전용 일반인, 쓰기 관리자)
- 전공 게시판(읽기 일반인, 쓰기 재학생/관리자)
- Q&A(쓰기 누구나, 답변 관리자)
- 원우회 동정(쓰기 원우회 임원·관리자)
- 갤러리(이미지 그리드, 라이트박스)

### 6.8 검색 페이지 — S
- 전체/공지/게시판/교수진/LAB 탭별 검색
- 검색어 하이라이트
- 페이지네이션

### 6.9 어드민 페이지 — M
- 대시보드(상담신청 건수, 설명회 등록, 트래픽 요약)
- 콘텐츠 관리(공지/게시판/갤러리 CRUD)
- 상담신청 관리(상태 변경, 응답 메모)
- 설명회 관리
- 사용자/권한 관리
- 배너/팝업 관리

---

## 7. UX/UI 디자인 요구사항

### 7.1 디자인 원칙
1. **신뢰성(Trustworthy)** — 교육기관 권위감
2. **전문성(Professional)** — 학원 사이트가 아닌 대학원
3. **실용성(Practical)** — 핵심 정보로 빠르게 도달
4. **현대성(Modern)** — AI 시대의 교육 리더 이미지

### 7.2 디자인 시스템

#### 7.2.1 컬러 팔레트
```
Primary (Gachon Navy)
  navy-50:  #E8EEF5
  navy-100: #C7D3E5
  navy-300: #6F8AB3
  navy-500: #002C62  ← Brand Primary
  navy-700: #001E45
  navy-900: #000F22

Secondary (Accent Gold — 학위 권위감)
  gold-500: #C9A86A
  gold-700: #8E7544

Neutral
  gray-50:  #F8F9FA
  gray-100: #E9ECEF
  gray-300: #CED4DA
  gray-500: #6C757D
  gray-700: #343A40
  gray-900: #0E1116

Semantic
  success: #10B981
  warning: #F59E0B
  error:   #EF4444
  info:    #3B82F6
```

#### 7.2.2 타이포그래피
- 한글 본문: **Pretendard Variable** (300/400/500/600/700)
- 영문/숫자: **Inter** 또는 Pretendard와 통합
- 스케일 (모바일 기본):
  - H1: 32/40px → 데스크톱 48/56px, weight 700
  - H2: 24/32px → 데스크톱 36/44px, weight 700
  - H3: 20/28px → 데스크톱 28/36px, weight 600
  - Body: 16/24px, weight 400
  - Caption: 14/20px, weight 400

#### 7.2.3 간격 시스템
4px 그리드 (`space-1 = 4px, space-2 = 8px, ...`)

#### 7.2.4 컴포넌트 라이브러리
- **shadcn/ui** 베이스 + 브랜드 토큰 오버라이드
- 표준 컴포넌트:
  - Button (primary / secondary / ghost / link × sm/md/lg)
  - Input, Textarea, Select, Checkbox, RadioGroup
  - Card, Badge, Avatar
  - Modal, Drawer, Tooltip, Popover
  - Tabs, Accordion, Pagination
  - Toast(알림)
  - Skeleton(로딩)

#### 7.2.5 그림자·라운드
- 라운드: `4px / 8px / 12px / 16px` 4단계
- 그림자: `subtle / default / elevated / dramatic` 4단계

### 7.3 반응형 브레이크포인트
| 디바이스 | 너비 | 비고 |
|---|---|---|
| Mobile | 360–767px | **모바일 우선 설계** |
| Tablet | 768–1023px | |
| Desktop | 1024–1439px | |
| Large Desktop | 1440px+ | 최대 콘텐츠 너비 1280px |

### 7.4 접근성 (Accessibility)
- **목표**: WCAG 2.1 AA, KWCAG 2.2 준수
- 본문 명도 대비 4.5:1 이상
- 모든 인터랙티브 요소 키보드 접근 가능
- `<img>` alt 텍스트 필수
- 폼 라벨·에러 메시지 ARIA 연결
- 동영상 자막 제공
- 색상에만 의존하지 않는 정보 전달
- **Focus visible** 명확히
- 스킵 네비게이션 링크
- 모집 종료 후 WA 인증 신청 검토

### 7.5 모션·인터랙션
- **원칙**: 의미 있을 때만, 200~300ms 이내
- 페이지 전환: Fade 또는 Subtle Slide
- 스크롤 진입 시: 카드 페이드인 (Intersection Observer)
- 호버: 카드 상승 효과(translateY -4px + 그림자 강화)
- 폼 입력: 부드러운 라벨 플로팅
- **prefers-reduced-motion** 사용자에게는 모션 최소화
- 라이브러리: Framer Motion 또는 CSS-only

### 7.6 다크 모드
- **1차 출시 미포함** (W), 시스템 우선순위 낮음

### 7.7 다국어
- **1차 출시 한국어 단일**
- 영어 버전 2차 검토 (외국인 지원자 유입 시)

---

## 8. 기술 스택 및 아키텍처

### 8.1 권장 기술 스택

| 영역 | 선택 | 사유 |
|---|---|---|
| Frontend Framework | **Next.js 14+ (App Router)** | SSR/SSG로 SEO 우수, 대부분 개발자 친숙 |
| 언어 | **TypeScript** | 타입 안정성, 협업 효율 |
| 스타일링 | **Tailwind CSS** | 빠른 개발, 디자인 토큰 관리 용이 |
| 컴포넌트 라이브러리 | **shadcn/ui** | 커스터마이징 자유, Tailwind 친화 |
| 상태관리 | **Zustand**(클라이언트) + **TanStack Query**(서버) | 가볍고 학습 비용 낮음 |
| Form | **React Hook Form + Zod** | 검증 일원화 |
| 애니메이션 | **Framer Motion** | |
| Backend | **Next.js API Routes** (1차) → 필요 시 분리 | 단일 레포 운영 효율 |
| ORM | **Prisma** | 마이그레이션·타입 자동 생성 |
| Database | **PostgreSQL** (Supabase 호스팅) | 관계형, JSONB로 유연성 확보 |
| 인증 | **NextAuth.js** (Credentials + Kakao/Google 옵션) | |
| 파일 저장 | **Supabase Storage** 또는 AWS S3 | |
| 이메일 | **Resend** | 한국에서 안정적, 템플릿 관리 편함 |
| 캡차 | **reCAPTCHA v3** + **Cloudflare Turnstile** 옵션 | |
| 검색 | **PostgreSQL Full-Text Search** (1차), **Meilisearch** (2차) | |
| 호스팅 | **Vercel**(프론트) + **Supabase**(DB/Storage) | 빠른 출시, 한국 엣지 |
| CDN | Vercel Edge Network | |
| 도메인 | 가천대 서브도메인 또는 별도 도메인 (운영진 결정) | |
| 분석 | **GA4** + **Naver Analytics** + **Microsoft Clarity** | 한국+글로벌 커버 |
| 에러 추적 | **Sentry** | |
| Repo/CI | **GitHub** + **GitHub Actions** | |

### 8.2 아키텍처 다이어그램

```
[방문자 브라우저]
        │
        ▼
[Vercel Edge (CDN + Next.js SSR)]
        │
        ├──► [Next.js API Routes]
        │         │
        │         ├──► [Supabase PostgreSQL]
        │         ├──► [Supabase Storage]
        │         ├──► [Resend Email]
        │         └──► [reCAPTCHA]
        │
        └──► [Naver/Google Crawler]
                  │
                  └──► [Sitemap.xml / robots.txt]

[관리자] ──► [/admin Routes (NextAuth Guard)]
                  │
                  └──► [Admin API → DB/Storage]

모니터링: Sentry, GA4, Naver Analytics, Clarity
```

### 8.3 환경 구성
- `development` — 로컬 + Supabase 개발 프로젝트
- `staging` — Vercel Preview + Supabase 스테이징
- `production` — Vercel Production + Supabase Production
- 환경 변수: `.env.local` (gitignore), Vercel 환경 변수, Supabase Vault(시크릿)

### 8.4 성능 목표 (Web Vitals)
- **LCP** (Largest Contentful Paint) ≤ 2.5초
- **INP** (Interaction to Next Paint) ≤ 200ms
- **CLS** (Cumulative Layout Shift) ≤ 0.1
- **Lighthouse Performance** ≥ 90 (모바일)
- **번들 크기** 초기 JS ≤ 200KB (gzip)

---

## 9. 데이터 모델 (Database Schema)

### 9.1 ERD 개요

```
Users ──< Posts >── Categories
  │         │
  │         ├── Attachments
  │         └── Comments
  │
  ├── Inquiries
  ├── EventRegistrations >── Events
  ├── NewsletterSubscriptions
  ├── AdminAuditLogs
  └── AccessTokens

Faculty ──< Labs ──< LabMembers
   │
   └── Publications

Programs (커리큘럼)
Scholarships (장학금)
AdmissionSchedule (모집일정)
SiteSettings (사이트 설정 — Hero 카피, 배너 등)
```

### 9.2 주요 테이블 상세

#### Users
```sql
id              UUID PK
email           VARCHAR(255) UNIQUE NOT NULL
password_hash   VARCHAR(255) NULL  -- 소셜 로그인 시 NULL
name            VARCHAR(100) NOT NULL
role            ENUM('admin','editor','student','alumni','guest') DEFAULT 'guest'
phone_enc       TEXT  -- AES 암호화
status          ENUM('active','suspended','deleted') DEFAULT 'active'
last_login_at   TIMESTAMP
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP
deleted_at      TIMESTAMP NULL  -- 소프트 삭제
```

#### Faculty
```sql
id              UUID PK
name            VARCHAR(50) NOT NULL
position        VARCHAR(50)  -- 주임교수, 전임, 겸임 등
photo_url       TEXT
research_area   VARCHAR(255)
email           VARCHAR(255)
bio             TEXT
education       JSONB  -- [{degree, school, year}]
career          JSONB
publications    JSONB
courses         JSONB
display_order   INT DEFAULT 0
is_active       BOOLEAN DEFAULT TRUE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

#### Labs
```sql
id              UUID PK
slug            VARCHAR(50) UNIQUE NOT NULL  -- 'ai-tech-edu'
name            VARCHAR(100) NOT NULL
short_desc      TEXT
description     TEXT
hero_image_url  TEXT
lead_faculty_id UUID FK → Faculty
research_topics JSONB
established_at  DATE
display_order   INT
is_published    BOOLEAN DEFAULT FALSE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

#### Programs (커리큘럼)
```sql
id              UUID PK
type            ENUM('common','major','elective')
subject_code    VARCHAR(20)
subject_name    VARCHAR(100)
credit          INT
semester        VARCHAR(10)  -- '1-1', '1-2', '2-1', '2-2'
description     TEXT
display_order   INT
```

#### Scholarships
```sql
id              UUID PK
rank            INT  -- 1, 2, 3 순위
name            VARCHAR(100)
discount_rate   INT  -- 50, 30, 20
description     TEXT
conditions      TEXT
display_order   INT
is_active       BOOLEAN
```

#### AdmissionSchedule
```sql
id              UUID PK
phase           ENUM('application_start','application_end',
                     'document_review','interview','result',
                     'registration_deadline','semester_start')
academic_year   VARCHAR(20)  -- '2026-late'
date            TIMESTAMP
title           VARCHAR(100)
description     TEXT
is_current      BOOLEAN  -- 현재 활성 모집 여부
```

#### Posts
```sql
id              UUID PK
category        ENUM('notice','community','qna','network','gallery','lab')
title           VARCHAR(200) NOT NULL
slug            VARCHAR(255)
content         TEXT  -- Markdown 또는 HTML
content_format  ENUM('markdown','html') DEFAULT 'markdown'
author_id       UUID FK → Users
attachments     JSONB  -- [{url, name, size, type}]
tags            VARCHAR(255)[]
view_count      INT DEFAULT 0
is_pinned       BOOLEAN DEFAULT FALSE
is_published    BOOLEAN DEFAULT TRUE
visibility      ENUM('public','members','admin') DEFAULT 'public'
created_at      TIMESTAMP
updated_at      TIMESTAMP
deleted_at      TIMESTAMP NULL

INDEX (category, is_published, created_at DESC)
INDEX (slug)
```

#### Inquiries (입학 상담)
```sql
id              UUID PK
name            VARCHAR(50) NOT NULL
phone_enc       TEXT NOT NULL  -- AES-256 암호화
email           VARCHAR(255) NOT NULL
interest_lab    VARCHAR(50)
message         TEXT
status          ENUM('pending','contacted','completed','closed') DEFAULT 'pending'
assigned_to     UUID FK → Users NULL
admin_notes     TEXT
privacy_consent BOOLEAN NOT NULL DEFAULT FALSE
marketing_consent BOOLEAN DEFAULT FALSE
source          VARCHAR(100)  -- referrer, utm_source
ip_hash         VARCHAR(64)  -- 스팸 방지용
created_at      TIMESTAMP
updated_at      TIMESTAMP
contacted_at    TIMESTAMP
retention_until DATE  -- 보유기간 종료일 (자동 파기)
```

#### Events (설명회)
```sql
id              UUID PK
title           VARCHAR(200)
description     TEXT
type            ENUM('online','offline','hybrid')
location        VARCHAR(255)
meeting_url     TEXT
start_at        TIMESTAMP
end_at          TIMESTAMP
capacity        INT
status          ENUM('upcoming','ongoing','completed','cancelled')
created_at      TIMESTAMP
```

#### EventRegistrations
```sql
id              UUID PK
event_id        UUID FK → Events
name            VARCHAR(50)
phone_enc       TEXT
email           VARCHAR(255)
attendance_mode ENUM('online','offline')
privacy_consent BOOLEAN
created_at      TIMESTAMP
attended        BOOLEAN
```

#### NewsletterSubscriptions
```sql
id              UUID PK
email           VARCHAR(255) UNIQUE
name            VARCHAR(50)
source          VARCHAR(100)
subscribed_at   TIMESTAMP
unsubscribed_at TIMESTAMP NULL
verify_token    VARCHAR(255)
verified_at     TIMESTAMP
```

#### AdminAuditLogs
```sql
id              UUID PK
user_id         UUID FK → Users
action          VARCHAR(100)
target_type     VARCHAR(50)
target_id       UUID
diff            JSONB  -- 변경 전/후
ip_address      VARCHAR(45)
user_agent      TEXT
created_at      TIMESTAMP

INDEX (user_id, created_at DESC)
```

#### SiteSettings
```sql
id              UUID PK
key             VARCHAR(100) UNIQUE  -- 'hero.headline', 'hero.video_url'
value           JSONB
updated_by      UUID FK → Users
updated_at      TIMESTAMP
```

### 9.3 데이터 보존 정책
- `Inquiries.phone_enc`: 수집 후 **3년 보관 후 자동 파기** (개인정보보호법)
- `AdminAuditLogs`: **5년 보관**
- `Users.deleted_at`: 30일 후 영구 파기 (PII 제외)
- 정기 백업: 일 1회, 30일 보관 (Supabase 기본 + 별도 외부 백업 권장)

### 9.4 인덱싱 전략
- `Posts(category, is_published, created_at DESC)` — 게시판 리스트
- `Inquiries(status, created_at DESC)` — 관리자 대시보드
- `Faculty(is_active, display_order)` — 교수진 페이지
- 전문 검색: `Posts.title, Posts.content`에 GIN 인덱스

---

## 10. API 명세

### 10.1 공통 규칙

#### 응답 포맷
```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}
```

#### 에러 포맷
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INQUIRY_VALIDATION_FAILED",
    "message": "전화번호 형식이 올바르지 않습니다.",
    "details": { "field": "phone" }
  }
}
```

#### 인증
- Bearer Token (NextAuth JWT)
- 보호된 엔드포인트: `Authorization: Bearer <token>` 필수

#### 레이트 리미팅
- `POST /api/v1/inquiries`: IP당 5건/시간
- `POST /api/v1/events/:id/register`: IP당 3건/시간
- `POST /api/v1/newsletter/subscribe`: IP당 3건/시간
- 일반 GET: IP당 100건/분

#### 페이지네이션
- 쿼리: `?page=1&limit=10`
- 기본 limit 10, 최대 100

#### 버전 관리
- 모든 엔드포인트 `/api/v1/...` prefix

### 10.2 Public 엔드포인트 (인증 불요)

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/v1/notices?limit=5` | 메인 노출용 최신 공지 |
| GET | `/api/v1/posts?category=&page=&limit=` | 카테고리별 게시글 목록 |
| GET | `/api/v1/posts/:id` | 게시글 상세 |
| GET | `/api/v1/faculty` | 교수진 목록 |
| GET | `/api/v1/faculty/:id` | 교수 상세 |
| GET | `/api/v1/labs` | LAB 목록 |
| GET | `/api/v1/labs/:slug` | LAB 상세 |
| GET | `/api/v1/programs` | 커리큘럼 |
| GET | `/api/v1/scholarships` | 장학금 |
| GET | `/api/v1/admission-schedule?year=2026-late` | 모집 일정 |
| GET | `/api/v1/events?status=upcoming` | 설명회 목록 |
| GET | `/api/v1/search?q=&type=` | 통합 검색 |
| POST | `/api/v1/inquiries` | 입학 상담 신청 |
| POST | `/api/v1/events/:id/register` | 설명회 등록 |
| POST | `/api/v1/newsletter/subscribe` | 뉴스레터 구독 |
| GET | `/api/v1/newsletter/verify?token=` | 뉴스레터 이메일 인증 |
| POST | `/api/v1/newsletter/unsubscribe` | 구독 해지 |
| GET | `/sitemap.xml` | 사이트맵 |
| GET | `/robots.txt` | robots |
| GET | `/feed.xml` | RSS |

### 10.3 Protected 엔드포인트 (인증 필요)

#### 일반 회원 (student/alumni)
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/api/v1/posts` | 게시글 작성 (Q&A, 커뮤니티) |
| PUT | `/api/v1/posts/:id` | 본인 게시글 수정 |
| DELETE | `/api/v1/posts/:id` | 본인 게시글 삭제 |
| POST | `/api/v1/posts/:id/attachments` | 첨부 업로드 |
| GET | `/api/v1/me` | 내 정보 |
| PUT | `/api/v1/me` | 내 정보 수정 |

#### 관리자 (admin/editor)
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/v1/admin/inquiries?status=` | 상담 목록 |
| PUT | `/api/v1/admin/inquiries/:id` | 상태/메모 업데이트 |
| GET | `/api/v1/admin/inquiries/export.csv` | CSV 내보내기 |
| POST | `/api/v1/admin/events` | 설명회 생성 |
| PUT | `/api/v1/admin/events/:id` | 설명회 수정 |
| GET | `/api/v1/admin/events/:id/registrations` | 참가자 목록 |
| POST | `/api/v1/admin/faculty` | 교수 등록 |
| PUT | `/api/v1/admin/faculty/:id` | 교수 정보 수정 |
| POST | `/api/v1/admin/labs` | LAB 생성 |
| PUT | `/api/v1/admin/labs/:slug` | LAB 수정 |
| PUT | `/api/v1/admin/settings/:key` | 사이트 설정 변경 |
| POST | `/api/v1/admin/uploads` | 이미지 업로드 |
| GET | `/api/v1/admin/dashboard` | 통계 대시보드 |
| GET | `/api/v1/admin/audit-logs?user=&from=&to=` | 감사 로그 |

### 10.4 인증 엔드포인트
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/api/auth/signin` | NextAuth signin |
| POST | `/api/auth/signout` | NextAuth signout |
| GET | `/api/auth/session` | 현재 세션 |
| POST | `/api/auth/password/reset` | 비밀번호 재설정 요청 |

---

## 11. 인증·인가 및 보안

### 11.1 인증 방식
- **NextAuth.js** 기반
- 1차: 이메일+비밀번호 (관리자/재학생)
- 2차: Kakao/Google 소셜 로그인 (선택)
- 비밀번호: **bcrypt** cost 12 이상
- 세션: JWT(httpOnly, secure, sameSite=lax) 30일 만료, refresh 가능

### 11.2 권한 매트릭스

| 리소스 | guest | student | alumni | editor | admin |
|---|---|---|---|---|---|
| 공개 콘텐츠 조회 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Q&A 작성 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 게시판 작성 | ✗ | ✓ | ✓ | ✓ | ✓ |
| 본인 글 수정 | - | ✓ | ✓ | ✓ | ✓ |
| 타인 글 수정 | ✗ | ✗ | ✗ | ✓ | ✓ |
| 공지 작성 | ✗ | ✗ | ✗ | ✓ | ✓ |
| 상담 조회 | ✗ | ✗ | ✗ | ✓ | ✓ |
| 사용자 관리 | ✗ | ✗ | ✗ | ✗ | ✓ |
| 사이트 설정 | ✗ | ✗ | ✗ | ✗ | ✓ |

### 11.3 보안 요구사항 (OWASP Top 10 대응)
- **A01 접근 통제**: 모든 보호 API에 미들웨어 인증 검증
- **A02 암호화 실패**: 개인정보 AES-256, HTTPS 강제, HSTS
- **A03 인젝션**: Prisma ORM 사용, 사용자 입력 sanitize, **DOMPurify** for HTML
- **A04 안전하지 않은 설계**: 폼 제출 reCAPTCHA, 레이트 리미팅
- **A05 보안 설정 오류**: Vercel 보안 헤더 + CSP 적용
- **A07 인증 실패**: 5회 실패 시 30분 잠금, 비밀번호 정책(8자+영문+숫자+특수)
- **A08 무결성 실패**: SRI(Subresource Integrity), 의존성 정기 업데이트
- **A09 로깅 부재**: AdminAuditLogs로 모든 관리자 작업 기록
- **A10 SSRF**: 외부 URL 입력 검증

### 11.4 보안 헤더 (`next.config.js`)
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: (정교한 정책 별도 정의)
```

### 11.5 파일 업로드 보안
- 허용 확장자 화이트리스트(`.jpg, .jpeg, .png, .webp, .pdf`)
- 최대 크기: 이미지 5MB, PDF 20MB
- 서버 측 MIME 검증
- 별도 도메인/서브도메인에서 서빙 권장 (CDN)

---

## 12. 법적 컴플라이언스

### 12.1 개인정보보호법
- **필수 페이지**: 개인정보처리방침 (footer 링크)
- **필수 페이지**: 이용약관
- 수집 항목·이용 목적·보유 기간 명시
- 만 14세 미만 수집 금지 (체크박스)
- 위탁 처리 시(Resend, Sentry 등) 위탁 사실 공개
- 개인정보 보호책임자 지정 및 연락처 공개

### 12.2 입학 상담 폼 동의 문구 (예시)
```
□ (필수) 개인정보 수집·이용에 동의합니다.
   - 수집항목: 이름, 연락처, 이메일, 문의내용
   - 이용목적: 입학 상담 응대
   - 보유기간: 수집일로부터 3년

□ (선택) 마케팅 정보 수신에 동의합니다.
   - 이용목적: 설명회 안내, 모집요강 안내
   - 보유기간: 동의 철회 시까지
```

### 12.3 웹 접근성
- KWCAG 2.2 준수, 모집 후 WA 인증 신청 검토

### 12.4 쿠키 정책
- 필수 쿠키 외 분석/광고 쿠키는 동의 후 활성화
- 쿠키 배너 (1차 출시 포함 권장)

### 12.5 저작권
- 갤러리 사진: 학생 동의서 별도 보관
- 외부 인용: 출처 명기
- 폰트: Pretendard(SIL OFL), Inter(SIL OFL) 라이선스 확인

---

## 13. SEO 및 마케팅 인프라

### 13.1 한국 시장 SEO 특화
- **Naver Search Advisor** 등록 및 사이트맵 제출
- **Google Search Console** 등록
- 네이버 검색에 친화적인 메타 태그(`<meta name="naver-site-verification" ...>`)
- 카카오톡 공유 OG 태그 최적화 (이미지 1200×630, 한글 깔끔히)

### 13.2 키워드 전략
| 핵심 키워드 | 랜딩 페이지 |
|---|---|
| 에듀컨설팅 대학원 | 홈 |
| 교육경영 석사 | 전공 소개 |
| 학원 경영 대학원 | 학원경영 LAB |
| AI 에듀테크 대학원 | AI 테크에듀 LAB |
| 교육 분야 박사 진학 | R&E LAB |
| 가천대 경영대학원 야간 | 입학 안내 |

### 13.3 콘텐츠 마케팅 (Phase 2)
- 인사이트 블로그 카테고리
- 월 2~4개 SEO 콘텐츠 (학원 운영, 에듀테크 트렌드, 교육 데이터)

### 13.4 메타데이터 표준
모든 페이지:
- `<title>`: `{페이지명} | 가천대학교 경영대학원 에듀컨설팅 전공`
- `<meta name="description">`: 페이지별 고유 150자 이내
- `<meta property="og:image">`: 1200×630
- 구조화 데이터(JSON-LD): `EducationalOrganization`, `Course`, `Event`

### 13.5 광고 픽셀 (선택)
- 메타 픽셀
- 구글 광고 태그
- 네이버 GFA 픽셀

---

## 14. 분석·모니터링

### 14.1 분석 도구
- **GA4**: 전체 트래픽, 이벤트 트래킹
- **Naver Analytics**: 네이버 유입 분석
- **Microsoft Clarity**: 히트맵, 세션 리플레이
- **Vercel Analytics**: Web Vitals

### 14.2 트래킹 이벤트
| 이벤트명 | 트리거 | 파라미터 |
|---|---|---|
| `view_lab` | LAB 페이지 진입 | lab_slug |
| `download_brochure` | 모집요강 PDF 클릭 | source_page |
| `start_inquiry_form` | 상담 폼 시작 | source |
| `submit_inquiry` | 상담 제출 완료 | interest_lab, source |
| `register_event` | 설명회 등록 | event_id |
| `subscribe_newsletter` | 뉴스레터 구독 | source |
| `click_cta` | 주요 CTA 클릭 | cta_label, page |
| `scroll_75` | 페이지 75% 스크롤 | page |

### 14.3 모니터링
- **Sentry**: 에러 추적, 1차 알림 슬랙
- **Vercel Logs**: 서버 로그
- **Uptime 모니터링**: BetterStack 또는 UptimeRobot
- **알림**: 모집 기간 중 다운 시 5분 내 알림

### 14.4 어드민 대시보드 위젯
- 일간 UV, 신규 상담, 신규 설명회 등록
- 인기 페이지 TOP 5
- 상담 처리 현황(대기/처리중/완료)
- 미답변 Q&A 건수
- 트래픽 소스 분포(네이버/구글/직접/SNS)

---

## 15. 운영 및 거버넌스

### 15.1 콘텐츠 거버넌스
| 콘텐츠 유형 | 작성 | 검토 | 승인 | 발행 |
|---|---|---|---|---|
| 공지(중요) | 교학과 직원 | 부장 | 주임교수 | 교학과 |
| 공지(일반) | 교학과 직원 | 부장 | - | 교학과 |
| 입학 안내 변경 | 입학팀 | 주임교수 | 주임교수 | 교학과 |
| LAB 콘텐츠 | LAB 교수 | 주임교수 | - | LAB 교수 |
| 갤러리 | 원우회/교학과 | 부장 | - | 발행자 |

### 15.2 운영 책임 (RACI)
| 영역 | 책임 (R) | 승인 (A) | 자문 (C) | 통보 (I) |
|---|---|---|---|---|
| 사이트 운영 | 교학과 직원 | 주임교수 | 외주개발사 | 교수진 |
| 콘텐츠 작성 | 각 LAB | 주임교수 | 교학과 | - |
| 입학 상담 응대 | 입학팀 | - | 교학과 | 주임교수 |
| 장애 대응 | 외주개발사 | 교학과 | - | 주임교수 |

### 15.3 SLA (서비스 수준)
- 가동률 목표: **99.5%/월** (월 3.6시간 다운 허용)
- 모집 기간(5/1~7/15): **99.9% 목표**
- 장애 응답: 1시간 이내 1차 응답, 4시간 이내 복구 착수
- 상담 응대: 신청 후 24시간 이내 회신

### 15.4 백업·복구
- **DB**: 일 1회 자동 백업 (Supabase) + 주 1회 외부 백업
- **파일**: Supabase Storage 버저닝
- **복구 훈련**: 분기 1회

---

## 16. 개발 일정 및 마일스톤

### 16.1 타임라인 (모집 일정 역산)
원서접수 시작 **5/6** 기준 권장 일정:

| 주차 | 단계 | 산출물 |
|---|---|---|
| W-12 | 기획 확정 | PRD v2 승인, 디자인 시스템 |
| W-10 | 디자인 | 와이어프레임, 메인·핵심 페이지 시안 |
| W-9~W-7 | 디자인 + FE 병행 | 컴포넌트 라이브러리, 메인페이지 구현 |
| W-7~W-5 | FE 구현 | 전 페이지 정적 구현, CMS 어드민 |
| W-5~W-4 | BE/API 통합 | DB 마이그레이션, API 연결, 인증 |
| W-4~W-3 | 콘텐츠 입력 | 교수진, LAB, 커리큘럼, 장학금 |
| W-3 | QA | 크로스 브라우저, 접근성, 성능, 보안 |
| W-2 | 베타 오픈 | 학과 내부 검수, 피드백 반영 |
| W-1 | 정식 오픈 | 도메인 연결, 모니터링 시작 |
| W0(5/6) | **원서접수 시작** | |

### 16.2 마일스톤 게이트
- **M1: 디자인 시스템 완료** → FE 개발 착수 게이트
- **M2: 메인 페이지 FE 완성** → 사용성 테스트 게이트
- **M3: 전 페이지 FE 완성** → API 통합 게이트
- **M4: 베타 배포** → 콘텐츠 입력 완료 게이트
- **M5: 정식 오픈** → 모니터링 시작

### 16.3 인력 구성 (최소)
- PM/기획 1명
- UI/UX 디자이너 1명
- 프론트엔드 개발자 1~2명
- 백엔드/풀스택 개발자 1명
- 콘텐츠 라이터 1명 (학과 내부 또는 외부)
- QA 0.5명

---

## 17. 리스크 및 완화 방안

| ID | 리스크 | 가능성 | 영향 | 완화 방안 |
|---|---|---|---|---|
| R1 | 일정 지연으로 모집 전 미오픈 | 중 | 매우 높음 | MVP 범위 엄수, 주간 마일스톤 점검 |
| R2 | 콘텐츠(교수·LAB) 입력 지연 | 높음 | 높음 | W-6에 모든 콘텐츠 마감일 설정, 책임자 배정 |
| R3 | 모집 기간 중 트래픽 폭주로 다운 | 낮 | 매우 높음 | Vercel 자동 확장, DB Connection Pool |
| R4 | 개인정보 유출 사고 | 낮 | 매우 높음 | 암호화, 권한 분리, 감사 로그, 보험 검토 |
| R5 | 상담 폼 스팸 | 높음 | 중 | reCAPTCHA, 레이트 리미팅, IP 차단 |
| R6 | 접근성 미준수로 민원 | 중 | 중 | KWCAG 2.2 체크리스트, 외부 점검 |
| R7 | 검색 노출 저조 | 중 | 높음 | 초기 SEO 점검, 네이버 등록, 콘텐츠 보강 |
| R8 | 외주개발사 인계 후 운영 어려움 | 중 | 중 | 운영 매뉴얼, 어드민 교육 2회 |

---

## 18. 부록

### 18.1 출시 전 체크리스트 (요약)

**기능**
- [ ] 모든 페이지 콘텐츠 입력 완료
- [ ] 입학 상담 폼 제출·이메일 발송 검증
- [ ] 설명회 등록 흐름 검증
- [ ] 어드민 CRUD 모두 동작 확인
- [ ] 검색 결과 정확성 확인

**디자인**
- [ ] 모바일·태블릿·데스크톱 렌더링 확인
- [ ] 다크/라이트 OS 설정에서 일관성
- [ ] 폰트 로딩 최적화(FOIT/FOUT)

**성능**
- [ ] Lighthouse 모바일 90+
- [ ] LCP 2.5s 이하
- [ ] 이미지 WebP/AVIF + 지연 로딩

**SEO**
- [ ] sitemap.xml, robots.txt
- [ ] 메타 태그·OG 태그 전 페이지 설정
- [ ] Search Console / Naver Search Advisor 등록
- [ ] 구조화 데이터(JSON-LD) 적용

**접근성**
- [ ] 키보드만으로 모든 기능 사용 가능
- [ ] 명도 대비 4.5:1
- [ ] alt 텍스트 100%

**보안**
- [ ] HTTPS 강제, HSTS
- [ ] 보안 헤더 적용
- [ ] reCAPTCHA 동작 확인
- [ ] 비밀번호 정책 적용
- [ ] 감사 로그 기록 확인

**컴플라이언스**
- [ ] 개인정보처리방침·이용약관 게시
- [ ] 폼 동의 체크박스
- [ ] 쿠키 배너

**분석**
- [ ] GA4, Naver Analytics 동작
- [ ] Sentry 알림 슬랙 연결
- [ ] 어드민 대시보드 데이터 표시

**운영**
- [ ] 어드민 매뉴얼 작성
- [ ] 콘텐츠 작성 가이드
- [ ] 비상 연락망

### 18.2 용어집
- **LAB**: 연구실, 본 전공의 핵심 학습 단위
- **R&E**: Research & Education
- **CMS**: Content Management System
- **MVP**: Minimum Viable Product
- **PII**: Personally Identifiable Information
- **WCAG/KWCAG**: 웹 콘텐츠 접근성 가이드라인
- **OG 태그**: Open Graph, SNS 공유 시 미리보기

### 18.3 변경 이력
| 버전 | 일자 | 변경 내용 | 작성자 |
|---|---|---|---|
| v1.0 | 2026-05-XX | 초안 작성 | - |
| v2.0 | 2026-05-11 | 전략·기술스택·보안·컴플라이언스 등 전면 보강 | - |

---

**[문서 종료]**
