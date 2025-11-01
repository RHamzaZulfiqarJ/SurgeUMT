import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { addPost } from '../utils/storage';

export default function CreatePost() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'job',
    budget: '',
    location: 'Remote',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  if (!user || user.role !== 'finder') {
    navigate('/dashboard');
    return null;
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.tags.length === 0) {
      alert('Please add at least one skill tag');
      return;
    }

    const newPost = addPost({
      ...formData,
      finderId: user.id
    });

    navigate(`/posts/${newPost.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-purple-600 p-2 rounded-lg">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'job' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === 'job'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">Job Opening</div>
                    <div className="text-xs text-gray-600 mt-1">Full-time or part-time position</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'collaboration' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === 'collaboration'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">Collaboration</div>
                    <div className="text-xs text-gray-600 mt-1">Project-based work</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g., Senior React Developer Needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., $80k - $120k or $5k project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., Remote, New York, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills *
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Add a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-gradient-to-r from-teal-50 to-purple-50 text-purple-700 rounded-lg text-sm font-medium flex items-center space-x-2"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:bg-purple-200 rounded-full p-1 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Create Post
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
