import Issue from '../models/Issue.js';

// 1. REPORT NEW ISSUE API
export const reportIssue = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;
    let imageUrl = "";

    // Agar multer ne file upload ki hai toh uska path lo
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newIssue = new Issue({
      title,
      category,
      description,
      location,
      status: 'Reported',
      imageUrl
    });

    await newIssue.save();

    res.status(201).json({
      message: "Issue reported successfully!",
      issue: newIssue
    });

  } catch (error) {
    // Yahan humne error ko properly stringify kar diya hai taaki [object Object] na aaye
    console.error("Report Issue Error Details:", error.message || error);
    res.status(500).json({ message: "Failed to report issue. Please try again.", error: error.message });
  }
};

// 2. GET ALL ISSUES API
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    console.error("Fetch Issues Error:", error.message || error);
    res.status(500).json({ message: "Failed to fetch issues." });
  }
};

// 3. UPDATE ISSUE STATUS API (For Admin)
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true } 
    );

    res.status(200).json({ message: "Status updated successfully", issue: updatedIssue });
  } catch (error) {
    console.error("Update Status Error:", error.message || error);
    res.status(500).json({ message: "Failed to update status." });
  }
};