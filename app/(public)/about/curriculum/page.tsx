import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MOCK_CURRICULUM } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "커리큘럼",
};

export default function CurriculumPage() {
  return (
    <div>
      <PageHeader
        title="커리큘럼"
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "전공소개", href: "/about/greeting" },
          { label: "커리큘럼" },
        ]}
        heroImage={{
          src: "/images/site/infinity.webp",
          alt: "",
          layout: "intrinsic",
          intrinsicWidth: 800,
          intrinsicHeight: 480,
        }}
      />
      <div className="mx-auto max-w-screen-lg space-y-12 px-6 py-12 md:px-12">
        <section>
          <h2 className="text-lg font-semibold text-gachon-900 break-keep">
            공통과목
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">코드</th>
                  <th className="px-4 py-3 font-medium">과목명</th>
                  <th className="px-4 py-3 font-medium">학점</th>
                  <th className="px-4 py-3 font-medium">학기</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CURRICULUM.common.map((c) => (
                  <tr key={c.code} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">{c.code}</td>
                    <td className="px-4 py-3 break-keep">{c.name}</td>
                    <td className="px-4 py-3">{c.credit}</td>
                    <td className="px-4 py-3">{c.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gachon-900 break-keep">
            전공과목
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">코드</th>
                  <th className="px-4 py-3 font-medium">과목명</th>
                  <th className="px-4 py-3 font-medium">학점</th>
                  <th className="px-4 py-3 font-medium">학기</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CURRICULUM.major.map((c) => (
                  <tr key={c.code} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-mono text-xs">{c.code}</td>
                    <td className="px-4 py-3 break-keep">{c.name}</td>
                    <td className="px-4 py-3">{c.credit}</td>
                    <td className="px-4 py-3">{c.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
