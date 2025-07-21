const moment = require("moment");

// Kiểm tra xem giá trị có phải là ngày hợp lệ không
const isDate = (value) => {
  return !!value && moment(value, true).isValid();
};

// Kiểm tra ngày kết thúc có sau ngày bắt đầu không
const isDateAfter = (end, start) => {
  const startDate = moment(start);
  const endDate = moment(end);
  return endDate.isAfter(startDate);
};

module.exports = {
  isDate,
  isDateAfter,
};
