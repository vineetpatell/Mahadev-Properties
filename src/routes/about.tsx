import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Award, Users, Building, Sparkles, ArrowUpRight } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { Reveal, RevealItem } from "../components/Reveal";
import { Faq } from "../components/Faq";
import { ArchitecturalShowcase } from "../components/ArchitecturalShowcase";
import { properties } from "../lib/properties";
import { OG_IMAGE, abs } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mahadev Property — Trusted Studio in Malad West Mumbai" },
      {
        name: "description",
        content:
          "Trusted Malad West studio: 48 projects, 1,200+ families. Residential, commercial & land with integrity and transparency.",
      },
      {
        property: "og:title",
        content: "About Mahadev Property — Trusted Studio in Malad West Mumbai",
      },
      {
        property: "og:description",
        content: "Trusted Malad West studio: 48 projects, 1,200+ families served.",
      },
      { property: "og:url", content: abs("/about") },
      { property: "og:image", content: OG_IMAGE },
      {
        name: "twitter:title",
        content: "About Mahadev Property — Trusted Studio in Malad West Mumbai",
      },
      {
        name: "twitter:description",
        content: "Trusted Malad West studio: 48 projects, 1,200+ families served.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: abs("/about") }],
  }),
  component: AboutPage,
});

const MOMENT_CAPTIONS = [
  "Keys handed over · Malad West",
  "Sunday viewings on Marve Road",
  "Balcony light, every day",
  "First evening in a new home",
  "Move-in ready · Sundar Nagar",
  "Family weekends on Link Road",
  "Station-side value buys",
  "Garden gate mornings",
];

const moments = [
  properties[2],
  properties[3],
  properties[6],
  properties[8],
  properties[11],
  properties[12],
  properties[9],
  properties[10],
]
  .filter((p) => p !== undefined)
  .map((property, i) => ({ property, caption: MOMENT_CAPTIONS[i] ?? "" }));

function AboutPage() {
  return (
    <Layout>
      <Section className="pt-16 pb-8">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">STUDIO · MALAD WEST</div>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-0.03em]">
              About the studio.
            </h1>
          </RevealItem>
        </Reveal>
      </Section>

      <Section className="pb-24">
        <Reveal className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4">
          <RevealItem className="md:col-span-4 md:row-span-2 border border-gold/20 bg-obsidian p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="text-[10px] tracking-[0.4em] text-gold">01 · NARRATIVE</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                A trusted studio for property, development & investment.
              </h2>
            </div>
            <p className="mt-8 text-sm md:text-base text-slate-muted leading-relaxed max-w-3xl">
              Mahadev Property is a trusted real estate and property development company committed
              to delivering quality residential, commercial, and land development solutions. We
              specialize in property sales, purchases, investments, and development, helping clients
              find the right opportunities with confidence and transparency. Our focus is on
              developing and promoting well-planned projects that offer long-term value, modern
              infrastructure, and excellent connectivity. Whether it's residential plots,
              apartments, villas, commercial spaces, or investment properties, we strive to provide
              reliable and customer-focused real estate services. At Mahadev Property, we believe in
              integrity, professionalism, and customer satisfaction. Our experienced team works
              closely with clients to understand their needs and provide personalized guidance
              throughout the buying, selling, or investment process.
            </p>
            <div className="absolute -bottom-16 -right-16 h-64 w-64 border border-gold/20 rotate-45" />
          </RevealItem>

          <RevealItem className="md:col-span-2 border border-gold/20 bg-gradient-to-br from-obsidian to-background p-8 relative overflow-hidden group">
            <Target className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-[10px] tracking-[0.4em] text-gold">OUR MISSION</div>
            <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
              To build trust through quality developments, transparent business practices, and
              exceptional customer service while creating valuable real estate opportunities for
              individuals and businesses.
            </p>
            <div className="mt-6 h-px w-8 bg-gold group-hover:w-20 transition-all duration-500" />
          </RevealItem>

          <RevealItem className="md:col-span-2 border border-gold/20 bg-gradient-to-br from-obsidian to-background p-8 relative overflow-hidden group">
            <Eye className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-[10px] tracking-[0.4em] text-gold">OUR VISION</div>
            <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
              To become a leading and trusted name in the real estate industry by delivering
              sustainable developments and helping clients achieve their property ownership and
              investment goals.
            </p>
            <div className="mt-6 h-px w-8 bg-gold group-hover:w-20 transition-all duration-500" />
          </RevealItem>

          <RevealItem className="md:col-span-2 border border-gold/20 bg-obsidian p-8">
            <Award className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-4xl font-black">480+</div>
            <div className="text-[10px] tracking-[0.32em] text-slate-muted mt-1">
              HAPPY FAMILIES SERVED
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-2 border border-gold/20 bg-obsidian p-8">
            <Users className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-4xl font-black">1,200+</div>
            <div className="text-[10px] tracking-[0.32em] text-slate-muted mt-1">
              FAMILIES · BUSINESSES SERVED
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-2 border border-gold/20 bg-obsidian p-8">
            <Building className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <div className="mt-6 text-4xl font-black">48</div>
            <div className="text-[10px] tracking-[0.32em] text-slate-muted mt-1">
              PROJECTS · DELIVERED
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-6 border border-gold/20 bg-gradient-to-r from-obsidian via-background to-obsidian p-10 flex items-center gap-6">
            <Sparkles className="h-10 w-10 text-gold shrink-0" strokeWidth={1.2} />
            <div>
              <div className="text-[10px] tracking-[0.4em] text-gold">CORE PRINCIPLE</div>
              <div className="mt-2 text-xl md:text-2xl font-medium">
                Integrity · Professionalism · Customer Satisfaction — the three axes we build every
                project upon.
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </Section>

      <ArchitecturalShowcase />

      <Section className="py-24">
        <Reveal>
          <RevealItem>
            <div className="text-[10px] tracking-[0.4em] text-gold">03 · LIFE IN THE PORTFOLIO</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Homes, handovers and everyday moments.
            </h2>
          </RevealItem>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {moments.map(({ property, caption }) => (
              <Link
                key={property.id}
                to="/property/$id"
                params={{ id: property.id }}
                className="group relative aspect-[3/4] overflow-hidden border border-gold/20 hover:border-gold/50 transition-colors"
              >
                <img
                  src={property.gallery[1] ?? property.image}
                  alt={`${property.name} — ${property.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/15 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-[10px] tracking-[0.28em] text-gold">
                  {caption.toUpperCase()}
                </span>
                <span className="absolute top-3 right-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>
      <Faq page="about" />
    </Layout>
  );
}
