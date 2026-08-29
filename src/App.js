// src/App.js
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Bookshelf from './pages/Bookshelf';
import BookDetail from './pages/BookDetail';
import Blog from './pages/Blog';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
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
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/bookshelf/:slug" element={<BookDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:category" element={<Blog />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
