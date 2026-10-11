import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
};

export function MagneticButton({ children, onClick, variant = "outline", className = "", type = "button" }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setPos({ x: x * 0.08, y: y * 0.08 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-[0.18em] uppercase font-medium transition-colors";
  const styles =
    variant === "solid"
      ? "bg-gold text-primary-foreground hover:bg-gold-muted"
      : "gold-border text-gold hover:text-foreground hover:bg-gold/10";

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
      whileHover={{ scale: reduced ? 1 : 1.02 }}
      whileTap={{ scale: reduced ? 1 : 0.98 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

    </motion.button>
  );
}
