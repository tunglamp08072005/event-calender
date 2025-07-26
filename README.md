# 📅 Event Calendar

Ứng dụng web quản lý sự kiện cho phép người dùng thêm, chỉnh sửa, xóa hoặc xem các sự kiện cá nhân. Phát triển dựa trên MERN Stack (MongoDB, Express, React, Node.js).

---

## 📃 Mục lục

- [📅 Event Calendar](#-event-calendar)
- [📃 Mục lục](#-mục-lục)  
- [✨ Các tính năng nổi bật](#-các-tính-năng-nổi-bật)  
- [🔗 Hình ảnh của ứng dụng](#-hình-ảnh-của-ứng-dụng)  
- [🚀 Bắt đầu](#-bắt-đầu)  
  - [📋 Yêu cầu trước](#-yêu-cầu-trước)  
  - [🔧 Cài đặt](#-cài-đặt)  
- [📦 Triển khai](#-triển-khai)  
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)  
- [✍️ Được phát triển bởi](#️-được-phát-triển-bởi)  

---

## ✨ Các tính năng nổi bật:

- Đăng ký / đăng nhập  
- Tạo, chỉnh sửa, xóa sự kiện (CRUD)  
- Giao diện lịch  
- Quản lý phiên đăng nhập bằng JWT  
- State quản lý với Redux  

---

## 🔗 Hình ảnh của ứng dụng
<img width="2879" height="1619" alt="image" src="https://github.com/user-attachments/assets/39dc7fce-410e-463b-be54-47b0d8f1eac5" />

---

## 🚀 Bắt đầu

### 📋 Yêu cầu trước

- Git  
- Node.js & npm  
- MongoDB Atlas hoặc MongoDB local  

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

## 🛠️ Công nghệ sử dụng

- ⚛️ React – Giao diện người dùng  
- 🔁 Redux – Quản lý trạng thái  
- 🟢 Node.js – Môi trường chạy JavaScript phía backend  
- ⚙️ Express.js – Framework backend  
- 🍃 MongoDB – Cơ sở dữ liệu NoSQL  
- 🔐 JWT – Xác thực người dùng  

---

## ✍️ Được phát triển bởi

**Phạm Tùng Lâm**  
📍 [https://github.com/tunglamp08072005](https://github.com/tunglamp08072005)
