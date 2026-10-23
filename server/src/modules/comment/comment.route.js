import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import {
  deleteComment,
  listComments,
  updateCommentStatus,
} from "./comment.controller.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/", asyncHandler(listComments));
router.patch("/:id", asyncHandler(updateCommentStatus));
router.delete("/:id", asyncHandler(deleteComment));

export default router;
