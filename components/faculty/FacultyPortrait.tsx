import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MockFaculty } from "@/lib/mock-data";

interface FacultyPortraitBase {
  faculty: MockFaculty;
  sizes: string;
  priority?: boolean;
  /** 카드에 `group`이 있을 때 호버 살짝 확대 */
  enableHoverZoom?: boolean;
  imageAlt?: string;
  className?: string;
}

interface FacultyPortraitBoxed extends FacultyPortraitBase {
  /** 부모가 비율 박스일 때 꽉 채움(예: 미리보기 정사각) */
  fillContainer: true;
  aspectClassName?: undefined;
}

interface FacultyPortraitAspect extends FacultyPortraitBase {
  fillContainer?: false;
  /** 단독 사용 시 비율 클래스 (예: `aspect-[4/5]`) */
  aspectClassName: string;
}

export type FacultyPortraitProps = FacultyPortraitBoxed | FacultyPortraitAspect;

export function FacultyPortrait(props: FacultyPortraitProps) {
  const {
    faculty,
    sizes,
    priority,
    enableHoverZoom = false,
    imageAlt,
    className,
  } = props;
  const fillContainer = "fillContainer" in props && props.fillContainer === true;

  const objectPosition = faculty.portraitObjectPosition ?? "center top";
  const zoom = faculty.portraitZoom ?? 1;
  const origin = faculty.portraitTransformOrigin ?? "center top";
  const alt = imageAlt ?? `${faculty.name} 교수`;

  const aspectClassName =
    !fillContainer && "aspectClassName" in props
      ? props.aspectClassName
      : "";

  if (!faculty.portraitSrc) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gachon-100 text-3xl font-semibold text-gachon-600",
          fillContainer ? "absolute inset-0" : cn("relative w-full", aspectClassName),
          className
        )}
      >
        {faculty.name.slice(0, 1)}
      </div>
    );
  }

  const shell =
    fillContainer
      ? "absolute inset-0 min-h-0 min-w-0"
      : cn("relative w-full min-h-0", aspectClassName);

  return (
    <div className={cn("overflow-hidden bg-gray-100", shell, className)}>
      {/* `fill` 이미지는 흐름에서 빠지므로 부모는 반드시 `absolute inset-0`로 박스와 동일한 영역을 가짐 */}
      <div
        className={cn(
          "absolute inset-0 min-h-0 min-w-0 overflow-hidden",
          enableHoverZoom &&
            "transition-transform duration-300 ease-out group-hover:scale-105"
        )}
      >
        <div
          className="absolute inset-0 min-h-0 min-w-0"
          style={{
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: origin,
          }}
        >
          <Image
            src={faculty.portraitSrc}
            alt={alt}
            fill
            priority={priority}
            className="object-cover min-h-full min-w-full"
            style={{ objectPosition }}
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  );
}
