// Header component


import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

const Header = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <header className="header-bar">
      <div className="header-content">
        <h1 className="site-title">Anantashayana</h1>
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
