import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = {
  title: "검색",
};

function SearchFallback() {
  return (
    <div className="mx-auto max-w-screen-lg px-6 py-16 text-center text-gray-500 break-keep">
      검색 결과를 불러오는 중…
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchView />
    </Suspense>
  );
}
