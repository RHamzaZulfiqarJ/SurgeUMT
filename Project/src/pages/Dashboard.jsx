import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { getPosts, getApplications } from '../utils/storage';
import { Briefcase, FileText, Users, Plus } from 'lucide-react';
import PostCard from '../components/PostCard';

export default function Dashboard() {
  const user = getCurrentUser();
  const posts = getPosts();
  const applications = getApplications();

  const userPosts = user.role === 'finder'
    ? posts.filter(p => p.finderId === user.id)
    : posts.slice(0, 6);

  const userApplications = user.role === 'seeker'
    ? applications.filter(a => a.seekerId === user.id)
    : [];

  const stats = user.role === 'finder'
    ? [
        { label: 'Active Posts', value: userPosts.length, icon: Briefcase, color: 'from-teal-500 to-teal-600' },
        { label: 'Total Applicants', value: userPosts.reduce((sum, p) => sum + p.applicants, 0), icon: Users, color: 'from-purple-500 to-purple-600' },
        { label: 'Posts This Month', value: userPosts.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, icon: FileText, color: 'from-pink-500 to-pink-600' }
      ]
    : [
        { label: 'Applications Sent', value: userApplications.length, icon: FileText, color: 'from-teal-500 to-teal-600' },
        { label: 'Active Posts', value: posts.length, icon: Briefcase, color: 'from-purple-500 to-purple-600' },
        { label: 'Profile Views', value: 47, icon: Users, color: 'from-pink-500 to-pink-600' }
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            {user.role === 'finder'
              ? 'Manage your job posts and connect with talented individuals'
              : 'Discover opportunities that match your skills'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.role === 'finder' ? 'Your Posts' : 'Recommended For You'}
          </h2>
          {user.role === 'finder' ? (
            <Link
              to="/create-post"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </Link>
          ) : (
            <Link
              to="/posts"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View All Posts →
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post, idx) => (
            <PostCard key={post.id} post={post} delay={idx * 0.1} />
          ))}
        </div>

        {userPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {user.role === 'finder'
                ? 'No posts yet. Create your first post to get started!'
                : 'No posts available right now. Check back soon!'}
            </p>
            {user.role === 'finder' && (
              <Link
                to="/create-post"
                className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Create Your First Post
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
