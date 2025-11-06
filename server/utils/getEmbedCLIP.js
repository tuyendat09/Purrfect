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

function handleReponse(status, tags, embedding, colors) {
  if (status == "rejected") {
    return { success: false, code: "IMAGE_INVALID" };
  }

  const cleanTagList = cleanTags(tags);

  return { success: true, tags: cleanTagList, embedding, colors };
}

exports.getEmbedCLIP = async (file) => {
  const response = await fetch("http://localhost:8000/process-image", {
    method: "POST",
    body: file.buffer,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });

  const responseJSON = await response.json();
  const { status, tags, embedding, colors } = responseJSON;

  return handleReponse(status, tags, embedding, colors);
};
