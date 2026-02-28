import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = (body.email ?? "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const existing = await prisma.subscriber.findUnique({ where: { email } });

  if (existing) {
    if (existing.confirmed) {
      return NextResponse.json({ error: "This email is already subscribed." }, { status: 409 });
    }
    // Resend confirmation for unconfirmed subscriber
    await sendConfirmationEmail(email, existing.token);
    return NextResponse.json({ message: "Confirmation email resent. Please check your inbox." });
  }

  const token = crypto.randomUUID();
  await prisma.subscriber.create({ data: { email, token } });
  await sendConfirmationEmail(email, token);

  return NextResponse.json({ message: "Thanks! Please check your email to confirm your subscription." }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/rss", req.url));
  }

  const subscriber = await prisma.subscriber.findUnique({ where: { token } });

  if (!subscriber) {
    return NextResponse.redirect(new URL("/rss", req.url));
  }

  if (action === "confirm") {
    await prisma.subscriber.update({ where: { token }, data: { confirmed: true } });
    return NextResponse.redirect(new URL("/rss?confirmed=1", req.url));
  }

  if (action === "unsubscribe") {
    await prisma.subscriber.delete({ where: { token } });
    return NextResponse.redirect(new URL("/rss?unsubscribed=1", req.url));
  }

  return NextResponse.redirect(new URL("/rss", req.url));
}
