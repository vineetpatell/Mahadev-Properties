import type { FaqEntry } from "./seo";

export type FaqPageKey = "home" | "sale" | "rent" | "property" | "about" | "services" | "contact";

export const faqsByPage: Record<FaqPageKey, FaqEntry[]> = {
  home: [
    {
      q: "Malad West me Mahadev Property ke paas kis range ke ghar hain?",
      a: "Rs 38.5 L se 1RK studio se lekar Rs 6.80 Cr tak penthouse — 1RK, 1BHK, 2BHK, 3BHK, villas, commercial aur plots. /sale par kharidne wali aur /rent par kiraye wali listings dekho.",
    },
    {
      q: "Site visit kaise book karun?",
      a: "Kisi bhi property page par date ke saath Private Site Visit form bharo, ya +91 91523 83586 par WhatsApp karo — team slot confirm kar degi.",
    },
    {
      q: "Kya home loan me madad milti hai?",
      a: "Haan, Services page ke EMI calculator se monthly estimate nikalo, phir team bank options aur paperwork me guide karti hai.",
    },
    {
      q: "Kya properties RERA-aligned aur Vastu compliant hain?",
      a: "Haan — har listing me configuration, carpet area, facing aur Vastu status clearly mentioned hai; titles aur documents visit par verify kara dete hain.",
    },
    {
      q: "Resale property bhi milti hai?",
      a: "Haan, portfolio me Resale tag wali listings hain (jaise Near Malad Station 1BHK). Shortlist banao aur WhatsApp par latest resale options maango.",
    },
  ],
  sale: [
    {
      q: "Sale page par filter kaise kaam karta hai?",
      a: "Top par 1RK, 1BHK, 2BHK, 3BHK, Commercial, Flats for Sale, Villas/Houses, Plots me se chuno — grid turant wahi sale listings dikhata hai.",
    },
    {
      q: "Ready to Move, Under Construction aur Resale ka matlab?",
      a: "Ready to Move turant possession, Under Construction me staged payment aur future possession, Resale me existing owner se transfer — status har card par badge me hai.",
    },
    {
      q: "Carpet area aur configuration clear hain?",
      a: "Haan — har card par price, location, type aur tagline; detail page par configuration, carpet area, furnishing, parking, facing aur Vastu ki full spec table hai.",
    },
    {
      q: "Parking har property me included hai?",
      a: "Har detail page par Parking spec hai — 1 Two-Wheeler se lekar 3 Covered tak. Visit se pehle WhatsApp par confirm kar lo.",
    },
    {
      q: "Price ke upar extra charges lagte hain?",
      a: "Stamp duty, registration aur society charges property-wise alag hote hain. Enquiry par team all-inclusive estimate banakar deti hai — koi hidden charge nahi.",
    },
  ],
  rent: [
    {
      q: "Rent par kaunsi properties available hain?",
      a: "Furnished 1BHK, spacious 2BHK aur commercial shops — monthly rent par. /rent page par live rent listings dekho.",
    },
    {
      q: "Rent agreement aur deposit kaise hota hai?",
      a: "Standard 11-month agreement + refundable deposit. WhatsApp par property select karo, team agreement aur police verification me guide karti hai.",
    },
    {
      q: "Kya rent par negotiation possible hai?",
      a: "Tenure aur furnishing par depend karta hai. Enquiry bhejo — team owner se best monthly terms negotiate karke batati hai.",
    },
    {
      q: "Rent listings furnished hain ya unfurnished?",
      a: "Har detail page ki spec table me Furnishing row dekho (Fully / Semi / Bare Shell). Photos me actual condition dikhti hai.",
    },
    {
      q: "Rent par site visit kaise book karun?",
      a: "Detail page par Private Site Visit form bharo ya WhatsApp karo — same-day visit slots mil jate hain.",
    },
  ],
  property: [
    {
      q: "PLACEHOLDER_NAME ki site visit kaise book karun?",
      a: "Isi page par Private Site Visit form me naam, phone aur date bharo, ya WhatsApp Enquiry dabao — slot confirm ho jayega.",
    },
    {
      q: "PLACEHOLDER_NAME ke documents kaise verify karun?",
      a: "Title, carpet-area proof aur society papers visit par dikhaye jate hain. Pehle WhatsApp par document checklist maang sakte ho.",
    },
    {
      q: "Kya PLACEHOLDER_NAME ki price negotiable hai?",
      a: "Status (Ready to Move / Resale / Newly Launched) par depend karta hai. Enquiry bhejo — team owner se best terms negotiate karke batati hai.",
    },
    {
      q: "PLACEHOLDER_NAME furnished hai ya semi-furnished?",
      a: "Detail page ki spec table me Furnishing row dekho (Semi / Fully / Bare Shell). Gallery photos me actual condition dikhti hai.",
    },
    {
      q: "PLACEHOLDER_NAME me parking aur facing kya hai?",
      a: "Spec table me Parking aur Facing rows dekho — har property ka covered/open parking aur direction clearly mentioned hai.",
    },
  ],
  about: [
    {
      q: "Mahadev Property ka experience kitna hai?",
      a: "48 projects, 1,200+ families aur businesses served — Malad West, Mumbai me trusted real-estate aur development studio.",
    },
    {
      q: "Kaun se areas me deal karte ho?",
      a: "Core focus Malad West (Sundar Nagar, Marve Road, Link Road, Station Road) hai, saath me aas-paas ke Mumbai corridors me investment options.",
    },
    {
      q: "Studio se kaise mil sakte hain?",
      a: "Office: P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064. Pehle +91 91523 83586 par call/WhatsApp karke slot le lo.",
    },
    {
      q: "Working hours kya hain?",
      a: "Site visits aur briefings week-round slots me hoti hain. Contact page ka form bharo ya WhatsApp karo — same-day response milta hai.",
    },
    {
      q: "Kharidne ke alawa aur kya help milti hai?",
      a: "Selling, investment consulting, project marketing aur property management — 7 verticals Services page par listed hain.",
    },
  ],
  services: [
    {
      q: "7 services me exactly kya-kya included hai?",
      a: "Residential development, commercial development, plot/land sales, buying-selling concierge, investment consulting, project marketing aur property management.",
    },
    {
      q: "Services ki fees kaise decide hoti hai?",
      a: "Deal size aur scope par — pehli briefing free hai. Contact form me service select karo, team written estimate bhejti hai.",
    },
    {
      q: "EMI calculator ka figure final hai?",
      a: "Nahi, ye estimate hai (principal x rate x tenure). Bank ka actual offer rate aur charges par depend karega — team exact comparison me help karti hai.",
    },
    {
      q: "Property management me tenant bhi milta hai?",
      a: "Haan — tenant curation, compliance aur upkeep fully outsourced: listing, verification, agreement aur maintenance ek hi place par.",
    },
    {
      q: "Investment consulting me kya milta hai?",
      a: "Yield-mapped strategy: budget, horizon aur risk ke hisaab se Malad West options ki shortlist, site-visit plan aur exit guidance.",
    },
  ],
  contact: [
    {
      q: "Form bharne ke baad kitni der me reply aayega?",
      a: "Same-day response ka aim hai. Urgent ho to +91 91523 83586 par direct WhatsApp karo — wahan sabse tez reply milta hai.",
    },
    {
      q: "WhatsApp par kya bhejna chahiye?",
      a: "Naam, budget, preferred type (1BHK/2BHK/commercial) aur visit date — team turant matching shortlist bhej deti hai.",
    },
    {
      q: "Office ka address kya hai?",
      a: "P1, Deep Sadan Bldg, Sundar Nagar, Malad West, Mumbai 400064. Aane se pehle call karke slot confirm kar lo.",
    },
    {
      q: "Kya pehli consultation free hai?",
      a: "Haan — requirement briefing free hai. Uske baad shortlist, site visits aur paperwork plan banaya jata hai.",
    },
    {
      q: "Email par documents bhej sakte hain?",
      a: "Haan — mahadevproperties@gmail.com par requirement ya property papers bhejo, team review karke callback karti hai.",
    },
  ],
};

export const getPropertyFaqs = (propertyName: string, price: string): FaqEntry[] =>
  faqsByPage.property
    .map(
      (f) =>
        ({
          q: f.q.replaceAll("PLACEHOLDER_NAME", propertyName),
          a: f.a.replaceAll("PLACEHOLDER_NAME", propertyName),
        }) as FaqEntry,
    )
    .map((f) =>
      f.a.startsWith("Isi page par")
        ? {
            ...f,
            a: `${price} wali ${propertyName} ke liye ${f.a.charAt(0).toLowerCase()}${f.a.slice(1)}`,
          }
        : f,
    );
