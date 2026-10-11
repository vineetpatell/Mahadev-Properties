import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Home, Building, Map, Handshake, TrendingUp, Megaphone, ShieldCheck } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";
import { DepthCard } from "../components/DepthCard";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Mahadev Property" },
      { name: "description", content: "Residential & commercial development, land sales, buying-selling assistance, investment consulting, and property management." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Home, title: "Residential Property Development", desc: "Design-led homes with modern infrastructure and long-tenure liveability." },
  { icon: Building, title: "Commercial Property Development", desc: "Grade-A workspaces along Mumbai's high-traffic business corridors." },
  { icon: Map, title: "Plot and Land Sales", desc: "Verified titles, RERA-aligned parcels, transparent handover documentation." },
  { icon: Handshake, title: "Property Buying & Selling", desc: "End-to-end concierge for negotiations, diligence, and legal closure." },
  { icon: TrendingUp, title: "Real Estate Investment Consulting", desc: "Yield-mapped strategies for individual and institutional portfolios." },
  { icon: Megaphone, title: "Project Marketing & Sales", desc: "Positioning, launch collateral, and channel activation for developers." },
  { icon: ShieldCheck, title: "Property Management Services", desc: "Tenant curation, compliance, and asset upkeep — fully outsourced." },
];

function ServicesPage() {
  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem><div className="text-[10px] tracking-[0.4em] text-gold">01 · LOGISTICS</div></RevealItem>
          <RevealItem><h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-0.03em]">Services Hub.</h1></RevealItem>
          <RevealItem><p className="mt-6 max-w-2xl text-slate-muted">Seven integrated verticals — from developer-side execution to end-client concierge.</p></RevealItem>
        </Reveal>
      </Section>

      <Section className="pb-16">
        <Reveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15 border border-gold/20">
          {services.map((s, i) => (
            <DepthCard key={i} lift={8} className="bg-background p-8 group hover:bg-gold/10 transition-colors relative">
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.32em] text-gold/50 depth-float">0{i+1}</div>
              <s.icon className="h-10 w-10 text-gold depth-float" strokeWidth={1.4} style={{ transitionDelay: "50ms" }} />
              <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-slate-muted leading-relaxed">{s.desc}</p>
              <div className="mt-6 h-px w-8 bg-gold group-hover:w-20 transition-all duration-500" />
            </DepthCard>
          ))}
        </Reveal>
      </Section>

      <EMICalculator />
    </Layout>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayment, principalPct } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emiVal = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(total - principal),
      totalPayment: Math.round(total),
      principalPct: (principal / total) * 100,
    };
  }, [principal, rate, years]);

  const fmt = (n: number) => n.toLocaleString("en-IN");
  const C = 2 * Math.PI * 90;

  return (
    <Section className="py-16">
      <Reveal>
        <RevealItem>
          <div className="text-[10px] tracking-[0.4em] text-gold">02 · CALCULATOR</div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">EMI & Investment.</h2>
        </RevealItem>

        <RevealItem className="mt-10 grid lg:grid-cols-5 gap-px bg-gold/15 border border-gold/20">
          <div className="lg:col-span-3 bg-obsidian p-10 space-y-10">
            <Slider label="Loan Amount" value={principal} min={500000} max={50000000} step={100000} onChange={setPrincipal} format={(v) => `₹ ${fmt(v)}`} />
            <Slider label="Interest Rate" value={rate} min={5} max={15} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)} %`} />
            <Slider label="Tenure" value={years} min={1} max={30} step={1} onChange={setYears} format={(v) => `${v} years`} />
          </div>
          <div className="lg:col-span-2 bg-background p-10 flex flex-col items-center justify-center">
            <div className="relative h-64 w-64">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="90" stroke="rgba(197,168,128,0.15)" strokeWidth="10" fill="none" />
                <circle
                  cx="100" cy="100" r="90"
                  stroke="#C5A880" strokeWidth="10" fill="none"
                  strokeDasharray={C}
                  strokeDashoffset={C - (C * principalPct) / 100}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease", filter: "drop-shadow(0 0 8px rgba(197,168,128,0.5))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[10px] tracking-[0.32em] text-gold">MONTHLY</div>
                <div className="mt-2 text-3xl font-black">₹ {fmt(emi)}</div>
              </div>
            </div>
            <div className="mt-8 w-full space-y-3 text-sm">
              <Row label="Principal" v={`₹ ${fmt(principal)}`} />
              <Row label="Total Interest" v={`₹ ${fmt(totalInterest)}`} />
              <Row label="Total Payment" v={`₹ ${fmt(totalPayment)}`} highlight />
            </div>
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <div className="text-[10px] tracking-[0.32em] text-slate-muted">{label.toUpperCase()}</div>
        <div className="text-lg font-bold text-gold">{format(value)}</div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full appearance-none h-1 rounded-full outline-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(197,168,128,0.7)]
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-0"
        style={{ background: `linear-gradient(to right, #C5A880 0%, #C5A880 ${pct}%, rgba(197,168,128,0.15) ${pct}%, rgba(197,168,128,0.15) 100%)` }}
      />
    </div>
  );
}

function Row({ label, v, highlight }: { label: string; v: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between border-b border-gold/10 pb-2 ${highlight ? "text-gold font-bold" : "text-slate-muted"}`}>
      <span className="text-xs tracking-[0.22em]">{label.toUpperCase()}</span>
      <span className={highlight ? "" : "text-foreground"}>{v}</span>
    </div>
  );
}
