const mongoose = require("mongoose");

// Kết nối tới cơ sở dữ liệu MongoDB
const dbConnection = async () => {
  const mongoURI = process.env.MONGODB_CNN;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info("✅ Đã kết nối tới MongoDB thành công.");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    throw new Error("Không thể kết nối cơ sở dữ liệu. Vui lòng kiểm tra cấu hình.");
  }
};

module.exports = dbConnection;
