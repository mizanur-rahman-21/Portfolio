import { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import {
  profile,
  experiences,
  education,
  skillCategories,
  certifications,
} from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { Section, Button } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function Resume() {
  const [ats, setAts] = useState(false);
  const { toast } = useApp();

  const print = () => {
    toast({ title: "Preparing PDF...", desc: "Use your browser's print dialog", type: "info" });
    setTimeout(() => window.print(), 400);
  };

  return (
    <>
      <PageHero
        breadcrumb="Resume"
        eyebrow="Curriculum Vitae"
        title={
          <>
            My <span className="text-gradient-accent">resume</span>, at a glance.
          </>
        }
        subtitle="Download a polished PDF, print directly, or switch to the ATS-friendly plain version."
      />

      <Section className="!pt-4">
        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-3 no-print">
          <Button variant="gradient" onClick={print}>
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button variant="soft" onClick={print}>
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant={ats ? "primary" : "soft"} onClick={() => setAts((v) => !v)}>
            <FileText className="h-4 w-4" /> ATS mode: {ats ? "On" : "Off"}
          </Button>
        </div>

        {/* Sheet */}
        <div className="mx-auto max-w-4xl">
          <div className="resume-sheet rounded-2xl border border-line bg-white p-8 text-slate-900 shadow-2xl sm:p-12">
            {/* Header */}
            <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
              <div>
                <h1 className="font-[Poppins] text-3xl font-bold tracking-tight">{profile.name}</h1>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {profile.roles.slice(0, 2).join(" · ")}
                </p>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600">{profile.shortBio}</p>
              </div>
              <div className="text-right text-xs text-slate-600">
                <p>{profile.email}</p>
                <p>{profile.phone}</p>
                <p>{profile.location}</p>
                <p className="text-blue-600">github.com/mizanur-rahman-21</p>
              </div>
            </header>

            {/* Experience */}
            <Block title="Experience">
              {experiences.slice(0, 4).map((e) => (
                <div key={e.id} className="mb-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {e.role} <span className="font-normal text-slate-500">— {e.org}</span>
                    </h3>
                    <span className="text-xs text-slate-500">{e.period}</span>
                  </div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs text-slate-700">
                    {e.achievements.slice(0, 3).map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Block>

            {/* Education */}
            <Block title="Education">
              {education.map((ed) => (
                <div key={ed.id} className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold">
                    {ed.degree}, {ed.field}
                  </h3>
                  <span className="text-xs text-slate-500">{ed.period}</span>
                  <p className="w-full text-xs text-slate-600">
                    {ed.institution} · {ed.gpa}
                  </p>
                </div>
              ))}
            </Block>

            {/* Skills */}
            <Block title="Skills">
              {ats ? (
                <div className="space-y-1 text-xs text-slate-700">
                  {skillCategories.map((c) => (
                    <p key={c.category}>
                      <span className="font-bold">{c.category}:</span>{" "}
                      {c.items.map((s) => s.name).join(", ")}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                  {skillCategories.map((c) =>
                    c.items.slice(0, 5).map((s) => (
                      <div key={s.name} className="text-xs">
                        <span className="font-medium">{s.name}</span>
                        <span className="ml-1 text-slate-400">{s.level}%</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Block>

            {/* Certifications */}
            <Block title="Certifications">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {certifications.map((c) => (
                  <p key={c.id} className="text-xs text-slate-700">
                    <span className="font-medium">{c.title}</span> — {c.issuer} ({c.date})
                  </p>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">{title}</h2>
      {children}
    </section>
  );
}
