const BLOGS_KEY = "wfl-admin-blogs";
const COMMENTS_KEY = "wfl-admin-comments";

const seedBlogs = [
  {
    id: "blog-1",
    title: "How I plan a writing project",
    status: "published",
    createdAt: "2026-07-12T10:00:00.000Z",
    updatedAt: "2026-08-02T14:20:00.000Z",
  },
  {
    id: "blog-2",
    title: "Notes from First Draft Berlin",
    status: "draft",
    createdAt: "2026-08-20T09:00:00.000Z",
    updatedAt: "2026-09-01T11:15:00.000Z",
  },
  {
    id: "blog-3",
    title: "Content strategy without the noise",
    status: "published",
    createdAt: "2026-09-10T16:40:00.000Z",
    updatedAt: "2026-09-18T08:05:00.000Z",
  },
];

const seedComments = [
  {
    id: "comment-1",
    blogId: "blog-1",
    blogTitle: "How I plan a writing project",
    author: "Amina K.",
    snippet: "This helped me finally break a chapter into weekly goals.",
    status: "approved",
    createdAt: "2026-08-04T12:10:00.000Z",
  },
  {
    id: "comment-2",
    blogId: "blog-1",
    blogTitle: "How I plan a writing project",
    author: "Leo M.",
    snippet: "Could you share a sample timeline for a memoir?",
    status: "pending",
    createdAt: "2026-08-21T18:44:00.000Z",
  },
  {
    id: "comment-3",
    blogId: "blog-3",
    blogTitle: "Content strategy without the noise",
    author: "Priya S.",
    snippet: "The section on saying no to extra channels is gold.",
    status: "approved",
    createdAt: "2026-09-19T07:22:00.000Z",
  },
  {
    id: "comment-4",
    blogId: "blog-3",
    blogTitle: "Content strategy without the noise",
    author: "Spam Bot",
    snippet: "Buy cheap followers at example.com",
    status: "rejected",
    createdAt: "2026-09-20T03:11:00.000Z",
  },
];

const readCollection = (key, seed) => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(seed));
    return [...seed];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seed];
  } catch {
    localStorage.setItem(key, JSON.stringify(seed));
    return [...seed];
  }
};

const writeCollection = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
  return items;
};

const delay = (value) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), 80);
  });

export const listBlogs = async () => delay(readCollection(BLOGS_KEY, seedBlogs));

export const getBlog = async (id) => {
  const blogs = readCollection(BLOGS_KEY, seedBlogs);
  return delay(blogs.find((blog) => blog.id === id) ?? null);
};

export const deleteBlog = async (id) => {
  const blogs = readCollection(BLOGS_KEY, seedBlogs).filter((blog) => blog.id !== id);
  writeCollection(BLOGS_KEY, blogs);
  const comments = readCollection(COMMENTS_KEY, seedComments).filter(
    (comment) => comment.blogId !== id,
  );
  writeCollection(COMMENTS_KEY, comments);
  return delay({ id });
};

export const setPublishState = async (id, status) => {
  const blogs = readCollection(BLOGS_KEY, seedBlogs).map((blog) =>
    blog.id === id
      ? { ...blog, status, updatedAt: new Date().toISOString() }
      : blog,
  );
  writeCollection(BLOGS_KEY, blogs);
  return delay(blogs.find((blog) => blog.id === id));
};

export const listComments = async () => delay(readCollection(COMMENTS_KEY, seedComments));

export const setCommentStatus = async (id, status) => {
  const comments = readCollection(COMMENTS_KEY, seedComments).map((comment) =>
    comment.id === id ? { ...comment, status } : comment,
  );
  writeCollection(COMMENTS_KEY, comments);
  return delay(comments.find((comment) => comment.id === id));
};

export const deleteComment = async (id) => {
  const comments = readCollection(COMMENTS_KEY, seedComments).filter(
    (comment) => comment.id !== id,
  );
  writeCollection(COMMENTS_KEY, comments);
  return delay({ id });
};

export const getAdminStats = async () => {
  const blogs = readCollection(BLOGS_KEY, seedBlogs);
  const comments = readCollection(COMMENTS_KEY, seedComments);

  return delay({
    published: blogs.filter((blog) => blog.status === "published").length,
    drafts: blogs.filter((blog) => blog.status === "draft").length,
    pendingComments: comments.filter((comment) => comment.status === "pending").length,
    totalComments: comments.length,
  });
};
