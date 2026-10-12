import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Car,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Ruler,
  Sofa,
} from "lucide-react";
import { properties } from "../lib/properties";
import { Button } from "./ui/button";
import { SaveProperty } from "./Shortlist";

const rentals = properties.filter((p) => p.listing === "rent");
const AUTOPLAY_MS = 3400; // brisk, keeps the rail visibly moving

/**
 * RENT carousel — a dark-bronze "split rail" with a completely different
 * design and animation from the SALE shelf (PropertyCarousel.tsx):
 * a big landscape photo wipes in with a clip-path curtain + slow
 * Ken-Burns zoom (framer-motion), paired with a typographic detail
 * panel, an oversized slide number, and a segmented autoplay progress bar.
 */
export function RentCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const touch = useRef(0);
  const resume = useRef(0);
  const active = rentals[index];
  const advance = (direction: number) =>
    setIndex((i) => (i + direction + rentals.length) % rentals.length);

  useEffect(() => {
    if (paused || reduced || held) return;
    const timer = window.setTimeout(() => advance(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  });

  // Leaving the carousel shouldn't snap it back to motion instantly — wait a
  // beat so a cursor just passing through doesn't restart the wipe abruptly.
  const hold = () => {
    window.clearTimeout(resume.current);
    setHeld(true);
  };
  const release = () => {
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setHeld(false), 2000);
  };
  useEffect(() => () => window.clearTimeout(resume.current), []);

  if (!active) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const wipe = [0.65, 0, 0.35, 1] as const;
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured rental properties"
      className="rent-band relative overflow-hidden py-14 md:py-20"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) release();
      }}
      onTouchStart={(e) => {
        touch.current = e.touches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(e) => {
        const delta = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
        if (Math.abs(delta) > 45) advance(delta > 0 ? -1 : 1);
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" /> RENT / MOVE-IN READY
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-4">
              Homes that wait for you.
            </h2>
            <p className="mt-3 max-w-md text-sm text-photo-foreground/70">
              Furnished flats, shops and offices — immediate possession with transparent monthly
              terms.
            </p>
          </div>
          <Button asChild variant="link" className="text-photo-foreground hover:text-gold">
            <Link to="/rent">
              All rental properties <ArrowUpRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Photo panel — clip-path curtain wipe + Ken-Burns zoom */}
          <div className="relative h-64 overflow-hidden border border-gold/30 sm:h-96 lg:h-[540px]">
            <AnimatePresence initial={false}>
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.name}
                data-motion="skip"
                className="absolute inset-0 h-full w-full object-cover"
                initial={
                  reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 0% 100%)", scale: 1.14 }
                }
                animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", scale: 1.2 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : {
                        clipPath: "inset(0% 100% 0% 0%)",
                        transition: { duration: 0.55, ease: wipe },
                      }
                }
                transition={{
                  clipPath: { duration: reduced ? 0 : 0.55, ease: wipe },
                  scale: { duration: reduced ? 0 : 5.2, ease: "linear" },
                  opacity: { duration: 0.25 },
                }}
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
            <div className="absolute top-4 left-4 bg-card/95 px-3 py-2 text-xs text-foreground">
              {active.status}
            </div>
            <div className="absolute top-4 right-4">
              <SaveProperty id={active.id} />
            </div>
            <div className="pointer-events-none absolute bottom-3 left-5 select-none text-7xl font-black leading-none text-photo-foreground/25">
              {pad(index + 1)}
            </div>
          </div>

          {/* Detail panel — typographic, staggered content swap */}
          <div className="flex min-h-[340px] flex-col justify-between lg:min-h-[540px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.32em] text-gold">
                  <span className="border border-gold/40 px-3 py-1">
                    {active.type.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-photo-foreground/70">
                    <MapPin className="h-3 w-3" /> {active.location.toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">
                  {active.name}
                </h3>
                <p className="mt-3 max-w-md text-sm text-photo-foreground/70">{active.tagline}</p>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-4xl font-black text-gold md:text-5xl">{active.price}</span>
                  <span className="pb-2 text-[10px] tracking-[0.28em] text-photo-foreground/60">
                    PER MONTH
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-gold/20 py-5 text-sm text-photo-foreground/80">
                  <span className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gold" /> {active.carpetArea}
                  </span>
                  <span className="flex items-center gap-2">
                    <Sofa className="h-4 w-4 text-gold" /> {active.furnished}
                  </span>
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gold" /> {active.parking}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button asChild>
                    <Link to="/property/$id" params={{ id: active.id }}>
                      Explore details <ArrowUpRight />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold/40 text-photo-foreground hover:border-gold hover:text-gold"
                  >
                    <a
                      href={`https://wa.me/919152383586?text=${encodeURIComponent(
                        `Hi Mahadev Property, I'm interested in ${active.name} (${active.type}) — ${active.price}/month, ${active.location}. Please share availability and details.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle /> WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls — segmented progress + arrows + pause */}
            <div className="mt-8 flex items-center gap-5">
              <span className="text-xs tabular-nums tracking-[0.2em] text-gold">
                {pad(index + 1)} / {pad(rentals.length)}
              </span>
              <div className="flex flex-1 items-center gap-2">
                {rentals.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show rental ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className="relative flex h-5 flex-1 items-center"
                  >
                    <span className="h-[2px] w-full bg-gold/25" />
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused || held || reduced}`}
                        className="absolute left-0 h-[2px] w-full origin-left bg-gold"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: paused || held || reduced ? 0 : AUTOPLAY_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous property"
                className="border-gold/40 text-photo-foreground hover:border-gold hover:text-gold"
                onClick={() => advance(-1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next property"
                className="border-gold/40 text-photo-foreground hover:border-gold hover:text-gold"
                onClick={() => advance(1)}
              >
                <ChevronRight />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={paused || reduced ? "Play carousel" : "Pause carousel"}
                disabled={reduced}
                className="text-photo-foreground hover:text-gold"
                onClick={() => setPaused((p) => !p)}
              >
                {paused || reduced ? <Play /> : <Pause />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
