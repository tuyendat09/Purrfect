function cleanTags(rawTags) {
  if (!Array.isArray(rawTags)) return [];

  const result = [];
  for (const tag of rawTags) {
    const parts = tag
      .split(",") // tách theo dấu phẩy
      .map((t) => t.trim()) // bỏ khoảng trắng đầu cuối
      .map((t) => t.replace(/^'+|'+$/g, "")) // bỏ dấu nháy đầu cuối
      .filter((t) => t.length > 0); // loại bỏ chuỗi rỗng
    result.push(...parts);
  }
  return result;
}

exports.getEmbedCLIP = async (file) => {
  const response = await fetch("http://localhost:8000/encode-image", {
    method: "POST",
    body: file.buffer,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });

  const responseJSON = await response.json();
  const { embedding, tags } = responseJSON;

  const cleanTagList = cleanTags(tags);

  return {
    embedding,
    tags: cleanTagList,
  };
};
