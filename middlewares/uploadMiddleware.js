const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// check if cloudinary url is set in env
if (!process.env.CLOUDINARY_URL) {
  console.warn("Warning: CLOUDINARY_URL is missing from environment variables.");
}


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "taskmaster_profiles",
    allowed_formats: ["webp", "jpg", "png", "jpeg", "gif"],
    transformation: [
      {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "face",
      },
    ],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = upload;