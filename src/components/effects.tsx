import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Check, Cookie, Info, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useApp } from "@/lib/store";
import { useMediaQuery } from "@/lib/hooks";

/* ---------------- Animated background ---------------- */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
      <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[140px] animate-aurora" />
      <div
        className="absolute right-[-15%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-hi/20 blur-[150px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[30%] h-[36rem] w-[36rem] rounded-full bg-accent2/15 blur-[150px] animate-aurora"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}

/* ---------------- Custom cursor ---------------- */
export function CustomCursor() {
  const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-cursor], input, textarea, select"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;
  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent2 mix-blend-screen"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-accent/70 mix-blend-screen transition-[width,height,opacity] duration-200"
        animate={{
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          marginLeft: hovering ? -22 : -13,
          marginTop: hovering ? -22 : -13,
          opacity: down ? 0.5 : 0.9,
          backgroundColor: hovering ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0)",
        }}
      />
    </>
  );
}

/* ---------------- Scroll progress (top bar) ---------------- */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[200] h-1 origin-left bg-gradient-to-r from-accent via-accent2 to-hi"
    />
  );
}

/* ---------------- Reading progress (article) ---------------- */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[201] h-[3px] w-full origin-left bg-hi"
    />
  );
}

/* ---------------- Back to top ---------------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[150] grid h-12 w-12 place-items-center rounded-full border border-line bg-card/80 text-ink shadow-lg backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent2"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Cookie consent ---------------- */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem("am:cookie")) setShow(true);
    }, 1600);
    return () => clearTimeout(t);
  }, []);
  const dismiss = (accept: boolean) => {
    localStorage.setItem("am:cookie", accept ? "1" : "0");
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-4 left-1/2 z-[180] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
        >
          <div className="glass flex items-start gap-3 rounded-2xl p-4 shadow-2xl">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent2" />
            <p className="flex-1 text-sm text-muted">
              This site uses local storage for preferences & a privacy-friendly visitor counter.
              No third-party tracking.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => dismiss(true)}
                className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white"
              >
                Accept
              </button>
              <button
                onClick={() => dismiss(false)}
                className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Toasts ---------------- */
const toastIcon = { success: Check, error: Info, info: Info };
const toastStyle = {
  success: "border-emerald-500/40 text-emerald-300",
  error: "border-rose-500/40 text-rose-300",
  info: "border-accent/40 text-accent2",
};
export function Toasts() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[300] flex w-[calc(100%-3rem)] max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = toastIcon[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className="glass pointer-events-auto flex items-start gap-3 rounded-xl p-3.5 shadow-2xl"
            >
              <span className={cn("mt-0.5 grid h-7 w-7 place-items-center rounded-lg border bg-white/5", toastStyle[t.type])}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                {t.desc && <p className="mt-0.5 text-xs text-muted">{t.desc}</p>}
              </div>
              <button onClick={() => dismissToast(t.id)} className="text-muted hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Page transition ---------------- */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------- Mini nav link used in footer/elsewhere ---------------- */
export function MiniLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm text-muted transition-colors hover:text-accent2">
      {children}
    </Link>
  );
}
