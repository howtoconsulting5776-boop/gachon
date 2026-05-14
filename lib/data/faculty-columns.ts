import "server-only";
import fs from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import type { FacultyColumn as PrismaFacultyColumn } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/data/posts";

export interface FacultyColumnDto {
  id: string;
  facultyId: string;
  publicSlug: string;
  title: string;
  excerpt: string;
  content: string;
  /** YYYY-MM-DD */
  date: string;
}

function columnToDto(row: PrismaFacultyColumn): FacultyColumnDto {
  return {
    id: row.id,
    facultyId: row.facultyId,
    publicSlug: row.publicSlug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.publishedAt.toISOString().slice(0, 10),
  };
}

interface MockColumnSpec {
  file: string;
  id: string;
  facultyId: string;
  publicSlug: string;
  /** YYYY-MM-DD — 목록 정렬(최신 우선)에 사용 */
  date: string;
}

const MOCK_COLUMN_SPECS: MockColumnSpec[] = [
  {
    file: "hagwon-golden-time-ai-marketing-automation.md",
    id: "fcb_jang_002",
    facultyId: "3",
    publicSlug: "hagwon-golden-time-ai-marketing-automation",
    date: "2026-05-14",
  },
  {
    file: "jang-ai-era-bosup-system.md",
    id: "fcb_jang_001",
    facultyId: "3",
    publicSlug: "jang-ai-era-bosup-hagwon-system",
    date: "2026-05-13",
  },
];

let cachedMockColumns: FacultyColumnDto[] | null = null;

function markdownFileToDto(spec: MockColumnSpec): FacultyColumnDto {
  const filePath = path.join(process.cwd(), "content/faculty-columns", spec.file);
  const md = fs.readFileSync(filePath, "utf8");
  const titleLine = md.split("\n")[0]?.replace(/^#\s*/, "").trim() ?? "칼럼";
  const excerptSource = md.replace(/^#\s+[^\n]+\n+/, "").replace(/\n+/g, " ").trim();
  const excerpt =
    excerptSource.length > 220 ? `${excerptSource.slice(0, 220)}…` : excerptSource;
  return {
    id: spec.id,
    facultyId: spec.facultyId,
    publicSlug: spec.publicSlug,
    title: titleLine,
    excerpt,
    content: md.trim(),
    date: spec.date,
  };
}

function loadMockColumns(): FacultyColumnDto[] {
  if (cachedMockColumns) return cachedMockColumns;
  cachedMockColumns = MOCK_COLUMN_SPECS.map(markdownFileToDto).sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
  return cachedMockColumns;
}

/** `content/faculty-columns`에 동봉된 기본 칼럼(교수 ID별) */
function bundledColumnsForFaculty(facultyId: string): FacultyColumnDto[] {
  return loadMockColumns().filter((c) => c.facultyId === facultyId);
}

/** DB 시드 없이도 공개에 쓰이는 저장소 마크다운 칼럼(어드민·점검용). */
export function listBundledFacultyColumns(): FacultyColumnDto[] {
  noStore();
  return loadMockColumns();
}

export function facultyColumnPath(facultyId: string, publicSlug: string): string {
  return `/faculty/${facultyId}/columns/${publicSlug}`;
}

/** 본문에서 첫 줄 `# 제목`을 제거해 페이지 헤더와 중복되지 않게 합니다. */
export function stripLeadingMarkdownTitle(markdown: string): string {
  return markdown.replace(/^#\s+[^\n]+\n+/, "").trim();
}

export async function listFacultyColumns(
  facultyId: string,
  opts?: { limit?: number }
): Promise<FacultyColumnDto[]> {
  noStore();
  const limit = opts?.limit ?? 50;

  if (!isDatabaseConfigured()) {
    return bundledColumnsForFaculty(facultyId).slice(0, limit);
  }

  const rows = await prisma.facultyColumn.findMany({
    where: { facultyId },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  if (rows.length > 0) {
    return rows.map(columnToDto);
  }
  // 프로덕션 등 DB는 연결됐으나 시드가 없어 테이블이 비어 있는 경우
  return bundledColumnsForFaculty(facultyId).slice(0, limit);
}

export async function getFacultyColumnBySlug(
  facultyId: string,
  publicSlug: string
): Promise<FacultyColumnDto | null> {
  noStore();
  if (!isDatabaseConfigured()) {
    return (
      loadMockColumns().find(
        (c) => c.facultyId === facultyId && c.publicSlug === publicSlug
      ) ?? null
    );
  }

  const row = await prisma.facultyColumn.findFirst({
    where: { facultyId, publicSlug },
  });
  if (row) return columnToDto(row);
  return (
    loadMockColumns().find(
      (c) => c.facultyId === facultyId && c.publicSlug === publicSlug
    ) ?? null
  );
}

export async function getFacultyColumnById(id: string): Promise<FacultyColumnDto | null> {
  noStore();
  if (!isDatabaseConfigured()) {
    return loadMockColumns().find((c) => c.id === id) ?? null;
  }
  const row = await prisma.facultyColumn.findUnique({ where: { id } });
  if (row) return columnToDto(row);
  return loadMockColumns().find((c) => c.id === id) ?? null;
}
