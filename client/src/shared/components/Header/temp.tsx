

 async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8888/api/element/upload", {
        method: "POST",
        body: formData,
        // Không set Content-Type, fetch tự thêm
      });

      const data = await res.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Upload error:", error);
    }

    e.target.value = ""; // reset input
  }