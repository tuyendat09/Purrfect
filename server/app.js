const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const errorHandler = require("./middleware/errorHandler");
const jsonParser = bodyParser.json();
const session = require("express-session");

// === Router Config ===
const authRouter = require("./routes/auth.routes");

const app = express();

// === Security Middleware ===
app.use(helmet()); // Thêm các header bảo mật

// Chống brute-force: giới hạn số request mỗi IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // giới hạn 100 request mỗi IP
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Express-session config
app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "secret_cua_tao",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Chống NoSQL injection
app.use(mongoSanitize());

// Chống XSS (cross-site scripting)
app.use(xss());

// Chống HTTP parameter pollution
app.use(hpp());

// === Enable CORS ===
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// === Parse JSON body ===
app.use(jsonParser);

// === Route ===
app.use("/api/auth", authRouter);

// === Error Handler ===
app.use(errorHandler);

// === Export App ===
module.exports = app;
