import { Rocket, FileText, GitBranch, Clock, Award, Star, type LucideIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/utils/cn";
import { AnimatedNumber } from "@/components/ui";
import { SocialIcon } from "@/components/ui";
import { useApp } from "@/lib/store";

/* ---------------- Typing / typewriter ---------------- */
export function TypingText({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && sub === current) {
      t = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && sub === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      t = setTimeout(
        () =>
          setSub((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
          ),
        deleting ? 38 : 70
      );
    }
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  return <span className={cn("cursor-blink", className)}>{sub}</span>;
}

/* ---------------- Stat card ---------------- */
const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  file: FileText,
  git: GitBranch,
  clock: Clock,
  award: Award,
  star: Star,
};

export function StatCard({
  icon,
  label,
  value,
  suffix,
}: {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
}) {
  const Icon = iconMap[icon] ?? Star;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-accent/40">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <Icon className="h-6 w-6 text-accent2" />
      <div className="mt-3 font-display text-3xl font-bold text-ink">
        <AnimatedNumber value={value} suffix={suffix} />
      </div>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

/* ---------------- Social links row ---------------- */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {profile.socials.map((soc) => (
        <a
          key={soc.label}
          href={soc.url}
          target="_blank"
          rel="noreferrer"
          aria-label={soc.label}
          title={soc.label}
          className={cn(
            "group grid place-items-center rounded-xl border border-line bg-white/5 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent2",
            s
          )}
        >
          <SocialIcon name={soc.icon} className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
        </a>
      ))}
    </div>
  );
}

/* ---------------- Tech marquee ---------------- */
const techs = [
  "Python", "TypeScript", "PyTorch", "TensorFlow", "React", "Next.js", "Node.js",
  "FastAPI", "LangChain", "PostgreSQL", "Docker", "Kubernetes", "AWS", "CUDA", "Hugging Face",
];
export function TechMarquee() {
  const row = [...techs, ...techs];
  return (
    <div className="relative overflow-hidden mask-fade-x py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-3">
        {row.map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section divider line ---------------- */
export function GlowDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full bg-gradient-to-r from-transparent via-line to-transparent", className)}>
      <div className="absolute left-1/2 top-1/2 h-1 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-md" />
    </div>
  );
}

/* ---------------- Newsletter mini form ---------------- */
export function NewsletterForm({ compact }: { compact?: boolean }) {
  const { subscribe, toast } = useApp();
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribe(email);
    if (res.ok) {
      toast({ title: "Subscribed! 🎉", desc: "You'll get new posts in your inbox.", type: "success" });
      setEmail("");
    } else {
      toast({ title: "Hmm...", desc: res.error, type: "error" });
    }
  };
  return (
    <form onSubmit={submit} className="flex w-full gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-xl border border-line bg-white/5 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted2 focus:border-accent/60"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-gradient-to-r from-accent to-accent2 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
      >
        {compact ? "→" : "Subscribe"}
      </button>
    </form>
  );
}

/* ---------------- Availability pill ---------------- */
export function AvailabilityPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for opportunities
    </span>
  );
}

export type { ReactNode };
