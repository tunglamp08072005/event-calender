// server/routes/ai.js - KIỂM TRA LẠI
import express from "express";
import { check } from "express-validator";

import {
  generateEventTitle,
  generateEventSuggestions,
  analyzeEventPatterns,
} from "../controllers/aiController.js";

import { isDate } from "../helpers/dateValidators.js";
import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

// Apply JWT validation to all AI routes
router.use(validateJWT);

// Route: POST /api/ai/generate-title
router.post(
  "/generate-title",
  [
    check("start").custom(isDate),
    check("end").custom(isDate),
    check("context")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Ngữ cảnh không được vượt quá 500 ký tự"),
    validateFields,
  ],
  generateEventTitle
);

// 🆕 Route: POST /api/ai/suggestions - ĐÃ SỬA TÊN
router.post("/suggestions", generateEventSuggestions);

// Route: GET /api/ai/analyze-patterns
router.get("/analyze-patterns", analyzeEventPatterns);

export default router;