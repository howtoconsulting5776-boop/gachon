import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { NewsletterSubscribe } from "@/components/layout/NewsletterSubscribe";

const sitemap1 = [
  { label: "전공소개", href: "/about/greeting" },
  { label: "비전 및 목표", href: "/about/vision" },
  { label: "커리큘럼", href: "/about/curriculum" },
  { label: "교수진", href: "/faculty" },
  { label: "연구실", href: "/labs" },
];

const sitemap2 = [
  { label: "모집 일정", href: "/admissions/schedule" },
  { label: "입학 상담", href: "/admissions/inquiry" },
  { label: "공지사항", href: "/community/notice" },
  { label: "갤러리", href: "/community/gallery" },
  { label: "자료실", href: "/resources" },
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-gold-500/20 bg-gachon-900 text-gray-300"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-10 md:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 break-keep">
              <Image
                src="/gachon-marklogo.png"
                alt="가천대학교"
                width={204}
                height={215}
                className="h-16 w-auto max-w-[220px] object-contain object-left md:h-20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
              />
              <span className="font-semibold text-white break-keep">
                에듀컨설팅 전공
              </span>
            </div>
            <p className="text-sm leading-relaxed break-keep">
              (13112) 경기도 성남시 수정구 성남대로 1342
              <br />
              가천대학교 경영대학원 에듀컨설팅 전공
            </p>
            <p className="text-sm break-keep">
              <span className="text-gray-400">사무실</span> 031-750-0000
              <br />
              <span className="text-gray-400">이메일</span> educonsulting@gachon.ac.kr
            </p>
            <div className="flex gap-3" aria-label="소셜 미디어">
              <a
                href="https://www.instagram.com"
                className="rounded-full border border-white/20 p-2 transition-colors hover:border-white hover:text-white"
                aria-label="인스타그램"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.youtube.com"
                className="rounded-full border border-white/20 p-2 transition-colors hover:border-white hover:text-white"
                aria-label="유튜브"
              >
                <Youtube className="size-4" />
              </a>
              <a
                href="https://www.facebook.com"
                className="rounded-full border border-white/20 p-2 transition-colors hover:border-white hover:text-white"
                aria-label="페이스북"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-500">
              소개 · 연구
            </h3>
            <ul className="space-y-2 text-sm">
              {sitemap1.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white break-keep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-500">
              입학 · 커뮤니티
            </h3>
            <ul className="space-y-2 text-sm">
              {sitemap2.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-white break-keep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-500">
              정책
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/privacy"
                  className="font-semibold text-white underline underline-offset-4 break-keep"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="transition-colors hover:text-white break-keep"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/accessibility"
                  className="transition-colors hover:text-white break-keep"
                >
                  웹 접근성 안내
                </Link>
              </li>
              <li>
                <a
                  href="https://www.gachon.ac.kr"
                  className="transition-colors hover:text-white break-keep"
                  target="_blank"
                  rel="noreferrer"
                >
                  가천대학교 홈페이지
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-500">
            뉴스레터
          </h3>
          <NewsletterSubscribe />
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Gachon University Graduate School of
            Business. All rights reserved.
          </p>
          <p className="break-keep">
            사이트 내 연락처·일정은 목업이며, 확정 정보는 모집요강 및 학과
            공지를 따릅니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
