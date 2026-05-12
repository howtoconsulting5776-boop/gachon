import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { verifyNewsletterSubscriberByToken } from "@/lib/newsletter/verify-subscriber";

interface Props {
  searchParams: { token?: string };
}

export const metadata: Metadata = {
  title: "뉴스레터 구독 확인",
  robots: { index: false, follow: false },
};

export default async function NewsletterVerifyPage({ searchParams }: Props) {
  const result = await verifyNewsletterSubscriberByToken(searchParams.token);

  if (result.ok === false && result.code === "NO_DB") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 break-keep">
        <h1 className="text-xl font-bold text-gachon-900">일시적으로 처리할 수 없습니다.</h1>
        <p className="mt-2 text-gray-600">잠시 후 다시 시도해 주세요.</p>
        <Link href="/" className="mt-6 inline-block text-gachon-600">
          홈으로
        </Link>
      </div>
    );
  }

  if (result.ok === false && result.code === "MISSING") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 break-keep">
        <h1 className="text-xl font-bold text-gachon-900">링크가 올바르지 않습니다.</h1>
        <p className="mt-2 text-gray-600">메일에 포함된 인증 링크 전체를 사용해 주세요.</p>
        <Link href="/" className="mt-6 inline-block text-gachon-600">
          홈으로
        </Link>
      </div>
    );
  }

  if (result.ok === false && result.code === "NOT_FOUND") {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 break-keep">
        <h1 className="text-xl font-bold text-gachon-900">인증 링크가 만료되었거나 이미 사용되었습니다.</h1>
        <p className="mt-2 text-gray-600">다시 구독 신청을 해 주세요.</p>
        <Link href="/" className="mt-6 inline-block text-gachon-600">
          홈으로
        </Link>
      </div>
    );
  }

  if (!result.ok) {
    return null;
  }

  return (
    <div>
      <PageHeader
        title="구독 인증 완료"
        description="뉴스레터 수신이 활성화되었습니다."
        breadcrumb={[
          { label: "홈", href: "/" },
          { label: "뉴스레터 인증" },
        ]}
      />
      <div className="mx-auto max-w-lg px-6 py-12 md:px-12 break-keep">
        <p className="text-gray-700">
          <strong className="text-gachon-900">{result.email}</strong> 주소로 모집·행사 소식을 보내 드립니다.
        </p>
        <p className="mt-6 text-sm text-gray-500">
          수신을 원하지 않으시면 메일 하단의 해지 링크를 이용해 주세요.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm font-medium text-gachon-600">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
