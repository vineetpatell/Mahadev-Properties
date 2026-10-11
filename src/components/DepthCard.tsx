import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type DepthCardProps = {
  children: ReactNode;
  className?: string;
  /** hover se kis kad tak card uthhe (px) */
  lift?: number;
  /** image / inner media plane ka parallax shift (px) */
  mediaShift?: number;
  mediaClassName?: string;
  /** translateZ layers ko enable karna (tags ke liye) */
  layered?: boolean;
};

/**
 * Depth-stack card: mouse tilt ka koi handling nahi.
 * Card khud smooth lift uthata hai, inner media plane
 * opposite me parallax drift karta hai, aur ek soft light
 * sweep hover pe cross hota hai. Layered mode me badges
 * translateZ pe float karte hain, to stack physically
 * alag planes me hota hai.
 */
export function DepthCard({
  children,
  className,
  lift = 14,
  mediaShift = 22,
  mediaClassName,
  layered = false,
}: DepthCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const sync = () => (reduced.current = mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onEnter = () => {
    const el = ref.current;
    const media = mediaRef.current;
    if (!el || reduced.current || !window.matchMedia("(pointer: fine)").matches) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(0, -${lift}px, 0)`;
      if (media) media.style.transform = `translate3d(0, ${mediaShift * 0.35}px, 0) scale(1.06)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    const media = mediaRef.current;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (el) el.style.transform = "translate3d(0, 0, 0)";
      if (media) media.style.transform = "translate3d(0, 0, 0) scale(1)";
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn("depth-card relative", layered && "depth-layered", className)}
      style={{ "--depth-lift": `${lift}px` } as React.CSSProperties}
    >
      {mediaClassName ? (
        <div ref={mediaRef} className={mediaClassName}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
