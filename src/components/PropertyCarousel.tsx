import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { properties } from "../lib/properties";
import { SaveProperty } from "./Shortlist";
import { gsapReady, motionOk } from "../lib/motion";

const saleFeatured = [
  properties[2],
  properties[3],
  properties[8],
  properties[4],
  properties[10],
  properties[1],
].filter((p) => p !== undefined);

const PX_PER_SECOND = 120; // brisk, continuous filmstrip pace

/**
 * SALE carousel — an infinite "film strip" marquee matching the reference:
 * rounded landscape photo cards flowing continuously left at a brisk,
 * constant pace (GSAP linear loop, duplicated track = seamless). RENT uses
 * a completely different design (RentCarousel.tsx). Stays a live carousel
 * on mobile & tablet — the marquee never stops there either.
 */
export function PropertyCarousel() {
  const items = saleFeatured;
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<{ pause: () => void; play: () => void } | null>(null);
  const resume = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Seamless marquee: the track renders every card twice; animating x from
  // 0 to -50% of the track and repeating gives a perfect loop.
  useEffect(() => {
    if (reduced || !motionOk()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void gsapReady().then(({ gsap }) => {
      if (cancelled || !track.current) return;
      const trackEl = track.current;
      ctx = gsap.context(() => {
        const distance = trackEl.scrollWidth / 2;
        if (distance > 0) {
          tween.current = gsap.to(trackEl, {
            x: -distance,
            duration: distance / PX_PER_SECOND,
            ease: "none",
            repeat: -1,
          }) as unknown as { pause: () => void; play: () => void };
        }
      }, stage);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
      tween.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (paused) tween.current?.pause();
    else tween.current?.play();
  }, [paused]);

  // Touch: brief hold so a swipe/tap doesn't fight the strip.
  const hold = () => {
    window.clearTimeout(resume.current);
    setPaused(true);
  };
  const release = () => {
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setPaused(false), 2000);
  };
  useEffect(() => () => window.clearTimeout(resume.current), []);

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
            A moving gallery of resale and ready-to-move homes across Malad West —
            tap any frame for the full brief.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {paused && (
            <span className="text-[10px] tracking-[0.3em] text-slate-muted">PAUSED</span>
          )}
          <Link to="/sale" className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-gold hover:text-foreground transition-colors">
            All sale properties <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div
        ref={stage}
        className="sale-marquee relative mt-10"
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) release();
        }}
        onTouchStart={hold}
        onTouchEnd={release}
      >
        <div
          ref={track}
          className="sale-marquee-track"
          style={reduced ? { animation: "none" } : undefined}
        >
          {[...items, ...items].map((p, i) => {
            const duplicate = i >= items.length;
            return (
              <article
                key={`${p.id}-${duplicate ? "dup" : "orig"}`}
                aria-hidden={duplicate || undefined}
                className={`sale-marquee-card group relative overflow-hidden rounded-2xl border border-gold/15 hover:border-gold/50 transition-colors ${
                  duplicate ? "[&_a]:pointer-events-none" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    data-motion="skip"
                    src={p.image}
                    alt={duplicate ? "" : p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/15 to-transparent" />
                  <Link
                    to="/property/$id"
                    params={{ id: p.id }}
                    aria-label={duplicate ? undefined : `View ${p.name} details`}
                    tabIndex={duplicate ? -1 : undefined}
                    className="absolute inset-0 z-10"
                  />
                  <span className="absolute top-3 left-3 bg-card/95 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foreground z-20">
                    {p.status}
                  </span>
                  <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                    <SaveProperty id={p.id} />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="flex gap-1 items-center text-[10px] tracking-[0.22em] text-slate-muted truncate">
                        <MapPin className="w-3 h-3 text-gold shrink-0" />
                        {p.location.toUpperCase()} · {p.type}
                      </p>
                      <h3 className="mt-1.5 text-base font-bold leading-tight line-clamp-2 text-foreground">
                        {p.name}
                      </h3>
                    </div>
                    <span className="shrink-0 bg-gold text-primary-foreground px-3 py-1.5 text-sm font-semibold whitespace-nowrap">
                      {p.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gold/10">
                    <Link
                      to="/property/$id"
                      params={{ id: p.id }}
                      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-gold hover:text-foreground transition-colors"
                    >
                      Explore <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={`https://wa.me/919152383586?text=${encodeURIComponent(
                        `Hi Mahadev Property, I'm interested in ${p.name} (${p.type}) — ${p.price}, ${p.location}. Please share details.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={duplicate ? -1 : undefined}
                      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-slate-muted hover:text-gold transition-colors"
                      aria-label={`Enquire about ${p.name} on WhatsApp`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
