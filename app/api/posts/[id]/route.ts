import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendPostNotification } from "@/lib/mail";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  if (!user?.role || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  if (!user?.role || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const post = await prisma.post.update({
    where: { id },
    data: {
      ...body,
      publishedAt: body.status === "approved" ? new Date() : undefined,
    },
  });

  if (body.status === "approved") {
    const subscribers = await prisma.subscriber.findMany({ where: { confirmed: true } });
    if (subscribers.length > 0) {
      sendPostNotification(post, subscribers).catch(console.error);
    }
  }

  return NextResponse.json(post);
}
