import api from "@/lib/axios";

export const listBlogs = async () => {
  const { data } = await api.get("/blogs");
  return data.data;
};

export const listPublishedBlogs = async () => {
  const { data } = await api.get("/blogs/published");
  return data.data;
};

export const getBlog = async (id) => {
  const { data } = await api.get(`/blogs/${id}`);
  return data.data;
};

export const getPublishedBlog = async (slug) => {
  const { data } = await api.get(
    `/blogs/published/${encodeURIComponent(slug)}`,
  );
  return data.data;
};

export const createBlog = async (payload) => {
  const { data } = await api.post("/blogs", payload);
  return data.data;
};

export const updateBlog = async (id, payload) => {
  const { data } = await api.patch(`/blogs/${id}`, payload);
  return data.data;
};

export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);
  return data.data;
};

export const listPostComments = async (slug) => {
  const { data } = await api.get(
    `/blogs/published/${encodeURIComponent(slug)}/comments`,
  );
  return data.data;
};

export const createPostComment = async (slug, payload) => {
  const { data } = await api.post(
    `/blogs/published/${encodeURIComponent(slug)}/comments`,
    payload,
  );
  return data.data;
};

export const listComments = async () => {
  const { data } = await api.get("/comments");
  return data.data;
};

export const setCommentStatus = async (id, status) => {
  const { data } = await api.patch(`/comments/${id}`, { status });
  return data.data;
};

export const deleteComment = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data.data;
};
