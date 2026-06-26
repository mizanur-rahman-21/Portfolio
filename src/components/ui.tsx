import { motion } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode, type ElementType } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useCounter, useMouseParallax, useInView } from "@/lib/hooks";

/* ---------------- Button ---------------- */
type BtnVariant = "primary" | "gradient" | "outline" | "ghost" | "soft";
type BtnSize = "sm" | "md" | "lg";

const btnBase =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50 disabled:pointer-events-none select-none";

const btnVariants: Record<BtnVariant, string> = {
  primary:
    "bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5",
  gradient:
    "text-white bg-gradient-to-r from-accent via-accent2 to-hi bg-[length:200%_auto] hover:bg-[position:100%] shadow-lg shadow-accent/25 hover:-translate-y-0.5",
  outline:
    "border border-line text-ink hover:border-accent/60 hover:bg-accent/10 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-ink hover:bg-white/5",
  soft: "bg-white/5 text-ink border border-line hover:bg-white/10 hover:-translate-y-0.5",
};

const btnSizes: Record<BtnSize, string> = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: { variant?: BtnVariant; size?: BtnSize } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  to: string;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn(btnBase, btnVariants[variant], btnSizes[size], className)}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  variant = "outline",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: BtnVariant;
  size?: BtnSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(btnBase, btnVariants[variant], btnSizes[size], className)}
    >
      {children}
    </a>
  );
}

/* ---------------- Glass Card ---------------- */
export function GlassCard({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-line bg-card/70 backdrop-blur-xl",
        hover &&
          "transition-all duration-500 hover:border-accent/40 hover:bg-card hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Badges / Tags ---------------- */
export function Tag({
  children,
  className,
  color = "default",
}: {
  children: ReactNode;
  className?: string;
  color?: "default" | "accent" | "violet" | "cyan";
}) {
  const colors = {
    default: "border-line bg-white/5 text-muted",
    accent: "border-accent/30 bg-accent/10 text-accent2",
    violet: "border-hi/30 bg-hi/10 text-hi",
    cyan: "border-accent2/30 bg-accent2/10 text-accent2",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Progress bar ---------------- */
export function ProgressBar({
  value,
  className,
  color = "gradient",
}: {
  value: number;
  className?: string;
  color?: "gradient" | "accent" | "violet";
}) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const bar =
    color === "accent"
      ? "from-accent to-accent2"
      : color === "violet"
      ? "from-hi to-fuchsia-400"
      : "from-accent via-accent2 to-hi";
  return (
    <div ref={ref} className={cn("h-2 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("h-full rounded-full bg-gradient-to-r", bar)}
      />
    </div>
  );
}

/* ---------------- Animated number ---------------- */
export function AnimatedNumber({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const n = useCounter(value, inView);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Reveal wrapper ---------------- */
const dirs = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof dirs;
  className?: string;
  as?: ElementType;
}) {
  const Comp = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ---------------- Magnetic button ---------------- */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMouseParallax(0.4);
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Social icon (inline brand SVGs) ---------------- */
export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    github:
      "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1.7 2.6 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z",
    linkedin:
      "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.3 19.5h2.04L6.49 3.24H4.3L17.6 20.65z",
    scholar:
      "M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.5V16c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.5l-7 3.82-7-3.82z",
    mail: "M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 7L3.5 6h17L12 11zm0 2.3L3 7.6V18h18V7.6l-9 5.7z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={paths[name] ?? paths.mail} />
    </svg>
  );
}

/* ---------------- Section wrapper ---------------- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28", className)}>
      {children}
    </section>
  );
}
