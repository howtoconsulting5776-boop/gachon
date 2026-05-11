import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MOCK_QNA } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Q&A",
};

export default function QnaPage() {
  return (
    <div>
      <PageHeader
        title="Q&A"
        description="질문·답변 목업입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "커뮤니티", href: "/community/notice" },
          { label: "Q&A" },
        ]}
      />
      <ul className="mx-auto max-w-3xl divide-y divide-gray-100 px-6 py-12 md:px-12">
        {MOCK_QNA.map((p) => (
          <li key={p.id} className="py-6">
            <p className="text-xs text-gray-500">{p.date}</p>
            <h2 className="mt-1 text-lg font-semibold text-gachon-900 break-keep">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 break-keep">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
