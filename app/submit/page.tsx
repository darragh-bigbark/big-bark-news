"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const POST_TYPES = [
  { value: "news", label: "News Story" },
  { value: "press_release", label: "Press Release" },
  { value: "event", label: "Event" },
];

const INITIAL_FORM = {
  title: "",
  type: "news",
  summary: "",
  content: "",
  imageUrl: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  websiteUrl: "",
  eventDate: "",
  eventVenue: "",
};

export default function SubmitPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Submission failed. Please try again.");
      } else {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitAnother() {
    setForm(INITIAL_FORM);
    setSuccess(false);
    setError("");
  }

  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center" style={{ color: "var(--muted)" }}>
        Loading…
      </div>
    );
  }

  if (!session) return null;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div style={{ fontSize: "3.5rem" }} className="mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
          Submission Received!
        </h1>
        <p className="mb-2" style={{ color: "var(--muted)" }}>
          Your submission is pending admin review. We&apos;ll publish it once approved.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          You&apos;ll be able to see your submissions in the dashboard once approved.
        </p>
        <button onClick={handleSubmitAnother} className="btn-primary">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Submit Content
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Submitting as <span className="font-semibold">{session.user?.name}</span>
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit}>
          {/* Type selector */}
          <div className="form-group">
            <label>Content Type</label>
            <div className="flex gap-2 flex-wrap">
              {POST_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type: t.value }))}
                  className={form.type === t.value ? "btn-primary" : "btn-outline"}
                  style={{ padding: "0.45rem 1.1rem", fontSize: "0.9rem" }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter a clear, descriptive title"
              required
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label htmlFor="summary">
              Summary * <span style={{ color: "var(--muted)", fontWeight: 400 }}>({form.summary.length}/200)</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="A brief summary of your content (max 200 characters)"
              maxLength={200}
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">
              Full Content *{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                (you can use basic HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;)
              </span>
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your full content here. HTML is supported."
              rows={10}
              required
            />
          </div>

          {/* Event-specific fields */}
          {form.type === "event" && (
            <div
              className="rounded-xl p-5 mb-5 border-l-4"
              style={{ background: "#f0fdf4", borderColor: "#16a34a" }}
            >
              <div className="font-semibold mb-3 text-sm" style={{ color: "#166534" }}>
                Event Details
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={handleChange}
                  required={form.type === "event"}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="eventVenue">Event Venue *</label>
                <input
                  id="eventVenue"
                  name="eventVenue"
                  type="text"
                  value={form.eventVenue}
                  onChange={handleChange}
                  placeholder="Venue name and location"
                  required={form.type === "event"}
                />
              </div>
            </div>
          )}

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Contact info */}
          <div
            className="rounded-xl p-5 mb-5 border"
            style={{ background: "var(--cream)", borderColor: "var(--border)" }}
          >
            <div className="font-semibold mb-3 text-sm" style={{ color: "var(--navy)" }}>
              Contact Information <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional — shown on the post)</span>
            </div>
            <div className="form-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                value={form.contactName}
                onChange={handleChange}
                placeholder="Press contact name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="press@organisation.com"
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="contactPhone">Contact Phone <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="+44 7700 000000"
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="form-group">
            <label htmlFor="websiteUrl">Website URL <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              value={form.websiteUrl}
              onChange={handleChange}
              placeholder="https://www.yourorganisation.com"
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
            style={{ opacity: loading ? 0.7 : 1, fontSize: "1rem" }}
          >
            {loading ? "Submitting…" : "Submit for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
