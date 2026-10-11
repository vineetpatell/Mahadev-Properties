import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout, Section } from "../components/Layout";
import { ListingGrid } from "../components/ListingGrid";
import { properties, type PropertyType } from "../lib/properties";
import { Reveal, RevealItem } from "../components/Reveal";
import { Faq } from "../components/Faq";
import { OG_IMAGE, abs } from "../lib/seo";

const RENT_FILTERS = ["All", "1BHK", "2BHK", "Commercial"] as const;

type RentFilter = (typeof RENT_FILTERS)[number];

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Flats & Shops on Rent in Malad West | Mahadev Property" },
      {
        name: "description",
        content:
          "Live rent listings in Malad West: furnished 1BHK, 2BHK & commercial shops. Monthly rent, immediate move-in, WhatsApp enquiry.",
      },
      { property: "og:title", content: "Flats & Shops on Rent in Malad West | Mahadev Property" },
      {
        property: "og:description",
        content: "Furnished 1BHK, 2BHK & commercial shops on rent in Malad West.",
      },
      { property: "og:url", content: abs("/rent") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "Flats & Shops on Rent in Malad West | Mahadev Property" },
      {
        name: "twitter:description",
        content: "Furnished 1BHK, 2BHK & shops on rent in Malad West.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/rent") }],
  }),
  component: RentPage,
});

function RentPage() {
  const [active, setActive] = useState<RentFilter>("All");
  const list = useMemo(() => {
    const rent = properties.filter((p) => p.listing === "rent");
    if (active === "All") return rent;
    return rent.filter((p) => p.type === (active as PropertyType));
  }, [active]);

  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">02 · RENT PORTFOLIO</div>
          </RevealItem>
          <RevealItem>
            <div className="mt-4 flex items-end justify-between gap-6 flex-wrap">
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em]">
                Property for Rent
              </h1>
              <div className="h-px flex-1 bg-gold min-w-[80px] mb-4" />
              <span className="text-xs tracking-[0.32em] text-slate-muted mb-2">
                {list.length} · LIVE
              </span>
            </div>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-2xl text-slate-muted">
              Monthly rent par flats & shops — immediate move-in options. Deposit & terms WhatsApp
              par confirm karo.
            </p>
          </RevealItem>
        </Reveal>
      </Section>
      <Section className="py-8">
        <div className="flex flex-wrap gap-2">
          {RENT_FILTERS.map((f) => (
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
        emptyNote="Is filter me abhi koi rent listing nahi — WhatsApp par requirement bhejo."
      />
      <Faq page="rent" />
    </Layout>
  );
}
