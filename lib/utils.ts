export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const POST_TYPE_LABELS: Record<string, string> = {
  news: "News",
  press_release: "Press Release",
  event: "Event",
};

export const ORG_TYPE_LABELS: Record<string, string> = {
  charity: "Charity",
  business: "Business",
};
