const Event = require("../models/Event");
const User = require("../models/User");

// Kiểm tra sự tồn tại của sự kiện dựa trên ID trong URL
const eventExistsById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const existingEvent = await Event.findById(eventId);

    if (!existingEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Không tìm thấy sự kiện với ID đã cung cấp.",
      });
    }

    next();
  } catch (err) {
    console.error("Lỗi khi kiểm tra eventExistsById:", err);
    return res.status(500).json({
      ok: false,
      msg: "Lỗi server khi xác minh sự kiện.",
    });
  }
};

// Xác minh người dùng hiện tại có phải là chủ sở hữu của sự kiện không
const isEventOwner = async (req, res, next) => {
  try {
    const currentUserId = req.id;
    const eventId = req.params.id;

    if (!currentUserId) {
      return res.status(500).json({
        ok: false,
        msg: "Không thể xác thực quyền nếu token chưa được xử lý.",
      });
    }

    const event = await Event.findById(eventId);

    if (!event || event.user.toString() !== currentUserId) {
      return res.status(401).json({
        ok: false,
        msg: "Bạn không có quyền thực hiện hành động này.",
      });
    }

    next();
  } catch (err) {
    console.error("Lỗi trong isEventOwner:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể xác minh quyền sở hữu sự kiện.",
    });
  }
};

// Kiểm tra email đã tồn tại trong hệ thống hay chưa
const emailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({
        ok: false,
        msg: "Email này đã được đăng ký.",
      });
    }

    next();
  } catch (err) {
    console.error("Lỗi trong emailExists:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể kiểm tra email. Hãy thử lại sau.",
    });
  }
};

module.exports = {
  eventExistsById,
  isEventOwner,
  emailExists,
};
