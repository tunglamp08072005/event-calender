// server/middlewares/validateFields.js - ĐÃ SỬA THÀNH ES MODULES
import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const formattedErrors = result.mapped();

  res.status(400).json({
    ok: false,
    errors: formattedErrors,
  });
};

export default validateFields;