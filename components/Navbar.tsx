"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

function ContentDropdown({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = [
    { href: "/news", label: "News", icon: "📰" },
    { href: "/press-releases", label: "Press Releases", icon: "📣" },
    { href: "/events", label: "Events", icon: "📅" },
  ];

  if (mobile) {
    return (
      <div className="flex flex-col gap-2 pl-3 border-l-2" style={{ borderColor: "var(--gold)" }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-yellow-300 flex items-center gap-2" onClick={onClose}>
            <span>{l.icon}</span> {l.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 hover:text-yellow-300 transition-colors bg-transparent border-none text-white cursor-pointer text-sm font-medium"
      >
        Content
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-lg shadow-xl overflow-hidden z-50"
          style={{ background: "#fff", border: "1px solid var(--border)", minWidth: "180px" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium no-underline transition-colors"
              style={{ color: "var(--navy)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setOpen(false)}
            >
              <span>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as { role?: string } | undefined;
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "var(--navy)" }} className="text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">

        {/* Logo row — centred on desktop, with mobile hamburger on the right */}
        <div className="relative flex items-center justify-center h-16">
          <Link href="/" className="flex items-center no-underline">
            <Image
              src="https://bbnm.ie/wp-content/uploads/2026/02/Untitled-design-8-300x168.png"
              alt="Big Bark News & Media"
              width={130}
              height={73}
              className="object-contain"
              priority
            />
          </Link>
          {/* Mobile hamburger — absolute so it doesn't shift the logo */}
          <button
            className="md:hidden absolute right-0 p-2 rounded bg-transparent border-none text-white cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop nav + auth row */}
        <div className="hidden md:flex items-center justify-between border-t border-white/10 h-11">
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link>
            <ContentDropdown />
            <Link href="/podcast" className="hover:text-yellow-300 transition-colors">Podcast</Link>
            <Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link>
            <Link href="/rss" className="hover:text-yellow-300 transition-colors">Subscribe</Link>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/admin" className="text-sm hover:text-yellow-300 transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/submit" className="btn-primary text-sm">
                  Submit Story
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity bg-transparent border-none text-white cursor-pointer"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm hover:text-yellow-300 transition-colors">
                  Sign in
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 border-t border-white/20 flex flex-col gap-3 text-sm pb-4">
            <Link href="/" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="hover:text-yellow-300" onClick={() => setOpen(false)}>About</Link>
            <span className="font-semibold text-xs opacity-60 uppercase tracking-wider">Content</span>
            <ContentDropdown mobile onClose={() => setOpen(false)} />
            <Link href="/podcast" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Podcast</Link>
            <Link href="/contact" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/rss" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Subscribe</Link>
            {session ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/admin" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Admin</Link>
                )}
                <Link href="/submit" className="btn-primary w-fit" onClick={() => setOpen(false)}>Submit Story</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left text-sm opacity-70 bg-transparent border-none text-white cursor-pointer">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-yellow-300" onClick={() => setOpen(false)}>Sign in</Link>
                <Link href="/auth/register" className="btn-primary w-fit" onClick={() => setOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
