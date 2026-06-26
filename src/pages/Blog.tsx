import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Eye, Search, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag, AnimatedNumber } from "@/components/ui";
import { cn } from "@/utils/cn";

const categories = ["All", ...Array.from(new Set(blogPosts.map((b) => b.category)))];

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const featured = blogPosts.find((b) => b.featured) ?? blogPosts[0];

  const list = useMemo(() => {
    const term = q.toLowerCase();
    return blogPosts.filter(
      (b) =>
        b.id !== featured.id &&
        (cat === "All" || b.category === cat) &&
        (b.title.toLowerCase().includes(term) || b.excerpt.toLowerCase().includes(term))
    );
  }, [cat, q, featured.id]);

  return (
    <>
      <PageHero
        breadcrumb="Blog"
        eyebrow="Writing"
        title={
          <>
            Notes on <span className="text-gradient-accent">ML, research & building</span>.
          </>
        }
        subtitle="Long-form articles distilled from real projects, papers and production systems."
      />

      <Section className="!pt-4">
        {/* Featured */}
        <Reveal>
          <Link to={`/blog/${featured.slug}`}>
            <GlassCard hover={false} className="group grid overflow-hidden lg:grid-cols-2">
              <div className="relative min-h-[14rem] bg-gradient-to-br from-accent via-accent2 to-hi p-8">
                <div className="absolute inset-0 bg-dots opacity-25" />
                <div className="relative flex h-full flex-col justify-between">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <Sparkles className="h-3 w-3" /> Featured
                  </span>
                  <span className="text-6xl">✍️</span>
                </div>
              </div>
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 text-xs text-muted2">
                  <Tag color="accent">{featured.category}</Tag>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime} min</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-ink group-hover:text-accent2 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted2">
                  <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> <AnimatedNumber value={featured.views} /></span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent2 transition-transform group-hover:translate-x-1">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </GlassCard>
          </Link>
        </Reveal>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                  cat === c ? "bg-gradient-to-r from-accent to-accent2 text-white" : "border border-line text-muted hover:text-ink"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-lg border border-line bg-white/5 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent/60"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.05}>
              <Link to={`/blog/${b.slug}`}>
                <GlassCard className="group flex h-full flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted2">
                    <Tag color="accent">{b.category}</Tag>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.readTime}m</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink group-hover:text-accent2 transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted2">
                    <span>{new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {b.views.toLocaleString()}</span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
