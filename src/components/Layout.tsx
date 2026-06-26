import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui";
import {
  AnimatedBackground,
  CustomCursor,
  ScrollProgressBar,
  BackToTop,
  CookieConsent,
  Toasts,
} from "@/components/effects";
import { CommandPalette } from "@/components/CommandPalette";
import { AiAssistant } from "@/components/AiAssistant";
import { useApp } from "@/lib/store";

export function Layout({ children }: { children: ReactNode }) {
  const { trackPage } = useApp();
  const location = useLocation();

  useEffect(() => {
    trackPage();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, trackPage]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <AiAssistant />
      <CommandPalette />
      <Toasts />
    </div>
  );
}

/* Reusable header for inner pages */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb?: string;
}) {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
      <Reveal>
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted2">
          <Link to="/" className="transition-colors hover:text-accent2">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-muted">{breadcrumb ?? eyebrow}</span>
        </nav>
      </Reveal>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </section>
  );
}
