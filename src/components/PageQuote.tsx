import { useRouterState } from "@tanstack/react-router";

const quotes: Record<string, string> = {
  "/": "A home is more than a place. It is the life you choose to build within it.",
  "/sale": "The right address brings your everyday life closer to your aspirations.",
  "/rent": "A rented space can still feel like it was chosen just for you.",
  "/about": "Great spaces begin with a clear vision. Lasting relationships begin with trust.",
  "/services": "A thoughtful decision today creates room for a better tomorrow.",
  "/contact": "Every meaningful move begins with a conversation.",
};

export function PageQuote() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <section className="quote-band py-16 md:py-24 border-y border-border bg-secondary/60">
      <figure className="mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto mb-7 h-px w-12 bg-gold" />
        <blockquote className="text-2xl md:text-4xl font-medium leading-snug">
          “
          {quotes[path] ??
            "The finest spaces are measured not only in square feet, but in the moments they make possible."}
          ”
        </blockquote>
        <figcaption className="mt-8 text-xs text-gold">THE MAHADEV PERSPECTIVE</figcaption>
      </figure>
    </section>
  );
}
