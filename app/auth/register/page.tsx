"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organisation: "",
    orgType: "charity",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--cream)" }}>
        <div className="w-full max-w-md text-center">
          <div style={{ fontSize: "3rem" }} className="mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            Account Created!
          </h1>
          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Your organisation account has been registered. You can now sign in and start submitting
            stories, press releases and events.
          </p>
          <Link href="/auth/login" className="btn-primary">
            Sign In Now
          </Link>
        </div>
      </div>
    );
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
            Register Your Organisation
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Create an account to submit news, press releases and events
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@organisation.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Choose a strong password"
                required
                autoComplete="new-password"
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="organisation">Organisation Name</label>
              <input
                id="organisation"
                name="organisation"
                type="text"
                value={form.organisation}
                onChange={handleChange}
                placeholder="Your charity or business name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="orgType">Organisation Type</label>
              <select
                id="orgType"
                name="orgType"
                value={form.orgType}
                onChange={handleChange}
                required
              >
                <option value="charity">Charity / Non-profit</option>
                <option value="business">Business / Commercial</option>
              </select>
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
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold no-underline" style={{ color: "var(--navy)" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
