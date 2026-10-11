import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout, Section } from "../components/Layout";
import { ListingGrid } from "../components/ListingGrid";
import { properties, type PropertyType } from "../lib/properties";
import { Reveal, RevealItem } from "../components/Reveal";
import { Faq } from "../components/Faq";
import { OG_IMAGE, abs } from "../lib/seo";

const SALE_FILTERS = [
  "All",
  "1RK",
  "1BHK",
  "2BHK",
  "3BHK",
  "Commercial",
  "Flats for Sale",
  "Villas/Houses",
  "Plots",
] as const;

type SaleFilter = (typeof SALE_FILTERS)[number];

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Flats, Villas & Plots for Sale in Malad West | Mahadev Property" },
      {
        name: "description",
        content:
          "11 live sale listings in Malad West: 1RK–3BHK, villas, commercial & plots. Filter by type, compare specs, book site visit.",
      },
      {
        property: "og:title",
        content: "Flats, Villas & Plots for Sale in Malad West | Mahadev Property",
      },
      {
        property: "og:description",
        content: "11 live sale listings: 1RK–3BHK, villas, commercial & plots.",
      },
      { property: "og:url", content: abs("/sale") },
      { property: "og:image", content: OG_IMAGE },
      {
        name: "twitter:title",
        content: "Flats, Villas & Plots for Sale in Malad West | Mahadev Property",
      },
      {
        name: "twitter:description",
        content: "11 live sale listings in Malad West: 1RK–3BHK, villas & plots.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/sale") }],
  }),
  component: SalePage,
});

function SalePage() {
  const [active, setActive] = useState<SaleFilter>("All");
  const list = useMemo(() => {
    const sale = properties.filter((p) => p.listing === "sale");
    if (active === "All") return sale;
    return sale.filter((p) => p.type === (active as PropertyType));
  }, [active]);

  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">01 · BUY PORTFOLIO</div>
          </RevealItem>
          <RevealItem>
            <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em]">
                Property for Sale
              </h1>
              <div className="h-px flex-1 bg-gold min-w-[80px] mb-4" />
              <span className="text-xs tracking-[0.32em] text-slate-muted mb-2">
                {list.length} · LIVE
              </span>
            </div>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-2xl text-slate-muted">
              Flats, villas, commercial & plots — sirf kharidne wali listings. Site visit WhatsApp
              par book karo.
            </p>
          </RevealItem>
        </Reveal>
      </Section>
      <Section className="py-8">
        <div className="flex flex-wrap gap-2">
          {SALE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-5 py-2.5 text-xs tracking-[0.22em] uppercase border transition-all ${
                active === f
                  ? "bg-gold text-foreground border-gold"
                  : "border-gold/20 text-slate-muted hover:text-foreground hover:border-gold/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Section>
      <ListingGrid
        items={list}
        emptyNote="Is filter me abhi koi sale listing nahi — WhatsApp par requirement bhejo."
      />
      <Faq page="sale" />
    </Layout>
  );
}
