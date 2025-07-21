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
      .withMessage("Name is required")
      .isLength({ max: 32 })
      .withMessage("Name length must be max 32 characters"),
    check("email")
      .isEmail()
      .withMessage("Invalid email"),
    check("password")
      .isStrongPassword()
      .withMessage(
        "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
      )
      .isLength({ max: 32 })
      .withMessage("Password should be between 8-32 characters."),
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
      .withMessage("Invalid email"),
    check("password")
      .notEmpty()
      .withMessage("Password is required."),
    validateFields,
  ],
  loginUser
);

// Route: GET /api/auth/renew
router.get("/renew", validateJWT, renewToken);

module.exports = router;
