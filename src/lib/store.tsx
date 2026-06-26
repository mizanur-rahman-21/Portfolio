import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ============================================================
   App store — a localStorage-backed "backend": auth,
   contact messages, newsletter, analytics, bookmarks, theme.
   ============================================================ */

type Theme = "dark" | "light";
type Role = "user" | "admin";

export type User = { name: string; email: string; role: Role };

export type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  spam: boolean;
};

export type Toast = { id: string; title: string; desc?: string; type: "success" | "error" | "info" };

type State = {
  theme: Theme;
  toggleTheme: () => void;

  user: User | null;
  login: (email: string, _pw: string) => { ok: boolean; error?: string };
  register: (name: string, email: string) => { ok: boolean; error?: string };
  logout: () => void;

  messages: Message[];
  addMessage: (m: Omit<Message, "id" | "date" | "read">) => void;
  markRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  subscribers: string[];
  subscribe: (email: string) => { ok: boolean; error?: string };

  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  visits: number;
  pageViews: number;
  trackPage: () => void;

  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;

  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
};

const Ctx = createContext<State | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const ADMIN_EMAIL = "admin@mizanrahman.dev";

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => load<Theme>("am:theme", "dark"));
  const [user, setUser] = useState<User | null>(() => load<User | null>("am:user", null));
  const [messages, setMessages] = useState<Message[]>(() => load<Message[]>("am:messages", seedMessages()));
  const [subscribers, setSubscribers] = useState<string[]>(() => load<string[]>("am:subs", []));
  const [bookmarks, setBookmarks] = useState<string[]>(() => load<string[]>("am:bookmarks", []));
  const [visits, setVisits] = useState<number>(() => load<number>("am:visits", 18420));
  const [pageViews, setPageViews] = useState<number>(() => load<number>("am:views", 91240));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [commandOpen, setCommandOpen] = useState(false);

  /* persist */
  useEffect(() => localStorage.setItem("am:theme", JSON.stringify(theme)), [theme]);
  useEffect(() => localStorage.setItem("am:user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("am:messages", JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem("am:subs", JSON.stringify(subscribers)), [subscribers]);
  useEffect(() => localStorage.setItem("am:bookmarks", JSON.stringify(bookmarks)), [bookmarks]);
  useEffect(() => localStorage.setItem("am:visits", JSON.stringify(visits)), [visits]);
  useEffect(() => localStorage.setItem("am:views", JSON.stringify(pageViews)), [pageViews]);

  /* theme side-effect */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
  }, [theme]);

  /* unique-ish visitor bump */
  useEffect(() => {
    if (!sessionStorage.getItem("am:visited")) {
      sessionStorage.setItem("am:visited", "1");
      setVisits((v) => v + 1);
    }
  }, []);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 4200);
  }, []);
  const dismissToast = useCallback((id: string) => setToasts((p) => p.filter((x) => x.id !== id)), []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const login = useCallback((email: string, _pw: string) => {
    const role: Role = email.trim().toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
    const name = role === "admin" ? "Mizanur Rahman" : email.split("@")[0] || "Member";
    setUser({ name, email, role });
    return { ok: true };
  }, []);
  const register = useCallback((name: string, email: string) => {
    setUser({ name, email, role: "user" });
    return { ok: true };
  }, []);
  const logout = useCallback(() => setUser(null), []);

  const addMessage = useCallback((m: Omit<Message, "id" | "date" | "read">) => {
    setMessages((p) => [
      { ...m, id: Math.random().toString(36).slice(2), date: new Date().toISOString(), read: false },
      ...p,
    ]);
  }, []);
  const markRead = useCallback((id: string) => {
    setMessages((p) => p.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }, []);
  const deleteMessage = useCallback(
    (id: string) => setMessages((p) => p.filter((m) => m.id !== id)),
    []
  );

  const subscribe = useCallback(
    (email: string) => {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Invalid email" };
      if (subscribers.includes(email)) return { ok: false, error: "Already subscribed" };
      setSubscribers((p) => [...p, email]);
      return { ok: true };
    },
    [subscribers]
  );

  const toggleBookmark = useCallback(
    (id: string) =>
      setBookmarks((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    []
  );
  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const trackPage = useCallback(() => setPageViews((v) => v + 1), []);

  const value = useMemo<State>(
    () => ({
      theme,
      toggleTheme,
      user,
      login,
      register,
      logout,
      messages,
      addMessage,
      markRead,
      deleteMessage,
      subscribers,
      subscribe,
      bookmarks,
      toggleBookmark,
      isBookmarked,
      visits,
      pageViews,
      trackPage,
      toasts,
      toast,
      dismissToast,
      commandOpen,
      setCommandOpen,
    }),
    [
      theme, toggleTheme, user, login, register, logout, messages, addMessage, markRead,
      deleteMessage, subscribers, subscribe, bookmarks, toggleBookmark, isBookmarked,
      visits, pageViews, trackPage, toasts, toast, dismissToast, commandOpen,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

function seedMessages(): Message[] {
  return [
    {
      id: "m1",
      name: "Tanvir Ahmed",
      email: "tanvir@datalabs.io",
      phone: "+880 1711-223344",
      subject: "ML Internship opportunity",
      message: "Hi Mizan, your GitHub portfolio is impressive. Are you open to a machine learning internship with our data team?",
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
      spam: false,
    },
    {
      id: "m2",
      name: "Dr. Nadia Karim",
      email: "nadia@kuet.ac.bd",
      subject: "Research collaboration",
      message: "Your supply-chain risk project is exactly what our lab needs. Would you like to collaborate on a research paper?",
      date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      read: false,
      spam: false,
    },
    {
      id: "m3",
      name: "Crypto Airdrop Bot",
      email: "spam@xyz.xyz",
      subject: "WIN FREE CRYPTO NOW!!!",
      message: "Click here to claim your prize http://spam.link",
      date: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      read: true,
      spam: true,
    },
  ];
}
