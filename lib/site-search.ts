import { MOCK_FACULTY, MOCK_LABS, MOCK_NOTICES } from "@/lib/mock-data";

export interface SiteSearchResult {
  notices: (typeof MOCK_NOTICES)[number][];
  faculty: (typeof MOCK_FACULTY)[number][];
  labs: (typeof MOCK_LABS)[number][];
}

export function searchSite(q: string): SiteSearchResult {
  const t = q.trim();
  if (!t) {
    return {
      notices: MOCK_NOTICES,
      faculty: MOCK_FACULTY,
      labs: MOCK_LABS,
    };
  }
  const lower = t.toLowerCase();
  const notices = MOCK_NOTICES.filter(
    (n) =>
      n.title.toLowerCase().includes(lower) ||
      n.excerpt.toLowerCase().includes(lower)
  );
  const faculty = MOCK_FACULTY.filter(
    (f) =>
      f.name.includes(t) ||
      (f.researchArea?.toLowerCase().includes(lower) ?? false) ||
      (f.position?.toLowerCase().includes(lower) ?? false)
  );
  const labs = MOCK_LABS.filter(
    (l) =>
      l.name.toLowerCase().includes(lower) ||
      l.description.toLowerCase().includes(lower) ||
      l.fullName.toLowerCase().includes(lower)
  );
  return { notices, faculty, labs };
}
