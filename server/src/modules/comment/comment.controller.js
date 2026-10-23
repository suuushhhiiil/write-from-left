import mongoose from "mongoose";
import Blog from "../blog/blog.model.js";
import Comment from "./comment.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import {
  serializeAdminComment,
  serializePublicComment,
} from "./comment.utils.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 80;
const BODY_MAX = 2000;
const STATUSES = new Set(["pending", "approved", "rejected"]);

const findPublishedBlog = async (slugParam) => {
  const slug = String(slugParam || "")
    .trim()
    .toLowerCase();
  if (!slug) {
    throw new APIError(400, "Invalid blog slug");
  }

  const blog = await Blog.findOne({ slug, status: "published" });
  if (!blog) {
    throw new APIError(404, "Blog not found");
  }

  return blog;
};

export const listPublishedComments = async (req, res) => {
  const blog = await findPublishedBlog(req.params.slug);
  const comments = await Comment.find({
    blog: blog._id,
    status: "approved",
  }).sort({
    createdAt: 1,
  });

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        "Comments fetched",
        comments.map(serializePublicComment),
      ),
    );
};

export const createComment = async (req, res) => {
  const blog = await findPublishedBlog(req.params.slug);
  const authorName = String(req.body?.authorName || "").trim();
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const body = String(req.body?.body || "").trim();

  if (!authorName) {
    throw new APIError(400, "Name is required");
  }
  if (authorName.length > NAME_MAX) {
    throw new APIError(400, "Name is too long");
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw new APIError(400, "A valid email is required");
  }
  if (!body) {
    throw new APIError(400, "Comment is required");
  }
  if (body.length > BODY_MAX) {
    throw new APIError(400, "Comment is too long");
  }

  const comment = await Comment.create({
    blog: blog._id,
    authorName,
    email,
    body,
    status: "pending",
  });

  return res.status(201).json(
    new APIResponse(201, "Comment submitted", {
      id: String(comment._id),
      status: comment.status,
    }),
  );
};

export const listComments = async (req, res) => {
  const comments = await Comment.find()
    .sort({ createdAt: -1 })
    .populate("blog", "title slug");

  return res
    .status(200)
    .json(
      new APIResponse(
        200,
        "Comments fetched",
        comments.map(serializeAdminComment),
      ),
    );
};

export const updateCommentStatus = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "Invalid comment id");
  }

  const status = req.body?.status;
  if (!STATUSES.has(status)) {
    throw new APIError(400, "Invalid comment status");
  }

  const comment = await Comment.findById(id).populate("blog", "title slug");
  if (!comment) {
    throw new APIError(404, "Comment not found");
  }

  comment.status = status;
  await comment.save();

  return res
    .status(200)
    .json(
      new APIResponse(200, "Comment updated", serializeAdminComment(comment)),
    );
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(400, "Invalid comment id");
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    throw new APIError(404, "Comment not found");
  }

  await comment.deleteOne();
  return res.status(200).json(new APIResponse(200, "Comment deleted", { id }));
};
