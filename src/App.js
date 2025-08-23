// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Post from './pages/Post';
import './App.css';

// Use HashRouter for GitHub Pages compatibility
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:category" element={<Blog />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </HashRouter>
  );
}

export default App;
