import { Router } from "express";

import { getHealth } from "./health.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.route("/health").get(asyncHandler(getHealth));

export default router;
