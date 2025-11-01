import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { getPosts } from '../utils/storage';
import PostCard from '../components/PostCard';

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const posts = getPosts();

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || post.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Opportunities</h1>
          <p className="text-gray-600">Find your next collaboration or career move</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
              >
                <option value="all">All Types</option>
                <option value="job">Jobs</option>
                <option value="collaboration">Collaborations</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Quick filters:</span>
            {['React', 'Python', 'UI/UX', 'Node.js'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 bg-gradient-to-r from-teal-50 to-purple-50 text-purple-700 rounded-full text-xs font-medium hover:shadow-md transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <PostCard key={post.id} post={post} delay={idx * 0.05} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No posts found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
