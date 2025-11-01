import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Star } from 'lucide-react';
import { getPostById, getApplications } from '../utils/storage';
import { getCurrentUser } from '../utils/auth';
import { mockUsers } from '../data/mockData';
import { calculateMatchScore, parseResume } from '../utils/matching';

export default function Applicants() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const post = getPostById(postId);
  const applications = getApplications(parseInt(postId));

  if (!user || user.role !== 'finder') {
    navigate('/dashboard');
    return null;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link to="/dashboard" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const applicantsWithDetails = applications.map(app => {
    const seeker = mockUsers.find(u => u.id === app.seekerId);
    const skills = parseResume(app.resumeText || seeker?.resume || '');
    const matchScore = calculateMatchScore(skills, post.tags);

    return {
      ...app,
      seeker,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to={`/posts/${postId}`}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Post</span>
          </Link>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-gray-600">
              {applications.length} {applications.length === 1 ? 'Applicant' : 'Applicants'}
            </p>
          </div>

          {applicantsWithDetails.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No applicants yet</h2>
              <p className="text-gray-600">Check back later to see who applies!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applicantsWithDetails.map((applicant, idx) => (
                <motion.div
                  key={applicant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={applicant.seeker?.avatar}
                        alt={applicant.seeker?.name}
                        className="w-16 h-16 rounded-full border-2 border-purple-500"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {applicant.seeker?.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{applicant.seeker?.email}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Applied {applicant.appliedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1">
                        <Star className={`w-5 h-5 ${applicant.matchScore >= 70 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        <span className={`text-lg font-bold ${
                          applicant.matchScore >= 70 ? 'text-green-600' :
                          applicant.matchScore >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {applicant.matchScore}%
                        </span>
                      </div>
                      <Link
                        to={`/chat/${applicant.seeker?.id}`}
                        className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </Link>
                    </div>
                  </div>

                  {applicant.message && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Cover Message:</p>
                      <p className="text-gray-600">{applicant.message}</p>
                    </div>
                  )}

                  {applicant.seeker?.skills && applicant.seeker.skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.seeker.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              post.tags.map(t => t.toLowerCase()).includes(skill.toLowerCase())
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
