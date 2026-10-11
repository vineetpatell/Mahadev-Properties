import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowUpRight,
  MapPin,
  MessageCircle,
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

const rentFeatured = properties.filter((p) => p.listing === "rent");

type PropertyCarouselProps = {
  listing?: "sale" | "rent";
};

export function PropertyCarousel({ listing = "sale" }: PropertyCarouselProps) {
  const items = listing === "rent" ? rentFeatured : saleFeatured;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
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
  const hold = () => {
    window.clearTimeout(resume.current);
    stage.current?.setAttribute("data-hold", "true");
  };
  const release = () => {
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => stage.current?.removeAttribute("data-hold"), 1200);
  };
  useEffect(() => () => window.clearTimeout(resume.current), []);
  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => {
      if (stage.current?.hasAttribute("data-hold")) return;
      advance(1);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);
  useEffect(() => {
    if (!motionOk()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void gsapReady().then(({ gsap }) => {
      if (cancelled || !stage.current) return;
      ctx = gsap.context(() => {
        const cards = stage.current?.querySelectorAll<HTMLElement>("[data-carousel-card]");
        cards?.forEach((card, i) => {
          let offset = (i - index + items.length) % items.length;
          if (offset > items.length / 2) offset -= items.length;
          const mobile = window.innerWidth < 768;
          const spread = mobile ? 104 : 62;
          const abs = Math.abs(offset);
          const dir = offset === 0 ? 0 : offset / abs;
          gsap.to(card, {
            xPercent: offset * spread,
            y: abs === 0 ? 0 : abs * 26,
            rotation: offset === 0 ? 0 : dir * (mobile ? 4 : 7),
            scale: offset === 0 ? 1 : Math.max(0.78, 1 - abs * 0.09),
            opacity: abs <= 1 ? 1 : 0,
            filter: offset === 0 ? "blur(0px)" : `blur(${Math.min(abs * 1.5, 3)}px)`,
            duration: reduced ? 0 : 0.85,
            ease: "expo.out",
            overwrite: true,
          });
          card.style.zIndex = String(10 - abs);
          card.inert = offset !== 0;
          const photo = card.querySelector<HTMLElement>("[data-carousel-image]");
          if (photo) {
            gsap.to(photo, {
              xPercent: offset === 0 ? 0 : dir * -10,
              scale: offset === 0 ? 1.06 : 1.16,
              duration: reduced ? 0 : 0.85,
              ease: "expo.out",
              overwrite: true,
            });
          }
        });
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
      aria-label={listing === "rent" ? "Featured rent properties" : "Featured sale properties"}
      className="property-showcase py-12 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="text-xs text-gold">
            {listing === "rent" ? "RENT / SELECTED SPACES" : "SALE / SELECTED SPACES"}
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold mt-3">
            {listing === "rent" ? "Properties on rent." : "Properties for sale."}
          </h2>
        </div>
        <Button asChild variant="link">
          {listing === "rent" ? (
            <Link to="/rent">
              All rental properties <ArrowUpRight />
            </Link>
          ) : (
            <Link to="/sale">
              All sale properties <ArrowUpRight />
            </Link>
          )}
        </Button>
      </div>
      <div
        ref={stage}
        className="carousel-stage relative mt-9"
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
        {items.map((p, i) => (
          <article
            key={p.id}
            data-carousel-card
            aria-hidden={i !== index}
            className="carousel-card absolute top-0 border border-border bg-card overflow-hidden"
          >
            <div className="relative carousel-photo">
              <img
                data-carousel-image
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              <Link
                to="/property/$id"
                params={{ id: p.id }}
                aria-label={`View ${p.name} details`}
                className="absolute inset-0"
              />
              <div className="absolute top-4 left-4 bg-card/95 px-3 py-2 text-xs text-foreground">
                {p.status}
              </div>
              <div className="absolute top-4 right-4">
                <SaveProperty id={p.id} />
              </div>
            </div>
            <div className="px-5 py-5 md:px-7">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="flex gap-1 items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {p.location} · {p.type}
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold leading-tight">{p.name}</h3>
                </div>
                <span className="text-base md:text-xl text-gold font-semibold whitespace-nowrap">
                  {p.price}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button asChild variant="link" className="px-0">
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
                  >
                    <MessageCircle />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-6 flex items-center justify-center gap-4">
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
