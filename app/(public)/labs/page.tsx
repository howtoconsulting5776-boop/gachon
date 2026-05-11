import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { MOCK_LABS } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "연구실",
};

export default function LabsIndexPage() {
  return (
    <div>
      <PageHeader
        title="연구실 (LAB)"
        description={`전공의 ${MOCK_LABS.length}개 특화 연구실을 소개합니다.`}
        breadcrumb={[{ label: "홈", href: "/" }, { label: "연구실" }]}
      />
      <div className="mx-auto max-w-screen-xl space-y-6 px-6 py-12 md:px-12">
        {MOCK_LABS.map((lab) => (
          <Link
            key={lab.slug}
            href={`/labs/${lab.slug}`}
            className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between break-keep"
          >
            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                {lab.fullName}
              </p>
              <h2 className="mt-1 text-xl font-bold text-gachon-900">
                {lab.name}
              </h2>
              <p className="mt-2 text-gold-700">{lab.tagline}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gachon-600">
              상세
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
