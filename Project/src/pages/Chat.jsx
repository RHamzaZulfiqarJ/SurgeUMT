import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { getMessages, addMessage } from '../utils/storage';
import { mockUsers } from '../data/mockData';

export default function Chat() {
  const { userId } = useParams();
  const user = getCurrentUser();
  const otherUser = mockUsers.find(u => u.id === parseInt(userId));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user && userId) {
      const msgs = getMessages(user.id, parseInt(userId));
      setMessages(msgs);
    }
  }, [user, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      from: user.id,
      to: parseInt(userId),
      text: newMessage
    };

    const savedMessage = addMessage(message);
    setMessages([...messages, savedMessage]);
    setNewMessage('');
  };

  if (!user || !otherUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ height: 'calc(100vh - 12rem)' }}
        >
          <div className="bg-gradient-to-r from-teal-500 to-purple-600 p-4 text-white">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="font-semibold">{otherUser.name}</h2>
                <p className="text-sm text-teal-100 capitalize">{otherUser.role}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 20rem)' }}>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isMe = msg.from === user.id;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          isMe
                            ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${isMe ? 'text-teal-100' : 'text-gray-500'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
