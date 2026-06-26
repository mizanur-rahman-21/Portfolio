import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { navLinks, moreLinks, profile } from "@/data/portfolio";
import { SocialLinks, NewsletterForm } from "@/components/widgets";
import { useApp } from "@/lib/store";

export function Footer() {
  const { visits } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent2 to-hi font-display text-sm font-bold text-white">
                {profile.initials}
              </span>
              <span className="font-display text-lg font-semibold text-ink">{profile.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{profile.shortBio}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent2" /> {profile.location}
            </div>
            <SocialLinks className="mt-5" size="sm" />
          </div>

          {/* Navigate */}
          <FooterCol title="Navigate">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="footer-link">
                {l.label}
              </Link>
            ))}
          </FooterCol>

          {/* Resources */}
          <FooterCol title="Resources">
            {moreLinks.map((l) => (
              <Link key={l.to} to={l.to} className="footer-link">
                {l.label}
              </Link>
            ))}
            <Link to="/dashboard" className="footer-link">
              Dashboard
            </Link>
            <Link to="/certifications" className="footer-link">
              Certifications
            </Link>
          </FooterCol>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted">
              Occasional notes on ML, research and building. No spam, unsubscribe anytime.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {visits.toLocaleString()} visitors · all systems operational
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-muted2 sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> using React,
            Vite & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{title}</h4>
      <div className="mt-4 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
