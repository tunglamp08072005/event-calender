const { validationResult } = require("express-validator");

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

module.exports = validateFields;
