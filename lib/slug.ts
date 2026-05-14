import { randomBytes } from "node:crypto";

/** 제목에서 영숫자·하이픈만 남긴 슬러그 (비어 있으면 짧은 랜덤 접미) */
export function slugifyAscii(input: string): string {
  const s = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return s.slice(0, 60);
}

export function makePostPublicSlug(id: string, title: string): string {
  const base = slugifyAscii(title);
  const tail = base.length > 0 ? base : `post-${randomBytes(3).toString("hex")}`;
  return `${id}-${tail}`.replace(/-+/g, "-").toLowerCase();
}

export function makeFacultyColumnPublicSlug(id: string, title: string): string {
  const base = slugifyAscii(title);
  const tail = base.length > 0 ? base : `column-${randomBytes(3).toString("hex")}`;
  return `${id}-${tail}`.replace(/-+/g, "-").toLowerCase();
}
