import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Activity, CheckCircle2, Clock, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { API_URL } from '../api'; // 🔥 API URL imported

function Dashboard() {
  const [userCity, setUserCity] = useState("Detecting your location...");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            
            const address = res.data.address;
            const detectedCity = address.city || address.town || address.village || address.county || "Unknown Area";
            const state = address.state || "";
            
            setUserCity(`${detectedCity}, ${state}`);
            setIsLoadingLocation(false);
          } catch (error) {
            console.error("Geocoding Error:", error);
            setUserCity("Location tracing failed");
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Location Permission Denied:", error);
          setUserCity("Location access denied by user");
          setIsLoadingLocation(false);
        }
      );
    } else {
      setUserCity("Geolocation not supported");
      setIsLoadingLocation(false);
    }

    // 🔥 Backend (MongoDB) se Real Issues Fetch Karna using API_URL
    const fetchRealIssues = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/issues`);
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues from backend:", error);
      }
    };

    fetchRealIssues();
  }, []);

  const totalReports = issues.length;
  const resolvedCount = issues.filter(issue => issue.status === 'Resolved').length;
  const pendingCount = issues.filter(issue => issue.status !== 'Resolved').length;

  const stats = [
    { title: `Total Reports in ${userCity.split(',')[0]}`, count: totalReports, icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Resolved Locally", count: resolvedCount, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Pending Action", count: pendingCount, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <Navigation className={`w-4 h-4 ${isLoadingLocation ? 'text-gray-400 animate-pulse' : 'text-primary'}`} />
              <span className={`text-sm font-medium ${isLoadingLocation ? 'text-gray-400' : 'text-primary-glow text-primary'}`}>
                {userCity}
              </span>
            </div>
          </div>
          
          <Link to="/report-issue">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-primary px-5 py-2.5 rounded-xl font-semibold text-white transition-all"
            >
              <PlusCircle className="w-5 h-5" /> Report New Issue
            </motion.button>
          </Link>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 flex items-center gap-4"
            >
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {stat.count}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real Issues List from Database */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Live Issues Near You</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm border-b border-white/10">
                  <th className="p-4 font-medium">Issue Details</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      No civic issues reported in your area yet.
                    </td>
                  </tr>
                ) : (
                  issues.map((issue) => (
                    <tr key={issue._id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-4">
                        <p className="font-semibold text-white group-hover:text-primary transition-colors">{issue.title}</p>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{issue.category}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" /> 
                          {issue.location}
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(issue.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${issue.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                            issue.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
                        >
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Dashboard;