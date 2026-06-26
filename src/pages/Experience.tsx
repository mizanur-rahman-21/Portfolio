import { useMemo, useState } from "react";
import { Briefcase, Building2, CheckCircle2, MapPin } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

const types = ["All", ...Array.from(new Set(experiences.map((e) => e.type)))];

const typeColor: Record<string, "accent" | "violet" | "cyan" | "default"> = {
  Internship: "accent",
  Job: "violet",
  Freelance: "cyan",
  Research: "accent",
  Leadership: "violet",
  Volunteer: "default",
};

export default function Experience() {
  const [type, setType] = useState("All");
  const list = useMemo(
    () => experiences.filter((e) => type === "All" || e.type === type),
    [type]
  );

  return (
    <>
      <PageHero
        breadcrumb="Experience"
        eyebrow="My Journey"
        title={
          <>
            How I <span className="text-gradient-accent">learn & build</span>.
          </>
        }
        subtitle="Independent machine learning projects, self-study, university engineering and open-source contributions — the journey that shaped my craft."
      />

      <Section className="!pt-4">
        <div className="mb-8 flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                type === t
                  ? "bg-gradient-to-r from-accent to-accent2 text-white"
                  : "border border-line text-muted hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative ml-2 pl-8">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-accent via-accent2 to-hi" />
          <div className="space-y-6">
            {list.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06}>
                <div className="relative">
                  <span className="absolute -left-[33px] top-6 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent2 shadow-[0_0_0_4px_rgba(6,182,212,0.2)]" />
                  <GlassCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Tag color={typeColor[e.type]}>{e.type}</Tag>
                          {e.current && (
                            <span className="text-xs font-medium text-emerald-300">● Current</span>
                          )}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-semibold text-ink">{e.role}</h3>
                        <p className="flex items-center gap-1.5 text-sm text-accent2">
                          <Building2 className="h-4 w-4" /> {e.org}
                        </p>
                      </div>
                      <div className="text-right text-xs text-muted2">
                        <p className="font-medium text-ink">{e.period}</p>
                        <p className="mt-1 flex items-center justify-end gap-1">
                          <MapPin className="h-3 w-3" /> {e.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{e.summary}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {e.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {a}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {e.tech.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!pt-4">
        <SectionHeading
          eyebrow="Recommendations"
          title="Available on request"
          subtitle="Detailed recommendation letters from supervisors and managers are available for serious enquiries."
        />
        <Reveal>
          <div className="mx-auto mt-8 max-w-xl">
            <GlassCard hover={false} className="flex items-center gap-4 p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent2">
                <Briefcase className="h-6 w-6" />
              </div>
              <p className="text-sm text-muted">
                Request recommendation letters and references directly via the contact form, or connect on LinkedIn.
              </p>
            </GlassCard>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
