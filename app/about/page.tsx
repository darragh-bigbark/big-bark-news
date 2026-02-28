import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Big Bark News & Media",
  description: "Learn about Big Bark News & Media — the canine industry's dedicated news and media platform.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="section-header mb-10">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>About Us</h1>
        <p style={{ color: "var(--muted)" }}>The story behind Big Bark News & Media</p>
      </div>

      {/* Logo + intro */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-shrink-0">
          <Image
            src="https://bbnm.ie/wp-content/uploads/2026/02/Untitled-design-8-300x168.png"
            alt="Big Bark News & Media"
            width={220}
            height={123}
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>
            The Canine Industry&apos;s Dedicated Media Platform
          </h2>
          <p className="leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            Big Bark News & Media is an independent media platform built specifically for the canine
            industry. We provide a dedicated space for charities, businesses, trainers, breeders and
            advocates to share their stories, announcements and events with a wide and engaged audience.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
            Whether you&apos;re a rescue charity celebrating rehomings, a dog food brand launching a new
            product, or an event organiser promoting an upcoming show — Big Bark is your platform.
          </p>
        </div>
      </div>

      {/* What we do */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: "📰",
            title: "News",
            desc: "We publish timely news stories from across the canine world — welfare campaigns, industry developments, research findings and more.",
          },
          {
            icon: "📣",
            title: "Press Releases",
            desc: "Businesses and charities can submit press releases directly, reaching journalists and media outlets who subscribe to our RSS feeds.",
          },
          {
            icon: "📅",
            title: "Events",
            desc: "From agility competitions to charity fundraisers and trade shows, we help promote events to the people who matter most.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl p-6 border"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div style={{ fontSize: "2rem" }} className="mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "var(--navy)" }}>{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div
        className="rounded-xl p-8 mb-12 border-l-4"
        style={{ background: "#f0f4ff", borderColor: "var(--gold)" }}
      >
        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>Our Mission</h2>
        <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
          Our mission is simple: to give the canine industry a voice. We believe every organisation —
          no matter how large or small — deserves a platform to share what they&apos;re doing. By bringing
          together news, press releases and events in one place, we make it easier for journalists,
          media professionals and dog lovers to stay informed about what&apos;s happening across the sector.
        </p>
      </div>

      {/* Podcast */}
      <div
        className="rounded-xl p-8 mb-12 border"
        style={{ background: "#fff", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: "2rem" }}>🎙️</span>
          <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>The Big Bark Podcast</h2>
        </div>
        <p className="leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          Alongside the news platform, we produce the <strong>Big Bark Podcast</strong> — a regular show
          featuring interviews with industry leaders, charity founders, vets, trainers and campaigners.
          New episodes are available on Spotify.
        </p>
        <Link href="/podcast" className="btn-primary">Listen Now</Link>
      </div>

      {/* CTA */}
      <div className="text-center py-10 border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
          Want to share your story?
        </h2>
        <p className="mb-6" style={{ color: "var(--muted)" }}>
          Register your organisation and submit news, press releases or events today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary">Register Your Organisation</Link>
          <Link href="/contact" className="btn-outline">Get in Touch</Link>
        </div>
      </div>

      {/* Social media */}
      <div className="text-center py-10 border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--navy)" }}>Follow Us</h2>
        <p className="mb-6 text-sm" style={{ color: "var(--muted)" }}>
          Stay connected with Big Bark News & Media on social media.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <a
            href="https://www.instagram.com/bigbarknewsandmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "var(--navy)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          <a
            href="https://www.facebook.com/bigbarknewsandmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "var(--navy)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@bigbarknewsandmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "var(--navy)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
}
