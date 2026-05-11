import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventRegisterButton } from "@/components/admissions/EventRegisterButton";
import { listEvents } from "@/lib/data/events";
import { isDatabaseConfigured } from "@/lib/data/posts";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "설명회 안내",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await listEvents("upcoming");
  const canRegister = isDatabaseConfigured();

  return (
    <div>
      <PageHeader
        title="설명회 안내"
        description="일정은 모집요강·공지와 함께 확인해 주세요. 데이터베이스가 연결된 환경에서 사전 등록을 받습니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "입학 안내", href: "/admissions" },
          { label: "설명회" },
        ]}
      />
      <div className="mx-auto max-w-screen-lg space-y-6 px-6 py-12 md:px-12">
        {events.length === 0 ? (
          <p className="text-gray-600 break-keep">
            예정된 설명회 일정이 없습니다. 지난 일정은 공지 또는 입학 안내를 참고해 주세요.
          </p>
        ) : null}
        {events.map((e) => (
          <article
            key={e.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm break-keep"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {e.type === "online"
                  ? "온라인"
                  : e.type === "offline"
                    ? "오프라인"
                    : "하이브리드"}
              </Badge>
              {e.capacity != null && (
                <span className="text-xs text-gray-500">
                  정원 {e.capacity}명
                  {canRegister ? ` · 신청 ${e.registeredCount}명` : null}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-gachon-900">{e.title}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {new Date(e.startAt).toLocaleString("ko-KR", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            {e.location && (
              <p className="mt-1 text-sm text-gray-600">장소 · {e.location}</p>
            )}
            <EventRegisterButton
              eventId={e.id}
              eventTitle={e.title}
              capacity={e.capacity}
              registeredCount={e.registeredCount}
              canRegister={canRegister}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
