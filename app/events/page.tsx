import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved", type: "event" },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ fontSize: "2rem" }}>📅</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            Events
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>
          Upcoming events in the canine world
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col gap-0">
              {post.eventDate && (
                <div
                  className="rounded-t-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold"
                  style={{ background: "var(--gold)", color: "#fff" }}
                >
                  <span>📅</span>
                  <span>{formatDate(post.eventDate)}</span>
                </div>
              )}
              <div className={post.eventDate ? "rounded-b-xl overflow-hidden" : ""}>
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div style={{ fontSize: "4rem" }} className="mb-4">🐶</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            No events yet
          </h2>
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Be the first to share an upcoming canine event.
          </p>
          <Link href="/submit" className="btn-primary">
            Submit an Event
          </Link>
        </div>
      )}
    </div>
  );
}
