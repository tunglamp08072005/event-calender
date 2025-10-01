// server/routes/auth.js - ĐÃ SỬA THÀNH ES MODULES
import express from "express";
import { check } from "express-validator";

import {
  createUser,
  loginUser,
  renewToken,
} from "../controllers/auth.js";

import { emailExists } from "../helpers/databaseValidators.js";
import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

// Route: POST /api/auth/register
router.post(
  "/register",
  [
    check("name")
      .notEmpty()
      .withMessage("Tên là bắt buộc")
      .isLength({ max: 32 })
      .withMessage("Tên không được vượt quá 32 ký tự"),
    check("email")
      .isEmail()
      .withMessage("Email không hợp lệ"),
    check("password")
      .isStrongPassword()
      .withMessage(
        "Mật khẩu phải từ 8–32 ký tự và bao gồm ít nhất 1 chữ số, 1 ký tự đặc biệt, 1 chữ thường và 1 chữ in hoa."
      )
      .isLength({ max: 32 })
      .withMessage("Mật khẩu phải từ 8–32 ký tự."),
    validateFields,
    emailExists,
  ],
  createUser
);

// Route: POST /api/auth/login
router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Email không hợp lệ"),
    check("password")
      .notEmpty()
      .withMessage("Mật khẩu là bắt buộc."),
    validateFields,
  ],
  loginUser
);

// Route: GET /api/auth/renew
router.get("/renew", validateJWT, renewToken);

export default router;