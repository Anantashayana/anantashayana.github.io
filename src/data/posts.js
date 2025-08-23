// src/data/posts.js
export const blogPosts = [
  {
    id: 'getting-started-react',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React development...',
    content: `# Getting Started with React

React is a powerful library for building user interfaces...

## Key Concepts

- Components
- Props
- State
- Hooks`,
    author: 'Your Name',
    date: '2025-01-15',
    categories: ['react', 'javascript', 'tutorial'],
    readTime: '5 min read',
    featured: true
  },
  {
    id: 'css-tips-tricks',
    title: 'CSS Tips and Tricks',
    excerpt: 'Advanced CSS techniques for modern web development...',
    content: `# CSS Tips and Tricks

Here are some advanced CSS techniques...`,
    author: 'Your Name',
    date: '2025-01-10',
    categories: ['css', 'design', 'frontend'],
    readTime: '3 min read',
    featured: false
  }
];

export const categories = [
  'react',
  'javascript',
  'css',
  'tutorial',
  'design',
  'frontend'
];
