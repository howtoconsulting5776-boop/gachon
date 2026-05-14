"use client";

import { useCallback, useState } from "react";

const DOMAIN_ROWS = [
  {
    key: "career",
    label: "진로·진학 컨설팅",
    labelShort: "진로·진학",
    detail: "데이터 기반 진로 설계·입시 전략",
  },
  {
    key: "learning",
    label: "학습관리 컨설팅",
    labelShort: "학습관리",
    detail: "성향 분석·맞춤 성취 추적",
  },
  {
    key: "biz",
    label: "에듀비즈니스 경영 컨설팅",
    labelShort: "에듀비즈니스",
    detail: "하이브리드 리더십·운영 자동화",
  },
] as const;

const TECH_COLUMNS = [
  {
    key: "vibe",
    label: "바이브 코딩",
    hint: "AI 도구로 프로토타입·서비스 시제작",
  },
  {
    key: "prompt",
    label: "프롬프트 엔지니어링",
    hint: "목적에 맞는 지시·평가 설계",
  },
  { key: "rag", label: "RAG", hint: "기관 데이터 기반 신뢰형 응답" },
  {
    key: "finetune",
    label: "파인튜닝",
    hint: "도메인 특화 모델 미세 조정",
  },
  {
    key: "agent",
    label: "에이전트 설계",
    hint: "진단·제안을 수행하는 어시스턴트",
  },
  {
    key: "harness",
    label: "지식 하네스",
    hint: "문헌·지식 통합 워크플로",
  },
  {
    key: "ontology",
    label: "지식 온톨로지",
    hint: "개념·관계·용어 체계 설계",
  },
] as const;

/** 교차점별 짧은 힌트(툴팁·스크린리더) */
const CELL_HINTS: Record<string, string> = {
  "career-vibe": "진로 설문·상담 흐름을 빠르게 시제작",
  "career-prompt": "상담 목표별 프롬프트 체계화",
  "career-rag": "학생 이력·제도 DB를 연결한 Q&A",
  "career-finetune": "진로·입시 도메인 특화 응답",
  "career-agent": "상담 단계를 안내하는 에이전트",
  "career-harness": "입시·진로 문헌·내부 자료 통합",
  "learning-vibe": "학습 리포트·대시보드 목업",
  "learning-prompt": "피드백 문구·루브릭 자동 초안",
  "learning-rag": "과목·출결 데이터 기반 분석 응답",
  "learning-finetune": "기관 맞춤 학습 코치 톤",
  "learning-agent": "학습 경로 제안 어시스턴트",
  "learning-harness": "교재·평가 문항 지식베이스",
  "biz-vibe": "운영 화면·내부 도구 프로토타입",
  "biz-prompt": "마케팅·인사 문안 설계 자동화",
  "biz-rag": "원가·CRM 데이터 연동 인사이트",
  "biz-finetune": "기관 톤·정책 반영 응답",
  "biz-agent": "일정·리소스 배치 보조 에이전트",
  "biz-harness": "규정·계약·지표 문서 통합",
  "career-ontology": "진로·전형·교과 개념과 상위·하위 관계 정식화",
  "learning-ontology": "역량·단원·평가 지표를 동일 스키마로 연결",
  "biz-ontology": "조직·계약·서비스 단위의 용어·정책 그래프",
};

type Hover = { row?: number; col?: number };

export function AiTechEduCurriculumMatrix() {
  const [hovered, setHovered] = useState<Hover | null>(null);

  const clear = useCallback(() => setHovered(null), []);

  return (
    <section className="space-y-4 break-keep" aria-labelledby="matrix-heading">
      <div>
        <h2
          id="matrix-heading"
          className="text-lg font-semibold text-gachon-900"
        >
          입체적 융합 커리큘럼
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 break-keep">
          세 가지 종단(적용 도메인)과 일곱 가지 횡단(기술 방법론)이 교차합니다.
          가로는 기술 축, 세로는 현장 도메인 축입니다. 셀에 포인터를 올리면 같은
          행·열이 함께 강조됩니다. 위 본문에서 다루는 것처럼 린 스타트업·애자일
          운영·OKR·디자인 씽킹은 이 매트릭스와 병행해, 가설 검증과 우선순위
          정렬을 실무 프로젝트에 묶어 가는 흐름으로 이어집니다.
        </p>
      </div>

      <div
        className="overflow-x-auto rounded-xl border border-gachon-100 bg-white shadow-sm"
        onMouseLeave={clear}
      >
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm md:min-w-[58rem]">
          <caption className="sr-only">
            AI 테크에듀 LAB 커리큘럼 매트릭스. 세로 축은 진로·진학, 학습관리,
            에듀비즈니스 경영 컨설팅이고, 가로 축은 바이브 코딩부터 지식 온톨로지까지
            일곱 가지 기술 영역입니다.
          </caption>
          <thead>
            <tr className="bg-gachon-900 text-white">
              <th
                scope="col"
                className="sticky left-0 z-20 min-w-[9.5rem] border-b border-r border-gachon-700 bg-gachon-900 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-gachon-100"
              >
                도메인 / 기술
              </th>
              {TECH_COLUMNS.map((col, colIndex) => (
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
                  <span className="break-keep">{col.label}</span>
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
                  className={`sticky left-0 z-10 border-b border-r border-gray-200 px-3 py-3 text-left align-top shadow-[4px_0_12px_-4px_rgba(0,20,40,0.12)] md:min-w-[11rem] ${
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
                {TECH_COLUMNS.map((col, colIndex) => {
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
                  const hint =
                    CELL_HINTS[`${row.key}-${col.key}`] ?? `${row.label}, ${col.label}`;

                  return (
                    <td
                      key={col.key}
                      className={`border-b border-gray-200 p-0 transition-colors duration-150 ${
                        activeCell
                          ? "bg-primary/15 ring-2 ring-inset ring-primary/40"
                          : activeRowHighlight || activeColHighlight
                            ? "bg-gachon-50/80"
                            : "bg-white"
                      }`}
                      onMouseEnter={() =>
                        setHovered({ row: rowIndex, col: colIndex })
                      }
                      title={hint}
                    >
                      <div
                        className="flex min-h-[2.75rem] cursor-default items-center justify-center px-1 md:min-h-[3.25rem]"
                        aria-label={hint}
                      >
                        <span className="text-gachon-300 select-none">·</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-relaxed text-gray-500">
        지식 하네스는 문헌·데이터를 워크플로에 묶는 축이고, 지식 온톨로지는
        개념·관계·용어를 그래프로 고정해 RAG·에이전트·검색이 같은 의미 체계 위에서
        동작하도록 하는 축입니다. 표의 교차점은 결합 과제를 상상하는 참고 틀이며,
        실제 개설 과목명과 진도는 학기별 안내를 따릅니다.
      </p>
    </section>
  );
}
