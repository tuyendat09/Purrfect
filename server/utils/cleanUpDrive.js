// cleanupDrive.js
const { google } = require("googleapis");
const path = require("path");

// ====== CONFIG ======
const KEY_PATH = path.join(__dirname, "../apikey.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// =====================

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

// === Liệt kê tất cả file trong Drive của service account ===
async function listAllFiles() {
  let pageToken = null;
  let allFiles = [];

  do {
    const res = await drive.files.list({
      pageSize: 100,
      fields: "nextPageToken, files(id, name, mimeType, parents, createdTime)",
      pageToken,
    });

    const files = res.data.files || [];
    allFiles = allFiles.concat(files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return allFiles;
}

// === Xóa file theo ID ===
async function deleteFile(fileId) {
  try {
    await drive.files.delete({ fileId });
    console.log(`🗑️ Deleted: ${fileId}`);
  } catch (err) {
    console.error(`❌ Failed to delete ${fileId}: ${err.message}`);
  }
}

// === MAIN ===
(async () => {
  try {
    console.log(
      "🔍 Đang lấy danh sách file trong Google Drive của service account..."
    );
    const files = await listAllFiles();

    if (files.length === 0) {
      console.log("✅ Không có file nào trong Drive.");
      return;
    }

    console.log(`📦 Tổng số file tìm thấy: ${files.length}`);
    files.forEach((f, i) => {
      console.log(`${i + 1}. ${f.name} (${f.id})`);
    });

    console.log("\n⚠️ Chuẩn bị xóa tất cả file này...");
    console.log("⏳ Đang xóa...\n");

    for (const f of files) {
      await deleteFile(f.id);
    }

    console.log(
      "\n✅ Hoàn tất! Toàn bộ file đã bị xóa khỏi Drive của service account."
    );
  } catch (err) {
    console.error("❌ Lỗi khi cleanup:", err.message);
  }
})();
