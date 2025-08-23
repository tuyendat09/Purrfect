exports.getEmbedCLIP = async (file) => {
  const response = await fetch("http://localhost:8000/encode-image", {
    method: "POST",
    body: file.buffer,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });

  const responseJSON = await response.json();
  return responseJSON;
};
