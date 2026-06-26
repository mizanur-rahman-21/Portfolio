import { CheckCircle2, Globe2, GraduationCap, Mail, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.png";
import { profile, experiences } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, ProgressBar, SectionHeading, Tag, ButtonLink } from "@/components/ui";
import { SocialLinks } from "@/components/widgets";

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About Me"
        title={
          <>
            Turning research into <span className="text-gradient-accent">products</span> people love.
          </>
        }
        subtitle={profile.shortBio}
      />

      {/* Bio */}
      <Section className="!pt-4">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <GlassCard hover={false} className="h-full p-7 sm:p-9">
              <div className="space-y-4 text-[15px] leading-relaxed text-muted">
                {profile.longBio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                <ButtonLink to="/contact" variant="gradient">
                  Work with me
                </ButtonLink>
                <SocialLinks size="sm" />
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard hover={false} className="overflow-hidden">
              <div className="relative flex h-60 items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-accent/15 via-accent2/10 to-hi/15">
                <img
                  src={heroImg}
                  alt={profile.name}
                  className="relative z-10 h-52 w-52 rounded-full object-cover object-top ring-1 ring-white/10"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Quick Facts</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <Fact icon={MapPin} label="Location" value={profile.location} />
                  <Fact icon={Globe2} label="Timezone" value={profile.timezone} />
                  <Fact icon={Mail} label="Email" value={profile.email} />
                  <Fact icon={GraduationCap} label="Focus" value="ML · AI · Full-Stack" />
                  <Fact icon={Sparkles} label="Status" value={profile.availability} />
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="!pt-4">
        <SectionHeading
          align="left"
          eyebrow="Principles"
          title="What I value"
          subtitle="The principles that guide how I build, collaborate, and grow."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {profile.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <GlassCard className="h-full p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-display font-semibold text-ink">{v.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Languages + Fun facts */}
      <Section className="!pt-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard hover={false} className="h-full p-7">
              <h3 className="font-display text-xl font-semibold text-ink">Languages</h3>
              <div className="mt-6 space-y-5">
                {profile.languages.map((l) => (
                  <div key={l.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-ink">{l.name}</span>
                      <span className="text-muted2">{l.level}</span>
                    </div>
                    <ProgressBar value={l.value} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard hover={false} className="h-full p-7">
              <h3 className="font-display text-xl font-semibold text-ink">Fun Facts</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {profile.funFacts.map((f) => (
                  <div
                    key={f.text}
                    className="group rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="text-2xl">{f.icon}</span>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* Journey timeline */}
      <Section className="!pt-4">
        <SectionHeading
          align="left"
          eyebrow="Journey"
          title="My path so far"
          subtitle="A condensed timeline of milestones across school, research and industry."
        />
        <div className="relative mt-12 pl-6">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent via-accent2 to-hi" />
          <div className="space-y-8">
            {experiences.slice(0, 4).map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06} direction="right">
                <div className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent2 shadow-[0_0_0_4px_rgba(6,182,212,0.2)]" />
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag color={e.current ? "accent" : "default"}>{e.period}</Tag>
                    {e.current && (
                      <span className="text-xs font-medium text-emerald-300">● Present</span>
                    )}
                  </div>
                  <h4 className="mt-2 font-display text-lg font-semibold text-ink">{e.role}</h4>
                  <p className="text-sm text-accent2">{e.org} · {e.location}</p>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{e.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <ButtonLink to="/experience" variant="soft">
            View full experience <CheckCircle2 className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
      <span className="text-muted2">{label}:</span>
      <span className="font-medium text-ink">{value}</span>
    </li>
  );
}
