import { useEffect, useLayoutEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { getGsap, killTriggersFor, motionOk } from "../lib/motion";

// Pre-paint effect on the client (no flash of un-hidden content),
// plain effect during SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function MotionDirector() {
  const router = useRouter();
  const key = useRouterState({ select: (s) => s.resolvedLocation?.href });
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const unsubscribe = router.subscribe("onResolved", reset);
    window.addEventListener("pageshow", reset);
    return () => {
      unsubscribe();
      window.removeEventListener("pageshow", reset);
    };
  }, [router]);

  // Runs synchronously before first paint so the hidden initial states of the
  // cinematic reveals are applied before the user ever sees the page — this is
  // what fixes the load "flash then glitch" on the sale/rent pages.
  useIsomorphicLayoutEffect(() => {
    if (!motionOk()) return;
    // Start every route at the top so ScrollTrigger measures at scroll 0.
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const { gsap, ScrollTrigger } = getGsap();
    // Single scroll controller: Lenis drives native scroll,
    // ScrollTrigger reads from the same ticker — no duplicate rAF loops.
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // Cinematic heading reveal — masked line rise with slight 3D tilt.
      gsap.utils.toArray<HTMLElement>("main h1, main h2, .quote-band blockquote").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, rotationX: 12, transformPerspective: 900, clipPath: "inset(100% 0% 0% 0%)" },
          {
            y: 0,
            rotationX: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
      // Cinematic image reveal — curtain wipe. Heavy listing-grid and carousel
      // images opt out via data-motion="skip" to keep scroll buttery.
      gsap.utils
        .toArray<HTMLImageElement>(
          "main img:not([data-carousel-image]):not([data-motion='skip'])",
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 100% 0% 0%)", scale: 1.08 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.15,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
              onComplete: () => gsap.set(el, { clearProps: "clipPath,scale" }),
            },
          );
        });
      gsap.utils.toArray<HTMLElement>("[data-roll]").forEach((el) => {
        const value = Number(el.dataset.roll);
        const state = { value: 0 };
        gsap.to(state, {
          value,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.value).toLocaleString("en-IN")}${el.dataset.suffix ?? ""}`;
          },
        });
      });
      if (desktop)
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) =>
          gsap.fromTo(
            el,
            { rotationX: 14, y: 40, transformPerspective: 1100 },
            {
              rotationX: 0,
              y: -24,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 85%", end: "bottom top", scrub: 1 },
            },
          ),
        );
    });
    ScrollTrigger.refresh();

    let cleanupLenis: (() => void) | undefined;
    let cancelled = false;
    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled || !motionOk() || !desktop) return;
      const lenis = new Lenis({ duration: 0.85, smoothWheel: true, anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      cleanupLenis = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    const preferenceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferenceChanged = () => {
      cancelled = true;
      cleanupLenis?.();
      ctx.revert();
    };
    preferenceQuery.addEventListener("change", preferenceChanged);
    return () => {
      cancelled = true;
      cleanupLenis?.();
      ctx.revert();
      preferenceQuery.removeEventListener("change", preferenceChanged);
      killTriggersFor(document.querySelector("main"));
    };
  }, [key]);
  return null;
}
