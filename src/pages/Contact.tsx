import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone, Send, UploadCloud, ShieldCheck } from "lucide-react";
import { profile, faqs } from "@/data/portfolio";
import { PageHero } from "@/components/Layout";
import { GlassCard, Reveal, Section, Button, SectionHeading } from "@/components/ui";
import { SocialLinks } from "@/components/widgets";
import { useApp } from "@/lib/store";
import { cn } from "@/utils/cn";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const { addMessage, toast } = useApp();
  const [form, setForm] = useState(initial);
  const [hp, setHp] = useState(""); // honeypot
  const [file, setFile] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<number | null>(0);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = "Enter a valid email";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // bot trapped
    if (!validate()) {
      toast({ title: "Please check the form", type: "error" });
      return;
    }
    const spam =
      /viagra|casino|crypto airdrop|http:\/\/spam|click here to win/i.test(form.message + form.subject) ||
      form.message === form.message.toUpperCase();
    addMessage({ ...form, spam });
    toast({
      title: spam ? "Flagged for review" : "Message sent! 🎉",
      desc: spam ? "Our filters caught something." : "I'll reply within 24 hours.",
      type: spam ? "info" : "success",
    });
    setForm(initial);
    setFile("");
  };

  const info = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: "Location", value: profile.location, href: "#" },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            Let's start a <span className="text-gradient-accent">conversation</span>.
          </>
        }
        subtitle="Have a role, a project, or a research idea? Drop me a message and I'll get back within a day."
      />

      <Section className="!pt-4">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <GlassCard hover={false} className="p-7 sm:p-9">
              <h2 className="font-display text-xl font-semibold text-ink">Send a message</h2>
              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input value={form.name} onChange={set("name")} placeholder="Jane Doe" className={inputCls} />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input value={form.email} onChange={set("email")} type="email" placeholder="jane@email.com" className={inputCls} />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)">
                    <input value={form.phone} onChange={set("phone")} placeholder="+1 555 0100" className={inputCls} />
                  </Field>
                  <Field label="Subject">
                    <input value={form.subject} onChange={set("subject")} placeholder="Collaboration / Hiring" className={inputCls} />
                  </Field>
                </div>
                <Field label="Message" error={errors.message}>
                  <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Tell me about it..." className={cn(inputCls, "resize-none")} />
                </Field>

                {/* resume upload */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-white/[0.02] px-4 py-3 text-sm text-muted transition-colors hover:border-accent/50">
                  <UploadCloud className="h-5 w-5 text-accent2" />
                  <span className="flex-1">
                    {file ? <span className="text-ink">{file}</span> : "Attach resume / brief (optional)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => { setFile(e.target.files?.[0]?.name ?? ""); }}
                  />
                </label>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Protected by spam filters
                  </span>
                  <Button type="submit" variant="gradient">
                    <Send className="h-4 w-4" /> Send message
                  </Button>
                </div>
              </form>
            </GlassCard>
          </Reveal>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <GlassCard hover={false} className="p-6">
                <h3 className="font-display font-semibold text-ink">Contact details</h3>
                <div className="mt-4 space-y-3">
                  {info.map((i) => (
                    <a key={i.label} href={i.href} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3 transition-colors hover:border-accent/40">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent2">
                        <i.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs text-muted2">{i.label}</p>
                        <p className="text-sm font-medium text-ink">{i.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-5">
                  <p className="mb-2 text-xs text-muted2">Find me online</p>
                  <SocialLinks size="sm" />
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard hover={false} className="overflow-hidden p-0">
                <div className="relative h-40 bg-gradient-to-br from-accent/20 via-card to-hi/20">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="relative flex h-4 w-4 mx-auto">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
                      <MapPin className="relative h-6 w-6 text-accent2" />
                    </span>
                    <p className="mt-2 text-sm font-medium text-ink">{profile.location}</p>
                    <p className="text-xs text-muted2">{profile.timezone}</p>
                  </div>
                </div>
                <div className="p-4 text-center text-xs text-muted2">Interactive map · Google Maps integration ready</div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pt-4">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="overflow-hidden rounded-xl border border-line bg-card/50">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-ink">{f.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted2 transition-transform", open === i && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-white/5 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted2 focus:border-accent/60";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}
