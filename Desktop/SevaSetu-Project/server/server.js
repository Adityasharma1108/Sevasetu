import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import issueRoutes from './routes/issueRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// 🔥 Yeh check karein ki .env variables load ho rahe hain ya nahi
console.log("Email User Loaded:", process.env.EMAIL_USER ? "Yes ✅" : "No ❌");
console.log("Email Pass Loaded:", process.env.EMAIL_PASS ? "Yes ✅" : "No ❌");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Database Connection & Server Start
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is successfully running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database Connection Failed:", error.message || error);
  });