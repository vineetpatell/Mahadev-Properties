import { Section } from "./Layout";
import { Reveal, RevealItem } from "./Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { faqJsonLd, type FaqEntry } from "../lib/seo";
import { faqsByPage, type FaqPageKey } from "../lib/faqs";

export function Faq({
  page,
  items,
  eyebrow = "QUESTIONS · ANSWERED",
  heading = "Frequently asked questions.",
}: {
  page: FaqPageKey;
  items?: FaqEntry[];
  eyebrow?: string;
  heading?: string;
}) {
  const list = items ?? faqsByPage[page];
  return (
    <Section className="py-16 md:py-24">
      <Reveal className="mx-auto max-w-4xl text-center">
        <RevealItem>
          <div className="text-[10px] tracking-[0.4em] text-gold">{eyebrow}</div>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
            {heading}
          </h2>
        </RevealItem>
        <RevealItem className="mt-10 text-left">
          <Accordion type="single" collapsible className="border-t border-gold/15">
            {list.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gold/15">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-gold md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-muted">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealItem>
      </Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(list)) }}
      />
    </Section>
  );
}
