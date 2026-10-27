import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";
import { OG_IMAGE, abs } from "../lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Mahadev Property, Malad West Mumbai" },
      {
        name: "description",
        content:
          "How Mahadev Property collects, uses and protects your data when you browse listings, send enquiries or book site visits.",
      },
      { property: "og:title", content: "Privacy Policy — Mahadev Property" },
      { property: "og:description", content: "How we collect, use and protect your data." },
      { property: "og:url", content: abs("/privacy-policy") },
      { property: "og:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/privacy-policy") }],
  }),
  component: PrivacyPolicyPage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Who we are",
    body: [
      "Mahadev Property is a real estate and property development studio based at P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064. We deal in residential, commercial and land assets — sale, rent/lease, investment consulting and property management.",
      "This policy explains what happens to your personal information when you use mahadevproperty.in, send us an enquiry, or book a site visit.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Enquiry details you submit: name, email, phone number, preferred service, and your message — through our contact form, WhatsApp links, or site-visit forms on property pages.",
      "Shortlist data: properties you save with the heart button are kept in your browser for that visit only. We do not receive this list unless you share it with us.",
      "Standard technical data: browser type, device and pages viewed, collected in aggregate to keep the site fast and reliable.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "To respond to your enquiry with a tailored property shortlist, pricing and availability.",
      "To schedule and confirm site visits you request, and to follow up on them.",
      "To send occasional updates about new listings in Malad West — only if you ask for them. Every message we send includes a way to opt out.",
      "We never sell, rent or trade your personal information to third parties.",
    ],
  },
  {
    title: "4. WhatsApp & call enquiries",
    body: [
      "When you tap a WhatsApp or call button, the details you see pre-filled (such as the property name and your message) are sent to us through WhatsApp or your phone app. Those conversations are governed by WhatsApp's own privacy policy as well as this one.",
      "We use the information in those messages solely to answer your property requirement.",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "We use only essential browser storage needed for the site to function (for example, keeping your shortlist during a visit). We do not run third-party advertising or tracking cookies.",
    ],
  },
  {
    title: "6. Data retention & security",
    body: [
      "Enquiry records are kept only as long as needed to serve you and meet legal requirements for real-estate documentation in India.",
      "Our systems and offices follow reasonable access controls so your information is not exposed unnecessarily.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "You can ask us what information we hold about you, request corrections, or ask us to delete it — email info@mahadevproperties.co.in or call +91 91523 83586 and we will act on verified requests promptly.",
    ],
  },
  {
    title: "8. Changes to this policy",
    body: [
      "We may update this policy as our services evolve. The latest version always lives on this page.",
    ],
  },
];

function PrivacyPolicyPage() {
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
              Privacy <span className="text-gradient-gold italic font-light">Policy.</span>
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 max-w-2xl text-base text-slate-muted leading-relaxed font-light">
              Your trust is the product. Here is exactly what we collect when you enquire about a
              flat, shop or plot with Mahadev Property — and what we do with it.
            </p>
          </RevealItem>
        </Reveal>
      </Section>
      <Section className="pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-8 space-y-10">
            {SECTIONS.map((s) => (
              <RevealItem key={s.title}>
                <article className="border border-gold/20 bg-obsidian p-8">
                  <h2 className="text-xl font-bold tracking-tight text-gold">{s.title}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-4 text-sm text-slate-muted leading-relaxed">
                      {p}
                    </p>
                  ))}
                </article>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className="lg:col-span-4">
            <RevealItem>
              <div className="border border-gold/25 bg-gradient-to-b from-obsidian to-background p-8 sticky top-28">
                <div className="text-[10px] tracking-[0.4em] text-gold">QUESTIONS?</div>
                <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                  Write to us at{" "}
                  <a
                    href="mailto:info@mahadevproperties.co.in?subject=Privacy%20policy%20question"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    info@mahadevproperties.co.in
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+919152383586"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    +91 91523 83586
                  </a>
                  . Office hours: Monday–Saturday, 10 AM – 7 PM IST.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
