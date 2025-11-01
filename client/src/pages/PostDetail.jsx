import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Users, ArrowLeft, Send } from 'lucide-react';
import { getPostById, addApplication, getApplications } from '../utils/storage';
import { getCurrentUser } from '../utils/auth';
import { calculateMatchScore, parseResume } from '../utils/matching';
import MatchScore from '../components/MatchScore';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const post = getPostById(id);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumeText, setResumeText] = useState(user?.resume || '');
  const [message, setMessage] = useState('');
  const [matchScore, setMatchScore] = useState(0);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const applications = getApplications(parseInt(id));
    const userApplication = applications.find(a => a.seekerId === user.id);
    setHasApplied(!!userApplication);

    if (user.role === 'seeker' && resumeText) {
      const skills = parseResume(resumeText);
      const score = calculateMatchScore(skills, post?.tags || []);
      setMatchScore(score);
    }
  }, [id, user, resumeText, post, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link to="/posts" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume or skills');
      return;
    }

    const application = {
      postId: post.id,
      seekerId: user.id,
      message,
      resumeText
    };

    addApplication(application);
    setShowApplyModal(false);
    setHasApplied(true);
  };

  const canApply = user?.role === 'seeker' && !hasApplied;
  const isOwner = user?.role === 'finder' && post.finderId === user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/posts"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  post.type === 'job'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {post.type}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              </div>

              {canApply && (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Apply Now</span>
                </button>
              )}

              {hasApplied && (
                <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-medium">
                  Applied ✓
                </div>
              )}

              {isOwner && (
                <Link
                  to={`/applicants/${post.id}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span>View Applicants</span>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">{post.budget}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{post.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Posted {post.createdAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{post.applicants} applicants</span>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{post.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-teal-50 to-purple-50 text-purple-700 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {user?.role === 'seeker' && resumeText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Match Score</h2>
              <div className="flex justify-center">
                <MatchScore score={matchScore} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply to {post.title}</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Your Resume or Skills
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Paste your resume text here or list your skills..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Tell them why you're a great fit..."
              />
            </div>

            {resumeText && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  Match Score: <span className="font-bold text-purple-700">{matchScore}%</span>
                </p>
                <p className="text-xs text-gray-600">
                  Based on your skills vs. required skills
                </p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleApply}
                disabled={!resumeText.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Application
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
