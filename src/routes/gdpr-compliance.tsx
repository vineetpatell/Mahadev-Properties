import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";
import { OG_IMAGE, abs } from "../lib/seo";

export const Route = createFileRoute("/gdpr-compliance")({
  head: () => ({
    meta: [
      { title: "GDPR Compliance — Mahadev Property, Malad West Mumbai" },
      {
        name: "description",
        content:
          "How Mahadev Property honours GDPR-grade data rights — access, rectification, erasure and consent — for every client enquiry.",
      },
      { property: "og:title", content: "GDPR Compliance — Mahadev Property" },
      {
        property: "og:description",
        content: "Your data rights, honoured as standard.",
      },
      { property: "og:url", content: abs("/gdpr-compliance") },
      { property: "og:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/gdpr-compliance") }],
  }),
  component: GdprCompliancePage,
});

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Lawfulness & fairness",
    body: "We collect enquiry data only when you submit it yourself — through our contact form, WhatsApp or a site-visit request — and we tell you exactly why it is needed.",
  },
  {
    title: "Purpose limitation",
    body: "Your name, phone and requirement are used solely to answer your property enquiry, prepare a shortlist and schedule visits. Nothing else.",
  },
  {
    title: "Data minimisation",
    body: "We ask only for what a real-estate consultation actually needs. There are no mandatory account registrations and no profiling.",
  },
  {
    title: "Storage limitation",
    body: "Enquiry records are retained only as long as the relationship (and Indian legal record-keeping for real-estate transactions) requires, then deleted.",
  },
  {
    title: "Integrity & confidentiality",
    body: "Access to client enquiries is limited to the team members handling them. We do not sell or share personal data with advertisers or data brokers.",
  },
  {
    title: "Accountability",
    body: "We can, on request, tell you exactly what data we hold about you and correct or erase it — email info@mahadevproperties.co.in.",
  },
];

const RIGHTS: { k: string; v: string }[] = [
  { k: "Access", v: "Request a copy of the data we hold about you." },
  { k: "Rectification", v: "Correct inaccurate name, contact or requirement details." },
  { k: "Erasure", v: "Ask us to delete your enquiry history ('right to be forgotten')." },
  { k: "Restriction", v: "Ask us to pause processing while a dispute is resolved." },
  { k: "Portability", v: "Receive your data in a machine-readable format on request." },
  { k: "Objection", v: "Object to any processing that is not strictly necessary for your enquiry." },
];

function GdprCompliancePage() {
  return (
    <Layout>
      <Section className="pt-20 pb-16">
        <Reveal>
          <RevealItem>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-gold">
              <span className="h-px w-10 bg-gold" /> LEGAL · UPDATED OCTOBER 2026
            </div>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-[-0.03em]">
              GDPR <span className="text-gradient-gold italic font-light">Compliance.</span>
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 max-w-2xl text-base text-slate-muted leading-relaxed font-light">
              Even though we operate from Malad West, Mumbai, we extend GDPR-grade data
              protection to every client — because a property enquiry deserves the same care as
              the property itself.
            </p>
          </RevealItem>
        </Reveal>
      </Section>
      <Section className="pb-12">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">01 · THE PRINCIPLES WE FOLLOW</div>
          </RevealItem>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15 border border-gold/20">
            {PRINCIPLES.map((p) => (
              <RevealItem key={p.title} className="bg-obsidian p-8 group hover:bg-gold/10 transition-colors">
                <h2 className="text-lg font-bold tracking-tight">{p.title}</h2>
                <p className="mt-3 text-sm text-slate-muted leading-relaxed">{p.body}</p>
                <div className="mt-6 h-px w-8 bg-gold group-hover:w-16 transition-all duration-500" />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="pb-24">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">02 · YOUR RIGHTS</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Six rights you can exercise any time.
            </h2>
          </RevealItem>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RIGHTS.map((r, i) => (
              <RevealItem
                key={r.k}
                className="border border-gold/20 bg-gradient-to-b from-obsidian to-background p-8"
              >
                <div className="text-4xl font-black text-gold/40">0{i + 1}</div>
                <div className="mt-4 text-xl font-bold tracking-tight">{r.k}</div>
                <p className="mt-2 text-sm text-slate-muted leading-relaxed">{r.v}</p>
              </RevealItem>
            ))}
          </div>
          <RevealItem>
            <div className="mt-12 border border-gold/25 bg-obsidian p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-[10px] tracking-[0.4em] text-gold">EXERCISE YOUR RIGHTS</div>
                <p className="mt-3 max-w-xl text-sm text-slate-muted leading-relaxed">
                  Email{" "}
                  <a
                    href="mailto:info@mahadevproperties.co.in?subject=GDPR%20data%20request&body=I%20would%20like%20to%20request%3A%20(access%20%2F%20correction%20%2F%20erasure)%0A%0AName%3A%0APhone%20used%20for%20enquiry%3A"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    info@mahadevproperties.co.in
                  </a>{" "}
                  with the subject “GDPR data request”, or call{" "}
                  <a
                    href="tel:+919152383586"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    +91 91523 83586
                  </a>
                  . We respond to verified requests within 30 days.
                </p>
              </div>
              <a
                href="mailto:info@mahadevproperties.co.in?subject=GDPR%20data%20request&body=I%20would%20like%20to%20request%3A%20(access%20%2F%20correction%20%2F%20erasure)%0A%0AName%3A%0APhone%20used%20for%20enquiry%3A"
                className="gold-border px-6 py-3 text-xs tracking-[0.28em] text-gold hover:bg-gold/10 transition-colors whitespace-nowrap"
              >
                SEND REQUEST
              </a>
            </div>
          </RevealItem>
        </Reveal>
      </Section>
    </Layout>
  );
}
