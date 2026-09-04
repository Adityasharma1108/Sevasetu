import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Reported' },
  imageUrl: { type: String, default: "" } // <-- YEH NAYI LINE ADD KI HAI
}, { timestamps: true });

export default mongoose.model('Issue', issueSchema);