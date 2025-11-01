# TalentMatch - Talent Matching Platform

A complete frontend-only web application connecting Talent Seekers and Talent Finders. Built with React, Vite, JavaScript, Tailwind CSS, and Framer Motion.

## Features

- **Dual Role System**: Switch between Talent Finder (hiring) and Talent Seeker (looking for work)
- **Modern Landing Page**: Animated hero section with smooth transitions
- **Authentication**: Fake local authentication with role selection
- **Dashboard**: Different views for Finders vs Seekers with statistics
- **Job Posts Feed**: Search, filter, and browse opportunities
- **Post Details**: View full job descriptions with required skills
- **Smart Matching**: AI-powered match score using Jaccard similarity algorithm
- **Resume Parser**: Auto-extract skills from resume text
- **Application System**: Apply to posts with resume and cover message
- **Applicants View**: Finders can view all applicants with match scores
- **Profile Management**: Update profile, skills, and resume
- **Chat Interface**: Simple local chat simulation between users
- **Responsive Design**: Mobile-friendly UI with smooth animations

## Tech Stack

- React 18
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Framer Motion
- LocalStorage (for data persistence)
- Lucide React (icons)

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Accounts

### Talent Finder Account
- Email: `finder@test.com`
- Password: `password`
- Features: Create posts, view applicants, manage listings

### Talent Seeker Account
- Email: `seeker@test.com`
- Password: `password`
- Features: Browse posts, apply to jobs, view match scores

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Main navigation with glassmorphism
│   ├── MatchScore.jsx        # Animated circular match score
│   └── PostCard.jsx          # Reusable post card component
├── pages/
│   ├── Landing.jsx           # Hero page with animations
│   ├── Login.jsx             # Login with quick demo buttons
│   ├── Signup.jsx            # Signup with role selection
│   ├── Dashboard.jsx         # Different views per role
│   ├── Posts.jsx             # Browse and filter posts
│   ├── PostDetail.jsx        # Full post with apply modal
│   ├── CreatePost.jsx        # Create new job listing
│   ├── Applicants.jsx        # View applicants (Finder only)
│   ├── Profile.jsx           # Profile settings
│   └── Chat.jsx              # Chat interface
├── utils/
│   ├── auth.js               # Mock authentication
│   ├── matching.js           # Match algorithm & resume parser
│   └── storage.js            # LocalStorage management
├── data/
│   └── mockData.js           # Mock users, posts, applications
├── App.jsx                   # Main app with routing
├── main.jsx                  # Entry point
└── index.css                 # Tailwind imports
```

## Key Features Explained

### Match Score Algorithm

Uses Jaccard similarity to compare candidate skills vs. required skills:

```
Match Score = (Matched Skills / Total Unique Skills) × 100
```

- 70%+ = Excellent Match (Green)
- 40-69% = Good Match (Yellow)
- Below 40% = Partial Match (Red)

### Resume Parser

Automatically extracts skills from resume text by matching against a keyword dictionary including:
- Programming languages (React, Python, Java, etc.)
- Frameworks (Django, Node.js, Express, etc.)
- Tools (Docker, AWS, Git, etc.)
- Soft skills (Leadership, Agile, etc.)

### Data Persistence

All data is stored in LocalStorage:
- User authentication state
- Job posts
- Applications
- Chat messages

Data persists across page refreshes but resets if LocalStorage is cleared.

## UI/UX Highlights

- **Gradient Theme**: Teal + Purple gradients throughout
- **Glassmorphism**: Frosted glass effect on navbar
- **Smooth Animations**: Page transitions with Framer Motion
- **Micro-interactions**: Hover effects, scale animations
- **Responsive**: Mobile-first design with Tailwind
- **Accessible**: Proper semantic HTML and ARIA labels

## Workflow

### As a Talent Finder:
1. Sign up or login as Finder
2. View dashboard with your active posts
3. Create new job/collaboration posts
4. View applicants with match scores
5. Chat with potential candidates

### As a Talent Seeker:
1. Sign up or login as Seeker
2. Browse available opportunities
3. View match scores based on your skills
4. Apply with resume and cover message
5. Track your applications

## No Backend Required

This is a fully functional frontend demo using:
- LocalStorage for data persistence
- Mock data arrays
- Client-side routing
- Simulated authentication

Perfect for:
- Prototyping
- Design demos
- Frontend development practice
- Portfolio projects

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT

## Credits

- Icons: Lucide React
- Images: Pexels
- Animations: Framer Motion
- Styling: Tailwind CSS
