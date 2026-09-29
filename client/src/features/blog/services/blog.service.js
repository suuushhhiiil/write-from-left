import {
  createBlog as createBlogRequest,
  deleteBlog as deleteBlogRequest,
  getBlog as getBlogRequest,
  getPublishedBlog as getPublishedBlogRequest,
  listBlogs as listBlogsRequest,
  listPublishedBlogs as listPublishedBlogsRequest,
  updateBlog as updateBlogRequest,
} from "@/services/blog/blog.api";

export const listBlogs = listBlogsRequest;
export const listPublishedBlogs = listPublishedBlogsRequest;
export const getBlog = getBlogRequest;
export const getPublishedBlog = getPublishedBlogRequest;
export const createBlog = createBlogRequest;
export const updateBlog = updateBlogRequest;
export const deleteBlog = deleteBlogRequest;

export const setPublishState = async (id, status) =>
  updateBlogRequest(id, { status });

const COMMENTS_KEY = "wfl-admin-comments";

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

const readComments = () => {
  const raw = localStorage.getItem(COMMENTS_KEY);
  if (!raw) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(seedComments));
    return [...seedComments];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedComments];
  } catch {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(seedComments));
    return [...seedComments];
  }
};

const writeComments = (items) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(items));
  return items;
};

export const listComments = async () => readComments();

export const setCommentStatus = async (id, status) => {
  const comments = readComments().map((comment) =>
    comment.id === id ? { ...comment, status } : comment,
  );
  writeComments(comments);
  return comments.find((comment) => comment.id === id);
};

export const deleteComment = async (id) => {
  const comments = readComments().filter((comment) => comment.id !== id);
  writeComments(comments);
  return { id };
};

export const getAdminStats = async () => {
  const [blogs, comments] = await Promise.all([listBlogsRequest(), listComments()]);

  return {
    published: blogs.filter((blog) => blog.status === "published").length,
    drafts: blogs.filter((blog) => blog.status === "draft").length,
    pendingComments: comments.filter((comment) => comment.status === "pending").length,
    totalComments: comments.length,
  };
};
