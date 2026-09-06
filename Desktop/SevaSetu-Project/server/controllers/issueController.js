import Issue from '../models/Issue.js';

// 1. REPORT NEW ISSUE API
export const reportIssue = async (req, res) => {
  try {
    const { title, category, description, latitude, longitude } = req.body;
    let imageUrl = "";

    // Agar multer ne file upload ki hai toh uska path lo
    if (req.file) {
      imageUrl = req.file.path;
    }

    // 🔥 Location ko string format mein save karna kyunki schema string expect karta hai
    const locationString = `${latitude}, ${longitude}`;

    const newIssue = new Issue({
      title,
      category,
      description,
      location: locationString,
      status: 'Reported',
      imageUrl
    });

    await newIssue.save();

    res.status(201).json({
      message: "Issue reported successfully!",
      issue: newIssue
    });

  } catch (error) {
    console.error("Report Issue Error Details:", error.message || error);
    res.status(500).json({ message: "Failed to report issue. Please try again.", error: error.message });
  }
};