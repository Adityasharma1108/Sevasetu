import { motion } from 'framer-motion';
import { MapPin, Camera, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function About() {
  const steps = [
    {
      icon: MapPin,
      title: "1. Spot the Issue",
      description: "Detect a civic issue in your locality like a pothole, water leakage, or broken streetlight. Our app automatically picks up your live location.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Camera,
      title: "2. Capture & Describe",
      description: "Click a clear photo of the problem as proof and write a short description so authorities know exactly what needs to be fixed.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Send,
      title: "3. Submit the Report",
      description: "Hit submit and your issue is directly routed to the local municipal dashboard. You can track its live status on your profile.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: ShieldCheck,
      title: "4. Fast Resolution",
      description: "Once the authorities fix the issue, the status updates to 'Resolved'. You contribute to making your city a better place!",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <Navbar />
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="pt-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">SevaSetu</span> Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Bridging the gap between citizens and authorities. A simple, transparent, and fast way to resolve local civic issues.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="glass-panel p-8 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              {/* Subtle background icon for design */}
              <step.icon className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-5 ${step.color} transform group-hover:scale-110 transition-transform duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-6`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-surface/50 to-surface/80 border border-white/10 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center glass-panel"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to make an impact?</h2>
          <p className="text-gray-400 mb-8 max-w-xl">
            Your single report can save lives, prevent accidents, and keep your community clean. Let's build a better city together.
          </p>
          <Link to="/report-issue">
            <button className="flex items-center gap-2 bg-primary px-8 py-4 rounded-xl font-semibold text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1">
              Report an Issue Now <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default About;