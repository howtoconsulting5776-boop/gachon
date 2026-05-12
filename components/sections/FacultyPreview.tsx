import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MOCK_FACULTY } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { FacultyPortrait } from "@/components/faculty/FacultyPortrait";

function facultyBadge(position: string): string {
  if (position.includes("주임")) return "주임교수";
  return "전공교수";
}

export function FacultyPreview() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="faculty-preview-heading">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gachon-500">
              Faculty
            </p>
            <h2
              id="faculty-preview-heading"
              className="mt-2 text-2xl font-bold text-gachon-900 md:text-3xl break-keep"
            >
              현장과 학문을 잇는 교수진
            </h2>
          </div>
          <Button asChild variant="ghost" className="w-fit gap-1 text-gachon-700">
            <Link href="/faculty" className="break-keep">
              전체 보기
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {MOCK_FACULTY.map((f) => (
            <FacultyCard key={f.id} faculty={f} />
          ))}
        </div>

        <ul
          className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden"
          aria-label="교수진 미리보기"
        >
          {MOCK_FACULTY.map((f) => (
            <li key={f.id} className="w-[min(280px,85vw)] shrink-0 snap-center px-2">
              <FacultyCard faculty={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface FacultyCardProps {
  faculty: (typeof MOCK_FACULTY)[number];
}

function FacultyCard({ faculty }: FacultyCardProps) {
  const badge = facultyBadge(faculty.position);

  return (
    <Link
      href={`/faculty/${faculty.id}`}
      className="group block w-full max-w-[280px] md:max-w-none"
    >
      <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="relative aspect-square w-full min-h-0 min-w-0 overflow-hidden bg-gray-100">
          {faculty.portraitSrc ? (
            <FacultyPortrait
              fillContainer
              faculty={faculty}
              sizes="(max-width: 768px) 85vw, 33vw"
              enableHoverZoom
              imageAlt={`${faculty.name} 교수`}
            />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center bg-gachon-100 text-3xl font-semibold text-gachon-600">
              {faculty.name.slice(0, 1)}
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gachon-900/80 via-transparent to-transparent"
            aria-hidden
          />
          <span className="absolute bottom-3 left-3 rounded-md bg-gold-500 px-2.5 py-1 text-xs font-semibold text-gachon-900 break-keep">
            {badge}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gachon-900">{faculty.name}</h3>
          <p className="mt-1 text-sm text-gray-500 break-keep">{faculty.position}</p>
          <p className="mt-1 line-clamp-1 text-xs text-gray-600 break-keep">
            {faculty.researchArea}
          </p>
        </div>
      </article>
    </Link>
  );
}
