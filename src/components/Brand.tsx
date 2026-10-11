import logo from "../assets/mahadev-logo.png";

export function Brand({ large = false }: { large?: boolean }) {
  return <div className={`flex items-center gap-3 ${large ? "flex-col items-start" : ""}`}>
    <img src={logo} alt="महादेव" className={`brand-mark object-contain ${large ? "h-24 w-44" : "h-11 w-20"}`} />
    <div className="leading-tight"><div className="text-xs font-semibold text-foreground">MAHADEV PROPERTY</div><div className="mt-1 text-[9px] text-muted-foreground">REAL ESTATE · MUMBAI</div></div>
  </div>;
}
