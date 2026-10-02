import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fm from 'front-matter';
import { renderMarkdown } from '../utils/markdown';

const BLOGS_PATH = process.env.PUBLIC_URL + '/blogs';

/* ── Table of Contents ── */
const TableOfContents = ({ headings }) => {
  if (!headings || headings.length < 2) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc__title">Contents</p>
      <ol className="toc__list">
        {headings.map((h) => (
          <li key={h.id} className={`toc__item toc__item--h${h.level}`}>
            <a
              href={`#${h.id}`}
              className="toc__link"
              onClick={(e) => handleClick(e, h.id)}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/* ── Post page ── */
const Post = () => {
  const params = useParams();
  const id = params['*']; // full slug e.g. "aws/Big-Data-and-Streaming"
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${BLOGS_PATH}/${id}/index.md`);
        const text = await res.text();
        const parsed = fm(text);
        let tags = parsed.attributes.tags;
        if (typeof tags === 'string')
          tags = tags.split(',').map((t) => t.trim());
        const { html, headings } = renderMarkdown(parsed.body, `${BLOGS_PATH}/${id}`);
        setPost({
          ...parsed.attributes,
          tags,
          body: html,
          headings,
          slug: id,
        });
      } catch (err) {
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="post-page"><p>Loading…</p></div>;

  if (!post) return (
    <div className="post-page">
      <h1>Post not found</h1>
      <Link to="/blog" className="back-link">← Back to Blog</Link>
    </div>
  );

  const categoryHref = post.category
    ? `/blog/category/${encodeURIComponent(post.category)}`
    : '/blog';

  return (
    <article className="post-page">
      <header className="post-header">
        {/* breadcrumb */}
        <nav className="post-breadcrumb">
          <Link to="/blog" className="post-breadcrumb__link">Blog</Link>
          {post.category && (
            <>
              <span className="post-breadcrumb__sep">›</span>
              <Link to={categoryHref} className="post-breadcrumb__link">
                {post.category}
              </Link>
            </>
          )}
        </nav>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          {post.author && <span>By {post.author}</span>}
          {post.date && (
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
          )}
          {post.category && (
            <Link to={categoryHref} className="post-meta__category">
              {post.category}
            </Link>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </header>

      {/* Table of contents */}
      <TableOfContents headings={post.headings} />

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* footer */}
      <footer className="post-footer">
        {post.category && (
          <Link to={categoryHref} className="back-link">
            ← More in {post.category}
          </Link>
        )}
        <Link to="/blog" className="back-link post-footer__all">
          All posts
        </Link>
      </footer>
    </article>
  );
};

export default Post;
