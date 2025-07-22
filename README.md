# 📅 Event Calendar

Ứng dụng web quản lý sự kiện cho phép người dùng thêm, chỉnh sửa, xóa hoặc xem các sự kiện cá nhân và từ người khác. Phát triển dựa trên MERN Stack (MongoDB, Express, React, Node.js).

---

## Các tính năng nổi bật:

Đăng ký / đăng nhập

Tạo, chỉnh sửa, xóa sự kiện (CRUD)

Giao diện lịch

Quản lý phiên đăng nhập bằng JWT

State quản lý với Redux

## 🔗 Thử bản demo
(Bạn có thể để trống hoặc cập nhật link khi có bản deploy)

📃 Mục lục
Bắt đầu 🚀

Yêu cầu trước 📋

Cài đặt 🔧

Triển khai 📦

Công nghệ sử dụng 🛠️

🚀 Bắt đầu
📋 Yêu cầu trước
Git

Node.js & npm

MongoDB Atlas hoặc MongoDB local

🔧 Cài đặt
1. Clone dự án
bash
Sao chép
Chỉnh sửa
git clone https://github.com/tunglamp08072005/event-calender.git
cd event-calender
2. Cài đặt phía server
bash
Sao chép
Chỉnh sửa
cd server
npm install
cp .env.example .env
Thiết lập file .env cho server:

env
Sao chép
Chỉnh sửa
PORT=5000
MONGODB_CNN=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET_KEY=yourSecretKey
3. Cài đặt phía client
bash
Sao chép
Chỉnh sửa
cd ../client
npm install
cp .env.example .env
Thiết lập file .env cho client:

env
Sao chép
Chỉnh sửa
REACT_APP_API_URL=http://localhost:5000/api
📦 Triển khai
Chạy server:
bash
Sao chép
Chỉnh sửa
cd server
npm start
Chạy client (ở terminal khác):
bash
Sao chép
Chỉnh sửa
cd client
npm start
Truy cập: http://localhost:3000

🛠️ Công nghệ sử dụng
⚛️ React – Giao diện người dùng

🔁 Redux – Quản lý trạng thái

🟢 Node.js – Môi trường chạy JavaScript phía backend

⚙️ Express.js – Framework backend

🍃 MongoDB – Cơ sở dữ liệu NoSQL

🔐 JWT (JSON Web Token) – Xác thực người dùng

✍️ Được phát triển bởi
Phạm Tùng Lâm
📍 https://github.com/tunglamp08072005
