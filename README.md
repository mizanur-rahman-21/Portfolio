<<<<<<< HEAD
# Mizanur Rahman — ML Portfolio

A premium, single-page-application portfolio built with **React + Vite +
TypeScript + Tailwind CSS v4 + Framer Motion**.

> **Architecture note:** This is a **frontend-only** app. The "backend"
> (auth, contact messages, analytics, CMS dashboard, newsletter) is
> *simulated* in the browser via `localStorage`. No server runs.
> See [Graduating to a real backend](#-graduating-to-a-real-backend).

---

## 📂 Project structure

```
src/
├── data/portfolio.ts      ← ⭐ THE ONE FILE for all content (edit this first)
├── lib/
│   ├── store.tsx          ← simulated backend (auth, messages, analytics…)
│   └── hooks.ts           ← reusable React hooks (scroll, counter, parallax…)
├── components/
│   ├── ui.tsx             ← design-system primitives (Button, Card, Tag…)
│   ├── effects.tsx        ← background, cursor, toasts, scroll bar
│   ├── Navbar / Footer / Layout / CommandPalette / AiAssistant
├── pages/                 ← one file per route (Home, About, Projects…)
├── index.css              ← theme colors, fonts, animations
└── assets/hero.jpg        ← portrait image
```

---

## ✏️ Customizing content (90% of changes)

**Edit `src/data/portfolio.ts` — nothing else needed.** It exports typed objects
that feed every page:

| What you want to change     | Where in `portfolio.ts`        |
|-----------------------------|--------------------------------|
| Name, bio, roles, location  | `profile`                      |
| Contact email / phone       | `profile.email`, `profile.phone` |
| Social links                | `profile.socials`              |
| Hero animated stats         | `stats`                        |
| Skills + levels + years     | `skillCategories`              |
| Projects (cards + details)  | `projects`                     |
| Research / ML deep-dives    | `publications`                 |
| Work history                | `experiences`                  |
| Education                   | `education`                    |
| Certifications              | `certifications`               |
| Testimonials                | `testimonials`                 |
| Achievements                | `achievements`                 |
| Blog posts                  | `blogPosts`                    |
| GitHub stats (mock)         | `github`                       |

Add a new project by copying an existing object in the `projects` array and
editing its fields — it automatically appears on the Projects page, in search,
filters, and the command palette.

### Changing the look
- **Colors** → `src/index.css`, the `:root { ... }` variables (dark) and
  `.light { ... }` (light theme). `--accent`, `--accent-2`, `--highlight`.
- **Fonts** → `<link>` tags in `index.html` + `--font-*` in `index.css`.
- **Portrait** → replace `src/assets/hero.jpg`.

---

## 🗄️ Managing the simulated backend

Everything "backend" lives in **`src/lib/store.tsx`** and persists to
`localStorage`. Read/write it anywhere with the `useApp()` hook.

| Feature      | localStorage key  | Notes                                  |
|--------------|-------------------|----------------------------------------|
| Theme        | `am:theme`        | toggle in navbar                       |
| Auth session | `am:user`         | admin = `admin@mizanrahman.dev`        |
| Messages     | `am:messages`     | inbox in /dashboard → Messages         |
| Newsletter   | `am:subs`         | footer + dashboard                     |
| Bookmarks    | `am:bookmarks`    | projects & blog                        |
| Analytics    | `am:visits/views` | dashboard charts                       |

**Admin access:** go to `/dashboard`, use `admin@mizanrahman.dev` + any password.
**Reset all local data:** Dashboard → Settings → Danger zone → Reset data.

---

## 🚀 Deploying the frontend (do this now — it's ready)

The build outputs a single `dist/index.html`, so hosting is trivial:

- **Vercel / Netlify:** import the GitHub repo, framework = Vite, done.
- **GitHub Pages:** run `npm run build`, push `dist/` to a `gh-pages` branch.
- **Any static host:** upload `dist/index.html`.

The app uses **HashRouter** (`/#/projects`), so it works on any static host
with zero server config.

---

## 🔌 Graduating to a real backend

When you want real data persistence, real email, and real auth, build a small
API and swap the `localStorage` calls in `store.tsx` for `fetch()` calls.

Recommended stack & order:

1. **Contact email** — easiest win. Use a service (Resend, EmailJS, Formspree)
   in `src/pages/Contact.tsx` instead of the mock `addMessage`.
2. **Live GitHub data** — fetch from the GitHub REST API
   (`api.github.com/users/mizanur-rahman-21`) to replace the mock `github`
   object — real repos, stars, contribution graph.
3. **Real backend** — `Node + Express + PostgreSQL + Prisma`. Models:
   `User, Project, Message, BlogPost, Subscriber, Visit`.
4. **Real auth** — JWT + bcrypt, replace `login()/register()` in `store.tsx`.
5. **CMS** — the /dashboard already has the UI; point its tables at your API.

---

## 🛠️ Commands

```bash
npm run dev       # local dev server
npm run build     # production build → dist/index.html
npm run preview   # preview the production build
```

---

## ❓ What to do next (priority order)

1. **Deploy it.** Get it live today (Vercel/Netlify).
2. **Set real contact info** in `profile.email` / `profile.phone`.
3. **Wire live GitHub stats** via the GitHub API.
4. **Add real contact email** (Resend/Formspree).
5. **Build the backend** only when you need persistence beyond one device.
=======
# Portfolio-Website
>>>>>>> 1fd0b663f94418eb5658a28fa890a4c47caf9641
