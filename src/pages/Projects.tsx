import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { projects } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Tag } from "@/components/ui";
import { useApp } from "@/lib/store";
import { cn } from "@/utils/cn";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
const sorts = [
  { key: "featured", label: "Featured" },
  { key: "stars", label: "Most stars" },
  { key: "year", label: "Newest" },
];

export default function Projects() {
  const { isBookmarked, toggleBookmark, toast } = useApp();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    let list = projects.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (p.title.toLowerCase().includes(term) ||
          p.tagline.toLowerCase().includes(term) ||
          p.tech.join(" ").toLowerCase().includes(term))
    );
    list = [...list].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "year") return b.year - a.year;
      return Number(b.featured) - Number(a.featured);
    });
    return list;
  }, [cat, q, sort]);

  useEffect(() => setPage(1), [cat, q, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <PageHero
        breadcrumb="Projects"
        eyebrow="Portfolio"
        title={
          <>
            Things I've <span className="text-gradient-accent">designed & built</span>.
          </>
        }
        subtitle="Production systems, research prototypes and open source — filter, search and explore."
      />

      <Section className="!pt-4">
        {/* Controls */}
        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card/50 p-4 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                    cat === c
                      ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-lg shadow-accent/20"
                      : "border border-line text-muted hover:text-ink hover:border-accent/40"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-56">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted2" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-line bg-white/5 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent/60"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-line bg-white/5 px-3 py-2 text-sm text-muted outline-none focus:border-accent/60"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key} className="bg-card text-ink">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <GlassCard className="group flex h-full flex-col overflow-hidden">
                <div className={`relative h-40 bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 bg-dots opacity-30" />
                  <span className="absolute left-4 top-4 text-4xl drop-shadow-lg">{p.emoji}</span>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-current" /> {p.stars}
                  </div>
                  <button
                    onClick={() => {
                      toggleBookmark(p.id);
                      toast({
                        title: isBookmarked(p.id) ? "Removed bookmark" : "Bookmarked!",
                        desc: p.title,
                        type: isBookmarked(p.id) ? "info" : "success",
                      });
                    }}
                    aria-label="Bookmark"
                    className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-lg bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                  >
                    <Bookmark className={cn("h-4 w-4", isBookmarked(p.id) && "fill-accent2 text-accent2")} />
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <Tag color="accent">{p.category}</Tag>
                    <span className="text-xs text-muted2">{p.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent2 transition-transform group-hover:translate-x-1"
                  >
                    View case study →
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="py-16 text-center text-muted2">No projects match your search.</p>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                  page === i + 1 ? "bg-accent text-white" : "border border-line text-muted hover:text-ink"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
