import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const { title, type, summary, content, imageUrl, eventDate, eventVenue, contactName, contactEmail, contactPhone, websiteUrl } = body;

  if (!title || !type || !summary || !content) {
    return NextResponse.json({ error: "Title, type, summary and content are required" }, { status: 400 });
  }

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const post = await prisma.post.create({
    data: {
      title, slug, type, summary, content,
      imageUrl: imageUrl || null,
      eventDate: eventDate || null,
      eventVenue: eventVenue || null,
      contactName: contactName || null,
      contactEmail: contactEmail || null,
      contactPhone: contactPhone || null,
      websiteUrl: websiteUrl || null,
      status: "pending",
      authorId: user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const orgType = searchParams.get("orgType");

  const posts = await prisma.post.findMany({
    where: {
      status: "approved",
      ...(type ? { type } : {}),
      ...(orgType ? { author: { orgType } } : {}),
    },
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(posts);
}
