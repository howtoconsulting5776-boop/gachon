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
import { AiTechEduCurriculumMatrix } from "@/components/labs/AiTechEduCurriculumMatrix";
import { ResearchWritingRoadmap } from "@/components/labs/ResearchWritingRoadmap";

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
  const path = `/labs/${lab.slug}`;
  const plain = `${lab.tagline} ${lab.description}`.replace(/\s+/g, " ").trim();
  const description = plain.slice(0, 155);
  const ogImage = `/images/labs/${lab.slug}.jpg`;
  return {
    title: lab.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: lab.name,
      description: lab.tagline,
      url: path,
      images: [{ url: ogImage, alt: `${lab.name} 대표 이미지` }],
    },
    twitter: {
      card: "summary_large_image",
      title: lab.name,
      description: lab.tagline,
      images: [ogImage],
    },
  };
}

export default function LabDetailPage({ params }: Props) {
  const { slug } = params;
  const lab = getLabBySlug(slug);
  if (!lab) notFound();
  const lead = getLeadFacultyForLab(lab);
  const wideLab =
    lab.slug === "ai-tech-edu" || lab.slug === "research-writing";

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
      <div
        className={`mx-auto space-y-10 px-6 py-12 md:px-12 ${wideLab ? "max-w-4xl" : "max-w-3xl"}`}
      >
        <div className="space-y-4 leading-relaxed text-gray-700 break-keep">
          {lab.description
            .split(/\n\n+/)
            .filter((p) => p.trim())
            .map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
        </div>
        {lab.slug === "research-writing" && (
          <section className="border-t border-gray-200 pt-10">
            <ResearchWritingRoadmap />
          </section>
        )}
        {lab.slug === "ai-tech-edu" && (
          <section className="border-t border-gray-200 pt-10">
            <AiTechEduCurriculumMatrix />
          </section>
        )}
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
