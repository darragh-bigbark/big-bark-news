import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, POST_TYPE_LABELS } from "@/lib/utils";
import AdminActions from "./AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { name?: string; email?: string; role?: string } | undefined;

  if (!session || user?.role !== "admin") {
    redirect("/");
  }

  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true, organisation: true, orgType: true } } },
    orderBy: { createdAt: "desc" },
  });

  const total = posts.length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const approved = posts.filter((p) => p.status === "approved").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="section-header mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Manage all submitted content
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Posts", value: total, bg: "#f0f4ff", border: "#c7d2fe", color: "var(--navy)" },
          { label: "Pending", value: pending, bg: "#fef3c7", border: "#fde68a", color: "#92400e" },
          { label: "Approved", value: approved, bg: "#dcfce7", border: "#bbf7d0", color: "#166534" },
          { label: "Rejected", value: rejected, bg: "#fee2e2", border: "#fecaca", color: "#991b1b" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 border text-center"
            style={{ background: stat.bg, borderColor: stat.border }}
          >
            <div className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm font-medium mt-1" style={{ color: stat.color, opacity: 0.8 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Posts table */}
      {posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--muted)" }}>
          No posts yet.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", background: "var(--cream)" }}>
                {["Title", "Type", "Org Type", "Organisation", "Status", "Date", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: "var(--navy)", whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr
                  key={post.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: i % 2 === 0 ? "#fff" : "var(--cream)",
                  }}
                >
                  {/* Title */}
                  <td className="px-4 py-3" style={{ maxWidth: "220px" }}>
                    <a
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold no-underline leading-snug block"
                      style={{ color: "var(--navy)", lineHeight: 1.3 }}
                    >
                      {post.title.length > 60 ? post.title.slice(0, 60) + "…" : post.title}
                    </a>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.type}`}>
                      {POST_TYPE_LABELS[post.type] || post.type}
                    </span>
                  </td>

                  {/* Org type */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.author.orgType}`}>
                      {post.author.orgType === "charity" ? "Charity" : "Business"}
                    </span>
                  </td>

                  {/* Organisation */}
                  <td className="px-4 py-3" style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                    {post.author.organisation}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`badge badge-${post.status}`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "var(--muted)" }}>
                    {formatDate(post.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <AdminActions postId={post.id} status={post.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
