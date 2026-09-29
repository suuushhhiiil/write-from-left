import mongoose from "mongoose";
import Blog from "./blog.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { collectImagePublicIds, destroyImages } from "../media/media.service.js";
import {
  ensureUniqueSlug,
  parseTags,
  serializeBlog,
  serializeBlogListItem,
  slugify,
} from "./blog.utils.js";

const emptyDoc = { type: "doc", content: [] };

const resolvePublishedAt = (current, nextStatus) => {
  if (nextStatus !== "published") {
    return current.publishedAt ?? null;
  }
  return current.publishedAt || new Date();
};

export const listBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ updatedAt: -1 });
  return res
    .status(200)
    .json(new APIResponse(200, "Blogs fetched", blogs.map(serializeBlogListItem)));
};

export const listPublishedBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({
    publishedAt: -1,
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      new APIResponse(200, "Published blogs fetched", blogs.map(serializeBlogListItem)),
    );
};

export const getPublishedBlog = async (req, res) => {
  const slug = String(req.params.slug || "")
    .trim()
    .toLowerCase();
  if (!slug) {
    throw new APIError(400, "Invalid blog slug");
  }

  const blog = await Blog.findOne({ slug, status: "published" });
  if (!blog) {
    throw new APIError(404, "Blog not found");
  }

  const published = serializeBlog(blog);
  delete published.content;
  return res.status(200).json(new APIResponse(200, "Blog fetched", published));
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "Invalid blog id");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new APIError(404, "Blog not found");
  }

  return res.status(200).json(new APIResponse(200, "Blog fetched", serializeBlog(blog)));
};

export const createBlog = async (req, res) => {
  const title = String(req.body?.title || "").trim();
  if (!title) {
    throw new APIError(400, "Title is required");
  }

  const status = req.body?.status === "published" ? "published" : "draft";
  const slug = await ensureUniqueSlug(req.body?.slug || title);
  const content = req.body?.content || emptyDoc;

  const blog = await Blog.create({
    title,
    slug,
    status,
    excerpt: String(req.body?.excerpt || "").trim(),
    tags: parseTags(req.body?.tags),
    cover: {
      url: req.body?.cover?.url || "",
      publicId: req.body?.cover?.publicId || "",
    },
    content,
    contentHtml: String(req.body?.contentHtml || ""),
    author: req.user._id,
    publishedAt: status === "published" ? new Date() : null,
  });

  return res.status(201).json(new APIResponse(201, "Blog created", serializeBlog(blog)));
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "Invalid blog id");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new APIError(404, "Blog not found");
  }

  const title = req.body?.title !== undefined ? String(req.body.title).trim() : blog.title;
  if (!title) {
    throw new APIError(400, "Title is required");
  }

  const nextStatus =
    req.body?.status !== undefined
      ? req.body.status === "published"
        ? "published"
        : "draft"
      : blog.status;

  const slugSource = req.body?.slug !== undefined ? req.body.slug : title;
  const slug =
    slugify(slugSource) === blog.slug
      ? blog.slug
      : await ensureUniqueSlug(slugSource, blog._id);

  const nextContent = req.body?.content !== undefined ? req.body.content : blog.content;
  const nextCover = {
    url: req.body?.cover?.url ?? blog.cover?.url ?? "",
    publicId: req.body?.cover?.publicId ?? blog.cover?.publicId ?? "",
  };

  const staleImageIds = [];
  if (blog.cover?.publicId && blog.cover.publicId !== nextCover.publicId) {
    staleImageIds.push(blog.cover.publicId);
  }

  const previousInline = collectImagePublicIds(blog.content);
  const nextInline = collectImagePublicIds(nextContent);
  const nextInlineSet = new Set(nextInline);
  previousInline.forEach((publicId) => {
    if (!nextInlineSet.has(publicId)) staleImageIds.push(publicId);
  });

  blog.title = title;
  blog.slug = slug;
  blog.status = nextStatus;
  blog.excerpt =
    req.body?.excerpt !== undefined ? String(req.body.excerpt).trim() : blog.excerpt;
  blog.tags = req.body?.tags !== undefined ? parseTags(req.body.tags) : blog.tags;
  blog.cover = nextCover;
  blog.content = nextContent;
  blog.contentHtml =
    req.body?.contentHtml !== undefined
      ? String(req.body.contentHtml)
      : blog.contentHtml;
  blog.publishedAt = resolvePublishedAt(blog, nextStatus);

  await blog.save();
  await destroyImages(staleImageIds);

  return res.status(200).json(new APIResponse(200, "Blog updated", serializeBlog(blog)));
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "Invalid blog id");
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new APIError(404, "Blog not found");
  }

  const publicIds = [
    blog.cover?.publicId,
    ...collectImagePublicIds(blog.content),
  ];

  await blog.deleteOne();
  await destroyImages(publicIds);

  return res.status(200).json(new APIResponse(200, "Blog deleted", { id }));
};
