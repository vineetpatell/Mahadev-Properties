// Curated media for the Home cinematic hero — five distinct, Mumbai-inspired
// luxury residential scenes. Each frame pairs a different architectural style,
// setting, vehicle and "couple" narrative so the crossfade never repeats.
//
// IMPORTANT — these are ILLUSTRATIVE SHOWCASE scenes, not verified listings:
// no prices, addresses, availability or business credentials are implied.
// Unsplash photo IDs depict luxury homes / cars / bikes in general; a literal
// BMW / Audi / Ducati badge can't be guaranteed in-frame from a stock slug, so
// the `featured` caption carries the intended car + bike narrative. For a
// production real-estate site, swap these for the client's own photography to
// lock in exact brand matching, licensing and real properties.

const unsplash = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type HeroScene = {
  id: string;
  /** Full-bleed background image (ultra-wide luxury residence). */
  image: string;
  /** Descriptive caption naming the car + couple featured in the scene. */
  featured: string;
};

/**
 * Five scenes, one per hero beat. Architecture, setting, vehicle and couple
 * are all deliberately different:
 *   1. Modern villa · BMW SUV · a couple
 *   2. Contemporary estate · Audi sedan · a different couple
 *   3. Designer villa · Ducati motorcycle · a different couple
 *   4. Private residence · Kawasaki Ninja H2 · a different couple
 *   5. Sea-facing villa · a different car & couple
 */
export const heroScenes: HeroScene[] = [
  {
    id: "hero-modern-villa",
    image: unsplash("photo-1613490493576-7fde63acd811"),
    featured: "Modern Mumbai villa with a BMW SUV and a couple arriving home",
  },
  {
    id: "hero-contemporary-estate",
    image: unsplash("photo-1600585154340-be6161a56a0c"),
    featured: "Contemporary estate with an Audi sedan and a different couple on the drive",
  },
  {
    id: "hero-designer-villa",
    image: unsplash("photo-1512917774080-9991f1c4c750"),
    featured: "Designer villa with a Ducati motorcycle and a different couple at dusk",
  },
  {
    id: "hero-private-residence",
    image: unsplash("photo-1502672260266-1c1ef2d93688"),
    featured: "Private gated residence with a Kawasaki Ninja H2 and a different couple",
  },
  {
    id: "hero-sea-facing-villa",
    image: unsplash("photo-1449844908441-8829872d2607"),
    featured: "Sea-facing luxury villa with a different car and couple at the coast",
  },
];
