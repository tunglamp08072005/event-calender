const { Router } = require("express");
const { check } = require("express-validator");

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const {
  eventExistsById,
  isEventOwner,
} = require("../helpers/databaseValidators");

const {
  isDate,
  isDateAfter,
} = require("../helpers/dateValidators");

const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

// Middleware xác thực JWT cho tất cả các routes bên dưới
router.use(validateJWT);

// GET - Lấy tất cả các sự kiện
router.get("/", getEvents);

// POST - Tạo sự kiện mới
router.post(
  "/",
  [
    check("title")
      .notEmpty().withMessage("Title is required")
      .isLength({ max: 32 }).withMessage("Title length must be max 32 characters"),

    check("start")
      .notEmpty().withMessage("Start date is required")
      .custom(isDate).withMessage("Invalid start date"),

    check("end")
      .notEmpty().withMessage("End date is required")
      .custom(isDate).withMessage("Invalid end date")
      .custom((end, { req }) => isDateAfter(end, req.body.start))
      .withMessage("End date must be after start date"),

    check("notes")
      .optional()
      .isLength({ max: 128 }).withMessage("Notes length must be max 128 characters"),

    validateFields,
  ],
  createEvent
);

// PUT - Cập nhật sự kiện theo ID
router.put(
  "/:id",
  [
    check("id")
      .isMongoId().withMessage("Invalid event ID."),

    check("title")
      .notEmpty().withMessage("Title is required")
      .isLength({ max: 32 }).withMessage("Title length must be max 32 characters"),

    check("start")
      .notEmpty().withMessage("Start date is required")
      .custom(isDate).withMessage("Invalid start date"),

    check("end")
      .notEmpty().withMessage("End date is required")
      .custom(isDate).withMessage("Invalid end date"),

    check("notes")
      .optional()
      .isLength({ max: 128 }).withMessage("Notes length must be max 128 characters"),

    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  updateEvent
);

// DELETE - Xoá sự kiện theo ID
router.delete(
  "/:id",
  [
    check("id")
      .isMongoId().withMessage("Invalid event ID."),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

module.exports = router;
