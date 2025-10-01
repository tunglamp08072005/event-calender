// server/index.js - SỬA LẠI TOÀN BỘ
import 'dotenv/config'; // 🆕 PHẢI Ở ĐẦU TIÊN
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 🆕 KIỂM TRA ENV NGAY SAU KHI IMPORT DOTENV
console.log('🔍 Environment check in index.js:');
console.log('PORT:', process.env.PORT);
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY?.length);
console.log('MONGODB_CNN:', process.env.MONGODB_CNN ? '✅ Set' : '❌ Missing');

// 🔹 ES module import cho DB và routes
import dbConnection from './database/config.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import aiRoutes from './routes/ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Connect to DB
dbConnection();

app.use(cors({
  origin: "http://localhost:3000", // client React chạy ở cổng 3000
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-token"],
  credentials: true
}));

app.use(express.json());
app.use(express.static("public"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// SPA fallback route
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server đang chạy trên port ${port}`);
  console.log(`🤖 AI Features: ${process.env.GEMINI_API_KEY ? 'Enabled' : 'Disabled - No API Key'}`);
});