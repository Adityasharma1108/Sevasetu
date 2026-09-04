import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Agar token hi nahi hai, toh login page par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar route sirf admin ke liye hai aur user admin nahi hai, toh dashboard par bhej do
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Agar sab theek hai, toh component/page dikha do
  return children;
}

export default ProtectedRoute;