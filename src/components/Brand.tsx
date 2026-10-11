import logo from "../assets/mahadev-logo.png";

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${large ? "flex-col items-start" : ""}`}>
      <img
        src={logo}
        alt="Mahadev Property — Malad West Mumbai"
        className={`object-contain ${large ? "h-24 w-44" : "h-11 w-20"}`}
        style={{ border: "none", padding: 0, filter: "drop-shadow(0 1px 6px rgb(0 0 0 / 0.35))" }}
      />
      <div className="leading-tight">
        <div className="text-xs font-semibold text-foreground">MAHADEV PROPERTY</div>
        <div className="mt-1 text-[9px] text-muted-foreground">REAL ESTATE · MUMBAI</div>
      </div>
    </div>
  );
}
