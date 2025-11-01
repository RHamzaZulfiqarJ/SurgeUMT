import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-teal-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connect Talent
            </span>
            <br />
            <span className="text-gray-900">With Opportunity</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The modern platform where talent seekers meet opportunity finders.
            Match, collaborate, and grow together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/signup?role=seeker"
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Join as Talent Seeker</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/signup?role=finder"
              className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-purple-200 flex items-center justify-center space-x-2"
            >
              <span>Join as Talent Finder</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            {
              icon: Target,
              title: 'Smart Matching',
              description: 'AI-powered algorithm matches skills with opportunities',
              color: 'from-teal-500 to-teal-600'
            },
            {
              icon: Zap,
              title: 'Instant Connect',
              description: 'Real-time chat and collaboration tools',
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: Users,
              title: 'Build Network',
              description: 'Connect with industry professionals',
              color: 'from-pink-500 to-pink-600'
            },
            {
              icon: Shield,
              title: 'Secure Platform',
              description: 'Your data and privacy protected',
              color: 'from-indigo-500 to-indigo-600'
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of professionals already using TalentMatch
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
