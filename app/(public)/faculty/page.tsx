import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { MOCK_FACULTY } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "교수진",
};

export default function FacultyListPage() {
  return (
    <div>
      <PageHeader
        title="교수진"
        description="주임·전공 교수진입니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "교수진" },
        ]}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {MOCK_FACULTY.map((f, index) => (
            <li key={f.id}>
              <Link
                href={`/faculty/${f.id}`}
                className="block rounded-[0.67rem] border border-gray-200 p-6 transition-shadow hover:shadow-md break-keep"
              >
                {f.portraitSrc ? (
                  <div className="relative aspect-[4/5] w-full max-h-56 overflow-hidden rounded-lg bg-gachon-100">
                    <Image
                      src={f.portraitSrc}
                      alt=""
                      fill
                      priority={index === 0}
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 90vw, 320px"
                    />
                  </div>
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-full bg-gachon-100 text-xl font-bold text-gachon-700">
                    {f.name.slice(0, 1)}
                  </div>
                )}
                <h2 className="mt-4 text-lg font-semibold text-gachon-900">
                  {f.name}
                </h2>
                <p className="text-sm text-gray-600">{f.position}</p>
                <p className="mt-2 text-sm text-gray-500">{f.researchArea}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
