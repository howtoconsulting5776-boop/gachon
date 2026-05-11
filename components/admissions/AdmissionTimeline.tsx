import { MOCK_ADMISSION_SCHEDULE } from "@/lib/mock-data";

export function AdmissionTimeline() {
  return (
    <ol className="relative mx-auto max-w-3xl border-l border-gachon-100 pl-8 md:pl-10">
      {MOCK_ADMISSION_SCHEDULE.map((item) => (
        <li key={item.id} className="mb-10 last:mb-0">
          <span
            className="absolute -left-[9px] mt-1.5 size-4 rounded-full border-4 border-white bg-gold-500 shadow md:-left-[11px] md:size-5"
            aria-hidden
          />
          <time
            dateTime={item.date}
            className="text-sm font-semibold text-gachon-600"
          >
            {item.date}
          </time>
          <h3 className="mt-1 text-lg font-semibold text-gachon-900 break-keep">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-2 text-sm text-gray-600 break-keep">
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
