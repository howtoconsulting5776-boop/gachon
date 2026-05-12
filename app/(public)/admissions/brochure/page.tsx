import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { publicPageMetadata } from "@/lib/seo/page-meta";

export const metadata: Metadata = publicPageMetadata(
  "/admissions/brochure",
  "모집요강",
  "2026학년도 후기 가천대학교 경영대학원 신(편)입생 모집요강을 안내합니다."
);

const OFFICIAL_GUIDE_URL =
  "https://www.gachon.ac.kr/mana/3263/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGbWFuYSUyRjUwMSUyRjExOTY2NSUyRmFydGNsVmlldy5kbyUzRnBhZ2UlM0QxJTI2c3JjaENvbHVtbiUzRCUyNnNyY2hXcmQlM0QlMjZiYnNDbFNlcSUzRCUyNmJic09wZW5XcmRTZXElM0QlMjZyZ3NCZ25kZVN0ciUzRCUyNnJnc0VuZGRlU3RyJTNEJTI2aXNWaWV3TWluZSUzRGZhbHNlJTI2cGFzc3dvcmQlM0QlMjY%3D";

const ONLINE_APPLY_URL =
  "https://svc.gachon.ac.kr/ghjIndex.do?groupCd=33&passCd=N";

const schedule = [
  {
    label: "원서접수 (경영학과)",
    value: "2026. 5. 6.(수) ~ 6. 5.(금) · 24시간 인터넷 접수",
  },
  {
    label: "원서접수 (글로벌경영 MBA학과)",
    value: "2026. 4. 13.(월) ~ 6. 12.(금)",
  },
  { label: "전형일", value: "2026. 6. 20.(토)" },
  { label: "합격자 발표", value: "2026. 7. 3.(금) 14시" },
  { label: "합격자 등록기간", value: "2026. 7. 3.(금) ~ 7. 8.(수)" },
];

const fees = [
  { label: "일반석사", value: "40,000원" },
  { label: "글로벌경영(MBA)학과", value: "80,000원" },
];

export default function BrochurePage() {
  return (
    <div>
      <PageHeader
        title="모집요강"
        description="2026학년도 후기 가천대학교 경영대학원 신(편)입생 모집요강"
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "모집요강" },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-10 px-6 py-12 md:px-12">
        <section className="rounded-2xl border border-gachon-100 bg-gachon-50/50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-gachon-700">
            원문 출처
          </p>
          <p className="mt-2 text-gray-700 break-keep">
            본 페이지는 가천대학교 경영대학원에서 공지한 「2026학년도 후기
            경영대학원 신(편)입생 모집요강」(2026. 4. 17. 게시) 본문을 그대로
            정리한 안내입니다. 최종 확정 내용은 학교 공식 공지와 첨부 PDF를
            기준으로 합니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="gap-2">
              <a
                href={OFFICIAL_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" aria-hidden />
                학교 공식 모집요강 페이지
              </a>
            </Button>
            <Button asChild className="gap-2">
              <a
                href={ONLINE_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" aria-hidden />
                인터넷 원서접수 바로가기
              </a>
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gachon-900 break-keep md:text-2xl">
            1. 모집인원
          </h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
            <li>신입학: 17명 【석사학위과정(정원 내) 통합 정원】</li>
            <li>편입학: 여석 한도 내에서 모집 (모집차수: 3차)</li>
          </ul>
          <p className="text-sm text-gray-600 break-keep">
            ■ 취득 학위명: Master of Business Administration (경영학석사)
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gachon-900 break-keep md:text-2xl">
            2. 지원자격
          </h2>

          <div className="space-y-2">
            <h3 className="font-semibold text-gachon-800">■ 신입학</h3>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
              <li>국내외 대학의 학사학위 소지자 및 2026년 8월 졸업 예정자</li>
              <li>
                관련 법령에 의하여 이와 동등한 학력이 있다고 교육부장관이
                인정하는 자
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gachon-800">■ 편입학</h3>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
              <li>타 대학원의 유사학과·유사전공인 자</li>
              <li>
                타 대학원 재학기간 2학기 이상 수료하고 12학점 이상 취득한 자
              </li>
              <li>
                관련 법령에 의하여 이와 동등한 학력이 있다고 교육부장관이
                인정하는 자
              </li>
            </ul>
            <p className="text-sm text-gray-600 break-keep">
              단, 학점인정은 본 대학원의 개설과목과 같거나 유사한 과목으로 그
              성적이 B학점 이상에 한합니다.
            </p>
          </div>

          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 break-keep">
            ※ 본원 「경영학과」는 수업 일정이 주로 평일 야간에 편성되어 있어,
            외국인 유학생의 지원을 받지 않습니다.
          </p>

          <div className="rounded-lg border border-gachon-200 bg-gachon-50/60 px-4 py-3 text-sm text-gachon-900 break-keep">
            <p className="font-semibold">에듀컨설팅 전공 운영 안내</p>
            <p className="mt-1 leading-relaxed">
              위 학과 공통 안내(평일 야간 편성)와 달리, 에듀컨설팅 전공은 현직
              교육산업 전문가의 학습 지속성을 위해 <strong>주 1회 금요일 오전
              (9:00~14:40)</strong> 트랙으로 운영됩니다. 학기별 시간표는 사전
              안내됩니다.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gachon-900 break-keep md:text-2xl">
            3. 전형일정
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {schedule.map((row) => (
                  <tr key={row.label} className="bg-white">
                    <th
                      scope="row"
                      className="w-1/3 bg-gray-50 px-4 py-3 align-top font-semibold text-gachon-900 break-keep"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 align-top text-gray-700 break-keep">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gachon-900 break-keep md:text-2xl">
            4. 접수방법
          </h2>

          <div className="space-y-2">
            <h3 className="font-semibold text-gachon-800">
              ■ 인터넷 접수 (경영학과)
            </h3>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 break-keep">
              <li>2026. 5. 6.(수) ~ 6. 5.(금) · 24시간 접수 가능</li>
              <li>
                경영대학원 홈페이지 상단「2026학년도 후기 경영대학원 신(편)입생
                모집 원서접수」클릭 →{" "}
                <a
                  href={ONLINE_APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gachon-700 underline underline-offset-2 hover:text-gachon-900"
                >
                  원서접수 사이트
                </a>
              </li>
              <li>
                기본정보에서 필수입력 사항을 우선 저장 후 나머지 정보를 기입해
                주세요.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gachon-800">
              ■ 인터넷 접수 후 입학원서(출력분) 및 원본서류 제출
            </h3>
            <p className="leading-relaxed text-gray-700 break-keep">
              등기우편 제출주소: (13120) 경기도 성남시 수정구 성남대로 1342
              가천대학교 가천관 801호 · 경영대학원 행정실 귀중
            </p>
            <p className="text-sm text-gray-600 break-keep">
              ※ 등기우편 발송 시 2026. 6. 8.(월)까지 도착분에 한하여 최종 원서
              접수가 확인되며, 방문 접수도 가능합니다.
            </p>
          </div>

          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 break-keep">
            <li>
              경영학과 인적자원개발전공은 군 복무 중인 「재직 군인」을 대상으로
              하는 전공입니다.
            </li>
            <li>
              글로벌경영(MBA)학과는 입학원서 및 세부 제출서류 확인을 위해 방문
              접수 또는 우편 접수를 원칙으로 합니다.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gachon-900 break-keep md:text-2xl">
            5. 전형료
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {fees.map((row) => (
                  <tr key={row.label} className="bg-white">
                    <th
                      scope="row"
                      className="w-1/2 bg-gray-50 px-4 py-3 align-top font-semibold text-gachon-900 break-keep"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700 break-keep">
            <p>입금계좌: 하나은행 559-910034-03804 · 가천대학교</p>
            <p className="mt-1 text-gray-600">
              ※ 반드시 지원자 본인 명의로 입금하여야 하며, 입금 시 「본인성명 +
              전공」을 함께 명기해 주세요.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gachon-900 break-keep">
            기타 안내
          </h2>
          <p className="mt-2 text-gray-700 break-keep">
            기타 자세한 사항은 학교 공식 페이지의 첨부파일「2026학년도 후기
            경영대학원 신(편)입생 모집요강.pdf」를 참고해 주세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="gap-2">
              <a
                href={OFFICIAL_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" aria-hidden />
                학교 공식 페이지에서 PDF 보기
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admissions/inquiry">입학 상담 문의</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
