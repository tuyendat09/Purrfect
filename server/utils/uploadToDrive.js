const { Readable } = require("stream");
const { google } = require("googleapis");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const SCOPE = ["https://www.googleapis.com/auth/drive"];

// === Thêm hình vào Google Drive ===
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../apikey.json"), // Path to service account key file
  scopes: SCOPE,
});

function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

function prepareImageUrl(fileId) {
  const publicUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return publicUrl;
}

async function makeFilePublic(fileId) {
  try {
    const drive = google.drive({ version: "v3", auth });

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader", // Allows read access
        type: "anyone", // Anyone can access the file
      },
    });

    await drive.files.get({
      fileId: fileId,
      fields: "webViewLink",
    });
  } catch (error) {
    console.error("Error making file public:", error.message);
    throw error;
  }
}

async function resizeImage(fileBuffer) {
  try {
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: 500, withoutEnlargement: true })
      .toBuffer();
    return resizedImageBuffer;
  } catch (error) {
    console.error("Error resizing image:", error.message);
    throw error;
  }
}

exports.uploadFileToDrive = async (
  file,
  folderId = "1h_2FY-jBGGpJjmn727QR3V7U1STc8YvP"
) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const originalBuffer = file.buffer;
    const resizedBuffer = await resizeImage(file.buffer);

    // Generate unique filenames
    const baseName = file.originalname.replace(/\.[^/.]+$/, ""); // Remove extension
    const extension = path.extname(file.originalname);
    const originalFileName = `${uuidv4()}-${baseName}-original${extension}`;
    const previewFileName = `${uuidv4()}-${baseName}-preview${extension}`;

    // Metadata and media for both files
    const files = [
      {
        name: originalFileName,
        buffer: originalBuffer,
      },
      {
        name: previewFileName,
        buffer: resizedBuffer,
      },
    ];

    // Upload both files concurrently
    const uploadPromises = files.map(async (item) => {
      const fileMetadata = {
        name: item.name,
        parents: [folderId],
      };

      const media = {
        mimeType: file.mimetype,
        body: bufferToStream(item.buffer),
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: "id",
      });

      const fileId = response.data.id;
      await makeFilePublic(fileId);

      const publicUrl = prepareImageUrl(fileId);

      return publicUrl;
    });

    const [originalUrl, previewUrl] = await Promise.all(uploadPromises);

    return {
      originalUrl,
      previewUrl,
    };
  } catch (error) {
    console.error("Error uploading files to Google Drive:", error.message);
    throw error;
  }
};

async function uploadToProfilePicutreToDrive(
  newFile,
  folderId = "1PLTgeqEZsnOX_vYoWqWYvsmiSiJKuu3J"
) {
  const drive = google.drive({ version: "v3", auth });
  const resizedBuffer = await resizeImage(newFile.buffer);

  const baseName = newFile.originalname.replace(/\.[^/.]+$/, "");
  const extension = path.extname(newFile.originalname);
  const finalFileName = `${uuidv4()}-${baseName}-profile${extension}`;

  const fileMetadata = {
    name: finalFileName,
    parents: [folderId],
  };

  const media = {
    mimeType: newFile.mimetype,
    body: bufferToStream(resizedBuffer),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  const fileId = response.data.id;

  return fileId;
}

async function deleteFile(fileId) {
  if (!fileId) return;
  const drive = google.drive({ version: "v3", auth });
  try {
    await drive.files.delete({ fileId });
  } catch (error) {
    console.warn("Không thể xóa ảnh cũ:", error.message);
  }
}

exports.handleUpdateUserImage = async (newFile) => {
  try {
    const fileId = await uploadToProfilePicutreToDrive(newFile);
    await makeFilePublic(fileId);
    const publicUrl = prepareImageUrl(fileId);

    return publicUrl;
  } catch (error) {
    console.error("Error updating user image:", error.message);
    throw error;
  }
};
