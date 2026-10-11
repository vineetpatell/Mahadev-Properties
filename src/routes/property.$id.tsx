import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, X, Home, Ruler, Sofa, Car, Compass, ShieldCheck } from "lucide-react";
import { Layout, Section } from "../components/Layout";
import { findProperty } from "../lib/properties";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal, RevealItem } from "../components/Reveal";
import { Faq } from "../components/Faq";
import { getPropertyFaqs } from "../lib/faqs";
import { OG_IMAGE, SITE_URL, abs } from "../lib/seo";

export const Route = createFileRoute("/property/$id")({
  head: ({ params }) => {
    const p = findProperty(params.id);
    const title = `${p.name} ${p.price} in ${p.location} | Mahadev Property`;
    const description = `${p.configuration}, ${p.carpetArea} carpet, ${p.facing}, ${p.status} — ${p.address}. Book private site visit on WhatsApp +91 91523 83586.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: abs(`/property/${p.id}`) },
        { property: "og:image", content: p.image || OG_IMAGE },
        { property: "og:image:alt", content: `${p.name} — ${p.location}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: p.image || OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: abs(`/property/${p.id}`) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: p.name,
            url: abs(`/property/${p.id}`),
            image: [p.image, ...p.gallery].filter(Boolean),
            description: `${p.configuration}, ${p.carpetArea} carpet area in ${p.location}. ${p.tagline}.`,
            address: {
              "@type": "PostalAddress",
              streetAddress: p.address,
              addressLocality: "Mumbai",
              postalCode: "400064",
              addressCountry: "IN",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              {
                "@type": "ListItem",
                position: 2,
                name: p.listing === "rent" ? "Rent" : "Sale",
                item: abs(p.listing === "rent" ? "/rent" : "/sale"),
              },
              { "@type": "ListItem", position: 3, name: p.name, item: abs(`/property/${p.id}`) },
            ],
          }),
        },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { id } = Route.useParams();
  const p = findProperty(id);
  const [tour, setTour] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "" });
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/919152383586?text=${encodeURIComponent(
    `Hi Mahadev Property, I'm interested in ${p.name} (${p.type}) — ${p.price}. Please share details.`,
  )}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", date: "" });
  };

  const specs = [
    { icon: Home, k: "Configuration", v: p.configuration },
    { icon: Ruler, k: "Carpet Area", v: p.carpetArea },
    { icon: Sofa, k: "Furnishing", v: p.furnished },
    { icon: Car, k: "Parking", v: p.parking },
    { icon: Compass, k: "Facing", v: p.facing },
    { icon: ShieldCheck, k: "Vastu", v: p.vastu },
  ];

  return (
    <Layout>
      <Section className="pt-12 pb-6">
        <Link
          to={p.listing === "rent" ? "/rent" : "/sale"}
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-slate-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> BACK TO {p.listing === "rent" ? "RENT" : "SALE"}
        </Link>
      </Section>

      <Section className="pb-24">
        <Reveal className="grid lg:grid-cols-12 gap-10">
          <RevealItem className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-gold/20">
              <img
                src={p.image}
                alt={`${p.name} — ${p.configuration} in ${p.location}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 text-[10px] tracking-[0.32em] gold-border bg-obsidian/70 px-3 py-1 text-gold">
                BLUEPRINT · {p.id.toUpperCase()}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {p.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setTour(g)}
                  className="group relative aspect-[4/3] overflow-hidden border border-gold/15 hover:border-gold transition-colors"
                >
                  <img
                    src={g}
                    alt={`${p.name} interior ${i + 1} — ${p.location}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/10 transition-colors" />
                  <div className="absolute bottom-2 left-2 text-[9px] tracking-[0.28em] text-gold">
                    TOUR · 0{i + 1}
                  </div>
                </button>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="lg:col-span-5">
            <div className="text-[10px] tracking-[0.4em] text-gold">
              {p.type.toUpperCase()} · {p.location.toUpperCase()}
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-[-0.02em]">{p.name}</h1>
            <div className="mt-4 text-2xl text-gradient-gold font-bold">{p.price}</div>
            <div className="mt-2 text-sm text-slate-muted flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {p.address}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px bg-gold/15 border border-gold/20">
              {specs.map((s) => (
                <div key={s.k} className="bg-obsidian p-5">
                  <s.icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
                  <div className="mt-3 text-[10px] tracking-[0.28em] text-slate-muted">
                    {s.k.toUpperCase()}
                  </div>
                  <div className="mt-1 text-sm font-medium">{s.v}</div>
                </div>
              ))}
            </div>

            <form
              onSubmit={submit}
              className="mt-8 relative overflow-hidden border border-gold/30 bg-obsidian/60 backdrop-blur-xl p-8 glow-gold"
            >
              <div className="text-[10px] tracking-[0.4em] text-gold">PRIVATE VIEWING</div>
              <h3 className="mt-3 text-2xl font-bold">Book Private Site Visit</h3>
              <div className="mt-6 space-y-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-sm"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-sm"
                />
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent border-b border-gold/20 focus:border-gold outline-none py-2 text-sm text-foreground [color-scheme:light]"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton variant="solid" type="submit">
                  {submitted ? "Requested ✓" : "Confirm Visit"}
                </MagneticButton>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MagneticButton>WhatsApp Enquiry</MagneticButton>
                </a>
              </div>
            </form>
          </RevealItem>
        </Reveal>
      </Section>

      <Faq page="property" items={getPropertyFaqs(p.name, p.price)} heading={`${p.name} — FAQs.`} />

      <AnimatePresence>
        {tour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-lg flex items-center justify-center p-6"
            onClick={() => setTour(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full border border-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={tour}
                alt={`${p.name} virtual tour — ${p.location}`}
                className="w-full h-auto"
              />
              <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 bg-gradient-to-b from-obsidian to-transparent">
                <div className="text-[10px] tracking-[0.4em] text-gold">VIRTUAL TOUR · MOCKUP</div>
                <button onClick={() => setTour(null)} className="text-gold hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 text-xs tracking-[0.28em] text-foreground/70">
                USE MOUSE TO PAN · MOCKUP INTERFACE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
