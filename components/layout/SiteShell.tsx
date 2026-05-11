import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyAdmissionCta } from "@/components/sections/StickyAdmissionCta";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col pb-20 md:pb-0">
      <Header />
      <main id="main" className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <StickyAdmissionCta />
    </div>
  );
}
