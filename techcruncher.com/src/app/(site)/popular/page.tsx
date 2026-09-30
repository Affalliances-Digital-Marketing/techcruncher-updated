import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/site/headers";
import { popularParams } from "@/components/site/feeds/params";
import { PopularBoard, PopularControls } from "@/components/site/feeds/popular-board";
import { loadNews, topicOptions } from "@/components/site/feeds/server";
import { TopicFilter } from "@/components/site/feeds/topic-filter";
import { ListSkeleton } from "@/components/ui/skeleton";
import { getCategories, topicsByVolume } from "@/lib/api/server-data";
import { pageSeo } from "@/lib/seo";

const description = "Ranked purely by how many people actually read each story.";

export const metadata: Metadata = pageSeo({
  title: "Most read technology stories",
  description:
    "Our best-read reporting, ranked purely by how many people actually read it — today, this week and all time.",
  path: "/popular",
  keywords: ["most read tech stories", "popular technology news", "best tech articles"],
});

export default async function PopularPage() {
  const [initial, categories] = await Promise.all([loadNews(popularParams("")), getCategories()]);

  return (
    <>
      <PageHeader eyebrow="Reader favourites" title="Most read" description={description}>
        <div className="mt-8 space-y-4">
          <Suspense fallback={<div className="h-5" />}>
            <PopularControls initial={initial} />
          </Suspense>
          <TopicFilter options={topicOptions(topicsByVolume(categories))} allLabel="All topics" className="" />
        </div>
      </PageHeader>

      <div className="container py-9">
        <Suspense fallback={<ListSkeleton count={4} />}>
          <PopularBoard initial={initial} />
        </Suspense>
      </div>
    </>
  );
}
