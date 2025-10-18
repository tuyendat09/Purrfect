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
const connectRedis = require("connect-redis");
const redisClient = require("./redisClient");

const RedisStore = connectRedis(session);

const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "sid",
    secret: "secret_cua_tao",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
      secure: false,
    },
    rolling: true,
  })
);

// === Router Config ===
const authRouter = require("./routes/auth.routes");
const elementRouter = require("./routes/element.routes");
const clusterRouter = require("./routes/cluster.routes");
const userRouter = require("./routes/user.routes");
const checkRole = require("./middleware/checkRole");

// === Security Middleware ===
app.use(helmet()); // Thêm các header bảo mật

// Chống brute-force: giới hạn số request mỗi IP
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 phút
  max: 100, // giới hạn 100 request mỗi IP
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

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

// Need Token
app.use(checkRole([]));
app.use("/api/element", elementRouter);
app.use("/api/cluster", clusterRouter);
app.use("/api/user", userRouter);

// Only Admin Route

// === Error Handler ===
app.use(errorHandler);

// === Export App ===
module.exports = app;
