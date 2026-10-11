// Single source of truth for SEO URLs.
// TODO: live domain final hote hi yahi ek jagah update karo —
// sitemap.xml, robots.txt aur saari canonical/OG URLs isi se banti hain.
export const SITE_URL = "https://mahadevproperty.in";

export const SITE_NAME = "Mahadev Property";

export const OG_IMAGE = `${SITE_URL}/og-cover.png`;

export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const BUSINESS = {
  name: "Mahadev Property",
  phone: "+91 91523 83586",
  email: "mahadevproperties@gmail.com",
  address: "P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064",
  locality: "Malad West",
  city: "Mumbai",
  postalCode: "400064",
  lat: 19.1849,
  lng: 72.8377,
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: BUSINESS.name,
  url: SITE_URL,
  image: OG_IMAGE,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "P1, Deep Sadan Bldg, Sundar Nagar, Malad West",
    addressLocality: BUSINESS.city,
    postalCode: BUSINESS.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.lat,
    longitude: BUSINESS.lng,
  },
  areaServed: ["Malad West", "Mumbai"],
  priceRange: "₹₹₹",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export type FaqEntry = { q: string; a: string };

export const faqJsonLd = (faqs: FaqEntry[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
