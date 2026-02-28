import SubscribeForm from "@/components/SubscribeForm";

const feeds = [
  {
    label: "All Posts",
    description: "Every approved post from all organisations — news, press releases and events.",
    url: "/api/rss",
  },
  {
    label: "Charity Organisations",
    description: "Posts submitted by registered charities and non-profit organisations.",
    url: "/api/rss?org=charity",
  },
  {
    label: "Business Organisations",
    description: "Posts submitted by commercial businesses operating in the canine industry.",
    url: "/api/rss?org=business",
  },
];

export default async function RssInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmed?: string; unsubscribed?: string }>;
}) {
  const { confirmed, unsubscribed } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bbnm.ie";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ fontSize: "2rem" }}>📡</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            RSS Feeds
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>
          Stay up to date by subscribing to our RSS feeds
        </p>
      </div>

      {confirmed === "1" && (
        <div
          className="rounded-lg px-4 py-3 mb-6 text-sm font-medium"
          style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" }}
        >
          Your subscription is confirmed! You&apos;ll receive email alerts when new posts are published.
        </div>
      )}

      {unsubscribed === "1" && (
        <div
          className="rounded-lg px-4 py-3 mb-6 text-sm font-medium"
          style={{ background: "#fef9f0", color: "#92400e", border: "1px solid #fde68a" }}
        >
          You&apos;ve been unsubscribed and won&apos;t receive any more email alerts.
        </div>
      )}

      {/* What is RSS? */}
      <div
        className="rounded-xl p-5 mb-8 border-l-4"
        style={{ background: "#f0f4ff", borderColor: "var(--navy)" }}
      >
        <h2 className="font-bold text-lg mb-2" style={{ color: "var(--navy)" }}>
          What is RSS?
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          RSS (Really Simple Syndication) is a standard web feed format that lets you subscribe to
          content from websites and receive updates automatically in your preferred RSS reader or
          news aggregator. Journalists, editors and media outlets use RSS feeds to monitor sources
          and stay informed without having to visit individual sites. Simply copy the feed URL below
          into your RSS reader application.
        </p>
      </div>

      {/* Email subscription */}
      <div className="mb-8">
        <SubscribeForm />
      </div>

      {/* Feed cards */}
      <div className="flex flex-col gap-5">
        {feeds.map((feed) => {
          const fullUrl = `${baseUrl}${feed.url}`;
          return (
            <div
              key={feed.url}
              className="card p-5 flex flex-col gap-3"
            >
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: "var(--navy)" }}>
                  {feed.label}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {feed.description}
                </p>
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-4 py-2 border"
                style={{ background: "var(--cream)", borderColor: "var(--border)" }}
              >
                <code
                  className="text-sm flex-1 truncate select-all"
                  style={{ color: "var(--navy)", fontFamily: "monospace" }}
                >
                  {fullUrl}
                </code>
              </div>
              <div>
                <a
                  href={feed.url}
                  className="btn-primary text-sm"
                  style={{ display: "inline-block" }}
                >
                  Subscribe &rarr;
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Journalists note */}
      <div
        className="mt-10 rounded-xl p-5 border"
        style={{ background: "#fff", borderColor: "var(--border)" }}
      >
        <h2 className="font-bold text-base mb-2" style={{ color: "var(--navy)" }}>
          For Journalists & Media Outlets
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Our RSS feeds provide immediate access to press releases, news stories and event
          announcements from charities and businesses across the canine industry. Use the
          filtered feeds to monitor specific types of organisations, or subscribe to the all-posts
          feed for comprehensive coverage. Each item in the feed includes the title, summary,
          publication date and a direct link to the full post.
        </p>
      </div>
    </div>
  );
}
