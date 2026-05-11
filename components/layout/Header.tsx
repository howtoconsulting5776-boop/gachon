"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { MAIN_NAV, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NavClickItemProps {
  item: NavItem;
  openKey: string | null;
  setOpenKey: React.Dispatch<React.SetStateAction<string | null>>;
}

/** 상위만 표시 · 클릭 시 하위 패널 (호버 아님) */
function NavClickItem({ item, openKey, setOpenKey }: NavClickItemProps) {
  const pathname = usePathname();
  const isOpen = openKey === item.label;
  const panelId = `nav-submenu-${item.label.replace(/\s+/g, "-")}`;
  const active =
    pathname === item.href ||
    item.submenu?.some(
      (s) => pathname === s.href || pathname.startsWith(`${s.href}/`)
    );

  if (!item.submenu?.length) {
    return (
      <Link
        href={item.href}
        className={cn(
          "inline-flex shrink-0 items-center px-1.5 py-2 text-xs font-medium text-gray-700 transition-colors hover:text-gachon-600 break-keep sm:px-2 sm:text-sm md:px-2.5",
          active && "text-gachon-600"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpenKey((k) => (k === item.label ? null : item.label))}
        className={cn(
          "inline-flex items-center gap-0.5 px-1.5 py-2 text-xs font-medium text-gray-700 transition-colors hover:text-gachon-600 break-keep sm:px-2 sm:text-sm md:px-2.5",
          active && "text-gachon-600"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3 shrink-0 opacity-70 transition-transform duration-200 sm:size-3.5",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="menu"
          aria-labelledby={`${panelId}-trigger`}
          className="absolute left-0 top-full z-[120] min-w-[200px] pt-1 sm:min-w-[220px]"
        >
          <div className="rounded-lg border border-gray-200 bg-white py-1.5 shadow-md">
            {item.submenu.map((sub) => (
              <Link
                key={sub.href}
                role="menuitem"
                href={sub.href}
                onClick={() => setOpenKey(null)}
                className="block px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gachon-50 hover:text-gachon-700 break-keep"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQ, setSearchQ] = React.useState("");
  const navRootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpenKey(null);
  }, [pathname]);

  React.useEffect(() => {
    if (openKey === null) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (navRootRef.current && !navRootRef.current.contains(t)) {
        setOpenKey(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] overflow-visible transition-[background-color,border-color] duration-200",
        scrolled || !isHome
          ? "border-b border-gray-200/80 bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-screen-xl overflow-visible px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-y-2 overflow-visible py-2 md:min-h-[72px] md:flex-nowrap md:gap-x-4 md:gap-y-0 md:py-0">
          <Link
            href="/"
            className="order-1 flex min-w-0 shrink-0 items-center gap-2 break-keep sm:gap-3"
          >
            <Image
              src="/gachon-marklogo.png"
              alt="가천대학교"
              width={204}
              height={215}
              className="h-9 w-auto sm:h-[52px] md:h-[58px]"
              priority
              sizes="(max-width: 768px) 160px, 220px"
            />
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="text-xs font-medium text-gray-500">
                경영대학원
              </span>
              <span className="text-sm font-semibold text-gachon-900 md:text-base">
                에듀컨설팅 전공
              </span>
            </span>
          </Link>

          <div className="order-2 ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 md:order-3 md:ml-0 md:gap-2">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-700"
                  aria-label="검색"
                >
                  <Search className="size-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="gap-4 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="break-keep">통합 검색</DialogTitle>
                </DialogHeader>
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = searchQ.trim();
                    if (!q) return;
                    setSearchOpen(false);
                    window.location.href = `/search?q=${encodeURIComponent(q)}`;
                  }}
                >
                  <Input
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder="키워드를 입력하세요"
                    aria-label="검색어"
                    className="break-keep"
                  />
                  <Button type="submit">검색</Button>
                </form>
                <p className="text-xs text-muted-foreground break-keep">
                  프론트 목업입니다. 검색 결과 페이지에서 목 데이터가 표시됩니다.
                </p>
              </DialogContent>
            </Dialog>

            <Button asChild size="sm" className="shrink-0 text-xs sm:text-sm">
              <Link href="/admissions/inquiry" className="break-keep">
                입학 상담
              </Link>
            </Button>
          </div>

          <div
            ref={navRootRef}
            id="main-nav-root"
            className="order-3 flex w-full basis-full justify-center overflow-visible md:order-2 md:w-auto md:basis-auto md:min-w-0 md:flex-1 md:px-2"
          >
            <nav
              className="flex flex-wrap items-center justify-center gap-x-0.5 overflow-visible md:flex-nowrap md:gap-x-1 xl:gap-x-2"
              aria-label="주 메뉴"
            >
              {MAIN_NAV.map((item) => (
                <NavClickItem
                  key={item.label}
                  item={item}
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
