import { Suspense, lazy, useEffect, useState } from "react";

const Scene = lazy(() => import("./HeroSceneCanvas").then((m) => ({ default: m.HeroSceneCanvas })));

/**
 * Cinematic 3D hero backdrop (lazy WebGL).
 * - Desktop + fine pointer only; mobile/tablet get the static photo collage.
 * - Respects prefers-reduced-motion.
 * - If WebGL fails, the photo collage underneath stays visible (functional fallback).
 */
export function HeroScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(mq.matches && !rm.matches);
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}
