import { mockUsers } from '../data/mockData';

export const login = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    const userData = { ...user };
    delete userData.password;
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true, user: userData };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const signup = (email, password, role, name) => {
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: 'Email already exists' };
  }

  const newUser = {
    id: mockUsers.length + 1,
    email,
    role,
    name,
    avatar: '',
    skills: [],
    ...(role === 'finder' ? { company: '' } : { resume: '' })
  };

  mockUsers.push({ ...newUser, password });
  localStorage.setItem('user', JSON.stringify(newUser));
  return { success: true, user: newUser };
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const updateUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};
