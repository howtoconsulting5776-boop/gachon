import Image from "next/image";

/** 극소형 JPEG — LCP 이미지 로드 전 레이아웃·색감 자리 확보용 */
const HERO_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCwAA8A/9k=";

/** LCP·접근성: 히어로 카피는 SSR에서도 즉시 보이게 (framer initial opacity 0 제거). */
export function Hero() {
  return (
    <section className="relative flex min-h-[600px] flex-col justify-center overflow-hidden md:min-h-[700px]">
      {/* 배경 캠퍼스 사진 — `npm run images:optimize` 후 동일 경로에 .webp 생성 가능 */}
      <Image
        src="/hero-campus.jpg"
        alt=""
        fill
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR_DATA_URL}
        className="object-cover object-center"
        sizes="100vw"
        quality={82}
      />
      {/* 가독성을 위한 네이비 오버레이 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gachon-900/85 via-gachon-900/70 to-gachon-700/55"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-6 py-20 md:items-center md:px-12 md:text-center">
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl break-keep">
          교육을 경영하라, 미래를 설계하라
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-xl break-keep md:mx-auto">
          가천대학교 경영대학원 에듀컨설팅 전공은 교육 산업의 다음 세대 리더를
          양성합니다.
        </p>
      </div>
    </section>
  );
}
