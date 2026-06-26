import { Award, GraduationCap, Trophy, Users } from "lucide-react";
import { education } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag, SectionHeading } from "@/components/ui";

export default function Education() {
  return (
    <>
      <PageHero
        breadcrumb="Education"
        eyebrow="Academics"
        title={
          <>
            Engineering meets <span className="text-gradient-accent">data science</span>.
          </>
        }
        subtitle="My academic foundation in Industrial & Production Engineering at KUET, with the coursework and curiosity that pulled me toward machine learning."
      />

      <Section className="!pt-4">
        <div className="space-y-8">
          {education.map((ed, i) => (
            <Reveal key={ed.id} delay={i * 0.06}>
              <GlassCard hover={false} className="overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_1.4fr]">
                  {/* Left */}
                  <div className="relative bg-gradient-to-br from-accent/15 via-card to-hi/10 p-7">
                    <div className="absolute inset-0 bg-dots opacity-20" />
                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/20 text-accent2">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold text-ink">{ed.institution}</h3>
                      <p className="mt-1 text-sm text-accent2">
                        {ed.degree} · {ed.field}
                      </p>
                      <div className="mt-4 space-y-2 text-sm">
                        <Row label="Period" value={ed.period} />
                        <Row label="Status" value={ed.status} />
                        <Row label="GPA / Score" value={ed.gpa} />
                      </div>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="p-7">
                    <h4 className="flex items-center gap-2 font-display font-semibold text-ink">
                      <Award className="h-4 w-4 text-accent2" /> Relevant Coursework
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ed.coursework.map((c) => (
                        <Tag key={c}>{c}</Tag>
                      ))}
                    </div>

                    <h4 className="mt-6 flex items-center gap-2 font-display font-semibold text-ink">
                      <Trophy className="h-4 w-4 text-accent2" /> Achievements
                    </h4>
                    <ul className="mt-3 space-y-1.5">
                      {ed.achievements.map((a) => (
                        <li key={a} className="text-sm text-muted">• {a}</li>
                      ))}
                    </ul>

                    <h4 className="mt-6 flex items-center gap-2 font-display font-semibold text-ink">
                      <Users className="h-4 w-4 text-accent2" /> Activities
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ed.activities.map((a) => (
                        <Tag key={a} color="violet">{a}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-4">
        <SectionHeading
          eyebrow="Always Learning"
          title="Continuous education"
          subtitle="Beyond formal degrees, I learn through research, courses, and building in public."
        />
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-1.5">
      <span className="text-muted2">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
