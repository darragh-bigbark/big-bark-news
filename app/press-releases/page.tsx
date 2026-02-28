import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function PressReleasesPage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved", type: "press_release" },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ fontSize: "2rem" }}>📣</span>
          <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
            Press Releases
          </h1>
        </div>
        <p style={{ color: "var(--muted)" }}>
          Official announcements from canine industry organisations
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
            No press releases yet
          </h2>
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Be the first to publish an official announcement.
          </p>
          <Link href="/submit" className="btn-primary">
            Submit a Press Release
          </Link>
        </div>
      )}
    </div>
  );
}
