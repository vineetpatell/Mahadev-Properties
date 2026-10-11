import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Pause,
  Play,
} from "lucide-react";
import { properties } from "../lib/properties";
import { Button } from "./ui/button";
import { SaveProperty } from "./Shortlist";
import { gsapReady, motionOk } from "../lib/motion";

const saleFeatured = [
  properties[2],
  properties[3],
  properties[8],
  properties[4],
  properties[10],
].filter((p) => p !== undefined);

/**
 * SALE carousel — a light "magazine shelf": a horizontal filmstrip of tall
 * portrait cards. GSAP slides the strip so the active card always sits dead
 * centre, lifted, full-colour and sharp, while its neighbours sit back,
 * flattened and desaturated. The RENT carousel uses a completely different
 * design and animation (see RentCarousel.tsx).
 */
export function PropertyCarousel() {
  const items = saleFeatured;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(364);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const resume = useRef(0);
  const advance = (direction: number) =>
    setIndex((i) => (i + direction + items.length) % items.length);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Measure card + gap so the strip can be positioned without GSAP
  // (used as the reduced-motion fallback and by the shelf animation).
  useEffect(() => {
    const measure = () => {
      const card = track.current?.querySelector<HTMLElement>("[data-shelf-card]");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track.current!).columnGap || "0") || 0;
      setStep(card.offsetWidth + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const hold = () => {
    window.clearTimeout(resume.current);
    stage.current?.setAttribute("data-hold", "true");
  };
  const release = () => {
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(
      () => stage.current?.removeAttribute("data-hold"),
      1200,
    );
  };
  useEffect(() => () => window.clearTimeout(resume.current), []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      if (stage.current?.hasAttribute("data-hold")) return;
      advance(1);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  // Shelf animation — slide the strip to centre the active card and
  // restyle each card relative to it.
  useEffect(() => {
    if (!motionOk()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void gsapReady().then(({ gsap }) => {
      if (cancelled || !track.current || !stage.current) return;
      const trackEl = track.current;
      ctx = gsap.context(() => {
        const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-shelf-card]"));
        const positionTrack = () => {
          const gap = parseFloat(getComputedStyle(trackEl).columnGap || "0") || 0;
          const cardWidth = cards[0]?.offsetWidth ?? 340;
          return -(index * (cardWidth + gap));
        };
        gsap.to(trackEl, {
          x: positionTrack,
          duration: reduced ? 0 : 0.9,
          ease: "expo.out",
          overwrite: true,
        });
        cards.forEach((card, i) => {
          const isCenter = i === index;
          const distance = Math.abs(i - index);
          gsap.to(card, {
            y: isCenter ? -16 : 0,
            scale: isCenter ? 1 : 0.94,
            opacity: distance > 2 ? 0.35 : 1,
            filter: isCenter ? "grayscale(0)" : "grayscale(0.7)",
            duration: reduced ? 0 : 0.75,
            ease: "expo.out",
            overwrite: true,
          });
        });
        const onResize = () => gsap.to(trackEl, { x: positionTrack(), duration: 0 });
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }, stage);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [index, reduced]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured sale properties"
      className="py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 text-xs tracking-[0.4em] text-gold">
            <span className="h-px w-10 bg-gold" /> SALE / OWNERSHIP EDIT
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-4">
            Properties for sale.
          </h2>
          <p className="mt-3 max-w-md text-sm text-slate-muted">
            A curated shelf of resale and ready-to-move homes across Malad West —
            browse the strip, pick a card.
          </p>
        </div>
        <Button asChild variant="link">
          <Link to="/sale">
            All sale properties <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div
        ref={stage}
        className="sale-shelf relative mt-10"
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) release();
        }}
        onTouchStart={(e) => {
          touch.current = e.touches[0]?.clientX ?? 0;
          hold();
        }}
        onTouchEnd={(e) => {
          const delta = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
          if (Math.abs(delta) > 45) advance(delta > 0 ? -1 : 1);
          release();
        }}
      >
        <div
          ref={track}
          className={`sale-shelf-track ${reduced ? "shelf-slide" : ""}`}
          style={reduced ? { transform: `translateX(${-index * step}px)` } : undefined}
        >
          {items.map((p, i) => (
            <article
              key={p.id}
              data-shelf-card
              onClick={() => setIndex(i)}
              className={`sale-card group relative flex flex-col border bg-card overflow-hidden cursor-pointer transition-colors ${
                i === index ? "border-gold/50" : "border-border"
              }`}
              style={{ boxShadow: i === index ? "var(--shadow-elegant)" : undefined }}
            >
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <img
                  data-motion="skip"
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/20" />
                <Link
                  to="/property/$id"
                  params={{ id: p.id }}
                  aria-label={`View ${p.name} details`}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 z-10"
                />
                <div className="absolute top-4 left-4 bg-card/95 px-3 py-2 text-xs text-foreground z-20">
                  {p.status}
                </div>
                <div className="absolute top-4 right-4 z-20" onClick={(e) => e.stopPropagation()}>
                  <SaveProperty id={p.id} />
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3">
                  <span className="text-[10px] tracking-[0.28em] text-gold bg-card/95 px-3 py-1.5">
                    0{i + 1} / 0{items.length}
                  </span>
                  <span className="bg-gold text-primary-foreground px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
                    {p.price}
                  </span>
                </div>
              </div>
              <div className="p-5 border-t border-border">
                <p className="flex gap-1 items-center text-[10px] tracking-[0.24em] text-slate-muted">
                  <MapPin className="w-3 h-3 text-gold" />
                  {p.location.toUpperCase()} · {p.type}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-tight line-clamp-2 min-h-[3.25rem]">
                  {p.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <Button asChild variant="link" className="px-0 text-xs tracking-[0.2em]">
                    <Link to="/property/$id" params={{ id: p.id }}>
                      Explore <ArrowUpRight />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="outline" title="WhatsApp enquiry">
                    <a
                      href={`https://wa.me/919152383586?text=${encodeURIComponent(`Hi, please share details for ${p.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${p.name} on WhatsApp`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous property"
          onClick={() => advance(-1)}
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-2">
          {items.map((p, i) => (
            <Button
              key={p.id}
              variant="ghost"
              size="icon"
              className="w-7 h-9"
              aria-label={`Go to property ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-gold" : "bg-muted-foreground/40"}`}
              />
            </Button>
          ))}
        </div>
        <Button variant="outline" size="icon" aria-label="Next property" onClick={() => advance(1)}>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={paused || reduced ? "Play carousel" : "Pause carousel"}
          disabled={reduced}
          onClick={() => setPaused((p) => !p)}
        >
          {paused || reduced ? <Play /> : <Pause />}
        </Button>
      </div>
    </section>
  );
}
