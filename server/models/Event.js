// server/models/Event.js - ĐÃ SỬA THÀNH ES MODULES
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề là bắt buộc"],
    },
    start: {
      type: Date,
      required: [true, "Ngày bắt đầu là bắt buộc"],
    },
    end: {
      type: Date,
      required: [true, "Ngày kết thúc là bắt buộc"],
    },
    notes: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Người dùng là bắt buộc"],
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (_, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// 🆕 SỬA THÀNH EXPORT ES MODULES
export default mongoose.model("Event", EventSchema);