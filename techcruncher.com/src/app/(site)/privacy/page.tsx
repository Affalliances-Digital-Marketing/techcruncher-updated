import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/headers";
import { site } from "@/config/site";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Privacy policy",
  description: `What ${site.name} collects when you read, subscribe or write to us, how long it is kept, who it is shared with, and how to have it removed.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" crumbs={[{ label: "Legal" }, { label: "Privacy policy" }]} />
      <div className="container py-14">
        <div className="article-body">
          <p>
            This policy explains what information {site.name} collects when you read, subscribe or write to us, and how it is
            used.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Newsletter:</strong> your email address, the page you signed up from, and basic technical details (IP
              address and browser) recorded at signup.
            </li>
            <li>
              <strong>Contact form:</strong> the name, email address and message you send, so we can reply.
            </li>
            <li>
              <strong>Reading activity:</strong> anonymous counts of views, likes and shares per story. We do not tie these to
              you.
            </li>
          </ul>
          <h2>Stored in your browser</h2>
          <p>
            Your reading list, liked stories, recent searches, theme and text-size preferences are kept in your browser&apos;s
            local storage. They never leave your device, and clearing site data removes them.
          </p>
          <h2>Advertising</h2>
          <p>
            Some pages show advertisements. Ad partners may use their own cookies under their own policies. Sponsored placements
            are always labelled.
          </p>
          <h2>Your choices</h2>
          <p>
            You can unsubscribe from the newsletter at any time on the <Link href="/newsletter">newsletter page</Link>. To ask
            what we hold about you or to have it deleted, <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
