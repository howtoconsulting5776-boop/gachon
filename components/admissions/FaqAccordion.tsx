"use client";

import * as React from "react";
import { MOCK_FAQ } from "@/lib/mock-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FaqAccordion() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return MOCK_FAQ;
    return MOCK_FAQ.filter(
      (f) =>
        f.question.toLowerCase().includes(t) ||
        f.answer.toLowerCase().includes(t) ||
        f.category.toLowerCase().includes(t)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="faq-search" className="text-sm text-gray-700">
          FAQ 검색
        </Label>
        <Input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="키워드로 질문·답변을 찾아보세요"
          className="mt-2 max-w-md"
          autoComplete="off"
        />
        <p className="mt-2 text-xs text-gray-500 break-keep">
          {filtered.length}건 표시 (총 {MOCK_FAQ.length}건)
        </p>
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600 break-keep">검색 결과가 없습니다.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {filtered.map((f) => (
            <AccordionItem
              key={f.id}
              value={f.id}
              className="rounded-xl border border-gray-200 bg-white px-4 data-open:shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium text-gachon-900 hover:no-underline break-keep">
                <span className="mr-2 shrink-0 text-xs font-normal text-gold-700">
                  [{f.category}]
                </span>
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-600 break-keep">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
