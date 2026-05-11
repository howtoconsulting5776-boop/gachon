import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  /** Shown next to the title (e.g. small mark graphic). */
  children?: ReactNode;
  /** Decorative cover image; shown at full width on small screens, column on md+. */
  heroImage?: {
    src: string;
    alt: string;
    priority?: boolean;
    /** 가로 단체사진 등: 잘리지 않게 맞출 때 `contain`. 기본은 `cover`. */
    objectFit?: "cover" | "contain";
    /**
     * `fixed`(기본): 고정 비율 박스 + fill(사진용).
     * `intrinsic`: 이미지 비율·픽셀에 맞춰 figure가 줄어듦(로고·그래픽용).
     */
    layout?: "fixed" | "intrinsic";
    /** `layout: "intrinsic"`일 때 next/image 비율·CLS용(파일 실제 비율과 맞출 것). */
    intrinsicWidth?: number;
    intrinsicHeight?: number;
  };
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  children,
  heroImage,
}: PageHeaderProps) {
  return (
    <header className="border-b border-gray-100 bg-gradient-to-b from-gachon-50/40 to-white">
      <div className="mx-auto max-w-screen-xl px-6 py-10 md:px-12 md:py-14">
        <div
          className={
            heroImage
              ? cn(
                  "grid gap-6 sm:gap-8 md:items-center",
                  heroImage.layout === "intrinsic"
                    ? "md:grid-cols-[minmax(0,1fr)_max-content]"
                    : "md:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,380px))]"
                )
              : undefined
          }
        >
          <div className="min-w-0">
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
                <ol className="flex flex-wrap gap-2 break-keep">
                  {breadcrumb.map((b, i) => (
                    <li key={`${b.label}-${i}`} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden>/</span>}
                      {b.href ? (
                        <Link href={b.href} className="hover:text-gachon-600">
                          {b.label}
                        </Link>
                      ) : (
                        <span className="text-gray-800">{b.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {children != null && children !== false ? (
              <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
                <h1 className="min-w-0 text-3xl font-bold tracking-tight text-gachon-900 md:text-4xl break-keep">
                  {title}
                </h1>
                <div className="flex justify-end sm:items-center sm:justify-end">
                  {children}
                </div>
              </div>
            ) : (
              <h1 className="text-3xl font-bold tracking-tight text-gachon-900 md:text-4xl break-keep">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-3 max-w-2xl text-gray-600 break-keep">{description}</p>
            )}
          </div>
          {heroImage &&
            (heroImage.layout === "intrinsic" ? (
              <figure
                className={cn(
                  "m-0 w-max max-w-[min(100%,380px)] shrink-0 justify-self-end overflow-hidden rounded-2xl border border-gray-100 bg-transparent leading-none shadow-sm md:justify-self-end"
                )}
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.intrinsicWidth ?? 800}
                  height={heroImage.intrinsicHeight ?? 800}
                  className="block h-auto max-h-40 w-auto max-w-[min(100%,380px)] object-contain sm:max-h-44 md:max-h-[17rem] md:max-w-[min(100%,380px)]"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 42vw, 100vw"
                  priority={heroImage.priority}
                />
              </figure>
            ) : (
              <figure
                className={cn(
                  "relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm",
                  "h-40 sm:h-44",
                  "md:h-auto md:max-h-[17rem] md:w-full md:aspect-[5/3]"
                )}
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className={cn(
                    heroImage.objectFit === "contain" ? "object-contain" : "object-cover",
                    "object-center"
                  )}
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 42vw, 100vw"
                  priority={heroImage.priority}
                />
              </figure>
            ))}
        </div>
      </div>
    </header>
  );
}
