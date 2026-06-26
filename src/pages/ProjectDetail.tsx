import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Heart,
  Lightbulb,
  Rocket,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { Section, Reveal, GlassCard, Tag, Button, AnimatedNumber } from "@/components/ui";
import { useApp } from "@/lib/store";
import NotFound from "@/pages/NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { isBookmarked, toggleBookmark, toast } = useApp();
  const project = projects.find((p) => p.slug === slug);

  const [likes, setLikes] = useState(project ? 120 + (project.stars % 60) : 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(
    () =>
      [
        { id: "c1", name: "Dev Reviewer", text: "The architecture here is super clean. Loved the write-up!", time: "3d ago" },
        { id: "c2", name: "ML Enthusiast", text: "Any chance of a follow-up on the eval harness?", time: "1d ago" },
      ] as { id: string; name: string; text: string; time: string }[]
  );
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const related = useMemo(
    () => (project ? projects.filter((p) => p.category === project.category && p.id !== project.id) : []),
    [project]
  );

  if (!project) return <NotFound />;

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };
  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments((c) => [{ id: Math.random().toString(36).slice(2), name: name || "Anonymous", text, time: "just now" }, ...c]);
    setText("");
    setName("");
    toast({ title: "Comment posted", type: "success" });
  };

  return (
    <>
      {/* Hero banner */}
      <section className="mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
        <Reveal>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted2 transition-colors hover:text-accent2">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className={`relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient} p-8 sm:p-12`}>
            <div className="absolute inset-0 bg-dots opacity-25" />
            <div className="absolute -right-10 -top-10 text-[10rem] opacity-30">{project.emoji}</div>
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">{project.category}</span>
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">{project.year}</span>
                {project.featured && (
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">★ Featured</span>
                )}
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold text-white sm:text-5xl">{project.title}</h1>
              <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">{project.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-transform hover:scale-105">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-black/40 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-black/60">
                  <GitBranch className="h-4 w-4" /> Repository
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* engagement bar */}
        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button variant="soft" size="sm" onClick={toggleLike}>
              <Heart className={liked ? "h-4 w-4 fill-rose-500 text-rose-500" : "h-4 w-4"} /> {likes}
            </Button>
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                toggleBookmark(project.id);
                toast({ title: isBookmarked(project.id) ? "Removed" : "Bookmarked!", type: isBookmarked(project.id) ? "info" : "success" });
              }}
            >
              <Bookmark className={isBookmarked(project.id) ? "h-4 w-4 fill-accent2 text-accent2" : "h-4 w-4"} /> Save
            </Button>
            <Button variant="soft" size="sm" onClick={() => toast({ title: "Link copied to clipboard", type: "success" })}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </Reveal>
      </section>

      <Section className="!pt-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Main */}
          <div className="space-y-6">
            <Reveal>
              <GlassCard hover={false} className="p-7">
                <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
                <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
              </GlassCard>
            </Reveal>

            <Reveal>
              <GlassCard hover={false} className="p-7">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                  <Sparkles className="h-5 w-5 text-accent2" /> Key Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-3">
              <MiniCard icon={Target} title="Challenges" items={project.challenges} />
              <MiniCard icon={Lightbulb} title="Lessons" items={project.lessons} />
              <MiniCard icon={Rocket} title="Next" items={project.future} />
            </div>

            {/* Comments */}
            <Reveal>
              <GlassCard hover={false} className="p-7">
                <h2 className="font-display text-xl font-semibold text-ink">Discussion ({comments.length})</h2>
                <form onSubmit={addComment} className="mt-5 space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-line bg-white/5 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
                  />
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Leave a comment..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-line bg-white/5 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
                  />
                  <Button type="submit" size="sm">Post comment</Button>
                </form>
                <div className="mt-5 space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-xs font-bold text-white">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="rounded-xl rounded-tl-none border border-line bg-white/[0.02] px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-ink">{c.name}</span>
                          <span className="text-xs text-muted2">{c.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal>
              <GlassCard hover={false} className="p-6">
                <h3 className="font-display font-semibold text-ink">Tech Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Tag key={t} color="accent">{t}</Tag>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.05}>
              <GlassCard hover={false} className="p-6">
                <h3 className="font-display font-semibold text-ink">Impact</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                    <p className="font-display text-2xl font-bold text-accent2"><AnimatedNumber value={project.stars} /></p>
                    <p className="text-xs text-muted2">GitHub Stars</p>
                  </div>
                  <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                    <p className="font-display text-2xl font-bold text-accent2">{project.features.length}</p>
                    <p className="text-xs text-muted2">Core Features</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 font-display text-2xl font-bold text-ink">Related Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} to={`/projects/${p.slug}`}>
                  <GlassCard className="group h-full overflow-hidden">
                    <div className={`relative h-28 bg-gradient-to-br ${p.gradient}`}>
                      <span className="absolute left-3 top-3 text-3xl">{p.emoji}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-display font-semibold text-ink">{p.title}</h4>
                      <p className="mt-1 text-xs text-muted">{p.tagline}</p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

function MiniCard({ icon: Icon, title, items }: { icon: typeof Target; title: string; items: string[] }) {
  return (
    <Reveal>
      <GlassCard hover={false} className="h-full p-5">
        <h3 className="flex items-center gap-2 font-display font-semibold text-ink">
          <Icon className="h-4 w-4 text-accent2" /> {title}
        </h3>
        <ul className="mt-3 space-y-2">
          {items.map((it) => (
            <li key={it} className="text-xs leading-relaxed text-muted">• {it}</li>
          ))}
        </ul>
      </GlassCard>
    </Reveal>
  );
}
