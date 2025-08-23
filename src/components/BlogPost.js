// src/components/BlogPost.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  return (
    <article className="blog-post-card">
      <div className="post-header">
        <h2 className="post-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-read-time">{post.readTime}</span>
        </div>
      </div>
      
      <p className="post-excerpt">{post.excerpt}</p>
      
      <div className="post-footer">
        <div className="post-categories">
          {post.categories.map(category => (
            <Link
              key={category}
              to={`/blog/category/${category}`}
              className="category-tag"
            >
              #{category}
            </Link>
          ))}
        </div>
        <Link to={`/post/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
