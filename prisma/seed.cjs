/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const posts = [
  {
    id: "n1",
    publicSlug: "n1-2026-admission-guide",
    category: "notice",
    title: "2026학년도 후기 모집 안내",
    excerpt: "원서 접수 일정 및 제출 서류를 안내드립니다.",
    content: "원서 접수 일정 및 제출 서류를 안내드립니다.\n\n세부 일정은 모집요강을 확인해 주세요.",
    author: "교학팀",
    publishedAt: new Date("2026-05-01T00:00:00.000Z"),
  },
  {
    id: "n2",
    publicSlug: "n2-info-session-registration",
    category: "notice",
    title: "설명회 사전 등록 오픈",
    excerpt: "온·오프라인 병행 설명회 일정과 사전 등록 방법입니다.",
    content: "온·오프라인 병행 설명회 일정과 사전 등록 방법입니다.",
    author: "입학팀",
    publishedAt: new Date("2026-04-28T00:00:00.000Z"),
  },
  {
    id: "n3",
    publicSlug: "n3-scholarship-documents-update",
    category: "notice",
    title: "장학금 신청 서류 변경",
    excerpt: "2순위 장학 관련 제출 서류가 일부 변경되었습니다.",
    content: "2순위 장학 관련 제출 서류가 일부 변경되었습니다.",
    author: "교학팀",
    publishedAt: new Date("2026-04-20T00:00:00.000Z"),
  },
  {
    id: "b1",
    publicSlug: "b1-study-group-recruitment",
    category: "board",
    title: "원우회 스터디 모집",
    excerpt: "교육데이터 분석 스터디 인원을 모집합니다.",
    content: "교육데이터 분석 스터디 인원을 모집합니다.",
    author: "재학생",
    publishedAt: new Date("2026-04-10T00:00:00.000Z"),
  },
  {
    id: "b2",
    publicSlug: "b2-thesis-advisor-matching-review",
    category: "board",
    title: "논문 지도 교수 매칭 후기",
    excerpt: "연구논문 LAB 경험을 공유합니다.",
    content: "연구논문 LAB 경험을 공유합니다.",
    author: "동문",
    publishedAt: new Date("2026-04-02T00:00:00.000Z"),
  },
  {
    id: "q1",
    publicSlug: "q1-evening-class-schedule",
    category: "qna",
    title: "야간 수업 주차는 어떻게 되나요?",
    excerpt: "평일 야간과 토요일 배정 기준을 알고 싶습니다.",
    content: null,
    author: null,
    publishedAt: new Date("2026-04-15T00:00:00.000Z"),
  },
];

const events = [
  {
    id: "e1",
    title: "에듀컨설팅 전공 오프라인 설명회 (서울)",
    type: "offline",
    startAt: new Date("2026-05-10T05:00:00.000Z"),
    location: "가천대 글로벌캠퍼스",
    capacity: 80,
  },
  {
    id: "e2",
    title: "온라인 라이브 Q&A",
    type: "online",
    startAt: new Date("2026-05-14T10:30:00.000Z"),
    location: null,
    capacity: 200,
  },
];

async function main() {
  for (const p of posts) {
    await prisma.post.upsert({
      where: { id: p.id },
      create: p,
      update: {
        publicSlug: p.publicSlug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        publishedAt: p.publishedAt,
      },
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${posts.length} posts.`);

  for (const e of events) {
    await prisma.event.upsert({
      where: { id: e.id },
      create: e,
      update: {
        title: e.title,
        type: e.type,
        startAt: e.startAt,
        location: e.location,
        capacity: e.capacity,
      },
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${events.length} events.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
