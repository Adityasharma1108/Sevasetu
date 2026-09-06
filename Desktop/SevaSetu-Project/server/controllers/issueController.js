import Issue from '../models/Issue.js';

// 1. REPORT NEW ISSUE API
export const reportIssue = async (req, res) => {
  try {
    const { title, category, description, latitude, longitude, location: rawLocation } = req.body;
    let imageUrl = "";

    // Agar multer ne file upload ki hai toh uska path lo
    if (req.file) {
      imageUrl = req.file.path;
    }

    // 🔥 Location ko handle karna (chahe latitude/longitude aayein ya direct location string/object)
    let finalLocation = rawLocation;
    if (!finalLocation && latitude && longitude) {
      // Agar model location ko coordinates array ya object ya string maangta hai, 
      // yahan hum use format kar rahe hain. (Aapke schema ke mutabiq object/array banaya gaya hai)
      finalLocation = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
      
      // NOTE: Agar aapke Issue model mein 'location' ek simple String hai (jaise "lat, lng"), 
      // toh upar wale block ki jagah yeh line use karein:
      // finalLocation = `${latitude}, ${longitude}`;
    }

    const newIssue = new Issue({
      title,
      category,
      description,
      location: finalLocation,
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