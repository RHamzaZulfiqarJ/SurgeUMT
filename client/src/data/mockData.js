export const mockUsers = [
  {
    id: 1,
    email: 'finder@test.com',
    password: 'password',
    role: 'finder',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    company: 'TechCorp',
    skills: ['React', 'Node.js', 'Leadership', 'Product Management']
  },
  {
    id: 2,
    email: 'seeker@test.com',
    password: 'password',
    role: 'seeker',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'UI/UX'],
    resume: 'Experienced frontend developer with 5+ years working with React, JavaScript, TypeScript, CSS, and modern UI/UX principles. Built scalable applications for Fortune 500 companies.'
  },
  {
    id: 3,
    email: 'jane@test.com',
    password: 'password',
    role: 'seeker',
    name: 'Jane Smith',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    resume: 'Backend engineer specializing in Python, Django, PostgreSQL, and AWS cloud infrastructure.'
  }
];

export const mockPosts = [
  {
    id: 1,
    finderId: 1,
    title: 'Senior React Developer Needed',
    description: 'Looking for an experienced React developer to join our team and build cutting-edge web applications. Must have strong knowledge of modern React patterns, hooks, and state management.',
    tags: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Redux'],
    type: 'job',
    budget: '$80k - $120k',
    location: 'Remote',
    createdAt: '2025-10-28',
    applicants: 12
  },
  {
    id: 2,
    finderId: 1,
    title: 'Mobile App Designer',
    description: 'Seeking a talented UI/UX designer for mobile app project. Need someone with great portfolio and Figma skills.',
    tags: ['UI/UX', 'Figma', 'Mobile Design', 'Prototyping'],
    type: 'collaboration',
    budget: '$5k - $10k',
    location: 'Remote',
    createdAt: '2025-10-29',
    applicants: 8
  },
  {
    id: 3,
    finderId: 1,
    title: 'Full Stack Engineer',
    description: 'Join our startup as a full stack engineer. Work with React, Node.js, and PostgreSQL to build innovative products.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    type: 'job',
    budget: '$90k - $130k',
    location: 'San Francisco / Remote',
    createdAt: '2025-10-27',
    applicants: 15
  },
  {
    id: 4,
    finderId: 1,
    title: 'Python Backend Developer',
    description: 'Need experienced backend developer for API development. Django or Flask experience required.',
    tags: ['Python', 'Django', 'Flask', 'REST API', 'PostgreSQL'],
    type: 'collaboration',
    budget: '$60k - $90k',
    location: 'Remote',
    createdAt: '2025-10-26',
    applicants: 10
  }
];

export const mockApplications = [
  {
    id: 1,
    postId: 1,
    seekerId: 2,
    status: 'pending',
    appliedAt: '2025-10-29',
    message: 'I am very interested in this position. I have 5+ years of React experience and would love to discuss further.'
  },
  {
    id: 2,
    postId: 1,
    seekerId: 3,
    status: 'pending',
    appliedAt: '2025-10-28',
    message: 'While my primary focus is backend, I have solid React skills and am eager to learn more.'
  }
];

export const mockMessages = [
  {
    id: 1,
    from: 1,
    to: 2,
    text: 'Hi! I saw your application for the React Developer position.',
    timestamp: '2025-10-30T10:30:00'
  },
  {
    id: 2,
    from: 2,
    to: 1,
    text: 'Hello! Yes, I am very interested in the role.',
    timestamp: '2025-10-30T10:32:00'
  },
  {
    id: 3,
    from: 1,
    to: 2,
    text: 'Great! Can we schedule a call to discuss further?',
    timestamp: '2025-10-30T10:35:00'
  }
];
