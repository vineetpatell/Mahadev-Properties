import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { properties } from "../lib/properties";
import { Button } from "./ui/button";
import { getGsap, motionOk } from "../lib/motion";

export function ArchitecturalShowcase() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!motionOk()) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled || !root.current) return;
      const { gsap } = getGsap();
      const mm = gsap.matchMedia();

      // Desktop walkthrough — pinned horizontal walk, panels glide + photos drift inside.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".landmark-track");
        if (!track) return;
        const panels = Array.from(track.querySelectorAll<HTMLElement>(".landmark-panel"));
        const walk = gsap.to(track, {
          x: () => -(track.scrollWidth - track.clientWidth),
          ease: "none",
          scrollTrigger: { trigger: root.current, pin: true, start: "top 64px", end: () => `+=${track.scrollWidth - track.clientWidth}`, scrub: 1, invalidateOnRefresh: true },
        });
        panels.forEach((panel) => {
          const photo = panel.querySelector("img");
          if (photo) {
            gsap.fromTo(
              photo,
              { xPercent: -7, scale: 1.18 },
              { xPercent: 7, scale: 1.05, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: walk, start: "left right", end: "right left", scrub: true } },
            );
          }
          const copy = panel.querySelectorAll("p, h3");
          if (copy.length) {
            gsap.fromTo(
              copy,
              { y: 34, opacity: 0 },
              { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: walk, start: "left 85%", end: "left 35%", scrub: true } },
            );
          }
        });
      });

      // Mobile / tablet walkthrough — same section, vertical step-by-step reveal. No layout change.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = root.current?.querySelectorAll<HTMLElement>(".landmark-panel") ?? [];
        panels.forEach((panel) => {
          gsap.from(panel, {
            y: 56,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%", toggleActions: "play none none reverse" },
          });
          const photo = panel.querySelector("img");
          if (photo) {
            gsap.fromTo(
              photo,
              { yPercent: -8, scale: 1.15 },
              { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true } },
            );
          }
        });
      });

      revert = () => mm.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);
  return <section ref={root} className="landmark-section bg-secondary py-14 overflow-hidden"><div className="mx-auto max-w-7xl px-6"><div className="text-xs text-gold">02 / FROM VISION TO LIVING</div><h2 className="mt-3 text-3xl md:text-5xl font-semibold">Spaces with a point of view.</h2><div className="landmark-track flex gap-6 mt-9">{[properties[3],properties[8],properties[10]].filter(p => p !== undefined).map((p,i) => <article key={p.id} className="landmark-panel shrink-0"><div className="relative aspect-[16/9] overflow-hidden blueprint-photo"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /><div className="blueprint-layer" aria-hidden="true" /><Link to="/property/$id" params={{id:p.id}} aria-label={`View ${p.name} details`} className="absolute inset-0" /></div><div className="mt-5 flex items-start justify-between gap-4"><div><p className="text-xs text-gold">0{i+1} · {p.location}</p><h3 className="mt-2 text-xl md:text-2xl font-semibold">{p.name}</h3></div><Button asChild variant="outline" size="icon"><Link to="/property/$id" params={{id:p.id}} aria-label={`Explore ${p.name}`}><ArrowUpRight /></Link></Button></div></article>)}</div></div></section>;
}