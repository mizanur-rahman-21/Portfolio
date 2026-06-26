import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bookmark, Clock, Eye, Heart, Share2, Tag as TagIcon } from "lucide-react";
import { blogPosts } from "@/data/portfolio";
import { Section, Reveal, GlassCard, Tag, Button } from "@/components/ui";
import { ReadingProgress } from "@/components/effects";
import { useApp } from "@/lib/store";
import { cn } from "@/utils/cn";
import NotFound from "@/pages/NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const { isBookmarked, toggleBookmark, toast } = useApp();
  const post = blogPosts.find((b) => b.slug === slug);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post ? 80 + (post.views % 40) : 0);

  if (!post) return <NotFound />;
  const related = blogPosts.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto w-full max-w-3xl px-5 pt-28 sm:px-8 sm:pt-32">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted2 transition-colors hover:text-accent2">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted2">
            <Tag color="accent">{post.category}</Tag>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} min read</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {post.views.toLocaleString()} views</span>
            <span>· {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>

          {/* author + actions */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-white">AM</div>
              <div>
                <p className="text-sm font-semibold text-ink">Mizanur Rahman</p>
                <p className="text-xs text-muted2">Machine Learning Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="soft" size="sm" onClick={() => { setLiked(v => !v); setLikes(n => liked ? n - 1 : n + 1); }}>
                <Heart className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")} /> {likes}
              </Button>
              <Button variant="soft" size="sm" onClick={() => { toggleBookmark(post.id); toast({ title: isBookmarked(post.id) ? "Removed" : "Bookmarked!", type: isBookmarked(post.id) ? "info" : "success" }); }}>
                <Bookmark className={cn("h-4 w-4", isBookmarked(post.id) && "fill-accent2 text-accent2")} />
              </Button>
              <Button variant="soft" size="sm" onClick={() => toast({ title: "Link copied", type: "success" })}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Body */}
        <div className="mt-8 space-y-5">
          {post.content.map((block, i) => (
            <Reveal key={i} delay={0.02 * i}>
              {block.heading && (
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{block.heading}</h2>
              )}
              <p className="leading-relaxed text-muted">{block.body}</p>
              {block.code && (
                <div className="overflow-hidden rounded-xl border border-line bg-[#0b0f19]">
                  <div className="flex items-center justify-between border-b border-line px-4 py-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted2">
                      <TagIcon className="h-3 w-3" /> {block.lang ?? "code"}
                    </span>
                    <button
                      onClick={() => { navigator.clipboard?.writeText(block.code!); toast({ title: "Code copied", type: "success" }); }}
                      className="text-xs text-muted2 transition-colors hover:text-accent2"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-accent2">
                    <code>{block.code}</code>
                  </pre>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t} color="violet">#{t}</Tag>
          ))}
        </div>
      </article>

      {/* Related */}
      <Section>
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">Keep reading</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((b) => (
            <Link key={b.id} to={`/blog/${b.slug}`}>
              <GlassCard className="group h-full p-6">
                <Tag color="accent">{b.category}</Tag>
                <h3 className="mt-3 font-display font-semibold leading-snug text-ink group-hover:text-accent2 transition-colors">
                  {b.title}
                </h3>
                <p className="mt-2 text-xs text-muted2">{b.readTime} min read</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
