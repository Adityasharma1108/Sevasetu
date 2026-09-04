import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, User, LayoutDashboard } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-surface/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">SevaSetu</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/map" className="hover:text-primary transition-colors">Map Explorer</Link>
        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
        {token && (
          <>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/report" className="hover:text-primary transition-colors">Report Issue</Link>
          </>
        )}
      </div>

      {/* Auth Actions / Logout Button */}
      <div className="flex items-center gap-3">
        {token ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 hidden sm:inline-block flex items-center gap-1">
              <User className="w-4 h-4 text-primary" /> {user.name || 'User'}
            </span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-all text-sm font-medium cursor-pointer flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-white hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-sm font-medium text-white rounded-xl transition-all shadow-lg shadow-primary/25"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;