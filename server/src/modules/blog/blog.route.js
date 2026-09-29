import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getPublishedBlog,
  listBlogs,
  listPublishedBlogs,
  updateBlog,
} from "./blog.controller.js";

const router = Router();

router.get("/published", asyncHandler(listPublishedBlogs));
router.get("/published/:slug", asyncHandler(getPublishedBlog));

router.use(requireAuth, requireAdmin);

router.get("/", asyncHandler(listBlogs));
router.get("/:id", asyncHandler(getBlog));
router.post("/", asyncHandler(createBlog));
router.patch("/:id", asyncHandler(updateBlog));
router.delete("/:id", asyncHandler(deleteBlog));

export default router;
