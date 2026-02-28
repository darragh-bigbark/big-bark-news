import { NextRequest, NextResponse } from "next/server";
import RSS from "rss";
import { prisma } from "@/lib/prisma";
import { POST_TYPE_LABELS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgType = searchParams.get("org"); // "charity" | "business" | null (all)
  const type = searchParams.get("type"); // "news" | "press_release" | "event" | null

  const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  let feedTitle = "Big Bark News & Media";
  let feedDesc = "The latest canine industry news, press releases and events";

  if (orgType === "charity") {
    feedTitle += " — Charity Feed";
    feedDesc = "Latest news and press releases from canine charities";
  } else if (orgType === "business") {
    feedTitle += " — Business Feed";
    feedDesc = "Latest news and press releases from canine businesses";
  }

  const feed = new RSS({
    title: feedTitle,
    description: feedDesc,
    feed_url: `${siteUrl}/api/rss`,
    site_url: siteUrl,
    language: "en",
    pubDate: new Date(),
    copyright: `${new Date().getFullYear()} Big Bark News & Media`,
  });

  const posts = await prisma.post.findMany({
    where: {
      status: "approved",
      ...(orgType ? { author: { orgType } } : {}),
      ...(type ? { type } : {}),
    },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/posts/${post.slug}`,
      categories: [POST_TYPE_LABELS[post.type] || post.type, post.author.orgType],
      author: `${post.author.name} (${post.author.organisation})`,
      date: post.publishedAt || post.createdAt,
    });
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
