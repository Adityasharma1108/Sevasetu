const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true }, // Yahan hum 'fitness.mp4' ya cloud link daalenge
  category: { type: String, required: true }, // e.g., 'Strength', 'Cardio', 'Yoga'
  requiredPlan: { type: String, default: 'free' } // 'free', 'basic_149', 'pro_299'
});

module.exports = mongoose.model('Video', VideoSchema);