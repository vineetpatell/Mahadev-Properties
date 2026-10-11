import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Circle } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { properties } from "../lib/properties";
import { Reveal, RevealItem } from "../components/Reveal";
import { SaveProperty } from "../components/Shortlist";
import { DepthCard } from "../components/DepthCard";

const filters = ["All", "1RK", "1BHK", "2BHK", "3BHK", "Commercial", "Flats for Sale", "Villas/Houses", "Plots"] as const;

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Premium Portfolios — Mahadev Property" },
      { name: "description", content: "Explore curated residential and commercial portfolios across Malad West, Mumbai." },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = useMemo(() => active === "All" ? properties : properties.filter((p) => p.type === active), [active]);

  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">01 · PORTFOLIO</div>
          </RevealItem>
          <RevealItem>
            <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em]">Premium Portfolios</h1>
              <div className="h-px flex-1 bg-gold min-w-[80px] mb-4" />
              <span className="text-xs tracking-[0.32em] text-slate-muted mb-2">{list.length} · LIVE</span>
            </div>
          </RevealItem>
        </Reveal>
      </Section>

      <Section className="py-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-5 py-2.5 text-xs tracking-[0.22em] uppercase border transition-all ${
                active === f
                  ? "bg-gold text-foreground border-gold"
                  : "border-gold/20 text-slate-muted hover:text-foreground hover:border-gold/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`${i === 0 || i === 3 ? "lg:col-span-2" : ""}`}
                style={{ perspective: 1200 }}
              >
                <DepthCard
                  lift={12}
                  className="group relative card-elevated border border-gold/15 overflow-hidden hover:border-gold/50 transition-colors h-full rounded-sm"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={p.image} alt={p.name} className="depth-media w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="depth-float text-[10px] tracking-[0.32em] gold-border px-3 py-1 bg-white/90 text-gold shadow-md">{p.type.toUpperCase()}</span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-3">
                      <span className="depth-float flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-gold bg-white/90 px-3 py-1 border border-gold/30 shadow-md" style={{ transitionDelay: "40ms" }}>
                        <Circle className="h-2 w-2 fill-gold text-gold animate-pulse" /> {p.status.toUpperCase()}
                      </span>
                      <span className="depth-float" style={{ transitionDelay: "80ms" }}><SaveProperty id={p.id} /></span>
                    </div>
                    <div
                      className="absolute bottom-4 right-4 text-[10px] tracking-[0.32em] text-primary-foreground bg-gold px-3 py-1.5 shadow-lg depth-float"
                      style={{ transitionDelay: "120ms" }}
                    >
                      {p.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] tracking-[0.32em] text-slate-muted flex items-center gap-2"><MapPin className="h-3 w-3 text-gold" /> {p.location.toUpperCase()}</div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-2 text-xs tracking-[0.18em] text-slate-muted uppercase">{p.tagline}</p>
                    <Link
                      to="/property/$id"
                      params={{ id: p.id }}
                      className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
                    >
                      VIEW BLUEPRINT DETAILS <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </DepthCard>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </Layout>
  );
}
