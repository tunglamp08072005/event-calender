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
      .notEmpty().withMessage("Tiêu đề là bắt buộc")
      .isLength({ max: 32 }).withMessage("Tiêu đề tối đa 32 ký tự"),

    check("start")
      .notEmpty().withMessage("Ngày bắt đầu là bắt buộc")
      .custom(isDate).withMessage("Ngày bắt đầu không hợp lệ"),

    check("end")
      .notEmpty().withMessage("Ngày kết thúc là bắt buộc")
      .custom(isDate).withMessage("Ngày kết thúc không hợp lệ")
      .custom((end, { req }) => isDateAfter(end, req.body.start))
      .withMessage("Ngày kết thúc phải sau ngày bắt đầu"),

    check("notes")
      .optional()
      .isLength({ max: 128 }).withMessage("Ghi chú tối đa 128 ký tự"),

    validateFields,
  ],
  createEvent
);

// PUT - Cập nhật sự kiện theo ID
router.put(
  "/:id",
  [
    check("id")
      .isMongoId().withMessage("ID sự kiện không hợp lệ"),

    check("title")
      .notEmpty().withMessage("Tiêu đề là bắt buộc")
      .isLength({ max: 32 }).withMessage("Tiêu đề tối đa 32 ký tự"),

    check("start")
      .notEmpty().withMessage("Ngày bắt đầu là bắt buộc")
      .custom(isDate).withMessage("Ngày bắt đầu không hợp lệ"),

    check("end")
      .notEmpty().withMessage("Ngày kết thúc là bắt buộc")
      .custom(isDate).withMessage("Ngày kết thúc không hợp lệ"),

    check("notes")
      .optional()
      .isLength({ max: 128 }).withMessage("Ghi chú tối đa 128 ký tự"),

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
      .isMongoId().withMessage("ID sự kiện không hợp lệ"),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

module.exports = router;
