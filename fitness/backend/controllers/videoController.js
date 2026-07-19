const Video = require('../models/Video');
const User = require('../models/User');

exports.getVideos = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let allowedPlans = ['free']; 
    
    if (user.accountType === 'basic_149') {
      allowedPlans.push('basic_149'); 
    } 
    else if (user.accountType === 'premium_299') {
      allowedPlans.push('basic_149', 'premium_299'); 
    }

    const videos = await Video.find({ requiredPlan: { $in: allowedPlans } });
    
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};