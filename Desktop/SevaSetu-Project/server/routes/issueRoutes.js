import express from 'express';
import { reportIssue, getAllIssues, updateIssueStatus } from '../controllers/issueController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Route for reporting issue
router.post('/report', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.warn("⚠️ Warning: Image upload skipped due to middleware error:", err.message);
      req.file = undefined; 
    }
    next();
  });
}, reportIssue);

// Route for getting all issues
router.get('/', getAllIssues);

// Route for updating issue status (Middleware hata diya hai taaki bina token ke turant chale)
router.put('/:id/status', updateIssueStatus);

export default router;