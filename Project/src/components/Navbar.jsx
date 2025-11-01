import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Users, LogOut, Briefcase, User } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-teal-500 to-purple-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              TalentMatch
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/profile'
                    ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>

              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
