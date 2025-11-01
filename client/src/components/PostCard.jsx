import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/posts/${post.id}`}>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 line-clamp-2 mb-3">{post.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              post.type === 'job'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {post.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gradient-to-r from-teal-50 to-purple-50 text-purple-700 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{post.budget}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{post.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{post.createdAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{post.applicants} applicants</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
