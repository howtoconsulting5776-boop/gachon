# 에듀컨설팅 사이트 발전 계획

PRD KPI(LCP ≤ 2.5s, Lighthouse 90+, 상담 전환)에 맞춘 로드맵입니다.

## Phase 0 — 성능·UX

- [x] Pretendard npm 번들(dynamic subset)
- [x] 히어로 blur + `picture` webp 우선(`npm run images:optimize`로 `hero-campus.webp` 생성)
- [x] LAB 커버 로컬 + `images:lab-covers`
- [x] 메인 `LatestNews` Suspense
- [x] Vercel Speed Insights (`SpeedInsights` in `app/layout.tsx`)

## Phase 1 — 이미지·폰트

- [x] `npm run images:optimize` — `public/` 히어로·site·labs·faculty JPG/PNG 압축 + WebP 생성
- [ ] 히어로 정적 import + 자동 blur(선택)
- [ ] 교수진·갤러리 실사진으로 교체·저작권 정리

## Phase 2 — 프레임워크·보안

- [x] 공개 API: Upstash 분산 레이트 리밋(환경 변수 없으면 메모리 폴백)
- [ ] Next.js 15+ 마이그레이션: `params`/`searchParams` Promise 등 — **로컬에서 `node_modules` 정리 후** `npm install`로 올릴 것(중간 설치 실패 시 Webpack 오류 방지)
- [ ] `npm audit` 잔여는 정기 점검

## Phase 3 — 제품·운영

- [x] 뉴스레터 Resend 연동(`RESEND_API_KEY`, `RESEND_FROM_EMAIL`)
- [x] 인증 UX: `/newsletter/verify` 페이지 + 기존 GET API
- [ ] 커스텀 도메인·Vercel 환경 변수 정합(운영자 체크리스트)

## npm 스크립트

| 명령 | 설명 |
|------|------|
| `npm run images:lab-covers` | LAB 커버 4장 다운로드 |
| `npm run images:optimize` | public 이미지 압축 + webp 생성 |

## 참고

- Resend `from` 도메인은 Resend 대시보드에서 검증된 주소만 사용 가능. 로컬 테스트는 `onboarding@resend.dev` 기본값.
