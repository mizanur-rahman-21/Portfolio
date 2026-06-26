import { skillCategories, type SkillCategory } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, ProgressBar, SectionHeading, Tag } from "@/components/ui";

export default function Skills() {
  const totalSkills = skillCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <PageHero
        breadcrumb="Skills"
        eyebrow="Capabilities"
        title={
          <>
            A versatile <span className="text-gradient-accent">toolkit</span> across the stack.
          </>
        }
        subtitle={`${totalSkills} technologies spanning languages, frameworks, machine learning, and cloud infrastructure — with the depth to ship.`}
      />

      <Section className="!pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((c, i) => (
            <Reveal key={c.category} delay={i * 0.06}>
              <div className="rounded-2xl border border-line bg-card/50 p-5 text-center">
                <div className="text-3xl">{c.icon}</div>
                <p className="mt-2 font-display text-2xl font-bold text-ink">{c.items.length}</p>
                <p className="text-xs uppercase tracking-wider text-muted2">{c.category}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {skillCategories.map((cat, idx) => (
        <CategoryBlock key={cat.category} cat={cat} alt={idx % 2 === 1} />
      ))}
    </>
  );
}

function CategoryBlock({ cat, alt }: { cat: SkillCategory; alt: boolean }) {
  return (
    <Section className="!py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <SectionHeading
          align="left"
          eyebrow={cat.icon + " " + cat.category}
          title={cat.category}
          subtitle={cat.blurb}
        />
      </div>
      <div className={`grid gap-5 md:grid-cols-2 ${alt ? "" : ""}`}>
        {cat.items.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.04} direction={alt ? "left" : "right"}>
            <GlassCard className="group p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-base font-semibold text-ink">{s.name}</h4>
                <span className="font-display text-sm font-bold text-accent2">{s.level}%</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={s.level} />
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted2">
                <Tag>{s.years} yr{s.years > 1 ? "s" : ""}</Tag>
                <Tag>{s.projects} projects</Tag>
                <span className="ml-auto inline-flex items-center gap-1 text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
