export const collectImagePublicIds = (node) => {
  const ids = [];

  const walk = (current) => {
    if (!current) return;
    if (current.type === "image" && current.attrs?.publicId) {
      ids.push(current.attrs.publicId);
    }
    if (Array.isArray(current.content)) {
      current.content.forEach(walk);
    }
  };

  walk(node);
  return [...new Set(ids)];
};

export const formatBlogDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const collectPublishedTags = (blogs) => {
  const tags = new Set();
  blogs.forEach((blog) => {
    (blog.tags || []).forEach((tag) => {
      if (tag) tags.add(tag);
    });
  });
  return [...tags].sort((a, b) => a.localeCompare(b));
};

export const filterPublishedBlogs = (blogs, { query, selectedTags } = {}) => {
  const needle = String(query || "").trim().toLowerCase();
  const tags = Array.isArray(selectedTags) ? selectedTags : [];

  return blogs.filter((blog) => {
    const matchesQuery =
      !needle ||
      String(blog.title || "")
        .toLowerCase()
        .includes(needle) ||
      String(blog.excerpt || "")
        .toLowerCase()
        .includes(needle);

    const postTags = blog.tags || [];
    const matchesTags = tags.every((tag) => postTags.includes(tag));

    return matchesQuery && matchesTags;
  });
};

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
