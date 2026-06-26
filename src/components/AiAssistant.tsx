import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { profile, skillCategories, projects, publications, experiences } from "@/data/portfolio";
import { cn } from "@/utils/cn";

type Msg = { role: "bot" | "user"; text: string };

const suggestions = ["What are your skills?", "Show me a project", "Are you available?", "How to contact?"];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/hire|available|work|job|open/.test(q)) return `${profile.availability}. Email me at ${profile.email} — I reply fast!`;
  if (/skill|tech|stack/.test(q))
    return `I work across ${skillCategories.map((c) => c.category.toLowerCase()).join(", ")}. Highlights: ${skillCategories
      .flatMap((c) => c.items.slice(0, 2).map((i) => i.name))
      .slice(0, 8)
      .join(", ")}.`;
  if (/project|portfolio|work/.test(q))
    return `Some of my favourites: ${projects
      .slice(0, 3)
      .map((p) => `${p.title} (${p.category})`)
      .join("; ")}. Head to /projects for the full list!`;
  if (/research|paper|publish|deep/.test(q))
    return `Mizan has ${publications.length} notable ML deep-dives. The latest: "${publications[0].title}" — explore it on the Research page.`;
  if (/contact|email|reach|message/.test(q)) return `Best way: ${profile.email}, or use the Contact page. I'm in ${profile.location} (${profile.timezone}).`;
  if (/resume|cv/.test(q)) return `You can view & download my resume on the Resume page (with an ATS-friendly version).`;
  if (/experience|background/.test(q)) return `I have ${experiences.length} roles across research, startups, freelance & leadership. See /experience.`;
  if (/hi|hello|hey|yo/.test(q)) return `Hey there! 👋 I'm Mizan's AI assistant. Ask about skills, projects, ML work or how to get in touch.`;
  if (/who|about|you/.test(q)) return profile.shortBio;
  return `Good question! I can tell you about Mizan's skills, projects, ML work, experience, or how to get in touch. What interests you?`;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Aaraav's AI assistant ✨ Ask me anything about skills, projects, research, or getting in touch." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { role: "bot", text: reply(t) }]);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 left-6 z-[160] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent via-accent2 to-hi text-white shadow-2xl shadow-accent/40 transition-transform hover:scale-105"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-accent2/40 animate-ping" />}
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 left-6 z-[160] flex h-[26rem] w-[calc(100%-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-card to-bg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-accent/15 to-hi/15 p-4">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-white">
                <Sparkles className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">AI Assistant</p>
                <p className="text-xs text-emerald-300">● Online · replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 no-scrollbar">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-gradient-to-r from-accent to-accent2 text-white"
                        : "rounded-bl-sm border border-line bg-surface text-muted"
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-white/5 px-3 py-3">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted2" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {msgs.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-line bg-white/5 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent2"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
              />
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-accent to-accent2 text-white transition-transform hover:scale-105"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
