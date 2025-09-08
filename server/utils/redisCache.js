const redis = require("../redisClient");

exports.getCacheKey = (filter, sort, page, limit) => {
  const keyObj = { filter, sort, page, limit };
  return JSON.stringify(keyObj);
};

exports.getOrSetCache = async (
  userId,
  field,
  fetchFn,
  ttl = 300,
  forceRefresh = false
) => {
  const key = `user:${userId}`;

  if (!forceRefresh) {
    const cached = await redis.hget(key, field);
    if (cached) {
      console.log(`📌 Cache hit: ${field} for user ${userId}`);
      return JSON.parse(cached);
    }
  }

  console.log(`⚡ Cache fetch: ${field} for user ${userId}`);
  const data = await fetchFn();
  if (!data) return null;

  await redis.hset(key, field, JSON.stringify(data));
  await redis.expire(key, ttl);

  return data;
};
