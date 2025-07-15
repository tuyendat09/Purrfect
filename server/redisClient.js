// redisClient.js
const Redis = require('ioredis');

const redisClient = new Redis(); // mặc định localhost:6379

redisClient.on('connect', () => {
  console.log('✅ ioredis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ ioredis connection error:', err);
});

module.exports = redisClient;
