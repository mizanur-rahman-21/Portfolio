import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "@/lib/store";
import { Layout } from "@/components/Layout";
import { PageTransition } from "@/components/effects";
import { profile } from "@/data/portfolio";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Research from "@/pages/Research";
import Experience from "@/pages/Experience";
import Education from "@/pages/Education";
import Certifications from "@/pages/Certifications";
import Resume from "@/pages/Resume";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

export default function App() {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppProvider>
      <AnimatePresence>{booting && <BootLoader />}</AnimatePresence>
      <HashRouter>
        <Layout>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/research" element={<Research />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/education" element={<Education />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

function BootLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[500] grid place-items-center bg-bg"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.span
          animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent via-accent2 to-hi font-display text-2xl font-bold text-white shadow-2xl shadow-accent/40"
        >
          {profile.initials}
        </motion.span>
        <div className="h-1 w-36 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-accent to-hi"
          />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted2">Loading</p>
      </div>
    </motion.div>
  );
}
