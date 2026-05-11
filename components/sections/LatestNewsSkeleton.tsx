/** LatestNews 데이터 로딩 중 스켈레톤 (Suspense fallback) */
export function LatestNewsSkeleton() {
  return (
    <section className="bg-white py-14 md:py-20" aria-busy="true" aria-label="최신 소식 로딩 중">
      <div className="mx-auto max-w-screen-xl px-6 md:px-12">
        <div className="mb-10 h-10 w-48 animate-pulse rounded-md bg-gray-200" />
        <ul className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <li key={i} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6">
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-5 w-full animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-[85%] max-w-full animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
        <div className="mt-16 border-t border-gray-100 pt-14">
          <div className="mb-8 h-9 w-40 animate-pulse rounded-md bg-gray-200" />
          <ul className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 w-[75%] max-w-full animate-pulse rounded bg-gray-200" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
