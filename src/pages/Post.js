import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fm from 'front-matter';
import { renderMarkdown } from '../utils/markdown';

const BLOGS_PATH = '/blogs';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BLOGS_PATH}/${id}/index.md`);
        const text = await res.text();
        const parsed = fm(text);
        let tags = parsed.attributes.tags;
        if (typeof tags === 'string') {
          tags = tags.split(',').map(t => t.trim());
        }
        const html = renderMarkdown(parsed.body, `${BLOGS_PATH}/${id}`);
        setPost({
          ...parsed.attributes,
          tags,
          body: html,
          filename: `${id}/index.md`,
        });
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!post) {
    return (
      <div className="post-not-found">
        <h1>Post not found</h1>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="post-page">
      <header className="post-header">
        <Link to="/blog" className="back-link">← Back to Blog</Link>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
        </div>
        {post.tags && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
};

export default Post;
