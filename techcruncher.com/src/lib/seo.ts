import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * One place that builds a page's search and social tags.
 *
 * Every page needs the same four things — a title, a description written for a
 * results page rather than for the layout, a canonical URL so query strings
 * like `?theme=dark` or `?sub=android` cannot split its ranking, and an Open
 * Graph card so a shared link is not a bare URL. Writing that inline on every
 * route is how pages drift apart, so they all call this instead.
 */

export const OG_IMAGE = "/og-image.png";

interface PageSeoInput {
  title: string;
  description: string;
  /** Site-relative, e.g. "/latest". Omit for the homepage. */
  path?: string;
  /** Overrides the default share card, e.g. an article's lead image. */
  image?: string | null;
  keywords?: string[];
  /** Listings and utility pages that should not be indexed. */
  noIndex?: boolean;
  type?: "website" | "article";
}

export function pageSeo({ title, description, path = "", image, keywords, noIndex, type = "website" }: PageSeoInput): Metadata {
  const url = `${site.url}${path}`;
  const card = image || OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      siteName: site.name,
      // The template only applies to `title`; Open Graph needs the full string.
      title: `${title} — ${site.name}`,
      description,
      images: [{ url: card, width: 1200, height: 630, alt: `${title} — ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [card],
    },
  };
}

/** Breadcrumb JSON-LD; Google shows the trail in place of a bare URL. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${site.url}${step.path}`,
    })),
  };
}

/** The publisher behind every article, stated once on the homepage. */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png`, width: 512, height: 512 },
    description: site.description,
    sameAs: site.socials.map((social) => social.href),
  };
}

/** A ranked list of stories, so a listing page can be read as a list. */
export function itemListLd(items: { title: string; path: string }[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}${item.path}`,
      name: item.title,
    })),
  };
}
