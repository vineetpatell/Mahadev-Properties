import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { properties } from "../lib/properties";
import { Button } from "./ui/button";
import { SaveProperty } from "./Shortlist";

const featured = [properties[2], properties[3], properties[8], properties[4], properties[10]].filter(p => p !== undefined);

export function PropertyCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const advance = (direction: number) => setIndex(i => (i + direction + featured.length) % featured.length);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (paused || interacting || reduced) return;
    const timer = window.setInterval(() => advance(1), 4500);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reduced]);
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void import("gsap").then(({ gsap }) => {
      if (cancelled || !stage.current) return;
      ctx = gsap.context(() => {
        const cards = stage.current?.querySelectorAll<HTMLElement>("[data-carousel-card]");
        cards?.forEach((card, i) => {
          let offset = (i - index + featured.length) % featured.length;
          if (offset > featured.length / 2) offset -= featured.length;
          const mobile = window.innerWidth < 768;
          gsap.to(card, { xPercent: offset * (mobile ? 112 : 90), rotationY: offset * -14, z: offset === 0 ? 70 : -80 * Math.abs(offset), scale: offset === 0 ? 1 : 0.88, opacity: Math.abs(offset) <= 1 ? 1 : 0, duration: reduced ? 0 : 1.15, ease: "power3.inOut", overwrite: true });
          card.style.zIndex = String(10 - Math.abs(offset));
          card.inert = offset !== 0;
        });
      }, stage);
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, [index, reduced]);

  return <section aria-roledescription="carousel" aria-label="Featured properties" className="property-showcase py-12 md:py-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs text-gold">01 / SELECTED SPACES</div><h2 className="text-3xl md:text-5xl font-semibold mt-3">A different perspective.</h2></div><Button asChild variant="link"><Link to="/properties">All properties <ArrowUpRight /></Link></Button></div>
    <div ref={stage} className="carousel-stage relative mt-9" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} onTouchStart={e => { touch.current = e.touches[0]?.clientX ?? 0; setInteracting(true); }} onTouchEnd={e => { const delta = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current; if (Math.abs(delta) > 45) advance(delta > 0 ? -1 : 1); setInteracting(false); }}>
      {featured.map((p, i) => <article key={p.id} data-carousel-card aria-hidden={i !== index} className="carousel-card absolute top-0 border border-border bg-card overflow-hidden">
        <div className="relative carousel-photo"><img data-carousel-image src={p.image} alt={p.name} className="w-full h-full object-cover" /><div className="absolute top-4 left-4 bg-card/95 px-3 py-2 text-xs text-foreground">{p.status}</div><div className="absolute top-4 right-4"><SaveProperty id={p.id} /></div></div>
        <div className="px-5 py-5 md:px-7"><div className="flex justify-between items-start gap-3"><div className="min-w-0"><p className="flex gap-1 items-center text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{p.location} · {p.type}</p><h3 className="mt-2 text-xl md:text-2xl font-semibold leading-tight">{p.name}</h3></div><span className="text-base md:text-xl text-gold font-semibold whitespace-nowrap">{p.price}</span></div><div className="mt-4 flex justify-between items-center"><Button asChild variant="link" className="px-0"><Link to="/property/$id" params={{ id: p.id }}>Explore <ArrowUpRight /></Link></Button><Button asChild size="icon" variant="outline" title="WhatsApp enquiry"><a href={`https://wa.me/919152383586?text=${encodeURIComponent(`Hi, please share details for ${p.name}.`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${p.name} on WhatsApp`}><MessageCircle /></a></Button></div></div>
      </article>)}
    </div>
    <div className="mx-auto max-w-7xl px-6 mt-6 flex items-center justify-center gap-4"><Button variant="outline" size="icon" aria-label="Previous property" onClick={() => advance(-1)}><ChevronLeft /></Button><div className="flex gap-2">{featured.map((p,i) => <Button key={p.id} variant="ghost" size="icon" className="w-7 h-9" aria-label={`Go to property ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)}><span className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-gold" : "bg-muted-foreground/40"}`} /></Button>)}</div><Button variant="outline" size="icon" aria-label="Next property" onClick={() => advance(1)}><ChevronRight /></Button><Button variant="ghost" size="icon" aria-label={paused || reduced ? "Play carousel" : "Pause carousel"} disabled={reduced} onClick={() => setPaused(p => !p)}>{paused || reduced ? <Play /> : <Pause />}</Button></div>
  </section>;
}