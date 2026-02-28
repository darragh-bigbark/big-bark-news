import Link from "next/link";
import { formatDate, POST_TYPE_LABELS } from "@/lib/utils";

type Post = {
  id: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  publishedAt: Date | string | null;
  createdAt: Date | string;
  author: {
    name: string;
    organisation: string;
    orgType: string;
  };
};

export default function PostCard({ post }: { post: Post }) {
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/posts/${post.slug}`} className="no-underline block">
      <div className="card h-full flex flex-col">
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`badge badge-${post.type}`}>
              {POST_TYPE_LABELS[post.type] || post.type}
            </span>
            <span className={`badge badge-${post.author.orgType}`}>
              {post.author.orgType === "charity" ? "Charity" : "Business"}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: "var(--navy)" }}>
            {post.title}
          </h3>
          <p className="text-sm mb-4 flex-1" style={{ color: "var(--muted)" }}>
            {post.summary.length > 160 ? post.summary.slice(0, 160) + "…" : post.summary}
          </p>
          <div className="text-xs border-t pt-3 flex items-center justify-between" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            <span>{post.author.organisation}</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
