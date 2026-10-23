import {
  createBlog as createBlogRequest,
  createPostComment as createPostCommentRequest,
  deleteBlog as deleteBlogRequest,
  deleteComment as deleteCommentRequest,
  getBlog as getBlogRequest,
  getPublishedBlog as getPublishedBlogRequest,
  listBlogs as listBlogsRequest,
  listComments as listCommentsRequest,
  listPostComments as listPostCommentsRequest,
  listPublishedBlogs as listPublishedBlogsRequest,
  setCommentStatus as setCommentStatusRequest,
  updateBlog as updateBlogRequest,
} from "@/services/blog/blog.api";

export const listBlogs = listBlogsRequest;
export const listPublishedBlogs = listPublishedBlogsRequest;
export const getBlog = getBlogRequest;
export const getPublishedBlog = getPublishedBlogRequest;
export const createBlog = createBlogRequest;
export const updateBlog = updateBlogRequest;
export const deleteBlog = deleteBlogRequest;
export const listPostComments = listPostCommentsRequest;
export const createPostComment = createPostCommentRequest;
export const listComments = listCommentsRequest;
export const setCommentStatus = setCommentStatusRequest;
export const deleteComment = deleteCommentRequest;

export const setPublishState = async (id, status) =>
  updateBlogRequest(id, { status });

export const getAdminStats = async () => {
  const [blogs, comments] = await Promise.all([
    listBlogsRequest(),
    listCommentsRequest(),
  ]);

  return {
    published: blogs.filter((blog) => blog.status === "published").length,
    drafts: blogs.filter((blog) => blog.status === "draft").length,
    pendingComments: comments.filter((comment) => comment.status === "pending")
      .length,
    totalComments: comments.length,
  };
};
