import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Star, MapPin, Home, Building2 } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { MagneticButton } from "../components/MagneticButton";
import { Ticker } from "../components/Ticker";
import { Reveal, RevealItem } from "../components/Reveal";
import { PropertyCarousel } from "../components/PropertyCarousel";
import { ArchitecturalShowcase } from "../components/ArchitecturalShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahadev Property — Find Your Dream Space With Trust & Transparency" },
      { name: "description", content: "Premium development solutions across Malad West. Residential, commercial and investment properties with transparent guidance." },
    ],
  }),
  component: HomePage,
});

type Review = { name: string; rating: number; text: string };

function HomePage() {
  return (
    <Layout>
      <Hero />
      <Ticker />
      <SearchDashboard />
      <PropertyCarousel />
      <Metrics />
      <Ticker reverse />
      <ArchitecturalShowcase />
      <ReviewsBoard />
    </Layout>
  );
}

function Hero() {
  return (
    <Section className="pt-16 pb-24 relative">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-7">
          <RevealItem>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" /> EST · MUMBAI · MALAD WEST
            </div>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.03em] leading-[0.95]">
              Find Your Dream <br />
              Space With <span className="text-gradient-gold italic font-light">Trust</span> <br />
              & Transparency.
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 max-w-xl text-base text-slate-muted leading-relaxed font-light">
              Premium development solutions — residential, commercial and investment portfolios crafted with architectural precision, transparent process, and long-term value.
            </p>
          </RevealItem>
          <RevealItem className="mt-10 flex flex-wrap gap-4">
            <Link to="/properties"><MagneticButton variant="solid">View Portfolio <ArrowUpRight className="h-4 w-4" /></MagneticButton></Link>
            <Link to="/contact"><MagneticButton>Request Briefing</MagneticButton></Link>
          </RevealItem>
          <RevealItem className="mt-14 grid grid-cols-3 max-w-md gap-6 border-t border-gold/10 pt-8">
            {[
              { k: "12+", v: "Years Legacy" },
              { k: "480", v: "Units Delivered" },
              { k: "98%", v: "Client Trust" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-3xl font-bold text-foreground">{s.k}</div>
                <div className="text-[10px] tracking-[0.28em] text-slate-muted mt-2">{s.v}</div>
              </div>
            ))}
          </RevealItem>
        </Reveal>
        <div className="lg:col-span-5 relative h-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 w-[78%] h-[62%] overflow-hidden gold-border"
          >
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80" alt="Residential tower" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.35em] text-gold">BLUEPRINT · 24.11</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 w-[62%] h-[46%] overflow-hidden border border-gold/40 shadow-2xl shadow-foreground/30"
          >
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Interior" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="absolute bottom-8 right-4 bg-obsidian/90 backdrop-blur border border-gold/30 px-5 py-4"
          >
            <div className="text-[10px] tracking-[0.32em] text-gold">NOW LEASING</div>
            <div className="text-xl font-bold text-foreground mt-1">Orchid Tower</div>
            <div className="text-xs text-slate-muted flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> Malad West</div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function SearchDashboard() {
  const [loc, setLoc] = useState("Malad West");
  const [cfg, setCfg] = useState("2BHK");
  const [price, setPrice] = useState("₹ 50L – 1.5 Cr");
  const [status, setStatus] = useState("Ready to Move");
  return (
    <Section className="py-16">
      <Reveal>
        <RevealItem>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="text-[10px] tracking-[0.4em] text-gold">01 · DISCOVERY</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Search Dashboard.</h2>
            </div>
            <p className="text-sm text-slate-muted max-w-sm">Absolute filters, precise output. Refine your query — we handle the rest.</p>
          </div>
        </RevealItem>
        <RevealItem>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/20">
            <Field label="LOCATION" value={loc} onChange={setLoc} options={["Malad West", "Andheri", "Borivali", "Goregaon"]} />
            <Field label="CONFIGURATION" value={cfg} onChange={setCfg} options={["1RK", "1BHK", "2BHK", "3BHK", "Commercial"]} />
            <Field label="PRICE RANGE" value={price} onChange={setPrice} options={["₹ 25L – 50L", "₹ 50L – 1.5 Cr", "₹ 1.5 Cr – 3 Cr", "₹ 3 Cr+"]} />
            <Field label="STATUS" value={status} onChange={setStatus} options={["Ready to Move", "Under Construction", "Newly Launched", "Resale"]} />
          </div>
          <div className="mt-6 flex justify-end">
            <Link to="/properties">
              <MagneticButton variant="solid"><Search className="h-4 w-4" /> Search Portfolio</MagneticButton>
            </Link>
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function Field({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="bg-obsidian p-6">
      <div className="text-[10px] tracking-[0.32em] text-gold">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full bg-transparent text-lg font-medium text-foreground outline-none border-b border-gold/20 pb-2 focus:border-gold transition-colors"
      >
        {options.map((o) => <option key={o} value={o} className="bg-obsidian">{o}</option>)}
      </select>
    </div>
  );
}

function Metrics() {
  const items = [
    { icon: Home, k: "Residential", v: "Curated homes designed for long-tenure living." },
    { icon: Building2, k: "Commercial", v: "Grade-A workspaces on high-traffic corridors." },
    { icon: MapPin, k: "Land & Plots", v: "Verified titles, RERA-aligned parcels." },
  ];
  return (
    <Section className="py-24">
      <Reveal className="grid md:grid-cols-3 gap-px bg-gold/15 border border-gold/20">
        {items.map((it, i) => (
          <RevealItem key={i} className="bg-background p-10 group hover:bg-gold/10 transition-colors">
            <it.icon className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-2xl font-bold tracking-tight">{it.k}</div>
            <p className="mt-3 text-sm text-slate-muted leading-relaxed">{it.v}</p>
            <div className="mt-8 h-px w-8 bg-gold group-hover:w-20 transition-all duration-500" />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function ReviewsBoard() {
  const [reviews, setReviews] = useState<Review[]>([
    { name: "Ananya Sharma", rating: 5, text: "Every interaction felt like working with a top-tier architectural firm. Zero pressure, complete clarity on paperwork, and a home that exceeded the brochure." },
    { name: "Rohan Iyer", rating: 5, text: "Bought a commercial space through Mahadev Property. Their diligence on titles and their negotiation discipline saved us weeks and lakhs. Absolute professionals." },
  ]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = () => {
    if (!name.trim() || !text.trim()) return;
    setReviews([{ name: name.trim(), rating, text: text.trim() }, ...reviews]);
    setName(""); setText(""); setRating(5);
  };

  return (
    <Section className="py-24">
      <Reveal>
        <RevealItem>
          <div className="text-[10px] tracking-[0.4em] text-gold">02 · TESTIMONIALS</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">Voices from the portfolio.</h2>
        </RevealItem>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <RevealItem className="bg-obsidian border border-gold/20 p-8">
            <div className="text-[10px] tracking-[0.32em] text-gold">LEAVE A REVIEW</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-6 w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-foreground placeholder:text-slate-muted"
            />
            <div className="mt-6 flex items-center gap-1">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)}>
                  <Star
                    className={`h-6 w-6 transition-all ${n <= rating ? "fill-gold text-gold drop-shadow-[0_0_6px_rgba(197,168,128,0.6)]" : "text-slate-muted"}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your experience..."
              rows={4}
              className="mt-6 w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-foreground placeholder:text-slate-muted resize-none"
            />
            <div className="mt-8">
              <MagneticButton variant="solid" onClick={submit}>Submit Review</MagneticButton>
            </div>
          </RevealItem>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gold/15 p-8 bg-obsidian/40 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="mt-5 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <span className="tracking-[0.22em] text-gold">{r.name.toUpperCase()}</span>
                  <span className="text-slate-muted">VERIFIED CLIENT</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
