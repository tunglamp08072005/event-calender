// server/controllers/events.js - ĐÃ SỬA THÀNH ES MODULES
import Event from "../models/Event.js";

// Lấy danh sách tất cả sự kiện, kèm tên người tạo
const getEvents = async (req, res) => {
  try {
    const userId = req.id;
    const userEvents = await Event.find({ user: userId }).populate("user", "name");

    return res.status(200).json({
      ok: true,
      events: userEvents,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sự kiện:", err);
    return res.status(500).json({
      ok: false,
      msg: "Đã xảy ra lỗi. Vui lòng thử lại hoặc liên hệ admin.",
    });
  }
};

// Tạo một sự kiện mới
const createEvent = async (req, res) => {
  try {
    const { title, start, end, notes } = req.body;

    const newEvent = new Event({
      title,
      start,
      end,
      notes,
      user: req.id,
    });

    await newEvent.save();

    return res.status(201).json({
      ok: true,
      event: newEvent,
    });
  } catch (err) {
    console.error("Lỗi khi tạo sự kiện:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể tạo sự kiện. Vui lòng liên hệ quản trị viên.",
    });
  }
};

// Cập nhật sự kiện theo ID
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Sự kiện không tồn tại",
      });
    }

    if (event.user.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "Bạn không có quyền cập nhật sự kiện này",
      });
    }

    const { title, start, end, notes } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, start, end, notes },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (err) {
    console.error("Lỗi khi cập nhật sự kiện:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể cập nhật. Vui lòng thử lại sau.",
    });
  }
};

// Xóa sự kiện theo ID
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Sự kiện không tồn tại",
      });
    }

    if (event.user.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "Bạn không có quyền thực hiện hành động này",
      });
    }

    await event.deleteOne();

    return res.status(200).json({
      ok: true,
      event,
    });
  } catch (err) {
    console.error("Lỗi khi xóa sự kiện:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể xóa sự kiện. Vui lòng liên hệ admin.",
    });
  }
};

export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};