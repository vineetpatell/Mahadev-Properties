import { createFileRoute } from "@tanstack/react-router";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";
import { OG_IMAGE, abs } from "../lib/seo";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Mahadev Property, Malad West Mumbai" },
      {
        name: "description",
        content:
          "The terms that govern your use of mahadevproperty.in and Mahadev Property's real-estate services in Malad West, Mumbai.",
      },
      { property: "og:title", content: "Terms of Service — Mahadev Property" },
      { property: "og:description", content: "Terms governing our website and services." },
      { property: "og:url", content: abs("/terms-of-service") },
      { property: "og:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/terms-of-service") }],
  }),
  component: TermsOfServicePage,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. About these terms",
    body: [
      "These terms govern your use of mahadevproperty.in and the services provided by Mahadev Property (P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064). By using the site or engaging our services, you agree to them.",
      "If you do not agree, please refrain from using the site or submitting enquiries.",
    ],
  },
  {
    title: "2. Our services",
    body: [
      "Mahadev Property assists with buying, selling, renting and leasing residential, commercial and land assets in and around Malad West. We also offer investment consulting, project marketing and property management.",
      "We act as a registered real-estate consultant and developer. Specific engagements (brokerage, mandate or management) are governed by a separate written agreement that prevails over these terms where it conflicts.",
    ],
  },
  {
    title: "3. Listing information",
    body: [
      "Property details on this site — price, carpet area, configuration, status, availability and imagery — are provided in good faith from owner and developer inputs and are subject to change without notice.",
      "Photographs are representative of the typology; the exact unit you visit may differ in view, floor and finish. Always verify final specifications in writing before any token or advance.",
      "Inclusion of a property on this site does not constitute an offer or invitation to purchase.",
    ],
  },
  {
    title: "4. Enquiries, site visits & bookings",
    body: [
      "Submitting a form, WhatsApp message or call request does not create a binding obligation for either party. A visit slot is confirmed only when our team acknowledges it.",
      "Any token, advance or booking amount is governed by a separate written agreement and applicable RERA rules. No payment is required through this website.",
    ],
  },
  {
    title: "5. Pricing, fees & payments",
    body: [
      "Prices shown are as quoted by owners/developers and may exclude stamp duty, registration, GST, society transfer charges and other statutory fees, which are payable separately at actuals.",
      "Any brokerage or service fee applicable to your transaction is communicated in writing before you commit. Never send money to personal accounts — all dues are collected only against written instructions from Mahadev Property.",
    ],
  },
  {
    title: "6. Client responsibilities",
    body: [
      "You are responsible for conducting independent legal due diligence — title, RERA registration, approvals and society dues — before entering any transaction, or for engaging a lawyer to do so.",
      "Information you submit through forms or WhatsApp must be accurate and used only for genuine property enquiries.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "All content on this site — text, photography, layout, logo and code — belongs to Mahadev Property or its licensors. You may view and share links for personal property search; reproduction for commercial use requires written permission.",
    ],
  },
  {
    title: "8. Limitation of liability",
    body: [
      "The site is provided on an 'as is' basis. While we strive for accuracy, Mahadev Property is not liable for decisions taken solely on website content without written verification.",
      "Nothing in these terms limits liability that cannot be limited under Indian law.",
    ],
  },
  {
    title: "9. Governing law",
    body: [
      "These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Mumbai, Maharashtra.",
    ],
  },
  {
    title: "10. Contact",
    body: [
      "Questions about these terms: mahadevproperties@gmail.com or +91 91523 83586. Registered office: P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064.",
    ],
  },
];

function TermsOfServicePage() {
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
              Terms of <span className="text-gradient-gold italic font-light">Service.</span>
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-7 max-w-2xl text-base text-slate-muted leading-relaxed font-light">
              Plain-language ground rules for using mahadevproperty.in and working with our
              Malad West studio — listings, visits, payments and everything in between.
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
                <div className="text-[10px] tracking-[0.4em] text-gold">NEED CLARITY?</div>
                <p className="mt-4 text-sm text-slate-muted leading-relaxed">
                  Talk to us before you commit —{" "}
                  <a
                    href="mailto:mahadevproperties@gmail.com?subject=Question%20about%20terms%20of%20service"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    mahadevproperties@gmail.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+919152383586"
                    className="text-gold hover:text-foreground transition-colors"
                  >
                    +91 91523 83586
                  </a>
                  . Every mandate we accept is documented in writing first.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </Section>
    </Layout>
  );
}
