import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Compass, ArrowRight, CheckCircle2, MapPin, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-16">
      <Navbar />

      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 text-gray-300 text-sm mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Next-Gen Civic Issue Resolution Platform
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Bridging the Gap Between <span className="text-accent">Citizens</span> & <span className="text-primary">Authorities</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
          Report potholes, garbage dumps, and infrastructure breakdowns instantly with location tracking, image proof, and real-time status updates.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/report')}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Report Issue Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => navigate('/map')}
            className="px-8 py-4 bg-surface border border-white/10 hover:border-primary text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
          >
            <Compass className="w-5 h-5 text-primary" />
            Explore Map
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Precise Geolocation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pinpoint exact civic problems on interactive maps with real-time coordinates and landmark details.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real-time Tracking</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Monitor complaint lifecycles seamlessly from 'Reported' to 'In Progress' and finally 'Resolved'.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Authority Control Panel</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowered local staff and admins with centralized databases and visual image verification.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;