import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Circle } from "lucide-react";
import { Section } from "./Layout";
import type { properties } from "../lib/properties";
import { SaveProperty } from "./Shortlist";
import { DepthCard } from "./DepthCard";

export function ListingGrid({ items, emptyNote }: { items: typeof properties; emptyNote: string }) {
  if (items.length === 0) {
    return (
      <Section className="pb-24">
        <div className="border border-gold/20 bg-obsidian p-10 text-center">
          <div className="text-[10px] tracking-[0.4em] text-gold">NO MATCHES</div>
          <p className="mt-4 text-sm text-slate-muted">{emptyNote}</p>
        </div>
      </Section>
    );
  }
  return (
    <Section className="pb-24">
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              className={`${i === 0 || i === 3 ? "lg:col-span-2" : ""}`}
              style={{ perspective: 1200 }}
            >
              <DepthCard
                lift={12}
                className="group relative card-elevated border border-gold/15 overflow-hidden hover:border-gold/50 transition-colors h-full rounded-sm"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.type} in ${p.location}`}
                    className="depth-media w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
                  <Link
                    to="/property/$id"
                    params={{ id: p.id }}
                    aria-label={`View ${p.name} details`}
                    className="absolute inset-0"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="depth-float text-[10px] tracking-[0.32em] gold-border px-3 py-1 bg-white/90 text-gold shadow-md">
                      {p.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <span
                      className="depth-float flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-gold bg-white/90 px-3 py-1 border border-gold/30 shadow-md"
                      style={{ transitionDelay: "40ms" }}
                    >
                      <Circle className="h-2 w-2 fill-gold text-gold animate-pulse" />{" "}
                      {p.status.toUpperCase()}
                    </span>
                    <span className="depth-float" style={{ transitionDelay: "80ms" }}>
                      <SaveProperty id={p.id} />
                    </span>
                  </div>
                  <div
                    className="absolute bottom-4 right-4 text-[10px] tracking-[0.32em] text-primary-foreground bg-gold px-3 py-1.5 shadow-lg depth-float"
                    style={{ transitionDelay: "120ms" }}
                  >
                    {p.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] tracking-[0.32em] text-slate-muted flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gold" /> {p.location.toUpperCase()}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-2 text-xs tracking-[0.18em] text-slate-muted uppercase">
                    {p.tagline}
                  </p>
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
  );
}
