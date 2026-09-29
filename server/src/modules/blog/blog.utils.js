import Blog from "./blog.model.js";

export const slugify = (value) => {
  const slug = String(value || "")
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "post";
};

export const parseTags = (tags) => {
  if (Array.isArray(tags)) {
    return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
  }

  if (typeof tags === "string") {
    return [
      ...new Set(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ];
  }

  return [];
};

export const ensureUniqueSlug = async (desired, excludeId) => {
  const base = slugify(desired);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? base : `${base}-${suffix}`;
    const filter = { slug: candidate };
    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const exists = await Blog.exists(filter);
    if (!exists) return candidate;
    suffix += 1;
  }
};

export const serializeBlog = (blog) => ({
  id: String(blog._id),
  title: blog.title,
  slug: blog.slug,
  status: blog.status,
  excerpt: blog.excerpt,
  tags: blog.tags,
  cover: blog.cover || { url: "", publicId: "" },
  content: blog.content,
  contentHtml: blog.contentHtml,
  author: blog.author,
  publishedAt: blog.publishedAt,
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
});

export const serializeBlogListItem = (blog) => ({
  id: String(blog._id),
  title: blog.title,
  slug: blog.slug,
  status: blog.status,
  excerpt: blog.excerpt,
  tags: blog.tags,
  cover: blog.cover || { url: "", publicId: "" },
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
  publishedAt: blog.publishedAt,
});
