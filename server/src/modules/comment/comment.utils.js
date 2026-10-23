export const serializePublicComment = (comment) => ({
  id: String(comment._id),
  authorName: comment.authorName,
  body: comment.body,
  createdAt: comment.createdAt,
});

export const serializeAdminComment = (comment) => ({
  id: String(comment._id),
  authorName: comment.authorName,
  email: comment.email,
  body: comment.body,
  status: comment.status,
  createdAt: comment.createdAt,
  blogId: comment.blog?._id
    ? String(comment.blog._id)
    : String(comment.blog || ""),
  blogTitle: comment.blog?.title || "Deleted post",
  blogSlug: comment.blog?.slug || "",
});
