import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { createSignature, destroyAsset } from "./media.controller.js";

const router = Router();

router.post("/signature", requireAuth, requireAdmin, asyncHandler(createSignature));
router.post("/destroy", requireAuth, requireAdmin, asyncHandler(destroyAsset));

export default router;
