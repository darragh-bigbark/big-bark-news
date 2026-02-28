"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="rounded-xl p-6 border"
      style={{ background: "#fff", borderColor: "var(--border)" }}
    >
      <h2 className="font-bold text-lg mb-1" style={{ color: "var(--navy)" }}>
        📧 Email Alerts
      </h2>
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        Get notified by email whenever a new post is approved. No spam — unsubscribe any time.
      </p>

      {status === "success" ? (
        <div
          className="rounded-lg px-4 py-3 text-sm font-medium"
          style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" }}
        >
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 rounded-lg border px-4 py-2 text-sm min-w-0"
            style={{
              borderColor: "var(--border)",
              color: "var(--navy)",
              background: "var(--cream)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary text-sm whitespace-nowrap"
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p
          className="mt-2 text-sm"
          style={{ color: "#dc2626" }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
