import { useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

export function MotionDirector() {
  const router = useRouter();
  const key = useRouterState({ select: s => s.resolvedLocation?.href });
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const unsubscribe = router.subscribe("onResolved", reset);
    window.addEventListener("pageshow", reset);
    return () => { unsubscribe(); window.removeEventListener("pageshow", reset); };
  }, [router]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = async () => {
      if (query.matches) return;
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      const lenis = desktop ? new Lenis({ duration: 0.85, smoothWheel: true, anchors: true }) : null;
      const tick = (time: number) => lenis?.raf(time * 1000);
      if (lenis) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(tick); }
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("main h1, main h2, .quote-band blockquote").forEach(el => {
          gsap.fromTo(el, { y: 36, rotationX: 12, transformPerspective: 900, clipPath: "inset(100% 0% 0% 0%)" }, { y: 0, rotationX: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
        gsap.utils.toArray<HTMLImageElement>("main img:not([data-carousel-image])").forEach(el => {
          gsap.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.08 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.15, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 94%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-roll]").forEach(el => {
          const value = Number(el.dataset.roll);
          const state = { value: 0 };
          gsap.to(state, { value, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => { el.textContent = `${Math.round(state.value).toLocaleString("en-IN")}${el.dataset.suffix ?? ""}`; } });
        });
        if (desktop) gsap.utils.toArray<HTMLElement>("[data-depth]").forEach(el => gsap.fromTo(el, { rotationX: 14, y: 40, transformPerspective: 1100 }, { rotationX: 0, y: -24, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom top", scrub: 1 } }));
      });
      ScrollTrigger.refresh();
      cleanup = () => { ctx.revert(); gsap.ticker.remove(tick); lenis?.destroy(); };
    };
    void start();
    const preferenceChanged = () => { cleanup?.(); cleanup = undefined; };
    query.addEventListener("change", preferenceChanged);
    return () => { cancelled = true; cleanup?.(); query.removeEventListener("change", preferenceChanged); };
  }, [key]);
  return null;
}