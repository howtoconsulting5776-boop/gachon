"use client";

import { useCallback, useState } from "react";

const DOMAIN_ROWS = [
  {
    key: "acquisition",
    label: "신규 고객 획득 (Acquisition)",
    labelShort: "신규 획득",
    detail: "인지도 확보 및 리드 발굴",
  },
  {
    key: "conversion",
    label: "가치 제안 및 전환 (Conversion)",
    labelShort: "전환",
    detail: "접점 최적화 및 등록률 극대화",
  },
  {
    key: "retention",
    label: "유지 및 확장 (Retention)",
    labelShort: "유지·확장",
    detail: "이탈 방어 및 LTV 극대화",
  },
] as const;

const METHOD_COLUMNS = [
  {
    key: "branding",
    label: "브랜드 가치 제안",
    sub: "Branding",
    hint: "핵심 역량 규명 및 차별화",
  },
  {
    key: "cdj",
    label: "고객 여정 설계",
    sub: "CDJ & CX",
    hint: "인지-탐색-등록 경험 최적화",
  },
  {
    key: "imc",
    label: "통합 커뮤니케이션",
    sub: "IMC",
    hint: "온·오프라인 채널 믹스 전략",
  },
  {
    key: "relationship",
    label: "관계 마케팅",
    sub: "Relationship",
    hint: "행동 심리 및 로열티 구축",
  },
  {
    key: "productization",
    label: "서비스 제품화",
    sub: "Productization",
    hint: "수익 다각화 및 상품 기획",
  },
] as const;

const CELL_CONTENT: Record<string, string> = {
  "acquisition-branding":
    "교육 철학·핵심 강점(SWOT) 분석을 통한 포지셔닝 수립",
  "acquisition-cdj": "교육 소비자 탐색 경로(Search & Referral) 맵핑",
  "acquisition-imc":
    "지역 바이럴·타겟 키워드 노출 및 데이터 기반 콘텐츠 바이럴 기획",
  "acquisition-relationship":
    "잠재 고객(DB) 확보를 위한 초기 마케팅 접점(Touch-point) 설계",
  "acquisition-productization":
    "신규 유입을 견인하는 시그니처 진단 도구 및 특강 프로그램 기획",
  "conversion-branding": "프리미엄 가치 제안을 통한 고부가가치 서비스 브랜딩",
  "conversion-cdj": "인지 부조화 및 이탈 구간(Leaky Bucket) 진단·방어",
  "conversion-imc": "데이터 기반 설명회 기획 및 설득 커뮤니케이션 고도화",
  "conversion-relationship":
    "소비자 심리학 기반 서비스 제안 및 전환(Sales) 전략 설계",
  "conversion-productization":
    "행동 경제학·공간 심리학 기반 대면 환경(MOT) 리뉴얼",
  "retention-branding":
    "내부 고객(재원생) 자부심 고취를 위한 브랜드 스토리텔링",
  "retention-cdj": "생애주기(Life Cycle)별 맞춤형 교육 서비스 경험 제공",
  "retention-imc": "고객 만족도(CS) 평가 지표 도입 및 브랜드 커뮤니티 운영",
  "retention-relationship":
    "이탈 징후 예측 모델링 및 브랜드 팬덤(Fandom) 육성",
  "retention-productization":
    "자체 교육 콘텐츠(VOD·교재) 등 부가 가치 창출 모델 설계",
};

type Hover = { row?: number; col?: number };

export function EduBizMarketingMatrix() {
  const [hovered, setHovered] = useState<Hover | null>(null);

  const clear = useCallback(() => setHovered(null), []);

  return (
    <section
      className="space-y-4 break-keep"
      aria-labelledby="edubiz-marketing-matrix-heading"
    >
      <div>
        <h2
          id="edubiz-marketing-matrix-heading"
          className="text-lg font-semibold text-gachon-900"
        >
          마케팅 매트릭스 커리큘럼
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          세 가지 종단(성장 도메인)과 다섯 가지 횡단(마케팅 방법론)이 교차하는
          매트릭스 구조입니다. 가로는 마케팅 전략 도구 축, 세로는 교육
          비즈니스 도메인 축이며, 셀에 포인터를 올리면 같은 행·열이 함께
          강조됩니다.
        </p>
      </div>

      <div
        className="overflow-x-auto rounded-xl border border-gachon-100 bg-white shadow-sm"
        onMouseLeave={clear}
      >
        <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            에듀비즈니스 마케팅 LAB 매트릭스 커리큘럼. 세로 축은 신규 고객
            획득(Acquisition), 가치 제안 및 전환(Conversion), 유지 및
            확장(Retention)이고, 가로 축은 브랜드 가치 제안, 고객 여정 설계,
            통합 커뮤니케이션, 관계 마케팅, 서비스 제품화 다섯 가지 마케팅
            방법론입니다.
          </caption>
          <thead>
            <tr className="bg-gachon-900 text-white">
              <th
                scope="col"
                className="sticky left-0 z-20 min-w-[10rem] border-b border-r border-gachon-700 bg-gachon-900 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gachon-100"
              >
                도메인 / 방법론
              </th>
              {METHOD_COLUMNS.map((col, colIndex) => (
                <th
                  key={col.key}
                  scope="col"
                  onMouseEnter={() => setHovered({ col: colIndex })}
                  className={`border-b border-gachon-700 px-2 py-3 text-center text-xs font-semibold leading-snug md:px-3 md:text-[0.8rem] ${
                    hovered?.col === colIndex
                      ? "bg-gachon-600 text-white"
                      : ""
                  }`}
                >
                  <span className="block break-keep">{col.label}</span>
                  <span className="mt-0.5 block text-[0.7rem] font-medium uppercase tracking-wide text-gachon-200/90">
                    {col.sub}
                  </span>
                  <span className="mt-1 block font-normal text-gachon-200/90 md:text-[0.7rem]">
                    {col.hint}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOMAIN_ROWS.map((row, rowIndex) => (
              <tr
                key={row.key}
                className={
                  hovered != null &&
                  hovered.row === rowIndex &&
                  hovered.col === undefined
                    ? "bg-gachon-50/90"
                    : "bg-white"
                }
              >
                <th
                  scope="row"
                  onMouseEnter={() => setHovered({ row: rowIndex })}
                  className={`sticky left-0 z-10 border-b border-r border-gray-200 px-3 py-3 text-left align-top shadow-[4px_0_12px_-4px_rgba(0,20,40,0.12)] md:min-w-[12rem] ${
                    hovered != null &&
                    hovered.row === rowIndex &&
                    hovered.col === undefined
                      ? "bg-gachon-50"
                      : hovered != null &&
                          hovered.row === rowIndex &&
                          hovered.col !== undefined
                        ? "bg-gachon-50/70"
                        : "bg-white"
                  }`}
                >
                  <span className="font-semibold text-gachon-900 md:hidden">
                    {row.labelShort}
                  </span>
                  <span className="hidden font-semibold text-gachon-900 md:inline">
                    {row.label}
                  </span>
                  <span className="mt-1 block text-xs font-normal text-gray-600">
                    {row.detail}
                  </span>
                </th>
                {METHOD_COLUMNS.map((col, colIndex) => {
                  const activeRow =
                    hovered != null &&
                    hovered.row === rowIndex &&
                    hovered.col === undefined;
                  const activeRowFromCell =
                    hovered != null &&
                    hovered.row === rowIndex &&
                    hovered.col !== undefined;
                  const activeColOnly =
                    hovered != null &&
                    hovered.col === colIndex &&
                    hovered.row === undefined;
                  const activeColFromCell =
                    hovered != null &&
                    hovered.col === colIndex &&
                    hovered.row !== undefined;
                  const activeCell =
                    hovered?.row === rowIndex && hovered?.col === colIndex;
                  const activeRowHighlight = activeRow || activeRowFromCell;
                  const activeColHighlight =
                    activeColOnly || activeColFromCell;
                  const content =
                    CELL_CONTENT[`${row.key}-${col.key}`] ??
                    `${row.label}, ${col.label}`;

                  return (
                    <td
                      key={col.key}
                      className={`border-b border-gray-200 align-top transition-colors duration-150 ${
                        activeCell
                          ? "bg-primary/15 ring-2 ring-inset ring-primary/40"
                          : activeRowHighlight || activeColHighlight
                            ? "bg-gachon-50/80"
                            : "bg-white"
                      }`}
                      onMouseEnter={() =>
                        setHovered({ row: rowIndex, col: colIndex })
                      }
                      title={content}
                    >
                      <div className="flex min-h-[4rem] cursor-default items-center px-3 py-3 md:min-h-[5rem]">
                        <span className="text-xs leading-relaxed text-gray-700 break-keep md:text-[0.8rem]">
                          {content}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-relaxed text-gray-500 break-keep">
        고객 여정 설계(CDJ)는 정보 탐색에서 등록까지의 행동 심리학적 경로를
        규명하는 축이며, 관계 마케팅(Relationship)은 생애 가치(LTV)를
        극대화하고 이탈을 방어하는 브랜드적 축입니다. 표의 교차점은 학문적
        이론을 현장에 이식하는 실천 프레임워크이며, 실제 개설 과목은 학기별
        편제를 따릅니다.
      </p>
    </section>
  );
}
