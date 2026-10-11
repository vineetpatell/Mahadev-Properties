const items = [
  "MAHADEV / RESIDENTIAL",
  "01 · MALAD WEST",
  "BLUEPRINT 24.11",
  "COMMERCIAL GRADE-A",
  "02 · SUNDAR NAGAR",
  "VASTU COMPLIANT",
  "SIGNATURE VILLAS",
  "03 · ORCHID TOWER",
  "INVESTMENT ADVISORY",
  "SEA VIEW · 22F",
];

export function Ticker({ reverse = false }: { reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/10 py-4 bg-obsidian/40">
      <div
        className="ticker-track flex gap-14 whitespace-nowrap will-change-transform"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {list.map((t, i) => (
          <span key={i} className="text-xs tracking-[0.35em] text-slate-muted flex items-center gap-14">
            {t}
            <span className="h-px w-14 bg-gold/40 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
