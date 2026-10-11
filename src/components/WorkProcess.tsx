import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Section } from "./Layout";
import { Reveal, RevealItem } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const img = (seed: string, w = 900) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&q=80`;

const STEPS = [
  {
    n: "01",
    title: "Discovery briefing",
    text: "A short call to fix budget, locality, configuration and timeline — no spam, no pressure.",
    image: img("1497366754035-f200968a6e72"),
  },
  {
    n: "02",
    title: "Curated shortlist",
    text: "Hand-picked, title-checked options from our Malad West portfolio — only what fits the brief.",
    image: img("1560448204-e02f11c3d0e2"),
  },
  {
    n: "03",
    title: "Guided site visits",
    text: "Same-day back-to-back visits with honest notes on light, layout, society and resale value.",
    image: img("1600585154340-be6161a56a0c"),
  },
  {
    n: "04",
    title: "Legal & negotiation",
    text: "Title, RERA and paperwork diligence, then disciplined negotiation for the best final number.",
    image: img("1524758631624-e2822e304c36"),
  },
  {
    n: "05",
    title: "Handover & aftercare",
    text: "Registration, possession and management support — we stay on after the keys change hands.",
    image: img("1600607687644-c7171b42498f"),
  },
] as const;

/**
 * OUR WORK PROCESS — a cinematic gold-on-obsidian band with five visual
 * step cards. Used on Home (between the RENT and SALE carousels) and on
 * the About page. Deliberately distinct from both carousels' designs.
 */
export function WorkProcess() {
  return (
    <section className="process-band relative py-20 md:py-28" aria-label="Our work process">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <RevealItem>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-gold">
                  <span className="h-px w-10 bg-gold" /> OUR WORK PROCESS
                </div>
                <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-[-0.03em] max-w-2xl">
                  Five steps from first call <br className="hidden md:block" />
                  to <span className="text-gradient-gold italic font-light">keys in hand.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm text-slate-muted leading-relaxed">
                The same disciplined sequence behind every purchase, lease and investment we
                close — transparent at each stage, documented end to end.
              </p>
            </div>
          </RevealItem>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {STEPS.map((s) => (
              <RevealItem
                key={s.n}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-gold/20 hover:border-gold/50 transition-colors"
              >
                <img
                  data-motion="skip"
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/10" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <span className="text-[10px] tracking-[0.4em] text-gold">STEP {s.n}</span>
                  <h3 className="mt-2 text-lg font-bold leading-tight">{s.title}</h3>
                  <p className="mt-2 text-xs text-slate-muted leading-relaxed line-clamp-4">
                    {s.text}
                  </p>
                </div>
                <span className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gold/40 bg-obsidian/70 text-gold flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.n}
                </span>
              </RevealItem>
            ))}
          </div>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/sale">
              <MagneticButton variant="solid">
                View Portfolio <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <a
              href="https://wa.me/919152383586?text=Hi%20Mahadev%20Property%2C%20I%27d%20like%20to%20start%20the%20process%20—%20my%20budget%20is%20%26%20preferred%20configuration%20are%3A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton>
                <MessageCircle className="h-4 w-4" /> Start Step 01 on WhatsApp
              </MagneticButton>
            </a>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
