"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type GoalKey = "guidance" | "publication" | "phd";
type MethodKey = "quantitative" | "qualitative" | "mixed";

const GOALS: {
  key: GoalKey;
  label: string;
  hint: string;
}[] = [
  {
    key: "guidance",
    label: "학생 탐구·소논문 지도",
    hint: "체계적 코칭 역량",
  },
  {
    key: "publication",
    label: "학술지 논문 게재",
    hint: "KCI 등재지 등 투고",
  },
  {
    key: "phd",
    label: "박사과정 진학 준비",
    hint: "연구 실적·계획 정리",
  },
];

const METHODS: {
  key: MethodKey;
  label: string;
  hint: string;
}[] = [
  {
    key: "quantitative",
    label: "양적 연구",
    hint: "설문·통계로 관계 검증",
  },
  {
    key: "qualitative",
    label: "질적 연구",
    hint: "인터뷰·관찰·사례로 맥락 규명",
  },
  {
    key: "mixed",
    label: "혼합 연구",
    hint: "양·질 결합 설계",
  },
];

const ROADMAP_BY_PAIR: Record<`${GoalKey}-${MethodKey}`, string> = {
  "guidance-quantitative":
    "탐구 주제를 가설·변수로 정리하고, 설문·공개 자료 등 측정 가능한 근거로 보고서의 논리를 다집니다. 지도할 때 학생이 스스로 통계적 근거를 점검할 수 있도록 질문 구조를 설계하는 연습을 합니다.",
  "guidance-qualitative":
    "면담 기록·성찰 일지·관찰 노트를 자료화해 탐구 서사를 읽는 법을 익힙니다. 작은 주제에서 개념·이론으로 올라가는 코칭 문장과 근거 인용을 연습합니다.",
  "guidance-mixed":
    "질적 자료로 뽑은 범주를 양적으로 점검하거나, 통계 결과를 사례 인용으로 풀어 쓰는 구조를 완성합니다. 입시·세특 맥락에서 설득력 있는 탐구 글을 만드는 데 유리합니다.",
  "publication-quantitative":
    "가설·표본·분석 계획을 학술지 심사 관점에서 선명히 씁니다. 등재지 형식에 맞는 방법·결과·표기를 익히고, 재현 가능한 분석 서술을 다듬습니다.",
  "publication-qualitative":
    "분석 단위·코딩·타당성 논의를 체계화해 논문의 방법란을 완성합니다. 질적 자료의 한계와 기여를 분명히 쓰는 학술 문장을 연습합니다.",
  "publication-mixed":
    "혼합 설계(예: 탐색 후 검증)를 밝히고, 각 자료가 어떤 연구 질문을 답하는지 매핑합니다. 에듀컨설팅 현장 문제에 맞는 입체적 논문 설계를 지향합니다.",
  "phd-quantitative":
    "박사과정에서 요구되는 방법론·통계 역량의 기초를 다집니다. 석사 단계에서 분석 절차와 코드·자료를 남겨 재현성을 확보하는 습관을 기릅니다.",
  "phd-qualitative":
    "이론 샘플링·코딩 프레임·윤리 서술을 연구계획서 수준으로 끌어올립니다. 지도교수와 연구 어젠다를 맞추는 데 필요한 학술 언어를 익힙니다.",
  "phd-mixed":
    "혼합 연구의 통합 해석을 쓰는 연습을 하고, 단계별 성과를 박사 지원 서류·포트폴리오와 연결합니다. 장기 로드맵을 한 장으로 정리해 볼 수 있습니다.",
};

export function ResearchWritingRoadmap() {
  const [goal, setGoal] = useState<GoalKey>("guidance");
  const [method, setMethod] = useState<MethodKey>("quantitative");

  const summary = ROADMAP_BY_PAIR[`${goal}-${method}`];
  const goalMeta = GOALS.find((g) => g.key === goal)!;
  const methodMeta = METHODS.find((m) => m.key === method)!;

  const pickGoal = useCallback((k: GoalKey) => setGoal(k), []);
  const pickMethod = useCallback((k: MethodKey) => setMethod(k), []);

  return (
    <section
      className="space-y-6 break-keep"
      aria-labelledby="roadmap-heading"
    >
      <div>
        <h2
          id="roadmap-heading"
          className="text-lg font-semibold text-gachon-900"
        >
          나의 연구 로드맵 살펴보기
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          핵심 목표와 관심 있는 연구 방법론을 선택하면, 이 LAB에서 무엇을
          다져 가게 되는지 한 번에 짚어볼 수 있습니다.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-gachon-100 bg-gradient-to-b from-gachon-50/40 to-white p-5 md:p-6">
        <div>
          <p
            id="goal-legend"
            className="text-xs font-semibold uppercase tracking-wide text-gachon-600"
          >
            핵심 목표
          </p>
          <div
            className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
            role="group"
            aria-labelledby="goal-legend"
          >
            {GOALS.map((g) => (
              <button
                key={g.key}
                type="button"
                aria-pressed={goal === g.key}
                onClick={() => pickGoal(g.key)}
                className={cn(
                  "flex min-h-[3.25rem] flex-1 flex-col justify-center rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                  goal === g.key
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-gray-200 bg-white text-gray-800 hover:border-gachon-300 hover:bg-gachon-50/80"
                )}
              >
                <span className="font-semibold break-keep">{g.label}</span>
                <span
                  className={cn(
                    "mt-0.5 text-xs",
                    goal === g.key ? "text-primary-foreground/90" : "text-gray-500"
                  )}
                >
                  {g.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p
            id="method-legend"
            className="text-xs font-semibold uppercase tracking-wide text-gachon-600"
          >
            연구 방법론
          </p>
          <div
            className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
            role="group"
            aria-labelledby="method-legend"
          >
            {METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                aria-pressed={method === m.key}
                onClick={() => pickMethod(m.key)}
                className={cn(
                  "flex min-h-[3.25rem] flex-1 flex-col justify-center rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                  method === m.key
                    ? "border-gachon-600 bg-gachon-900 text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-800 hover:border-gachon-300 hover:bg-gachon-50/80"
                )}
              >
                <span className="font-semibold break-keep">{m.label}</span>
                <span
                  className={cn(
                    "mt-0.5 text-xs",
                    method === m.key ? "text-gachon-200" : "text-gray-500"
                  )}
                >
                  {m.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg border border-gray-200 bg-white p-4 md:p-5"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-medium text-gachon-600">
            선택: {goalMeta.label} × {methodMeta.label}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{summary}</p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        조합별 문구는 이해를 돕기 위한 참고용입니다. 세부 지도·개설 과목·논문
        심사 기준은 학기별 안내와 학칙을 따릅니다.
      </p>
    </section>
  );
}
