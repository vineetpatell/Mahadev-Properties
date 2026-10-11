// One authoritative GSAP module for the whole app.
// - Registers ScrollTrigger exactly once.
// - Shares a single ScrollTrigger <-> Lenis wiring.
// - Components import { getGsap, gsapReady, motionOk } from here
//   instead of importing "gsap"/"gsap/ScrollTrigger" themselves,
//   so we never get duplicate plugins or conflicting scroll controllers.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const gsapReady = () => Promise.resolve(getGsap());

/** No animation when the user prefers reduced motion. */
export const motionOk = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** SSR-safe: returns false on the server, real value in the browser. */
export const isFinePointerDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

/** Kill every ScrollTrigger tied to a root element (route-change safe). */
export function killTriggersFor(root: HTMLElement | null) {
  if (!root) return;
  ScrollTrigger.getAll().forEach((t) => {
    const trigger = t.trigger as HTMLElement | undefined;
    if (trigger && (trigger === root || root.contains(trigger))) t.kill();
  });
}
