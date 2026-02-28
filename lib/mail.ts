import Mailgun from "mailgun.js";
import FormData from "form-data";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
  url: "https://api.eu.mailgun.net",
});

const DOMAIN = process.env.MAILGUN_DOMAIN!;
const FROM = process.env.MAILGUN_FROM!;
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  return mg.messages.create(DOMAIN, {
    from: `Big Bark News & Media <${FROM}>`,
    to,
    subject,
    html,
    text,
  });
}

export async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `${BASE_URL}/api/subscribe?action=confirm&token=${token}`;
  return sendEmail({
    to: email,
    subject: "Confirm your subscription to Big Bark News & Media",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a2a4a;">Confirm Your Email Subscription</h2>
        <p style="color: #555;">Thanks for subscribing to Big Bark News &amp; Media email alerts. Click the button below to confirm your subscription.</p>
        <p style="margin: 24px 0;">
          <a href="${confirmUrl}" style="background: #1a2a4a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Confirm Subscription</a>
        </p>
        <p style="color: #666; font-size: 14px;">Or copy and paste this link:<br><a href="${confirmUrl}">${confirmUrl}</a></p>
        <p style="color: #999; font-size: 12px;">If you didn&apos;t sign up for this, you can safely ignore this email.</p>
      </div>
    `,
    text: `Confirm your subscription to Big Bark News & Media.\n\nClick here to confirm:\n${confirmUrl}\n\nIf you didn't sign up, you can safely ignore this email.`,
  });
}

type PostData = {
  title: string;
  slug: string;
  type: string;
  summary: string;
};

type SubscriberData = {
  email: string;
  token: string;
};

export async function sendPostNotification(post: PostData, subscribers: SubscriberData[]) {
  const postUrl = `${BASE_URL}/posts/${post.slug}`;
  const typeLabel = post.type.charAt(0).toUpperCase() + post.type.slice(1).replace(/-/g, " ");

  const promises = subscribers.map((sub) => {
    const unsubscribeUrl = `${BASE_URL}/api/subscribe?action=unsubscribe&token=${sub.token}`;
    return sendEmail({
      to: sub.email,
      subject: `New post: ${post.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a2a4a;">New Post on Big Bark News &amp; Media</h2>
          <span style="background: #f0f4ff; color: #1a2a4a; padding: 2px 10px; border-radius: 4px; font-size: 13px; font-weight: 600;">${typeLabel}</span>
          <h3 style="color: #1a2a4a; margin-top: 12px;">${post.title}</h3>
          <p style="color: #555;">${post.summary}</p>
          <p style="margin: 24px 0;">
            <a href="${postUrl}" style="background: #1a2a4a; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Read Full Post</a>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">You received this because you subscribed to Big Bark News &amp; Media alerts. <a href="${unsubscribeUrl}" style="color: #999;">Unsubscribe</a></p>
        </div>
      `,
      text: `New post on Big Bark News & Media\n\n[${typeLabel}] ${post.title}\n\n${post.summary}\n\nRead more: ${postUrl}\n\nUnsubscribe: ${unsubscribeUrl}`,
    });
  });

  return Promise.allSettled(promises);
}
