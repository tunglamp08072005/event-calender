# 📅 Event Calendar

Ứng dụng web quản lý sự kiện thông minh với tích hợp AI, cho phép người dùng quản lý sự kiện cá nhân một cách thông minh và hiệu quả. Phát triển dựa trên MERN Stack (MongoDB, Express, React, Node.js) và Google Gemini AI.

---

## 🔗 Demo

[![Live Demo](https://img.shields.io/badge/Demo-Event%20Calendar-blue?style=for-the-badge&logo=render)](https://event-calender-1-jitl.onrender.com)
[![AI Powered](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge&logo=google)](https://event-calender-1-jitl.onrender.com)

## 📃 Mục lục

- [📅 Event Calendar](#-event-calendar)
- [📃 Mục lục](#-mục-lục)
- [✨ Các tính năng nổi bật](#-các-tính-năng-nổi-bật)
- [🔗 Hình ảnh của ứng dụng](#-hình-ảnh-của-ứng-dụng)
- [🚀 Bắt đầu](#-bắt-đầu)
- [🤖 Hướng dẫn sử dụng AI](#-hướng-dẫn-sử-dụng-ai)
- [⚠️ Lưu ý quan trọng](#️-lưu-ý-quan-trọng)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [✍️ Được phát triển bởi](#️-được-phát-triển-bởi)

---

## ✨ Các tính năng nổi bật:

- 🔐 **Đăng ký / đăng nhập** với xác thực JWT
- 📝 **CRUD sự kiện** - Tạo, chỉnh sửa, xóa sự kiện
- 🗓️ **Giao diện lịch tương tác** với React Big Calendar
- 🔍 **Tìm kiếm sự kiện** theo tiêu đề
- 💾 **State management** với Redux
- 🧠 **AI-Powered Features:**
  - 🤖 **Gợi ý tiêu đề thông minh**: AI tự động đề xuất tiêu đề sự kiện dựa trên ngữ cảnh
  - 🎯 **Gợi ý sự kiện AI**: Tự động tạo các sự kiện ngẫu nhiên, đa dạng cho tuần tới
  - ⚡ **Tích hợp Google Gemini AI**: Sử dụng model gemini-2.0-flash để tạo nội dung thông minh
  - 🔄 **Fallback system**: Cơ chế dự phòng thông minh khi AI không khả dụng

---

## 🔗 Hình ảnh của ứng dụng
<img width="2879" height="1619" alt="image" src="https://github.com/user-attachments/assets/32cc3608-8366-48da-ad3d-b1f945d644f0" />

---

## 🚀 Bắt đầu

### 📋 Yêu cầu trước

- Git
- Node.js & npm
- MongoDB Atlas hoặc MongoDB local
- Google Gemini API Key (miễn phí)

### 🔧 Cài đặt

#### 1. Clone dự án

```bash
# Sao chép kho lưu trữ này
git clone https://github.com/tunglamp08072005/event-calender.git

# Chuyển đến thư mục dự án
cd event-calender
```

#### 2. Cài đặt phía server

```bash
# Chuyển đến thư mục server
cd server

# Cài đặt các thư viện phụ thuộc
npm install

# Sao chép file .env
cp .env.example .env
```

Thiết lập file `.env` cho server:

```env
PORT=5000
MONGODB_CNN=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET_KEY=yourSecretKey
GEMINI_API_KEY=your_gemini_api_key_here  # 🆕 THÊM API KEY CHO AI
```

#### 3. Cài đặt phía client

```bash
# Chuyển đến thư mục client
cd client

# Cài đặt các thư viện phụ thuộc
npm install

# Sao chép file .env
cp .env.example .env
```

Thiết lập file `.env` cho client:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 Triển khai

Chạy server:

```bash
# Mở terminal trong thư mục dự án và chạy lệnh
cd server
npm start
```

Chạy client (ở terminal khác):

```bash
# Mở một terminal khác trong thư mục dự án và chạy lệnh
cd client
npm start
```

Truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🤖 Hướng Dẫn Sử Dụng Tính Năng AI

### 🎯 Gợi Ý Sự Kiện AI
1. **Mở panel AI**: Nhấp nút "🎯 Gợi ý AI" trên thanh công cụ
2. **Tạo gợi ý**: Nhấp "🎯 Tạo gợi ý thông minh"
3. **Thêm sự kiện**: Nhấp "Thêm vào lịch" trên bất kỳ gợi ý nào
4. **Kết quả**: AI sẽ tạo 5-7 sự kiện đa dạng cho tuần tới

### 🧠 Gợi Ý Tiêu Đề Thông Minh
1. **Tạo sự kiện mới**: Nhấp vào khoảng thời gian trống trên lịch
2. **Nhập ghi chú**: Điền mô tả sự kiện vào ô notes
3. **AI tự động**: Tiêu đề sẽ được gợi ý tự động dựa trên ngữ cảnh

## ⚠️ Lưu Ý Quan Trọng

- 🔑 **API Key**: Cần có Google Gemini API key để sử dụng tính năng AI
- 🌐 **Kết nối Internet**: Tính năng AI yêu cầu kết nối internet ổn định
- ⚡ **Fallback System**: Hệ thống có cơ chế dự phòng nếu AI không khả dụng
- 🔒 **Bảo mật**: API key được lưu trữ an toàn ở phía server

## 🛠️ Công nghệ sử dụng

- ⚛️ React – Giao diện người dùng  
- 🔁 Redux – Quản lý trạng thái  
- 🟢 Node.js – Môi trường chạy JavaScript phía backend  
- ⚙️ Express.js – Framework backend  
- 🍃 MongoDB – Cơ sở dữ liệu NoSQL  
- 🔐 JWT – Xác thực người dùng  
- 🤖 **Google Gemini AI** – AI model cho gợi ý thông minh
- 🎯 **React Big Calendar** – Hiển thị lịch tương tác  

---

## ✍️ Được phát triển bởi

**Phạm Tùng Lâm**  
📍 [https://github.com/tunglamp08072005](https://github.com/tunglamp08072005)
