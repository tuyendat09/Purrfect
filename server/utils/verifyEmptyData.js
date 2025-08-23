function verifyEmptyData(data) {
  const CODE = "EMPTY_DATA";

  const isEmpty = (value) =>
    value === undefined || value === null || value === "";

  if (!Array.isArray(data)) {
    for (const key in data) {
      if (isEmpty(data[key])) {
        return { success: false, code: CODE };
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      for (const key in item) {
        if (isEmpty(item[key])) {
          return {
            success: false,
            code: CODE,
          };
        }
      }
    }
  }

  return { success: true };
}

module.exports = verifyEmptyData;
