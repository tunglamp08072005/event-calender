const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (_, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
