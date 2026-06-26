import { useMemo, useState } from "react";
import { BookOpen, Cpu, ExternalLink, FileText, FlaskConical, FolderGit2 } from "lucide-react";
import { publications, researchInterests, github } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag, Button, AnimatedNumber, SectionHeading } from "@/components/ui";
import { useApp } from "@/lib/store";
import { cn } from "@/utils/cn";

const types = ["All", ...Array.from(new Set(publications.map((p) => p.type)))];

export default function Research() {
  const { toast } = useApp();
  const [type, setType] = useState("All");
  const list = useMemo(
    () => publications.filter((p) => type === "All" || p.type === type),
    [type]
  );

  return (
    <>
      <PageHero
        breadcrumb="Research"
        eyebrow="ML Work & Interests"
        title={
          <>
            Applied machine learning, <span className="text-gradient-accent">explored deeply</span>.
          </>
        }
        subtitle="Self-directed deep-dives and explorations across healthcare ML, generative AI, industrial ML and recommendation systems — all open on GitHub."
      />

      {/* Stats */}
      <Section className="!pt-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: FlaskConical, label: "ML Deep-Dives", value: publications.length },
            { icon: FolderGit2, label: "Open-Source Repos", value: github.publicRepos },
            { icon: Cpu, label: "Focus Areas", value: researchInterests.length },
            { icon: BookOpen, label: "Domains Explored", value: 8 },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-line bg-card/50 p-5 text-center">
                <s.icon className="mx-auto h-5 w-5 text-accent2" />
                <p className="mt-2 font-display text-3xl font-bold text-ink">
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="text-xs text-muted2">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Interests */}
      <Section className="!pt-4">
        <SectionHeading
          align="left"
          eyebrow="Interests"
          title="What I'm curious about"
          subtitle="The machine learning themes I keep returning to."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchInterests.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <GlassCard className="h-full p-5">
                <span className="text-3xl">{r.icon}</span>
                <h4 className="mt-3 font-display font-semibold text-ink">{r.title}</h4>
                <p className="mt-1 text-sm text-muted">{r.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Deep-dives */}
      <Section className="!pt-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <SectionHeading align="left" eyebrow="Explorations" title="Notable ML deep-dives" />
          <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="space-y-5">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <GlassCard className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="sm:w-40 sm:shrink-0">
                    <Tag color="violet">{p.type}</Tag>
                    <p className="mt-2 text-sm text-ink">{p.venue}</p>
                    <p className="text-xs text-muted2">{p.year}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-1 text-xs text-accent2">{p.authors}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.abstract}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted2">
                        <FileText className="h-3.5 w-3.5" /> {p.doi}
                      </span>
                      <div className="ml-auto flex gap-2">
                        {p.links.map((l) => (
                          <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="soft" onClick={() => toast({ title: `Opening ${l.label}...`, type: "info" })}>
                              <ExternalLink className="h-3.5 w-3.5" /> {l.label}
                            </Button>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
