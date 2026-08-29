// src/components/Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/projects', label: 'Projects' },
    { path: '/bookshelf', label: 'Bookshelf' },
    // Blog is also active on individual post pages (/post/:id)
    { path: '/blog', label: 'Blog', match: ['/blog', '/post'] }
  ];

  const { pathname } = location;

  const isActive = (item) => {
    if (item.path === '/') return pathname === '/';
    const prefixes = item.match || [item.path];
    return prefixes.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    );
  };

  return (
    <nav className="navigation">
      <ul className="nav-list open">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${isActive(item) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
