import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleFeed } from "@/components/site/article-feed";
import { PageHeader } from "@/components/site/headers";
import { SearchForm } from "@/components/site/search-form";
import { EmptyState } from "@/components/site/states";
import { ListSkeleton } from "@/components/ui/skeleton";
import type { News, Paginated } from "@/types/api";
import { publicApi } from "@/lib/api/public";
import { pageSeo } from "@/lib/seo";

type SearchParams = Promise<{ q?: string | string[] }>;

const readQuery = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value)?.trim() || "";

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const q = readQuery((await searchParams).q);
  // A results page has no content of its own, so it is followed but never
  // indexed; the canonical points at the bare search page, not at one query.
  return pageSeo({
    title: q ? `Results for “${q}”` : "Search",
    description: q
      ? `Stories matching “${q}” across our technology reporting, reviews and guides.`
      : "Search every story we have published — technology news, product reviews and buying guides, by keyword or topic.",
    path: "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const q = readQuery((await searchParams).q);

  let initial: Paginated<News> | undefined;
  if (q) {
    try {
      initial = await publicApi.listNews({ search: q, limit: 16, sort: "latest" }, { cache: "no-store" });
    } catch {
      initial = undefined;
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search"}
        description={q ? undefined : "Find reporting, reviews and guides across every topic we cover."}
        crumbs={[{ label: "Search" }]}
      >
        <SearchForm key={q} initial={q} />
      </PageHeader>

      <div className="container py-9">
        {q ? (
          <Suspense fallback={<ListSkeleton count={8} />}>
            <ArticleFeed
              key={q}
              params={{ search: q }}
              initial={initial}
              header={initial ? <p className="eyebrow">{initial.pagination.total} matching stories</p> : undefined}
              emptyTitle="No matches"
              emptyMessage={`Nothing we've published matches “${q}”. Try a broader term.`}
            />
          </Suspense>
        ) : (
          <EmptyState title="What are you looking for?" message="Type a topic, product, company or person above." />
        )}
      </div>
    </>
  );
}
