// server/middlewares/validateJWT.js - ĐÃ SỬA THÀNH ES MODULES
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const validateJWT = async (req, res, next) => {
  const token = req.get("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // 🆕 THÊM KIỂM TRA USER TỒN TẠI TRONG DATABASE
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Invalid token - user not found",
      });
    }

    req.id = decoded.id;
    req.name = decoded.name;
    req.uid = decoded.id; // 🆕 THÊM ĐỂ ĐỒNG BỘ VỚI CÁC CONTROLLER KHÁC
    req.user = user; // 🆕 THÊM THÔNG TIN USER
    
    next();
  } catch (err) {
    console.error("JWT validation error:", err);
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

export default validateJWT;