import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getGsap, motionOk } from "../lib/motion";
import { luxuryScenes } from "../lib/about-showcase-media";
import { Button } from "./ui/button";

/**
 * ABOUT SHOWCASE — "Living Elevated".
 *
 * An About-page-specific horizontal *walkthrough* that mirrors the Home page's
 * first carousel (ArchitecturalShowcase): on desktop the section pins and the
 * track glides left as you scroll, while each ultrawide photo drifts and its
 * copy rises into place. Every panel reuses the signature `blueprint-photo`
 * hover effect (the grid overlay dissolves on hover).
 *
 * Distinctly About: a warm cream + deep navy palette (scoped via
 * `.about-showcase`, never touching the global theme) and a hero run of five
 * ultrawide luxury-villa scenes — each pairing a different car + bike.
 *
 * On mobile / tablet (and reduced-motion) it degrades to a calm, non-pinned
 * stack / swipe rail — no pinning, no autoplay.
 */
export function AboutShowcase() {
  const root = useRef<HTMLElement>(null);
  const scenes = luxuryScenes;

  useEffect(() => {
    if (!motionOk()) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (cancelled || !root.current) return;
      const { gsap } = getGsap();
      const mm = gsap.matchMedia();

      // Desktop — pinned horizontal walk. Track glides, photos drift, copy rises.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".about-showcase-track");
        if (!track) return;
        const panels = Array.from(track.querySelectorAll<HTMLElement>(".about-showcase-panel"));
        const walk = gsap.to(track, {
          x: () => -(track.scrollWidth - track.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: "top 64px",
            end: () => `+=${track.scrollWidth - track.clientWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        panels.forEach((panel) => {
          const photo = panel.querySelector("img");
          if (photo) {
            gsap.fromTo(
              photo,
              { xPercent: -6, scale: 1.16 },
              {
                xPercent: 6,
                scale: 1.04,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: walk,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          }
          const copy = panel.querySelectorAll<HTMLElement>(".about-showcase-copy > *");
          if (copy.length) {
            gsap.fromTo(
              copy,
              { y: 34, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                stagger: 0.05,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: walk,
                  start: "left 85%",
                  end: "left 40%",
                  scrub: true,
                },
              },
            );
          }
        });
      });

      // Mobile / tablet — same section, gentle vertical reveal. No pin, no drift.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = root.current?.querySelectorAll<HTMLElement>(".about-showcase-panel") ?? [];
        panels.forEach((panel) => {
          gsap.from(panel, {
            y: 56,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
          const photo = panel.querySelector("img");
          if (photo) {
            gsap.fromTo(
              photo,
              { yPercent: -6, scale: 1.14 },
              {
                yPercent: 6,
                scale: 1.03,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
      });

      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  if (scenes.length === 0) return null;

  return (
    <section ref={root} className="about-showcase" aria-label="Living Elevated">
      <div className="about-showcase-head">
        <div className="about-showcase-kicker">The Life Around</div>
        <h2 className="about-showcase-title">Living Elevated.</h2>
        <p className="about-showcase-intro">
          A Mahadev residence isn't only an address — it's a backdrop for the way you already live.
          Scroll through the scenes we design around: the arrival, the machines, the evenings.
        </p>
      </div>

      <div className="about-showcase-track">
        {scenes.map((scene, i) => (
          <article key={scene.id} className="about-showcase-panel">
            <div className="about-showcase-frame blueprint-photo">
              <img
                data-motion="skip"
                src={scene.image}
                alt={scene.featured}
                className="about-showcase-img"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="blueprint-layer" aria-hidden="true" />
              <div className="about-showcase-veil" aria-hidden="true" />
            </div>
            <div className="about-showcase-copy">
              <span className="about-showcase-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="about-showcase-kicker about-showcase-kicker--panel">
                {scene.kicker}
              </span>
              <h3 className="about-showcase-panel-title">{scene.title}</h3>
              <p className="about-showcase-featured">{scene.featured}</p>
              <p className="about-showcase-blurb">{scene.blurb}</p>
              <div className="about-showcase-cta">
                <Button asChild variant="outline" size="icon" aria-label={`Explore ${scene.title}`}>
                  <Link to="/sale">
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
