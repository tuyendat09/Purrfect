const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

// Cấu hình AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function resizeImage(fileBuffer) {
  try {
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: 500, withoutEnlargement: true }) // Resize đến kích thước mong muốn
      .toBuffer();
    return resizedImageBuffer;
  } catch (error) {
    console.error("Error resizing image:", error.message);
    throw error;
  }
}

const uploadFileToS3 = async (file) => {
  const resizedImageBuffer = await resizeImage(file.buffer);

  const originalKey = `${uuidv4()}-original-${file.originalname}`;
  const previewKey = `${uuidv4()}-preview-${file.originalname}`;

  const originalParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: originalKey, // Tạo tên file duy nhất
    Body: file.buffer, // Buffer của file
    ContentType: file.mimetype, // MIME type
  };

  const previewParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: previewKey, // Tạo tên file duy nhất
    Body: resizedImageBuffer, // Buffer của file
    ContentType: file.mimetype, // MIME type
  };

  try {
    // Upload song song
    const [originalResult, previewResult] = await Promise.all([
      s3.send(new PutObjectCommand(originalParams)),
      s3.send(new PutObjectCommand(previewParams)),
    ]);

    return {
      originalUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${originalKey}`,
      previewUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${previewKey}`,
    };
  } catch (error) {
    console.error("Upload thất bại:", error);
    throw error;
  }
};

const deleteFileFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey, // Đường dẫn tới file trong bucket
    ACL: "public-read", // Quyền truy cập công khai
  };

  try {
    const command = new DeleteObjectCommand(params);
    const data = await s3.send(command);
    console.log(`File ${fileKey} đã được xóa khỏi S3.`);
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa file khỏi S3:", error);
    throw error;
  }
};

module.exports = { uploadFileToS3, deleteFileFromS3 };
