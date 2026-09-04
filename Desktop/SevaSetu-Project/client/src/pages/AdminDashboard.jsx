import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle, Clock, Trash2, MapPin, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import axios from 'axios';

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Saare issues fetch karna
  const fetchAllIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/issues', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setIssues(response.data);
    } catch (err) {
      console.error("Error fetching admin issues:", err);
      toast.error("Failed to load issues for admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

  // Issue status update karna (URL ab backend ke `/:id/status` se match karta hai)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/issues/${id}/status`, { status: newStatus }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success(`Issue status updated to ${newStatus}! ✅`);
      fetchAllIssues(); // Refresh list
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update issue status.");
    }
  };

  // Issue delete karna
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/issues/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("Issue deleted successfully! 🗑️");
      setIssues(issues.filter(issue => issue._id !== id));
    } catch (err) {
      console.error("Error deleting issue:", err);
      toast.error("Failed to delete issue.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-primary" /> Admin Control Panel
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage, review, and update civic issues reported by citizens.</p>
          </div>
          <div className="bg-surface border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
            Total Issues: <span className="text-primary font-bold">{issues.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : issues.length === 0 ? (
          <div className="glass-panel text-center py-16 text-gray-400">
            <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-3" />
            <p className="text-lg font-medium">No civic issues reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <motion.div 
                key={issue._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                      {issue.category || 'General'}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                      issue.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                      issue.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {issue.status === 'Resolved' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {issue.status || 'Pending'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{issue.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{issue.description}</p>

                  {issue.latitude && issue.longitude && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <select
                    value={issue.status || 'Pending'}
                    onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
                    className="bg-surface border border-white/10 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-all cursor-pointer"
                    title="Delete Issue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;