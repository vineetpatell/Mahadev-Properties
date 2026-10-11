import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { OG_IMAGE, SITE_URL, organizationJsonLd, websiteJsonLd } from "../lib/seo";
import { Layout } from "../components/Layout";
import { MotionConfig } from "framer-motion";
import { MotionDirector } from "../components/MotionDirector";
import { ShortlistProvider } from "../components/Shortlist";

function NotFoundComponent() {
  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-[10px] tracking-[0.4em] text-gold">ERROR · 404</div>
          <h1 className="mt-6 text-6xl font-bold tracking-tight">Off blueprint.</h1>
          <p className="mt-4 text-sm text-slate-muted">
            The page you requested is not in our portfolio.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex gold-border px-6 py-3 text-xs tracking-[0.22em] text-gold hover:bg-gold/10"
          >
            RETURN HOME
          </a>
        </div>
      </div>
    </Layout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">This page didn't load</h1>
          <p className="mt-2 text-sm text-slate-muted">Something went wrong on our end.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="gold-border px-5 py-2.5 text-xs tracking-[0.22em] text-gold"
            >
              TRY AGAIN
            </button>
            <a
              href="/"
              className="bg-gold text-primary-foreground px-5 py-2.5 text-xs tracking-[0.22em]"
            >
              GO HOME
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mahadev Property — Real Estate & Development, Malad West" },
      {
        name: "description",
        content:
          "Mahadev Property: trusted real estate & development studio in Malad West, Mumbai. Residential, commercial, and investment opportunities with transparent guidance.",
      },
      { name: "author", content: "Mahadev Property" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0B0E1A" },
      { property: "og:site_name", content: "Mahadev Property" },
      { property: "og:title", content: "Mahadev Property — Real Estate & Development" },
      {
        property: "og:description",
        content: "Trusted real estate & development studio in Malad West, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Mahadev Property — Malad West, Mumbai" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mahadev Property — Real Estate & Development" },
      {
        name: "twitter:description",
        content: "Trusted real estate & development studio in Malad West, Mumbai.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <ShortlistProvider>
          <MotionDirector />
          <Outlet />
        </ShortlistProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
