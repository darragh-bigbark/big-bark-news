import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "approved" },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
    take: 6,
  });

  return (
    <div>
      {/* Hero */}
      <section
        className="relative text-white py-24 px-4 overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&h=600&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,36,68,0.88) 0%, rgba(15,36,68,0.75) 100%)" }}
          />
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Big Bark{" "}
            <span style={{ color: "var(--gold)" }}>News & Media</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ opacity: 0.9 }}>
            The canine industry&apos;s trusted source for news, press releases, events, and
            stories from charities and businesses making a difference.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/submit" className="btn-primary text-base">
              Submit Your Story
            </Link>
            <Link
              href="/auth/register"
              className="btn-outline text-base"
              style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}
            >
              Register Your Organisation
            </Link>
          </div>
        </div>
      </section>

      {/* Category quick links */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              href: "/news",
              icon: "📰",
              label: "News",
              desc: "Breaking stories and industry updates",
              color: "#dbeafe",
              border: "#bfdbfe",
            },
            {
              href: "/press-releases",
              icon: "📣",
              label: "Press Releases",
              desc: "Official announcements from organisations",
              color: "#fef9c3",
              border: "#fde68a",
            },
            {
              href: "/events",
              icon: "📅",
              label: "Events",
              desc: "Upcoming shows, seminars and charity events",
              color: "#dcfce7",
              border: "#bbf7d0",
            },
          ].map((cat) => (
            <Link key={cat.href} href={cat.href} className="no-underline block">
              <div
                className="rounded-xl p-6 border-2 text-center"
                style={{
                  background: cat.color,
                  borderColor: cat.border,
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div style={{ fontSize: "2.5rem" }} className="mb-2">{cat.icon}</div>
                <h3 className="font-bold text-lg mb-1" style={{ color: "var(--navy)" }}>
                  {cat.label}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Latest posts */}
        {posts.length > 0 ? (
          <>
            <div className="section-header">
              <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
                Latest from Big Bark
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/news" className="btn-outline">All News</Link>
              <Link href="/press-releases" className="btn-outline">All Press Releases</Link>
              <Link href="/events" className="btn-outline">All Events</Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div style={{ fontSize: "4rem" }} className="mb-4">🐶</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
              No posts yet
            </h2>
            <p className="mb-6" style={{ color: "var(--muted)" }}>
              Be the first to share a story with the canine community.
            </p>
            <Link href="/submit" className="btn-primary">Submit Your Story</Link>
          </div>
        )}
      </section>

      {/* RSS callout */}
      <section
        style={{ background: "#f0f4ff", borderTop: "3px solid var(--gold)" }}
        className="py-12 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ fontSize: "3rem" }} className="mb-3">📡</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            Stay Informed via RSS
          </h2>
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Journalists and media outlets can subscribe to our RSS feeds — choose all posts
            or filter by charity or business organisations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/api/rss" className="btn-primary">All Posts Feed</a>
            <a href="/api/rss?org=charity" className="btn-outline">Charity Feed</a>
            <a href="/api/rss?org=business" className="btn-outline">Business Feed</a>
          </div>
        </div>
      </section>
    </div>
  );
}
