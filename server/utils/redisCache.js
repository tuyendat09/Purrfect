exports.getCacheKey = (filter, sort, page, limit) => {
  const keyObj = { filter, sort, page, limit };
  return `elements:${JSON.stringify(keyObj)}`;
};
