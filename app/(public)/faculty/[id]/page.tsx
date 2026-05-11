import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFacultyById, MOCK_LABS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export function generateMetadata({ params }: Props): Metadata {
  const { id } = params;
  const f = getFacultyById(id);
  if (!f) return { title: "교수 소개" };
  return { title: f.name };
}

export default function FacultyDetailPage({ params }: Props) {
  const { id } = params;
  const f = getFacultyById(id);
  if (!f) notFound();

  const lab = f.labSlug
    ? MOCK_LABS.find((l) => l.slug === f.labSlug)
    : undefined;

  return (
    <div>
      <PageHeader
        title={f.name}
        description={f.position}
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "교수진", href: "/faculty" },
          { label: f.name },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="text-sm text-gray-500 break-keep">이메일 · {f.email}</p>
        <p className="mt-6 leading-relaxed text-gray-700 break-keep">{f.bio}</p>
        <p className="mt-4 text-sm font-medium text-gachon-900 break-keep">
          연구 분야: {f.researchArea}
        </p>
        {lab && (
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href={`/labs/${lab.slug}`}>{lab.name} 바로가기</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
