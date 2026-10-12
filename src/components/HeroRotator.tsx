import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroScenes } from "../lib/hero-scenes";

/**
 * CINEMATIC HERO BACKDROP — five distinct luxury-residence scenes that
 * crossfade on a gentle timer, each with a subtle Ken-Burns zoom and a
 * restrained pointer-driven depth parallax. A small 01/05 indicator tracks
 * the current scene.
 *
 * Deliberately light-weight: plain <img> crossfade (no WebGL / GLB), reusing
 * the framer-motion that already powers the site. Reduced-motion users get a
 * single static scene with no autoplay and no zoom.
 *
 * NOTE: scenes are illustrative showcase imagery — see src/lib/hero-scenes.ts.
 */
const SCENE_MS = 5500; // unhurried, cinematic cadence
const EASE = [0.22, 1, 0.36, 1] as const;
const PARALLAX = 14; // max px the backdrop drifts with the pointer (restrained)

/** A single crossfading scene layer: image, scrim, and slow zoom. */
function SceneLayer({
  image,
  featured,
  index,
  active,
  reduced,
}: {
  image: string;
  featured: string;
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      className="hero-scene-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6, ease: EASE }}
      aria-hidden={!active}
    >
      <motion.div
        className="hero-scene-media"
        initial={false}
        animate={reduced ? { scale: 1 } : { scale: [1.05, 1.14] }}
        transition={
          reduced ? { duration: 0 } : { duration: SCENE_MS / 1000, ease: "linear", times: [0, 1] }
        }
      >
        {failed ? (
          <div className="hero-scene-fallback" role="img" aria-label={featured} />
        ) : (
          <img
            data-motion="skip"
            src={image}
            alt={featured}
            className="hero-scene-img"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : undefined}
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>
      {/* Navy scrim keeps overlaid copy readable regardless of photo brightness. */}
      <div className="hero-scene-scrim" aria-hidden="true" />
    </motion.div>
  );
}

export function HeroRotator() {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [px, setPx] = useState({ x: 0, y: 0 });
  const timer = useRef(0);

  // Autoplay (skipped entirely under reduced-motion).
  useEffect(() => {
    if (reduced) return;
    const tick = () => setIndex((i) => (i + 1) % heroScenes.length);
    timer.current = window.setInterval(tick, SCENE_MS);
    return () => window.clearInterval(timer.current);
  }, [reduced]);

  // Pointer-driven depth parallax — desktop + fine pointer only, and only when
  // motion is allowed. Kept very small so it never feels like a tilt/tracking.
  const parallaxRef = useRef<HTMLDivElement>(null);
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = parallaxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setPx({ x: nx * PARALLAX * 2, y: ny * PARALLAX });
  };
  const onPointerLeave = () => setPx({ x: 0, y: 0 });

  const scene = heroScenes[index];

  return (
    <div
      ref={parallaxRef}
      className="hero-rotator"
      data-active={index}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Crossfading backdrop — drifts subtly with the pointer for depth. */}
      <div className="hero-rotator-bg" aria-hidden="true">
        <motion.div
          className="hero-rotator-bg-inner"
          animate={reduced ? { x: 0, y: 0 } : { x: -px.x, y: -px.y }}
          transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.6 }}
        >
          <AnimatePresence initial={false}>
            <SceneLayer
              key={scene.id}
              image={scene.image}
              featured={scene.featured}
              index={index}
              active
              reduced={reduced}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scene indicator 01/05 … 05/05 with per-scene progress fill */}
      <div className="hero-rotator-indicator" aria-hidden="true">
        <span className="hero-rotator-count">
          {String(index + 1).padStart(2, "0")}
          <span className="hero-rotator-count-sep">/</span>
          {String(heroScenes.length).padStart(2, "0")}
        </span>
        <div className="hero-rotator-bars">
          {heroScenes.map((s, i) => (
            <span
              key={s.id}
              className="hero-rotator-bar"
              data-state={i < index ? "done" : i === index ? "active" : "todo"}
            >
              <motion.i
                className="hero-rotator-bar-fill"
                initial={false}
                animate={
                  i === index && !reduced
                    ? { width: ["0%", "100%"] }
                    : i < index
                      ? { width: "100%" }
                      : { width: "0%" }
                }
                transition={
                  i === index && !reduced
                    ? { duration: SCENE_MS / 1000, ease: "linear" }
                    : { duration: 0.3 }
                }
              />
            </span>
          ))}
        </div>
      </div>

      {/* Screen-reader / reduced-motion descriptive text (visually hidden). */}
      <p className="sr-only">
        Scene {index + 1} of {heroScenes.length}: {scene.featured}.
      </p>
    </div>
  );
}
