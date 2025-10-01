// server/routes/events.js - ĐÃ SỬA THÀNH ES MODULES
import { Router } from "express";
import { check } from "express-validator";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";

import {
  eventExistsById,
  isEventOwner,
} from "../helpers/databaseValidators.js";

import {
  isDate,
  isDateAfter,
} from "../helpers/dateValidators.js";

import validateFields from "../middlewares/validateFields.js";
import validateJWT from "../middlewares/validateJWT.js";

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

export default router;