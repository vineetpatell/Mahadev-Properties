// Curated media for the About page "Living Elevated" showcase.
//
// Each scene is a distinct, hand-picked luxury lifestyle frame served through
// the same Unsplash CDN builder the rest of the app uses (see property-media.ts).
// All URLs below were verified live (HTTP 200). Every scene pairs a *different*
// vehicle + bike combination so the horizontal walkthrough never repeats.
//
// NOTE: Unsplash photo IDs depict luxury vehicles / villas in general — a
// literal BMW or Ducati badge can't be guaranteed in-frame from a stock slug.
// The `featured` caption therefore carries the intended car + bike narrative.
// For a production real-estate site, swap these for the client's own villa /
// automotive photography to lock in exact brand matching and licensing.

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type LuxuryScene = {
  id: string;
  /** Overline shown above the title. */
  kicker: string;
  title: string;
  blurb: string;
  /** Short caption describing the vehicles featured in the scene. */
  featured: string;
  image: string;
};

/**
 * Five ultrawide luxury scenes for the walkthrough. Every scene pairs a
 * different combination of vehicle + bike, as requested:
 *   1. BMW M4 + Ducati Panigale V4
 *   2. Audi R8 + Kawasaki Ninja H2
 *   3. Porsche 911 + Kawasaki Z900
 *   4. Mercedes-AMG GT + BMW S1000RR
 *   5. Range Rover + Ducati Monster
 */
export const luxuryScenes: LuxuryScene[] = [
  {
    id: "scene-bmw-ducati",
    kicker: "01 · Arrive",
    title: "The Drive Up",
    blurb:
      "A tree-lined private drive opens onto a cantilevered glass villa — the kind of arrival that sets the tone for everything inside.",
    featured: "BMW M4 · Ducati Panigale V4",
    image: unsplash("photo-1503376780353-7e6692767b70"),
  },
  {
    id: "scene-audi-ninja",
    kicker: "02 · The Couple",
    title: "Made for Two",
    blurb:
      "An infinity terrace, warm dusk light, and room for the life you're building together — leisure designed into every corner.",
    featured: "Audi R8 · Kawasaki Ninja H2",
    image: unsplash("photo-1512917774080-9991f1c4c750"),
  },
  {
    id: "scene-porsche-z900",
    kicker: "03 · The Machine",
    title: "A Place for the Passion",
    blurb:
      "From the climate-smart garage to the detail bay, the home respects the machines you love as much as the people inside it.",
    featured: "Porsche 911 · Kawasaki Z900",
    image: unsplash("photo-1552519507-da3b142c6e3d"),
  },
  {
    id: "scene-amg-s1000",
    kicker: "04 · The Evening",
    title: "Golden Hour, On Repeat",
    blurb:
      "West-facing glazing turns the terrace into a private sunset lounge — the best seat in the house, every single evening.",
    featured: "Mercedes-AMG GT · BMW S1000RR",
    image: unsplash("photo-1558981806-ec527fa84c39"),
  },
  {
    id: "scene-rover-monster",
    kicker: "05 · The Lifestyle",
    title: "Beyond the Walls",
    blurb:
      "A residence is only as good as the life around it. Ours is wrapped in coastline, city lights, and open road.",
    featured: "Range Rover · Ducati Monster",
    image: unsplash("photo-1494976388531-d1058494cdd8"),
  },
];
