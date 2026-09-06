import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, MapPin, Upload, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { API_URL } from '../api';

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pothole',
    description: '',
    latitude: '',
    longitude: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocating(false);
        toast.success("Location captured successfully! 📍");
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocating(false);
        toast.error("Unable to retrieve your location. Please check permissions.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      toast.error("Please capture your location using the map/GPS button.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('latitude', formData.latitude);
    data.append('longitude', formData.longitude);
    if (image) {
      data.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      // 🔥 Corrected endpoint to /api/issues/report
      await axios.post(`${API_URL}/api/issues/report`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success("Civic issue reported successfully! 🚀");
      navigate('/map');
    } catch (err) {
      console.error("Error reporting issue:", err);
      toast.error(err.response?.data?.message || "Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 max-w-xl w-full relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-3">
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Report a Civic Issue</h2>
            <p className="text-gray-400 text-sm mt-1">Help improve your community by reporting local problems.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Issue Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Large Pothole on Main Street"
                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Pothole">Pothole / Road Damage</option>
                  <option value="Garbage">Garbage / Waste Dumping</option>
                  <option value="Streetlight">Broken Streetlight</option>
                  <option value="Water">Water Leakage / Drainage</option>
                  <option value="Other">Other Civic Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location Coordinates</label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locating}
                  className="w-full py-3 px-4 bg-surface/80 hover:bg-surface border border-white/10 rounded-xl text-primary font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                  {formData.latitude ? 'Location Captured ✅' : 'Get Current GPS'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the issue..."
                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image Proof</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl bg-surface/50 text-gray-300 hover:bg-surface cursor-pointer transition-all">
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="text-sm truncate">{image ? image.name : 'Choose photo...'}</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Issue <Send className="w-4 h-4" /></>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ReportIssue;