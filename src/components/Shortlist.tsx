import { createContext, useContext, useState, type ReactNode } from "react";
import { Heart, ArrowUpRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { properties } from "../lib/properties";

const Context = createContext<{ ids: string[]; toggle: (id: string) => void }>({ ids: [], toggle: () => {} });
export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  return <Context.Provider value={{ ids, toggle: id => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev) }}>{children}</Context.Provider>;
}
export function SaveProperty({ id }: { id: string }) {
  const { ids, toggle } = useContext(Context);
  const saved = ids.includes(id);
  return <Button variant="outline" size="icon" title={saved ? "Remove from shortlist" : ids.length >= 3 ? "Compare up to 3 properties" : "Save property"} aria-label={saved ? "Remove from shortlist" : "Save property"} aria-pressed={saved} disabled={!saved && ids.length >= 3} onClick={() => toggle(id)} className="bg-card/95 rounded-full shrink-0"><Heart className={saved ? "fill-gold text-gold" : "text-foreground"} /></Button>;
}
export function ShortlistControl() {
  const { ids, toggle } = useContext(Context);
  const [open, setOpen] = useState(false);
  const selected = properties.filter(p => ids.includes(p.id));
  return <><Button variant="ghost" size="icon" title="Compare shortlist" aria-label={`Compare shortlist, ${ids.length} saved`} className="relative" onClick={() => setOpen(true)}><Heart />{ids.length > 0 && <span className="absolute right-0 top-0 bg-primary text-primary-foreground text-[9px] rounded-full w-4 h-4">{ids.length}</span>}</Button>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-4xl max-h-[85dvh] overflow-auto"><DialogTitle>Your shortlist</DialogTitle><DialogDescription>{ids.length ? "Compare your selected properties. Saved for this visit." : "No properties saved yet. Your shortlist can hold up to three properties."}</DialogDescription>
      <div className="grid gap-6 md:grid-cols-3">{selected.map(p => <article key={p.id} className="min-w-0"><div className="relative"><img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" /><Button size="icon" variant="outline" aria-label={`Remove ${p.name}`} className="absolute top-2 right-2" onClick={() => toggle(p.id)}><X /></Button></div><h3 className="mt-4 font-semibold">{p.name}</h3><dl className="mt-4 space-y-3 text-sm">{[["Price", p.price], ["Location", p.location], ["Carpet area", p.carpetArea], ["Configuration", p.configuration], ["Status", p.status], ["Parking", p.parking]].map(([k,v]) => <div key={k} className="border-b border-border pb-2"><dt className="text-muted-foreground text-xs">{k}</dt><dd className="mt-1">{v}</dd></div>)}</dl><Button asChild variant="link" className="mt-3 px-0"><Link to="/property/$id" params={{ id: p.id }} onClick={() => setOpen(false)}>View property <ArrowUpRight /></Link></Button></article>)}</div>
    </DialogContent></Dialog>
  </>;
}