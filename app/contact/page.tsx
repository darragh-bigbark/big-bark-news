"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Opens mailto link as a simple contact mechanism
    const mailto = `mailto:hello@bbnm.ie?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="section-header mb-10">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Contact Us</h1>
        <p style={{ color: "var(--muted)" }}>Get in touch with the Big Bark News & Media team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Contact info */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div>
            <h3 className="font-bold mb-1" style={{ color: "var(--navy)" }}>Email</h3>
            <a
              href="mailto:hello@bbnm.ie"
              className="text-sm"
              style={{ color: "var(--gold)", fontWeight: 600 }}
            >
              hello@bbnm.ie
            </a>
          </div>
          <div>
            <h3 className="font-bold mb-1" style={{ color: "var(--navy)" }}>Website</h3>
            <a
              href="https://bbnm.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: "var(--gold)", fontWeight: 600 }}
            >
              bbnm.ie
            </a>
          </div>
          <div
            className="rounded-xl p-4 border-l-4"
            style={{ background: "#f0f4ff", borderColor: "var(--navy)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              For press enquiries, submission queries or general questions about the platform, use
              the form or email us directly.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div
              className="rounded-xl p-8 text-center border"
              style={{ background: "#dcfce7", borderColor: "#bbf7d0" }}
            >
              <div style={{ fontSize: "3rem" }} className="mb-3">✉️</div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#166534" }}>Message opened!</h2>
              <p style={{ color: "#166534" }}>
                Your email client should have opened with the message pre-filled. If not, email us
                directly at{" "}
                <a href="mailto:hello@bbnm.ie" style={{ fontWeight: 700 }}>hello@bbnm.ie</a>.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl p-6 border"
              style={{ background: "#fff", borderColor: "var(--border)" }}
            >
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
                  <option value="">Select a subject…</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Submission Query">Submission Query</option>
                  <option value="Press Enquiry">Press Enquiry</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-primary w-full" style={{ fontSize: "1rem" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
