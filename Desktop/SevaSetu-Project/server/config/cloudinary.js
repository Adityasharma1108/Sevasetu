import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Agar 'uploads' folder nahi hai, toh code khud-ba-khud bana lega
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Local storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

export const upload = multer({ storage: storage });