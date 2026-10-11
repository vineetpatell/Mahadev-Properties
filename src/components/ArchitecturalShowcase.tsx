import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { properties } from "../lib/properties";
import { Button } from "./ui/button";

export function ArchitecturalShowcase() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".landmark-track");
        if (!track) return;
        gsap.to(track, { x: () => -(track.scrollWidth - track.clientWidth), ease: "none", scrollTrigger: { trigger: root.current, pin: true, start: "top 64px", end: () => `+=${track.scrollWidth - track.clientWidth}`, scrub: 1, invalidateOnRefresh: true } });
      });
      revert = () => mm.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);
  return <section ref={root} className="landmark-section bg-secondary py-14 overflow-hidden"><div className="mx-auto max-w-7xl px-6"><div className="text-xs text-gold">02 / FROM VISION TO LIVING</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold">Spaces with a point of view.</h2><div className="landmark-track flex gap-6 mt-9">{[properties[3],properties[8],properties[10]].filter(p => p !== undefined).map((p,i) => <article key={p.id} className="landmark-panel shrink-0"><div className="relative aspect-[16/9] overflow-hidden blueprint-photo"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /><div className="blueprint-layer" aria-hidden="true" /></div><div className="mt-5 flex items-start justify-between gap-4"><div><p className="text-xs text-gold">0{i+1} · {p.location}</p><h3 className="mt-2 text-xl md:text-2xl font-semibold">{p.name}</h3></div><Button asChild variant="outline" size="icon"><Link to="/property/$id" params={{id:p.id}} aria-label={`Explore ${p.name}`}><ArrowUpRight /></Link></Button></div></article>)}</div></div></section>;
}