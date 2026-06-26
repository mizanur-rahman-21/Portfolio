import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Command, Menu, Moon, Search, Sun, X, LayoutDashboard } from "lucide-react";
import { navLinks, moreLinks, profile } from "@/data/portfolio";
import { useApp } from "@/lib/store";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/utils/cn";

export function Navbar() {
  const scrolled = useScrolled(20);
  const { theme, toggleTheme, setCommandOpen, user } = useApp();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative px-3 py-2 text-sm font-medium transition-colors",
      isActive ? "text-ink" : "text-muted hover:text-ink"
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-3 transition-all duration-500",
              scrolled
                ? "glass h-14 shadow-lg shadow-black/20"
                : "h-14 border border-transparent"
            )}
          >
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2.5 pl-1">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent2 to-hi font-display text-sm font-bold text-white shadow-lg shadow-accent/30">
                {profile.initials}
                <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
              </span>
              <span className="hidden font-display text-base font-semibold tracking-tight text-ink sm:block">
                {profile.name}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center lg:flex">
              {navLinks.slice(0, 6).map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-accent to-accent2"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              {/* More dropdown */}
              <div className="relative" onMouseEnter={() => setMore(true)} onMouseLeave={() => setMore(false)}>
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink">
                  More
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", more && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {more && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="glass absolute left-1/2 top-full w-52 -translate-x-1/2 rounded-xl p-2 shadow-2xl"
                    >
                      {[...navLinks.slice(6), ...moreLinks].map((l) => (
                        <Link
                          key={l.to}
                          to={l.to}
                          className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCommandOpen(true)}
                aria-label="Search"
                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5 text-muted transition-colors hover:text-ink"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5 text-muted transition-colors hover:text-ink"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Moon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                to="/dashboard"
                className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent2 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] sm:flex"
              >
                {user ? (
                  <>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </>
                ) : (
                  "Sign in"
                )}
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/5 text-ink lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] lg:hidden"
          >
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute inset-x-3 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-line bg-card p-4 shadow-2xl"
            >
              <div className="grid gap-1">
                {[...navLinks, ...moreLinks].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive ? "bg-accent/10 text-accent2" : "text-muted hover:bg-white/5 hover:text-ink"
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/dashboard"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent2 px-4 py-3 text-sm font-semibold text-white"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* keyboard hint */}
      <div className="pointer-events-none fixed bottom-3 left-1/2 z-[100] hidden -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-card/60 px-2.5 py-1 text-[10px] text-muted2 backdrop-blur xl:flex">
        <Command className="h-3 w-3" /> K to search
      </div>
    </>
  );
}
