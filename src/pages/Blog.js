

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';
import { marked } from 'marked';

const BLOGS_PATH = process.env.PUBLIC_URL + '/blogs';


const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      // Fetch manifest.json to get blog folder names
  const manifestRes = await fetch(`${BLOGS_PATH}/blogs.json`);
  const folders = manifestRes.ok ? await manifestRes.json() : [];
      const posts = await Promise.all(
        folders.map(async (folder) => {
          try {
            const res = await fetch(`${BLOGS_PATH}/${folder}/index.md`);
            if (!res.ok) return null;
            const text = await res.text();
            const parsed = fm(text);
            let tags = parsed.attributes.tags;
            if (typeof tags === 'string') {
              tags = tags.split(',').map(t => t.trim());
            }
            return {
              ...parsed.attributes,
              tags,
              body: marked(parsed.body),
              filename: folder,
            };
          } catch (e) {
            return null;
          }
        })
      );
      setPosts(posts.filter(Boolean));
    }
    fetchBlogs();
  }, []);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags && post.tags.includes(selectedTag))
    : posts;

  return (
    <div>
      <h2>Blogs</h2>
      {allTags.length > 0 && (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500 }}>Filter by tag:</span>
          <button
            className="blog-tag"
            style={{ background: selectedTag ? '#e6f2fb' : '#007acc', color: selectedTag ? '#007acc' : '#fff', border: 'none', cursor: 'pointer' }}
            onClick={() => setSelectedTag(null)}
          >All</button>
          {allTags.map(tag => (
            <button
              key={tag}
              className="blog-tag"
              style={{ background: selectedTag === tag ? '#007acc' : '#e6f2fb', color: selectedTag === tag ? '#fff' : '#007acc', border: 'none', cursor: 'pointer' }}
              onClick={() => setSelectedTag(tag)}
            >{tag}</button>
          ))}
        </div>
      )}
  <div className={`posts-grid${filteredPosts.length === 1 ? ' single-post' : ''}`}>
        {filteredPosts.filter(Boolean).length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          filteredPosts.filter(Boolean).map((post) => (
            <Link 
              to={`/post/${post.filename.replace('.md', '')}`} 
              key={post.filename} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="blog-post-card" style={{ cursor: 'pointer' }}>
                <h3>{post.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', flexWrap: 'nowrap', overflowX: 'auto' }}>
                  <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
                  {post.tags && (
                    <div className="blog-tags" style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', overflowX: 'auto', marginTop: 0 }}>
                      {post.tags.map(tag => (
                        <span className="blog-tag" key={tag} onClick={e => { e.preventDefault(); setSelectedTag(tag); }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
