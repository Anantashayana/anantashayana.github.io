import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';

const BLOGS_PATH = process.env.PUBLIC_URL + '/blogs';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      // Fetch manifest to get blog folder names
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
              tags = tags.split(',').map((t) => t.trim());
            }
            // Only the front matter is needed for the list view — skip
            // rendering the full markdown body here for performance.
            return {
              ...parsed.attributes,
              tags,
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

  // Unique tags across all posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags && post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="blog-page">
      <h2 className="blog-page__title">Blogs</h2>

      {allTags.length > 0 && (
        <div className="blog-filter">
          <span className="blog-filter__label">Filter by tag:</span>
          <button
            className={`blog-tag ${!selectedTag ? 'blog-tag--active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`blog-tag ${selectedTag === tag ? 'blog-tag--active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className={`posts-grid${filteredPosts.length === 1 ? ' single-post' : ''}`}>
        {filteredPosts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <Link
              to={`/post/${post.filename.replace('.md', '')}`}
              key={post.filename}
              className="blog-card-link"
            >
              <div className="blog-post-card">
                <h3>{post.title}</h3>
                <div className="blog-card__meta">
                  <span className="blog-card__date">
                    {post.date ? new Date(post.date).toLocaleDateString() : ''}
                  </span>
                  {post.tags && (
                    <div className="blog-card__tags">
                      {post.tags.map((tag) => (
                        <span
                          className="blog-tag"
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(tag);
                          }}
                        >
                          {tag}
                        </span>
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
