import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { login } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const quickLogin = (email, password) => {
    setFormData({ email, password });
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-purple-600 p-3 rounded-xl mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Quick login for demo:</p>
            <div className="space-y-2">
              <button
                onClick={() => quickLogin('finder@test.com', 'password')}
                className="w-full py-2 px-4 border-2 border-teal-500 text-teal-700 rounded-lg hover:bg-teal-50 transition-all text-sm font-medium"
              >
                Login as Talent Finder
              </button>
              <button
                onClick={() => quickLogin('seeker@test.com', 'password')}
                className="w-full py-2 px-4 border-2 border-purple-500 text-purple-700 rounded-lg hover:bg-purple-50 transition-all text-sm font-medium"
              >
                Login as Talent Seeker
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-medium hover:text-purple-700">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
