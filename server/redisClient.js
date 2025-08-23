const Redis = require("ioredis");

const redisClient = new Redis();

redisClient.on("connect", () => {
  console.log("✅ ioredis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ ioredis connection error:", err);
});

module.exports = redisClient;
