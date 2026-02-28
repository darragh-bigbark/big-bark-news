"use client";

import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  status: string;
};

export default function AdminActions({ postId, status }: Props) {
  const router = useRouter();

  async function handleAction(action: "approve" | "reject" | "delete") {
    if (action === "delete") {
      if (!confirm("Are you sure you want to permanently delete this post?")) return;

      await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      router.refresh();
      return;
    }

    await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" }),
    });

    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {status === "pending" && (
        <>
          <button
            className="btn-success"
            onClick={() => handleAction("approve")}
            style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem" }}
          >
            Approve
          </button>
          <button
            className="btn-danger"
            onClick={() => handleAction("reject")}
            style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem" }}
          >
            Reject
          </button>
        </>
      )}
      <button
        className="btn-danger"
        onClick={() => handleAction("delete")}
        style={{
          padding: "0.35rem 0.85rem",
          fontSize: "0.8rem",
          background: "#6b7280",
        }}
      >
        Delete
      </button>
    </div>
  );
}
