import { mockPosts, mockApplications, mockMessages } from '../data/mockData';

const STORAGE_KEYS = {
  POSTS: 'talent_posts',
  APPLICATIONS: 'talent_applications',
  MESSAGES: 'talent_messages'
};

const initializeStorage = (key, defaultData) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultData));
  }
};

initializeStorage(STORAGE_KEYS.POSTS, mockPosts);
initializeStorage(STORAGE_KEYS.APPLICATIONS, mockApplications);
initializeStorage(STORAGE_KEYS.MESSAGES, mockMessages);

export const getPosts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
};

export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find(p => p.id === parseInt(id));
};

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: Math.max(...posts.map(p => p.id), 0) + 1,
    createdAt: new Date().toISOString().split('T')[0],
    applicants: 0
  };
  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return newPost;
};

export const getApplications = (postId = null) => {
  const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  return postId ? applications.filter(a => a.postId === parseInt(postId)) : applications;
};

export const addApplication = (application) => {
  const applications = getApplications();
  const newApplication = {
    ...application,
    id: Math.max(...applications.map(a => a.id), 0) + 1,
    appliedAt: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  applications.push(newApplication);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));

  const posts = getPosts();
  const postIndex = posts.findIndex(p => p.id === application.postId);
  if (postIndex !== -1) {
    posts[postIndex].applicants = (posts[postIndex].applicants || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }

  return newApplication;
};

export const getMessages = (userId1, userId2) => {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  return messages.filter(m =>
    (m.from === userId1 && m.to === userId2) || (m.from === userId2 && m.to === userId1)
  ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

export const addMessage = (message) => {
  const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  const newMessage = {
    ...message,
    id: Math.max(...messages.map(m => m.id), 0) + 1,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  return newMessage;
};
