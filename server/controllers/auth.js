// server/controllers/auth.js - ĐÃ SỬA THÀNH ES MODULES
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateJWT } from "../helpers/jwt.js";

// Đăng ký người dùng mới
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "Email này đã được sử dụng",
      });
    }

    const newUser = new User(req.body);

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    const token = await generateJWT(newUser.id, newUser.name);

    return res.status(201).json({
      ok: true,
      user: newUser,
      token,
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      ok: false,
      msg: "Đã xảy ra lỗi, vui lòng liên hệ quản trị viên",
    });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "Không tìm thấy người dùng với email này",
      });
    }

    const isMatch = bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        msg: "Mật khẩu không đúng",
      });
    }

    const token = await generateJWT(existingUser.id, existingUser.name);

    return res.status(200).json({
      ok: true,
      user: existingUser,
      token,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({
      ok: false,
      msg: "Lỗi máy chủ, vui lòng thử lại sau",
    });
  }
};

// Làm mới token
const renewToken = async (req, res) => {
  try {
    const { id, name } = req;
    const token = await generateJWT(id, name);

    return res.status(200).json({
      ok: true,
      user: { _id: id, name },
      token,
    });
  } catch (err) {
    console.error("Error in renewToken:", err);
    return res.status(500).json({
      ok: false,
      msg: "Không thể làm mới token, vui lòng đăng nhập lại",
    });
  }
};

export {
  createUser,
  loginUser,
  renewToken,
};