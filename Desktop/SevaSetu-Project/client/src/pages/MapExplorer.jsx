import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import L from 'leaflet';
import { Filter } from 'lucide-react';

// Leaflet default marker icon fix for React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapExplorer() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔥 Filter states added
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Backend se issues fetch karna
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/issues');
        setIssues(response.data);
      } catch (err) {
        console.error("Error fetching issues for map:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  // Filter logic apply karna
  const filteredIssues = issues.filter((issue) => {
    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || (issue.status || 'Pending') === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  // Default center coordinates (Delhi/NCR region)
  const defaultCenter = [28.6139, 77.2090]; 

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Civic Map Explorer</h1>
          <p className="text-gray-400 text-sm mt-1">Explore all reported civic issues geographically across the region.</p>
        </div>

        {/* 🔥 Filter Controls UI */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface border border-white/10 px-3 py-2 rounded-xl text-sm text-gray-300">
            <Filter className="w-4 h-4 text-primary" />
            <span>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-surface text-white">All Categories</option>
              <option value="Pothole" className="bg-surface text-white">Pothole</option>
              <option value="Garbage" className="bg-surface text-white">Garbage</option>
              <option value="Streetlight" className="bg-surface text-white">Streetlight</option>
              <option value="Water" className="bg-surface text-white">Water</option>
              <option value="Other" className="bg-surface text-white">Other</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-surface border border-white/10 px-3 py-2 rounded-xl text-sm text-gray-300">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-surface text-white">All Status</option>
              <option value="Pending" className="bg-surface text-white">Pending</option>
              <option value="In Progress" className="bg-surface text-white">In Progress</option>
              <option value="Resolved" className="bg-surface text-white">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 relative">
        <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
          <MapContainer 
            center={defaultCenter} 
            zoom={11} 
            style={{ height: '100%', width: '100%', background: '#0f172a' }}
          >
            {/* OpenStreetMap Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Filtered Map Markers */}
            {filteredIssues.map((issue) => {
              if (!issue.latitude || !issue.longitude) return null;
              return (
                <Marker key={issue._id} position={[issue.latitude, issue.longitude]}>
                  <Popup>
                    <div className="p-1 text-gray-900 min-w-[150px]">
                      <h3 className="font-bold text-base text-gray-900">{issue.title || issue.category}</h3>
                      <p className="text-sm mt-1 text-gray-600">{issue.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                          issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {issue.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapExplorer;