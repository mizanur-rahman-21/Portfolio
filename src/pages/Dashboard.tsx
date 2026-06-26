import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bell,
  FolderGit2,
  LayoutDashboard,
  LogOut,
  Mail,
  Search,
  Settings as SettingsIcon,
  Shield,
  Trash2,
  Users,
  Eye,
  MailOpen,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  projects,
  blogPosts,
  skillCategories,
  profile,
} from "@/data/portfolio";
import { useApp, type User } from "@/lib/store";
import { AnimatedNumber, Reveal, Button } from "@/components/ui";
import { cn } from "@/utils/cn";

const ADMIN_HINT = "admin@mizanrahman.dev";

export default function Dashboard() {
  const { user, login, register, logout } = useApp();
  if (!user) return <AuthScreen onLogin={login} onRegister={register} />;
  return <DashboardApp user={user} onLogout={logout} />;
}

/* ============================================================
   AUTH SCREEN
   ============================================================ */
function AuthScreen({
  onLogin,
  onRegister,
}: {
  onLogin: (e: string, p: string) => { ok: boolean };
  onRegister: (n: string, e: string) => { ok: boolean };
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pw || (mode === "register" && !name)) {
      setErr("Please fill all fields");
      return;
    }
    const res = mode === "login" ? onLogin(email, pw) : onRegister(name, email);
    if (!res.ok) setErr("Something went wrong");
  };

  return (
    <section className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-28">
      <Reveal>
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent2 to-hi font-display font-bold text-white">
            {profile.initials}
          </span>
          <span className="font-display text-lg font-semibold text-ink">{profile.name}</span>
        </Link>
        <div className="glass rounded-2xl p-7 shadow-2xl sm:p-8">
          <div className="mb-6 flex rounded-xl border border-line p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErr(""); }}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all",
                  mode === m ? "bg-gradient-to-r from-accent to-accent2 text-white" : "text-muted"
                )}
              >
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-1 text-sm text-muted">Access the dashboard & CMS.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={authInput} />
            )}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className={authInput} />
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="Password" className={authInput} />
            {err && <p className="text-xs text-rose-400">{err}</p>}
            <Button type="submit" variant="gradient" className="w-full" size="lg">
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-3 text-center text-xs text-muted2">
            <Shield className="mx-auto mb-1 h-4 w-4 text-accent2" />
            Demo: use <span className="font-mono text-accent2">{ADMIN_HINT}</span> with any password for admin access.
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map((p) => (
              <button key={p} className="rounded-xl border border-line py-2.5 text-sm text-muted transition-colors hover:text-ink">
                {p}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
const authInput =
  "w-full rounded-xl border border-line bg-white/5 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted2 focus:border-accent/60";

/* ============================================================
   DASHBOARD APP
   ============================================================ */
type SectionKey = "overview" | "messages" | "content" | "analytics" | "users" | "settings";

const nav: { key: SectionKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "messages", label: "Messages", icon: Mail },
  { key: "content", label: "Content", icon: FolderGit2 },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "users", label: "Users", icon: Users },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

function DashboardApp({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [section, setSection] = useState<SectionKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = user.role === "admin";

  return (
    <div className="mx-auto flex min-h-screen max-w-[1500px] gap-0 px-3 pt-20 sm:px-5">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-line bg-surface/80 p-4 backdrop-blur-xl transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center gap-2 px-2 pt-10 lg:pt-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent2 to-hi font-display text-sm font-bold text-white">
            {profile.initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Dashboard</p>
            <p className="text-xs text-muted2">CMS Console</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => { setSection(n.key); setSidebarOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                section === n.key ? "bg-accent/15 text-accent2" : "text-muted hover:bg-white/5 hover:text-ink"
              )}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
              {n.key === "messages" && <span className="ml-auto rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">3</span>}
            </button>
          ))}
        </nav>
        {!isAdmin && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-300">
            Viewer mode — sign in as admin to manage content.
          </div>
        )}
        <button onClick={onLogout} className="mt-6 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-rose-500/10 hover:text-rose-300">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-bg/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="min-w-0 flex-1 py-6">
        {/* Topbar */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink lg:hidden">
              <LayoutDashboard className="h-4 w-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-bold capitalize text-ink sm:text-2xl">{section}</h1>
              <p className="text-xs text-muted2">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted2" />
              <input placeholder="Search..." className="w-40 rounded-lg border border-line bg-white/5 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent/60 lg:w-56" />
            </div>
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-ink">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <Link to="/" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-ink" title="View site">
              <ExternalLink className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 rounded-lg border border-line bg-white/5 px-2 py-1">
              <span className={cn("grid h-7 w-7 place-items-center rounded-md text-xs font-bold text-white", isAdmin ? "bg-gradient-to-br from-accent to-hi" : "bg-white/10")}>
                {user.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="hidden text-xs sm:block">
                <span className="block font-medium text-ink">{user.name}</span>
                <span className="block text-muted2 capitalize">{user.role}</span>
              </span>
            </div>
          </div>
        </div>

        {section === "overview" && <Overview />}
        {section === "messages" && <Messages />}
        {section === "content" && <Content isAdmin={isAdmin} />}
        {section === "analytics" && <Analytics />}
        {section === "users" && <UsersPanel />}
        {section === "settings" && <SettingsPanel onLogout={onLogout} />}
      </div>
    </div>
  );
}

/* ---------------- Overview ---------------- */
function Overview() {
  const { messages, visits, pageViews, subscribers } = useApp();
  const tiles = [
    { label: "Visitors", value: visits, icon: Eye, color: "from-blue-500 to-cyan-500" },
    { label: "Page Views", value: pageViews, icon: Activity, color: "from-violet-500 to-fuchsia-500" },
    { label: "Messages", value: messages.filter((m) => !m.read).length, icon: Mail, color: "from-emerald-500 to-teal-500", suffix: " new" },
    { label: "Subscribers", value: subscribers.length, icon: Sparkles, color: "from-amber-500 to-orange-500" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t, i) => (
          <Reveal key={t.label} delay={i * 0.05}>
            <div className="rounded-2xl border border-line bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white", t.color)}>
                  <t.icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                <AnimatedNumber value={t.value} />{t.suffix ?? ""}
              </p>
              <p className="text-xs text-muted2">{t.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Panel title="Visitor traffic (last 14 days)">
            <LineChart data={traffic} />
          </Panel>
        </Reveal>
        <Reveal delay={0.05}>
          <Panel title="Traffic sources">
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted">{s.label}</span>
                    <span className="text-muted2">{s.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent2" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>

      <Reveal>
        <Panel title="Recent messages">
          <div className="space-y-2">
            {messages.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-xs font-bold text-white">
                  {m.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{m.name} {m.spam && <span className="text-rose-400">· flagged</span>}</p>
                  <p className="truncate text-xs text-muted2">{m.subject || m.message}</p>
                </div>
                {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent2" />}
              </div>
            ))}
          </div>
        </Panel>
      </Reveal>
    </div>
  );
}

/* ---------------- Messages ---------------- */
function Messages() {
  const { messages, markRead, deleteMessage, toast } = useApp();
  const [filter, setFilter] = useState<"all" | "unread" | "spam">("all");
  const list = messages.filter((m) => (filter === "all" ? true : filter === "spam" ? m.spam : !m.read));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "unread", "spam"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-all", filter === f ? "bg-gradient-to-r from-accent to-accent2 text-white" : "border border-line text-muted hover:text-ink")}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {list.map((m) => (
          <div key={m.id} className={cn("rounded-2xl border bg-card/50 p-5 transition-colors", m.read ? "border-line opacity-70" : "border-accent/40")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-white">
                  {m.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <p className="font-medium text-ink">
                    {m.name} {m.spam && <span className="ml-1 rounded bg-rose-500/20 px-1.5 py-0.5 text-xs text-rose-300">spam</span>}
                  </p>
                  <p className="text-xs text-muted2">{m.email} · {new Date(m.date).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!m.read && (
                  <button onClick={() => markRead(m.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-emerald-300" title="Mark read">
                    <MailOpen className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => { deleteMessage(m.id); toast({ title: "Message deleted", type: "info" }); }} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-rose-300" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-accent2">{m.subject}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{m.message}</p>
          </div>
        ))}
        {list.length === 0 && <p className="py-12 text-center text-muted2">No messages here.</p>}
      </div>
    </div>
  );
}

/* ---------------- Content ---------------- */
function Content({ isAdmin }: { isAdmin: boolean }) {
  const { toast } = useApp();
  const [pub, setPub] = useState<Record<string, boolean>>(
    () => Object.fromEntries([...projects, ...blogPosts].map((x) => [x.id, true]))
  );
  const toggle = (id: string) => {
    if (!isAdmin) { toast({ title: "Viewer mode", desc: "Sign in as admin to publish", type: "error" }); return; }
    setPub((p) => ({ ...p, [id]: !p[id] }));
    toast({ title: pub[id] ? "Unpublished" : "Published", type: "success" });
  };
  return (
    <div className="space-y-8">
      <Panel title={`Projects (${projects.length})`}>
        <Table head={["Title", "Category", "Stars", "Status"]}>
          {projects.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <td className="py-3 text-sm font-medium text-ink">{p.emoji} {p.title}</td>
              <td className="py-3 text-xs text-muted">{p.category}</td>
              <td className="py-3 text-xs text-muted2">★ {p.stars}</td>
              <td className="py-3"><Toggle on={!!pub[p.id]} onClick={() => toggle(p.id)} /></td>
            </tr>
          ))}
        </Table>
      </Panel>
      <Panel title={`Blog posts (${blogPosts.length})`}>
        <Table head={["Title", "Category", "Views", "Status"]}>
          {blogPosts.map((b) => (
            <tr key={b.id} className="border-t border-line">
              <td className="py-3 text-sm font-medium text-ink">{b.title}</td>
              <td className="py-3 text-xs text-muted">{b.category}</td>
              <td className="py-3 text-xs text-muted2">{b.views.toLocaleString()}</td>
              <td className="py-3"><Toggle on={!!pub[b.id]} onClick={() => toggle(b.id)} /></td>
            </tr>
          ))}
        </Table>
      </Panel>
      <Panel title={`Skills (${skillCategories.reduce((n, c) => n + c.items.length, 0)})`}>
        <div className="flex flex-wrap gap-2">
          {skillCategories.flatMap((c) => c.items.map((s) => (
            <span key={s.name} className="rounded-lg border border-line bg-white/5 px-2.5 py-1 text-xs text-muted">{s.name}</span>
          )))}
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- Analytics ---------------- */
function Analytics() {
  const { visits, pageViews } = useApp();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Avg. session", value: "2m 14s" },
          { label: "Bounce rate", value: "32%" },
          { label: "Conversion", value: "4.8%" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-card/50 p-5">
            <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-xs text-muted2">{s.label}</p>
          </div>
        ))}
      </div>
      <Panel title="Weekly visits">
        <BarChart data={weekly} />
      </Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          <div className="space-y-2">
            {topPages.map((p) => (
              <div key={p.page} className="flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm">
                <span className="text-muted">{p.page}</span>
                <span className="text-muted2">{p.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Devices">
          <Donut data={devices} />
        </Panel>
      </div>
      <p className="text-center text-xs text-muted2">{visits.toLocaleString()} visitors · {pageViews.toLocaleString()} views all-time</p>
    </div>
  );
}

/* ---------------- Users ---------------- */
const fakeUsers = [
  { name: "Mizanur Rahman", email: "admin@mizanrahman.dev", role: "Admin", status: "active" },
  { name: "Sarah Lin", email: "sarah@techcorp.com", role: "Recruiter", status: "active" },
  { name: "Prof. Alan Grant", email: "grant@univ.edu", role: "Visitor", status: "active" },
  { name: "Marcus Chen", email: "marcus@startup.io", role: "Visitor", status: "pending" },
  { name: "Sofia Rossi", email: "sofia@fintech.com", role: "Recruiter", status: "active" },
];
function UsersPanel() {
  return (
    <Panel title={`Users (${fakeUsers.length})`}>
      <Table head={["User", "Email", "Role", "Status"]}>
        {fakeUsers.map((u) => (
          <tr key={u.email} className="border-t border-line">
            <td className="py-3 text-sm font-medium text-ink">{u.name}</td>
            <td className="py-3 text-xs text-muted2">{u.email}</td>
            <td className="py-3 text-xs text-muted">{u.role}</td>
            <td className="py-3">
              <span className={cn("rounded-full px-2 py-0.5 text-xs", u.status === "active" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>
                {u.status}
              </span>
            </td>
          </tr>
        ))}
      </Table>
    </Panel>
  );
}

/* ---------------- Settings ---------------- */
function SettingsPanel({ onLogout }: { onLogout: () => void }) {
  const { theme, toggleTheme, toast } = useApp();
  const clearData = () => {
    ["am:theme", "am:user", "am:messages", "am:subs", "am:bookmarks", "am:visits", "am:views", "am:cookie", "am:visited"].forEach((k) => localStorage.removeItem(k));
    toast({ title: "Data cleared", desc: "Reloading...", type: "info" });
    setTimeout(() => location.reload(), 800);
  };
  return (
    <div className="space-y-6">
      <Panel title="Profile">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Display name"><input defaultValue={profile.name} className={authInput} /></Labeled>
          <Labeled label="Email"><input defaultValue={profile.email} className={authInput} /></Labeled>
          <Labeled label="Tagline"><input defaultValue={profile.tagline} className={authInput} /></Labeled>
          <Labeled label="Location"><input defaultValue={profile.location} className={authInput} /></Labeled>
        </div>
        <div className="mt-4"><Button variant="gradient" onClick={() => toast({ title: "Settings saved", type: "success" })}><CheckCircle2 className="h-4 w-4" /> Save changes</Button></div>
      </Panel>
      <Panel title="Preferences">
        <div className="flex items-center justify-between rounded-xl border border-line bg-white/[0.02] p-4">
          <div>
            <p className="text-sm font-medium text-ink">Theme</p>
            <p className="text-xs text-muted2">Currently {theme}</p>
          </div>
          <Button variant="soft" size="sm" onClick={toggleTheme}>Toggle to {theme === "dark" ? "light" : "dark"}</Button>
        </div>
      </Panel>
      <Panel title="Danger zone">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
          <div>
            <p className="text-sm font-medium text-rose-300">Reset all local data</p>
            <p className="text-xs text-muted2">Clears messages, auth, analytics & preferences on this device.</p>
          </div>
          <Button variant="soft" size="sm" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10" onClick={clearData}>
            <Trash2 className="h-4 w-4" /> Reset data
          </Button>
        </div>
        <div className="mt-3"><Button variant="ghost" size="sm" onClick={onLogout}><LogOut className="h-4 w-4" /> Sign out</Button></div>
      </Panel>
    </div>
  );
}

/* ============================================================
   SHARED UI
   ============================================================ */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card/50 p-5 sm:p-6">
      <h3 className="mb-4 font-display font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}
function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px]">
        <thead>
          <tr>{head.map((h) => <th key={h} className="text-left text-xs font-medium uppercase tracking-wider text-muted2">{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("relative h-6 w-11 rounded-full transition-colors", on ? "bg-emerald-500" : "bg-white/15")}>
      <motion.span layout className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow" style={{ left: on ? "1.375rem" : "0.125rem" }} />
    </button>
  );
}
function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

/* ---------------- Charts ---------------- */
function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 92}`).join(" ");
  return (
    <div className="relative h-44 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${pts} 100,100`} fill="url(#lc)" />
        <polyline points={pts} fill="none" stroke="#06B6D4" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted2">
        <span>14d ago</span><span>today</span>
      </div>
    </div>
  );
}
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent2"
            />
          </div>
          <span className="text-[10px] text-muted2">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
function Donut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((n, d) => n + d.value, 0);
  let offset = 0;
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 100 100" className="h-36 w-36 -rotate-90">
        {data.map((d) => {
          const len = (d.value / total) * c;
          const el = (
            <circle
              key={d.label}
              cx="50" cy="50" r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-muted">{d.label}</span>
            <span className="ml-auto text-muted2">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- mock analytics data ---------------- */
const traffic = [120, 180, 150, 210, 260, 230, 300, 280, 340, 310, 380, 420, 400, 460];
const weekly = [
  { label: "Mon", value: 320 }, { label: "Tue", value: 410 }, { label: "Wed", value: 380 },
  { label: "Thu", value: 520 }, { label: "Fri", value: 600 }, { label: "Sat", value: 470 }, { label: "Sun", value: 390 },
];
const sources = [
  { label: "Direct", pct: 38 }, { label: "Google", pct: 27 }, { label: "GitHub", pct: 18 },
  { label: "LinkedIn", pct: 11 }, { label: "Referral", pct: 6 },
];
const topPages = [
  { page: "/", views: 18420 }, { page: "/projects", views: 9210 }, { page: "/research", views: 6480 },
  { page: "/blog", views: 5120 }, { page: "/contact", views: 3980 },
];
const devices = [
  { label: "Desktop", value: 62, color: "#3B82F6" },
  { label: "Mobile", value: 31, color: "#06B6D4" },
  { label: "Tablet", value: 7, color: "#8B5CF6" },
];
