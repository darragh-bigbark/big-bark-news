"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/submit");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="no-underline">
            <div style={{ fontSize: "2.5rem" }} className="mb-2">🐾</div>
            <div className="font-bold text-xl" style={{ color: "var(--gold)" }}>
              Big Bark News & Media
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1" style={{ color: "var(--navy)" }}>
            Sign In
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Access your organisation&apos;s account
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organisation.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="rounded-lg px-4 py-3 mb-4 text-sm"
                style={{ background: "#fee2e2", color: "#991b1b" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full text-center"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold no-underline" style={{ color: "var(--navy)" }}>
              Register your organisation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
