const express = require("express");
const { check } = require("express-validator");

const {
  createUser,
  loginUser,
  renewToken,
} = require("../controllers/auth");

const { emailExists } = require("../helpers/databaseValidators");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");

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

module.exports = router;
