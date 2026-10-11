import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mahadev Property" },
      { name: "description", content: "Speak with Mahadev Property. Malad West studio, direct phone, email and lead console." },
    ],
  }),
  component: ContactPage,
});

const servicesList = [
  "Residential Property",
  "Commercial Property",
  "Plot & Land",
  "Buying / Selling",
  "Investment Consulting",
  "Project Marketing",
  "Property Management",
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: servicesList[0], message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", phone: "", service: servicesList[0], message: "" });
  };

  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem><div className="text-[10px] tracking-[0.4em] text-gold">CONTACT · MALAD WEST</div></RevealItem>
          <RevealItem><h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-0.03em]">Let's talk.</h1></RevealItem>
          <RevealItem><p className="mt-6 max-w-2xl text-slate-muted">A short briefing gives us enough context to prepare a shortlist tailored to your requirement.</p></RevealItem>
        </Reveal>
      </Section>

      <Section className="pb-24">
        <div className="grid lg:grid-cols-2 gap-px bg-gold/15 border border-gold/20">
          <form onSubmit={submit} className="bg-obsidian p-10">
            <div className="text-[10px] tracking-[0.4em] text-gold">LEAD CONSOLE</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Send a briefing</h2>

            <div className="mt-8 space-y-6">
              <Input label="Full Name" value={form.name} onChange={(v)=>setForm({...form,name:v})} />
              <Input label="Email" type="email" value={form.email} onChange={(v)=>setForm({...form,email:v})} />
              <Input label="Phone" value={form.phone} onChange={(v)=>setForm({...form,phone:v})} />
              <div>
                <label className="text-[10px] tracking-[0.32em] text-slate-muted">SERVICE</label>
                <select value={form.service} onChange={(e)=>setForm({...form,service:e.target.value})}
                  className="mt-2 w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-foreground">
                  {servicesList.map(s => <option key={s} value={s} className="bg-obsidian">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.32em] text-slate-muted">MESSAGE</label>
                <textarea rows={4} required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})}
                  className="mt-2 w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-foreground resize-none" />
              </div>
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.94 }}
              className="mt-10 inline-flex items-center gap-3 bg-gold text-foreground px-7 py-3.5 text-xs tracking-[0.22em] uppercase hover:bg-[#D8BF95] transition-colors"
            >
              {sent ? <><Check className="h-4 w-4"/> Sent</> : <><Send className="h-4 w-4"/> Submit Briefing</>}
            </motion.button>
          </form>

          <div className="bg-background p-10">
            <div className="text-[10px] tracking-[0.4em] text-gold">STUDIO</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Direct channels</h2>

            <div className="mt-8 space-y-6">
              <ContactRow icon={Phone} label="PHONE" value="+91 91523 83586" href="tel:+919152383586" />
              <ContactRow icon={Mail} label="EMAIL" value="mahadevproperties@gmail.com" href="mailto:mahadevproperties@gmail.com" />
              <ContactRow icon={MapPin} label="ADDRESS" value="P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064" />
            </div>

            <div className="mt-10 relative aspect-[4/3] border border-gold/25 overflow-hidden bg-obsidian">
              <MapMockup />
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-[10px] tracking-[0.32em] text-slate-muted">{label.toUpperCase()}</label>
      <input required type={type} value={value} onChange={(e)=>onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-foreground" />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const inner = (
    <div className="group flex items-start gap-4 border-b border-gold/10 pb-4">
      <div className="h-10 w-10 border border-gold/40 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div>
        <div className="text-[10px] tracking-[0.32em] text-slate-muted">{label}</div>
        <div className="mt-1 text-foreground group-hover:text-gold transition-colors">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

function MapMockup() {
  return (
    <div className="relative w-full h-full" style={{
      backgroundImage: `
        linear-gradient(rgba(197,168,128,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(197,168,128,0.08) 1px, transparent 1px),
        linear-gradient(rgba(197,168,128,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(197,168,128,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
      backgroundColor: "#060813",
    }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M0,120 Q100,80 200,140 T400,160" stroke="rgba(197,168,128,0.35)" strokeWidth="1.5" fill="none" />
        <path d="M50,0 L60,300" stroke="rgba(197,168,128,0.25)" strokeWidth="1" fill="none" />
        <path d="M240,0 Q260,150 220,300" stroke="rgba(197,168,128,0.25)" strokeWidth="1" fill="none" />
        <path d="M0,240 L400,220" stroke="rgba(197,168,128,0.2)" strokeWidth="1" fill="none" />
        <rect x="80" y="160" width="30" height="24" fill="rgba(197,168,128,0.08)" stroke="rgba(197,168,128,0.2)" />
        <rect x="280" y="90" width="40" height="30" fill="rgba(197,168,128,0.08)" stroke="rgba(197,168,128,0.2)" />
        <rect x="180" y="220" width="35" height="25" fill="rgba(197,168,128,0.08)" stroke="rgba(197,168,128,0.2)" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 h-6 w-6 rounded-full bg-gold/40"
        />
        <div className="relative h-6 w-6 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.7)]">
          <MapPin className="h-3 w-3 text-foreground" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.32em] text-gold">MALAD WEST · 19.1849° N · 72.8377° E</div>
      <div className="absolute top-4 right-4 text-[10px] tracking-[0.32em] text-slate-muted gold-border px-2 py-1 bg-obsidian/60">SATELLITE · MOCK</div>
    </div>
  );
}
