import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved", type: "news" },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ fontSize: "2rem" }}>📰</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            News
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>
          The latest news from the canine industry
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div style={{ fontSize: "4rem" }} className="mb-4">🐶</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            No news stories yet
          </h2>
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Be the first to share a news story with the canine community.
          </p>
          <Link href="/submit" className="btn-primary">
            Submit Your Story
          </Link>
        </div>
      )}
    </div>
  );
}
