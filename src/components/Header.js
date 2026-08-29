// Header component


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === null ? true : saved === 'true';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      document.body.classList.add('dark-mode');
      root.classList.add('dark-preload');
    } else {
      document.body.classList.remove('dark-mode');
      root.classList.remove('dark-preload');
    }
    // Clear the inline background set by the pre-paint script so the
    // stylesheet's theme variables take over.
    root.style.backgroundColor = '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header className="header-bar">
      <div className="header-content">
        <Link to="/" className="site-title">Anantashayana</Link>
        <div className="header-right">
          {isMobile ? (
            <>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Open menu"
              >
                ☰
              </button>
              <button
                className="dark-mode-toggle"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle dark mode"
                style={{ marginLeft: '10px' }}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              {menuOpen && (
                <div className="mobile-menu" style={{ marginTop: '10px' }}>
                  <Navigation />
                </div>
              )}
            </>
          ) : (
            <>
              <Navigation />
              <button
                className="dark-mode-toggle"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
