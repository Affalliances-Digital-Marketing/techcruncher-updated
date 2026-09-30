import type { Metadata } from "next";
import { PageHeader } from "@/components/site/headers";
import { ReadingList } from "@/components/site/reading-list";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Reading list",
  description: "The stories you saved, kept in this browser alone.",
  path: "/bookmarks",
  // Per-reader and empty for a crawler, so it is served but not indexed.
  noIndex: true,
});

export default function BookmarksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Reading list"
        description="Stories you saved, kept privately in this browser and never sent to us."
      />
      <div className="container py-9">
        <ReadingList />
      </div>
    </>
  );
}
