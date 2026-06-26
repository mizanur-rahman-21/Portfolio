import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileCode2, FolderGit2, LayoutGrid, Search } from "lucide-react";
import { navLinks, moreLinks, projects, blogPosts } from "@/data/portfolio";
import { useApp } from "@/lib/store";
import { cn } from "@/utils/cn";

type Item = { label: string; hint: string; to: string; group: string; icon: typeof LayoutGrid };

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useApp();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const pages: Item[] = [...navLinks, ...moreLinks, { label: "Dashboard", to: "/dashboard" }].map(
      (l) => ({ label: l.label, hint: "Page", to: l.to, group: "Pages", icon: LayoutGrid })
    );
    const proj: Item[] = projects.map((p) => ({
      label: p.title,
      hint: p.category,
      to: `/projects/${p.slug}`,
      group: "Projects",
      icon: FolderGit2,
    }));
    const posts: Item[] = blogPosts.map((b) => ({
      label: b.title,
      hint: b.category,
      to: `/blog/${b.slug}`,
      group: "Blog",
      icon: FileCode2,
    }));
    return [...pages, ...proj, ...posts];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items.slice(0, 8);
    return items.filter(
      (i) => i.label.toLowerCase().includes(term) || i.hint.toLowerCase().includes(term)
    );
  }, [q, items]);

  // global ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);

  useEffect(() => {
    if (commandOpen) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [commandOpen]);

  useEffect(() => setActive(0), [q]);

  const go = (to: string) => {
    navigate(to);
    setCommandOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      go(filtered[active].to);
    }
  };

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-start justify-center p-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-bg/70 backdrop-blur-md"
            onClick={() => setCommandOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-5 w-5 text-muted2" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKey}
                placeholder="Search pages, projects, articles..."
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-muted2"
              />
              <kbd className="rounded-md border border-line bg-white/5 px-1.5 py-0.5 text-[10px] text-muted2">
                ESC
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted2">No results for "{q}"</p>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.to + i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item.to)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-accent/15" : "hover:bg-white/5"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-lg border border-line",
                        i === active ? "text-accent2" : "text-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-ink">{item.label}</span>
                      <span className="block text-xs text-muted2">{item.hint}</span>
                    </span>
                    {i === active && <CornerDownLeft className="h-4 w-4 text-muted2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
