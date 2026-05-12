"use client";

import { useCallback, useState } from "react";

const DOMAIN_ROWS = [
  {
    key: "operation",
    label: "운영 체계 고도화",
    labelShort: "운영 고도화",
    detail: "조직 효율성 및 자동화",
  },
  {
    key: "human-capital",
    label: "인적 자본 관리",
    labelShort: "인적 자본",
    detail: "우수 인재 확보 및 코칭",
  },
  {
    key: "finance",
    label: "재무 및 수익 최적화",
    labelShort: "재무·수익",
    detail: "건전성 및 지속가능성",
  },
] as const;

const METHOD_COLUMNS = [
  {
    key: "diagnosis",
    label: "경영 진단",
    sub: "Strategic Diagnosis",
    hint: "경쟁 우위 및 비전 설계",
  },
  {
    key: "sop",
    label: "운영 표준화",
    sub: "SOP & Operation",
    hint: "암묵지의 시스템화",
  },
  {
    key: "data",
    label: "데이터 경영",
    sub: "Data & KPI",
    hint: "핵심성과지표 기반 진단",
  },
  {
    key: "hrm",
    label: "인적자원관리",
    sub: "HRM & Coaching",
    hint: "성과 보상 및 리더십 코칭",
  },
  {
    key: "risk",
    label: "리스크 관리",
    sub: "Risk Control",
    hint: "전사적 위기 대응 시나리오",
  },
] as const;

const CELL_CONTENT: Record<string, string> = {
  "operation-diagnosis":
    "교육 비즈니스 모델 진단 및 성공/실패 케이스 벤치마킹",
  "operation-sop": "신규 등록·상담·행정 등 반복 업무 체크리스트 제작",
  "operation-data":
    "객단가·등록률·퇴원율 등 우리 기관 핵심 지표 산출",
  "operation-hrm":
    "실장 및 스태프 직무 분석을 통한 업무 분장과 업무 매뉴얼화",
  "operation-risk":
    "서비스 품질 저하 방지 및 운영 중단 리스크 대응 SOP",
  "human-capital-diagnosis":
    "기관 철학에 부합하는 인재상 및 역량 모델링 설계",
  "human-capital-sop":
    "공고부터 면접까지 이어지는 ‘면접 킬러 질문 3가지’ 도출",
  "human-capital-data":
    "강사·컨설턴트별 매출 기여도 및 학생 유지율(Retention) 추적",
  "human-capital-hrm":
    "생계형·비전형 강사 동기부여 티칭 피드백·코칭 시나리오",
  "human-capital-risk":
    "핵심 인력 유출 방어 및 대표자 부재 시 조직 안정화",
  "finance-diagnosis":
    "기관 원가 구조(Cost Structure) 분석 및 비용 누수(Leakage) 진단",
  "finance-sop":
    "수강료·컨설팅비 징수 및 미납 관리 자동화 프로세스",
  "finance-data":
    "목표 이익 달성을 위한 손익분기점(BEP) 시뮬레이션",
  "finance-hrm":
    "객관적 지표에 기반한 합리적 수익 분배(Profit Sharing) 모델",
  "finance-risk":
    "고정비 폭증·매출 급감, 안전사고 발생 시 대응 시나리오",
};

type Hover = { row?: number; col?: number };

export function EduBizSystemMatrix() {
  const [hovered, setHovered] = useState<Hover | null>(null);

  const clear = useCallback(() => setHovered(null), []);

  return (
    <section
      className="space-y-4 break-keep"
      aria-labelledby="edubiz-system-matrix-heading"
    >
      <div>
        <h2
          id="edubiz-system-matrix-heading"
          className="text-lg font-semibold text-gachon-900"
        >
          시스템 경영 매트릭스 커리큘럼
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          세 가지 종단(경영 도메인)과 다섯 가지 횡단(경영 방법론)이 교차하는
          매트릭스 구조입니다. 가로는 경영 전략 도구 축, 세로는 교육 비즈니스
          도메인 축이며, 셀에 포인터를 올리면 같은 행·열이 함께 강조됩니다.
        </p>
      </div>

      <div
        className="overflow-x-auto rounded-xl border border-gachon-100 bg-white shadow-sm"
        onMouseLeave={clear}
      >
        <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            에듀비즈니스 시스템 LAB 매트릭스 커리큘럼. 세로 축은 운영 체계
            고도화, 인적 자본 관리, 재무 및 수익 최적화이고, 가로 축은 경영
            진단, 운영 표준화, 데이터 경영, 인적자원관리, 리스크 관리 다섯
            가지 경영 방법론입니다.
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
        업무 표준화(SOP)는 경영자 1인의 머릿속에 있던 암묵지를 명시적인 조직
        자산으로 변환하는 과정이며, 데이터 경영(KPI)은 직관에 의존하던
        의사결정을 과학적·객관적 체계로 전환하는 핵심 축입니다. 표의 교차점은
        실천 프레임워크이며, 실제 개설 과목은 학기별 편제를 따릅니다.
      </p>
    </section>
  );
}
