import { useMemo, useState } from "react";
import { BadgeCheck, Search } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

const issuers = ["All", ...Array.from(new Set(certifications.map((c) => c.issuer)))];

export default function Certifications() {
  const [issuer, setIssuer] = useState("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const term = q.toLowerCase();
    return certifications.filter(
      (c) =>
        (issuer === "All" || c.issuer === issuer) &&
        (c.title.toLowerCase().includes(term) ||
          c.issuer.toLowerCase().includes(term) ||
          c.skills.join(" ").toLowerCase().includes(term))
    );
  }, [issuer, q]);

  return (
    <>
      <PageHero
        breadcrumb="Certifications"
        eyebrow="Learning Path"
        title={
          <>
            Certified & <span className="text-gradient-accent">continuously learning</span>.
          </>
        }
        subtitle="Courses and certifications I've completed on my machine learning & data science journey."
      />

      <Section className="!pt-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {issuers.map((t) => (
              <button
                key={t}
                onClick={() => setIssuer(t)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  issuer === t
                    ? "bg-gradient-to-r from-accent to-accent2 text-white"
                    : "border border-line text-muted hover:text-ink"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search certificates..."
              className="w-full rounded-lg border border-line bg-white/5 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent/60"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <GlassCard className="group flex h-full flex-col overflow-hidden">
                <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${c.gradient}`}>
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <span className="text-5xl drop-shadow-lg">{c.emoji}</span>
                  <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    {c.date}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium text-accent2">{c.issuer}</p>
                  <h3 className="mt-1 font-display font-semibold leading-snug text-ink">{c.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted2">
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> {c.credentialId}
                    </span>
                    <a href={c.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-accent2 hover:underline">
                      Verify →
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Always Certifying"
          title="More credentials in progress"
          subtitle="Currently pursuing Kubernetes (CKA) and advanced MLOps certifications."
        />
      </Section>
    </>
  );
}
