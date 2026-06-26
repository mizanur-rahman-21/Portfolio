import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Download,
  Mail,
  FolderGit2,
  Star,
  GitBranch,
  Users,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero.png";
import { profile, stats, projects, publications, testimonials, github, achievements } from "@/data/portfolio";
import {
  Button,
  ButtonLink,
  GlassCard,
  Section,
  SectionHeading,
  Reveal,
  Tag,
  AnimatedNumber,
} from "@/components/ui";
import {
  StatCard,
  TypingText,
  SocialLinks,
  TechMarquee,
  AvailabilityPill,
} from "@/components/widgets";
import { useApp } from "@/lib/store";

export default function Home() {
  const { toast } = useApp();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <AvailabilityPill />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Hi, I'm <span className="text-gradient-accent animate-gradient">{profile.firstName}</span>.
                <br />
                <span className="text-gradient">
                  <TypingText words={profile.roles} />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {profile.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink to="/projects" variant="gradient" size="lg">
                  View Projects <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink to="/resume" variant="outline" size="lg">
                  <Download className="h-4 w-4" /> Resume
                </ButtonLink>
                <ButtonLink to="/contact" variant="ghost" size="lg">
                  <Mail className="h-4 w-4" /> Contact
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex items-center gap-4">
                <SocialLinks size="sm" />
              </div>
            </Reveal>
          </div>

          {/* Right — portrait (transparent cut-out) */}
          <Reveal delay={0.15} direction="left" className="order-1 flex justify-center lg:order-2 lg:justify-self-center">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex w-full max-w-xs items-center justify-center sm:max-w-sm lg:max-w-md"
            >
              {/* soft glow behind */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-accent/30 via-accent2/20 to-hi/30 blur-3xl" />
              {/* portrait */}
              <img
                src={heroImg}
                alt={profile.name}
                className="relative z-10 aspect-square w-full max-w-xs rounded-full object-cover object-top shadow-2xl ring-1 ring-white/10 sm:max-w-sm lg:max-w-md"
              />
              {/* floating chips */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute left-0 top-16 z-20 flex items-center gap-2 rounded-xl px-3 py-2 shadow-xl"
              >
                <GitBranch className="h-4 w-4 text-accent2" />
                <span className="text-xs font-medium text-ink">{github.totalStars.toLocaleString()} ★</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass absolute right-0 bottom-12 z-20 flex items-center gap-2 rounded-xl px-3 py-2 shadow-xl"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-ink">Open to work</span>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center lg:mt-4"
        >
          <div className="flex flex-col items-center gap-2 text-muted2">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="grid h-9 w-6 place-items-start justify-center rounded-full border border-line pt-1.5"
            >
              <span className="h-1.5 w-1 rounded-full bg-accent2" />
            </motion.div>
            <ArrowDown className="h-3 w-3" />
          </div>
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <Section className="!py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <StatCard icon={s.icon} label={s.label} value={s.value} suffix={s.suffix} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <TechMarquee />
        </div>
      </Section>

      {/* ============ FEATURED PROJECTS ============ */}
      <Section id="featured">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Selected Work"
            title={<>Featured <span className="text-gradient-accent">Projects</span></>}
            subtitle="A glimpse of products and research I've shipped end-to-end."
          />
          <Reveal>
            <ButtonLink to="/projects" variant="soft">
              All projects <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <GlassCard className="group h-full overflow-hidden">
                <div className={`relative h-40 bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <span className="absolute left-4 top-4 text-4xl">{p.emoji}</span>
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-current" /> {p.stars}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <Tag color="accent">{p.category}</Tag>
                    <span className="text-xs text-muted2">{p.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent2 transition-transform group-hover:translate-x-1"
                  >
                    View case study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ RESEARCH + GITHUB ============ */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Research */}
          <Reveal>
            <GlassCard className="h-full p-6" hover={false}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">Recent Research</h3>
                <Link to="/research" className="text-sm text-accent2 hover:underline">
                  All →
                </Link>
              </div>
              <div className="mt-5 space-y-4">
                {publications.slice(0, 3).map((r) => (
                  <div key={r.id} className="group rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 text-xs">
                      <Tag color="violet">{r.type}</Tag>
                      <span className="text-muted2">{r.venue} · {r.year}</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-ink group-hover:text-accent2 transition-colors">
                      {r.title}
                    </p>
                    <p className="mt-1 text-xs text-muted2">{r.authors} · {r.tags.slice(0, 3).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* GitHub */}
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-6" hover={false}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">GitHub Activity</h3>
                <Link to="/about" className="text-sm text-accent2 hover:underline">
                  Profile →
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: FolderGit2, label: "Repos", value: github.publicRepos },
                  { icon: Star, label: "Stars", value: github.totalStars },
                  { icon: Users, label: "Followers", value: github.followers },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-line bg-white/[0.02] p-3 text-center">
                    <s.icon className="mx-auto h-4 w-4 text-accent2" />
                    <p className="mt-1 font-display text-lg font-bold text-ink">
                      <AnimatedNumber value={s.value} />
                    </p>
                    <p className="text-xs text-muted2">{s.label}</p>
                  </div>
                ))}
              </div>
              <ContributionGraph />
              <div className="mt-4 space-y-2">
                {github.activity.slice(0, 3).map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
                    {a.text}
                    <span className="ml-auto text-muted2">{a.time}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* ============ ACHIEVEMENTS ============ */}
      <Section>
        <SectionHeading
          eyebrow="Recognition"
          title={<>Awards & <span className="text-gradient-accent">milestones</span></>}
          subtitle="Hackathon wins, scholarships, competitions and public recognition along the way."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06}>
              <GlassCard className="flex h-full items-start gap-4 p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-hi/20 text-2xl">
                  {a.badge}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Tag color="accent">{a.type}</Tag>
                    <span className="text-xs text-muted2">{a.date}</span>
                  </div>
                  <h4 className="mt-2 font-display font-semibold text-ink">{a.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.description}</p>
                  <p className="mt-2 text-xs text-muted2">{a.org}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ TESTIMONIAL ============ */}
      <Section>
        <SectionHeading
          eyebrow="My Approach"
          title={<>How I <span className="text-gradient-accent">build & learn</span></>}
        />
        <div className="mt-12">
          <Reveal>
            <GlassCard className="relative mx-auto max-w-3xl overflow-hidden p-8 sm:p-12" hover={false}>
              <Quote className="absolute right-6 top-6 h-16 w-16 text-accent/10" />
              <p className="relative font-display text-xl leading-relaxed text-ink sm:text-2xl">
                "{testimonials[0].quote}"
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${testimonials[0].gradient} font-display font-bold text-white`}>
                  {testimonials[0].initials}
                </div>
                <div>
                  <p className="font-semibold text-ink">{testimonials[0].name}</p>
                  <p className="text-sm text-muted2">{testimonials[0].role}, {testimonials[0].company}</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {testimonials.slice(1, 4).map((t, i) => (
              <Reveal key={t.id} delay={0.1 + i * 0.06}>
                <GlassCard className="h-full p-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">"{t.quote}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-bold text-white`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{t.name}</p>
                      <p className="text-xs text-muted2">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ CTA ============ */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-accent/15 via-card to-hi/15 p-10 text-center sm:p-16">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-hi/20 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Let's build something <span className="text-gradient-accent">intelligent</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Whether it's a collaboration, an internship, or an ML project — I'd love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink to="/contact" variant="gradient" size="lg">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toast({ title: "Email copied!", desc: profile.email, type: "success" })}
                >
                  <Mail className="h-4 w-4" /> Copy email
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* Compact contribution heatmap */
function ContributionGraph() {
  const levels = [
    "bg-white/5",
    "bg-accent/30",
    "bg-accent/55",
    "bg-accent2/70",
    "bg-accent2",
  ];
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between text-xs text-muted2">
        <span>{github.contributions.length * 7} contributions</span>
        <span>Last year</span>
      </div>
      <div className="flex gap-[3px] overflow-hidden">
        {github.contributions.slice(-26).map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((lvl, di) => (
              <div
                key={di}
                className={`h-2.5 w-2.5 rounded-[2px] ${levels[lvl]}`}
                title={`Level ${lvl}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
