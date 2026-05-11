"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { searchSite } from "@/lib/site-search";
import { communityNoticePath } from "@/lib/post-path";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function highlight(text: string, q: string) {
  if (!q.trim()) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-amber-100 px-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function SearchView() {
  const params = useSearchParams();
  const q = params.get("q")?.trim() ?? "";

  const { notices, faculty, labs } = React.useMemo(() => searchSite(q), [q]);

  const total = notices.length + faculty.length + labs.length;

  return (
    <div>
      <PageHeader
        title="통합 검색"
        description={
          q
            ? `「${q}」 검색 결과 ${total}건 (목 데이터)`
            : "검색어를 입력해 주세요."
        }
        breadcrumb={[{ label: "홈", href: "/" }, { label: "검색" }]}
      />
      <div
        className="mx-auto max-w-screen-lg px-6 py-10 md:px-12"
        aria-live="polite"
      >
        {!q ? (
          <p className="text-gray-600 break-keep">
            헤더의 검색 아이콘에서 키워드를 입력하면 이 페이지로 이동합니다.
          </p>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 flex h-auto flex-wrap gap-1">
              <TabsTrigger value="all">전체 ({total})</TabsTrigger>
              <TabsTrigger value="notice">공지 ({notices.length})</TabsTrigger>
              <TabsTrigger value="faculty">교수 ({faculty.length})</TabsTrigger>
              <TabsTrigger value="lab">LAB ({labs.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-8">
              <ResultBlock title="공지" empty={notices.length === 0}>
                {notices.map((n) => (
                  <ResultRow
                    key={n.id}
                    href={communityNoticePath(n)}
                    title={highlight(n.title, q)}
                    meta={n.date}
                  />
                ))}
              </ResultBlock>
              <ResultBlock title="교수진" empty={faculty.length === 0}>
                {faculty.map((f) => (
                  <ResultRow
                    key={f.id}
                    href={`/faculty/${f.id}`}
                    title={highlight(f.name, q)}
                    meta={f.researchArea}
                  />
                ))}
              </ResultBlock>
              <ResultBlock title="LAB" empty={labs.length === 0}>
                {labs.map((l) => (
                  <ResultRow
                    key={l.slug}
                    href={`/labs/${l.slug}`}
                    title={highlight(l.name, q)}
                    meta={l.tagline}
                  />
                ))}
              </ResultBlock>
            </TabsContent>
            <TabsContent value="notice">
              <ResultBlock title="공지" empty={notices.length === 0}>
                {notices.map((n) => (
                  <ResultRow
                    key={n.id}
                    href={communityNoticePath(n)}
                    title={highlight(n.title, q)}
                    meta={n.date}
                  />
                ))}
              </ResultBlock>
            </TabsContent>
            <TabsContent value="faculty">
              <ResultBlock title="교수진" empty={faculty.length === 0}>
                {faculty.map((f) => (
                  <ResultRow
                    key={f.id}
                    href={`/faculty/${f.id}`}
                    title={highlight(f.name, q)}
                    meta={f.researchArea}
                  />
                ))}
              </ResultBlock>
            </TabsContent>
            <TabsContent value="lab">
              <ResultBlock title="LAB" empty={labs.length === 0}>
                {labs.map((l) => (
                  <ResultRow
                    key={l.slug}
                    href={`/labs/${l.slug}`}
                    title={highlight(l.name, q)}
                    meta={l.tagline}
                  />
                ))}
              </ResultBlock>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

function ResultBlock({
  title,
  children,
  empty,
}: {
  title: string;
  children: React.ReactNode;
  empty: boolean;
}) {
  if (empty) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-gachon-900">{title}</h2>
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
        {children}
      </ul>
    </section>
  );
}

function ResultRow({
  href,
  title,
  meta,
}: {
  href: string;
  title: React.ReactNode;
  meta?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-gachon-50/50 break-keep"
      >
        <span className="font-medium text-gachon-900">{title}</span>
        {meta && <span className="text-xs text-gray-500">{meta}</span>}
      </Link>
    </li>
  );
}
