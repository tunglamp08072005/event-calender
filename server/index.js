const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Database connection
const dbConnection = require("./database/config");

// Initialize app
const app = express();

// Connect to DB
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON body
app.use(express.static("public")); // Serve static files

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events.js"));

// SPA fallback route
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SERVER LISTENING ON PORT ${port}`);
});
