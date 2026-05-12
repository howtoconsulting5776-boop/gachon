import type { Metadata } from "next";

/**
 * 공개 정적 페이지용 메타데이터 (루트 layout의 title template·metadataBase와 합쳐짐).
 */
export function publicPageMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
