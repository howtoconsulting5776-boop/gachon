import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  getLabBySlug,
  getLeadFacultyForLab,
  MOCK_LABS,
} from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return MOCK_LABS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  const lab = getLabBySlug(slug);
  if (!lab) return { title: "LAB" };
  return { title: lab.name };
}

export default function LabDetailPage({ params }: Props) {
  const { slug } = params;
  const lab = getLabBySlug(slug);
  if (!lab) notFound();
  const lead = getLeadFacultyForLab(lab);

  return (
    <div>
      <PageHeader
        title={lab.name}
        description={lab.tagline}
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "연구실", href: "/labs" },
          { label: lab.name },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12 md:px-12">
        <p className="leading-relaxed text-gray-700 break-keep">
          {lab.description}
        </p>
        <section>
          <h2 className="text-lg font-semibold text-gachon-900 break-keep">
            연구 주제
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 break-keep">
            {lab.researchTopics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
        {lead && (
          <section className="rounded-xl border border-gray-200 bg-gray-50/80 p-6 break-keep">
            <h2 className="text-lg font-semibold text-gachon-900">책임 교수</h2>
            <p className="mt-2 font-medium">{lead.name}</p>
            <p className="text-sm text-gray-600">{lead.position}</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href={`/faculty/${lead.id}`}>교수 프로필</Link>
            </Button>
          </section>
        )}
        <Button asChild>
          <Link href="/admissions/inquiry">LAB 관련 입학 상담</Link>
        </Button>
      </div>
    </div>
  );
}
