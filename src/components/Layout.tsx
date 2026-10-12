import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Phone, Mail, ArrowUpRight, Menu, ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BackgroundMesh } from "./BackgroundMesh";
import { Brand } from "./Brand";
import { PageQuote } from "./PageQuote";
import { ShortlistControl } from "./Shortlist";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";

const PROPERTY_LINKS = [
  { to: "/sale", label: "Buy / Sale" },
  { to: "/rent", label: "Rent / Lease" },
] as const;

const nav = [
  { to: "/", label: "Home" },
  { to: "/sale", label: "Sale", parent: "Properties" },
  { to: "/rent", label: "Rent", parent: "Properties" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact Us" },
] as const;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 md:px-6 pt-3 md:pt-4">
      <div className="relative mx-auto max-w-6xl">
        {/* Backdrop is its own layer so the bar no longer needs overflow-hidden
            (which used to clip the Properties dropdown into an overlapping sliver).
            A constant, light blur avoids re-rasterising a 2xl blur on every
            scroll frame (a big source of scroll jank on the listing pages). */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-full border pointer-events-none backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-card/92 border-gold/30 shadow-[0_18px_50px_-20px_color-mix(in_oklab,var(--foreground)_30%,transparent)]"
              : "bg-card/70 border-gold/15 shadow-[0_10px_36px_-22px_color-mix(in_oklab,var(--foreground)_24%,transparent)]"
          }`}
        />
        <div
          className={`relative px-4 md:px-6 flex items-center justify-between gap-3 ${
            scrolled ? "h-14" : "h-[4.25rem]"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <Brand />
          </Link>
          <nav className="hidden lg:flex items-center gap-1 whitespace-nowrap">
            <Link
              to="/"
              className="relative px-4 py-2 text-xs tracking-[0.22em] uppercase text-slate-muted hover:text-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="flex items-center gap-1 px-4 py-2 text-xs tracking-[0.22em] uppercase text-slate-muted group-hover:text-foreground transition-colors"
              >
                Properties{" "}
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all absolute left-0 top-full pt-2 z-20">
                <div className="min-w-52 rounded-2xl border border-gold/20 bg-card/95 backdrop-blur-xl p-2 shadow-xl">
                  {PROPERTY_LINKS.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-xs tracking-[0.22em] uppercase text-slate-muted hover:text-gold hover:bg-gold/10 transition-colors"
                      activeProps={{ className: "text-gold bg-gold/10" }}
                    >
                      {p.label} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/about"
              className="relative px-4 py-2 text-xs tracking-[0.22em] uppercase text-slate-muted hover:text-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="relative px-4 py-2 text-xs tracking-[0.22em] uppercase text-slate-muted hover:text-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="relative px-4 py-2 text-xs tracking-[0.22em] uppercase text-slate-muted hover:text-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              Contact Us
            </Link>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            {/* Direct dialer: tapping opens the phone app with the number pre-filled. */}
            <a
              href="tel:+919152383586"
              title="Call us"
              aria-label="Call Mahadev Property"
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-2 shrink-0 gold-border rounded-full px-4 py-2 text-xs font-medium tracking-[0.22em] uppercase text-gold bg-gold/10 hover:bg-gold hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
            <ShortlistControl />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden h-11 w-11 rounded-full"
                  aria-label="Open navigation menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="w-[min(90vw,380px)] bg-card/95 backdrop-blur-xl flex flex-col overflow-y-auto"
                side="right"
              >
                <SheetTitle className="pt-6">
                  <Brand />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate Mahadev Property pages
                </SheetDescription>
                <div className="mt-12 flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="flex items-center justify-between py-4 border-b border-border text-xl"
                      activeProps={{ className: "text-gold" }}
                      activeOptions={{ exact: true }}
                    >
                      <span>
                        <span className="text-xs text-muted-foreground mr-4">01</span>Home
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </SheetClose>
                  <div className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setPropsOpen((v) => !v)}
                      aria-expanded={propsOpen}
                      className="flex w-full items-center justify-between py-4 text-xl"
                    >
                      <span>
                        <span className="text-xs text-muted-foreground mr-4">02</span>Properties
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${propsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {propsOpen && (
                      <div className="pb-4 pl-9 flex flex-col gap-1">
                        {PROPERTY_LINKS.map((p) => (
                          <SheetClose asChild key={p.to}>
                            <Link
                              to={p.to}
                              className="flex items-center justify-between py-3 text-lg text-slate-muted"
                              activeProps={{ className: "text-gold" }}
                            >
                              <span>{p.label}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                  <SheetClose asChild>
                    <Link
                      to="/about"
                      className="flex items-center justify-between py-4 border-b border-border text-xl"
                      activeProps={{ className: "text-gold" }}
                    >
                      <span>
                        <span className="text-xs text-muted-foreground mr-4">03</span>About Us
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/services"
                      className="flex items-center justify-between py-4 border-b border-border text-xl"
                      activeProps={{ className: "text-gold" }}
                    >
                      <span>
                        <span className="text-xs text-muted-foreground mr-4">04</span>Services
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/contact"
                      className="flex items-center justify-between py-4 border-b border-border text-xl"
                      activeProps={{ className: "text-gold" }}
                    >
                      <span>
                        <span className="text-xs text-muted-foreground mr-4">05</span>Contact Us
                      </span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </SheetClose>
                </div>
                <div className="mt-auto pt-10 space-y-3">
                  <Button asChild className="w-full h-12">
                    <a href="tel:+919152383586">
                      <Phone />
                      Call us
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full h-12">
                    <a href="https://wa.me/919152383586" target="_blank" rel="noopener noreferrer">
                      <MessageCircle />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-10 mx-3 md:mx-6 mb-4 rounded-[2.5rem] border border-gold/20 bg-card/85 backdrop-blur-xl overflow-hidden shadow-[0_-14px_50px_-24px_color-mix(in_oklab,var(--foreground)_28%,transparent)]">
      <div
        className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Brand large />
          <p className="mt-6 text-sm text-slate-muted leading-relaxed">
            A trusted real estate & development studio building transparent, long-term value across
            Mumbai.
          </p>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] text-gold mb-5">NAVIGATE</div>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => (
              <li key={`${n.to}-${n.label}`}>
                <Link
                  to={n.to}
                  className="text-slate-muted hover:text-foreground transition-colors"
                >
                  {"parent" in n ? `${n.parent} — ${n.label}` : n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] text-gold mb-5">STUDIO</div>
          <ul className="space-y-3 text-sm text-slate-muted">
            <li>
              {/* Tapping the address opens Google Maps with the full address pre-filled. */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=P1%2C+Deep+Sadan+Bldg%2C+Sundar+Nagar%2C+Malad+West%2C+Mumbai+400064"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-gold transition-colors"
                aria-label="Open Mahadev Property address in Google Maps"
              >
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> P1, Deep Sadan Bldg, Sundar
                Nagar, Malad West, Mumbai 400064
              </a>
            </li>
            <li>
              <a
                href="tel:+919152383586"
                className="flex gap-3 hover:text-gold transition-colors"
                aria-label="Call Mahadev Property"
              >
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> +91 91523 83586
              </a>
            </li>
            <li>
              <a
                href="mailto:mahadevproperties@gmail.com?subject=Property%20enquiry%20%E2%80%94%20Mahadev%20Property&body=Hi%20Mahadev%20Property%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20properties.%0A%0AMy%20requirement%3A%20(e.g.%202BHK%20in%20Malad%20West)%0ABudget%3A%0APreferred%20move-in%3A%0A%0AThank%20you."
                className="flex gap-3 hover:text-gold transition-colors"
                aria-label="Email Mahadev Property"
              >
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> mahadevproperties@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] text-gold mb-5">COMPLIANCE</div>
          <ul className="space-y-3 text-sm text-slate-muted">
            <li>MahaRERA Registered Developer</li>
            <li>ISO 9001:2015 Aligned Practices</li>
            <li>GST · 27AAECM0000X1Z0</li>
            <li>CIN · U70100MH2015PTC000000</li>
          </ul>
          <div className="mt-6 flex flex-col gap-2">
            {(
              [
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-of-service", label: "Terms of Service" },
                { to: "/gdpr-compliance", label: "GDPR Compliance" },
              ] as const
            ).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="gold-border px-4 py-2 text-[10px] tracking-[0.28em] text-gold hover:bg-gold/10 transition-colors text-center"
                activeProps={{ className: "bg-gold/15" }}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs tracking-[0.22em] text-slate-muted">
          <span>© {new Date().getFullYear()} MAHADEV PROPERTY · ALL RIGHTS RESERVED</span>
          <span>
            DESIGNED & DEVELOPED BY{" "}
            <a
              href="https://neverendingservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-foreground transition-colors"
            >
              NEVER ENDING SERVICES
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/919152383586"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="pulse-gold h-14 w-14 rounded-full bg-gold text-primary-foreground flex items-center justify-center shadow-lg shadow-gold/30 hover:scale-110 transition-transform">
        <MessageCircle className="h-6 w-6" />
      </div>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-obsidian border border-gold/30 px-3 py-2 text-xs tracking-[0.22em] text-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
        CHAT ON WHATSAPP <ArrowUpRight className="h-3 w-3" />
      </div>
    </motion.a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-foreground relative">
      <BackgroundMesh />
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">{children}</main>
      <PageQuote />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export const Section = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <section className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</section>;
