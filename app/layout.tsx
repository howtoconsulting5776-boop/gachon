import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/defaults";
import { getPublicSiteRoot } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getPublicSiteRoot();

function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const naver = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION?.trim();
  if (!google && !naver) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(naver ? { other: { "naver-site-verification": naver } } : {}),
  };
}

const verification = siteVerification();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...(verification ? { verification } : {}),
  title: {
    default: "가천대학교 경영대학원 에듀컨설팅 전공",
    template: "%s | 가천대학교 경영대학원 에듀컨설팅 전공",
  },
  description:
    "교육과 경영의 융합으로 교육 산업의 다음 세대 리더를 양성하는 경영대학원 에듀컨설팅 전공 공식 홈페이지입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "가천대학교 경영대학원 에듀컨설팅 전공",
    title: "가천대학교 경영대학원 에듀컨설팅 전공",
    description:
      "교육을 경영하라, 미래를 설계하라. 경영대학원 소속 에듀컨설팅 전공의 공식 안내와 LAB·입학 정보를 제공합니다.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "가천대학교 경영대학원 에듀컨설팅 전공",
    description:
      "교육과 경영의 융합으로 교육 산업의 다음 세대 리더를 양성하는 경영대학원 에듀컨설팅 전공 공식 홈페이지입니다.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-pretendard antialiased text-gray-900">
        <SiteJsonLd />
        <a
          href="#main"
          className="skip-link sr-only"
        >
          본문으로 바로가기
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
