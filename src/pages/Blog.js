import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import fm from 'front-matter';
import './Blog.css';

const BLOGS_PATH = process.env.PUBLIC_URL + '/blogs';

const Blog = () => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${BLOGS_PATH}/blogs.json`);
        const slugs = res.ok ? await res.json() : [];
        const fetched = await Promise.all(
          slugs.map(async (slug) => {
            try {
              const r = await fetch(`${BLOGS_PATH}/${slug}/index.md`);
              if (!r.ok) return null;
              const parsed = fm(await r.text());
              let tags = parsed.attributes.tags;
              if (typeof tags === 'string')
                tags = tags.split(',').map((t) => t.trim());
              return {
                ...parsed.attributes,
                tags: tags || [],
                slug,
              };
            } catch {
              return null;
            }
          })
        );
        setPosts(
          fetched
            .filter(Boolean)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // All unique categories (posts without one fall into "Uncategorized")
  const allCategories = Array.from(
    new Set(posts.map((p) => p.category || 'Uncategorized'))
  );

  // Active category — from URL param or null (= show all)
  const activeCategory = categoryParam || null;

  // Posts to show
  const visiblePosts = activeCategory
    ? posts.filter((p) => (p.category || 'Uncategorized') === activeCategory)
    : posts;

  // Group visible posts by category for the "all" view
  const grouped = allCategories.reduce((acc, cat) => {
    const catPosts = visiblePosts.filter(
      (p) => (p.category || 'Uncategorized') === cat
    );
    if (catPosts.length) acc[cat] = catPosts;
    return acc;
  }, {});

  const handleCategoryClick = (cat) => {
    if (cat === activeCategory) {
      navigate('/blog');
    } else {
      navigate(`/blog/category/${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="blog-page">
      {/* ── Header ── */}
      <div className="blog-page__head">
        <h2 className="blog-page__title">Blog</h2>
        {activeCategory && (
          <Link to="/blog" className="blog-page__back">
            ← All posts
          </Link>
        )}
      </div>

      {/* ── Category pills ── */}
      {allCategories.length > 0 && (
        <div className="blog-filter">
          <button
            className={`blog-tag ${!activeCategory ? 'blog-tag--active' : ''}`}
            onClick={() => navigate('/blog')}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`blog-tag ${activeCategory === cat ? 'blog-tag--active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="blog-page__empty">Loading…</p>}

      {/* ── Grouped view (all categories) ── */}
      {!loading && !activeCategory && (
        <>
          {Object.keys(grouped).length === 0 ? (
            <p className="blog-page__empty">No posts yet.</p>
          ) : (
            Object.entries(grouped).map(([cat, catPosts]) => (
              <section key={cat} className="blog-category">
                <div className="blog-category__head">
                  <h3 className="blog-category__name">{cat}</h3>
                  <button
                    className="blog-category__see-all"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {catPosts.length} post{catPosts.length !== 1 ? 's' : ''} →
                  </button>
                </div>
                <div className="posts-grid">
                  {catPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            ))
          )}
        </>
      )}

      {/* ── Filtered view (single category) ── */}
      {!loading && activeCategory && (
        <>
          {visiblePosts.length === 0 ? (
            <p className="blog-page__empty">No posts in this category.</p>
          ) : (
            <div className="posts-grid">
              {visiblePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const PostCard = ({ post }) => (
  <Link
    to={`/post/${post.slug}`}
    className="blog-card-link"
  >
    <div className="blog-post-card">
      <h3>{post.title}</h3>
      {post.description && (
        <p className="blog-card__desc">{post.description}</p>
      )}
      <div className="blog-card__meta">
        <span className="blog-card__date">
          {post.date
            ? new Date(post.date).toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </span>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.map((tag) => (
              <span className="blog-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);

export default Blog;
