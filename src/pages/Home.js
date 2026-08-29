import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';
import HeroScene from '../components/HeroScene';
import './Home.css';

const BLOGS_PATH = process.env.PUBLIC_URL + '/blogs';

const Home = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(`${BLOGS_PATH}/blogs.json`);
        const folders = res.ok ? await res.json() : [];
        const posts = await Promise.all(
          folders.map(async (folder) => {
            try {
              const r = await fetch(`${BLOGS_PATH}/${folder}/index.md`);
              if (!r.ok) return null;
              const parsed = fm(await r.text());
              let tags = parsed.attributes.tags;
              if (typeof tags === 'string') {
                tags = tags.split(',').map((t) => t.trim());
              }
              return { ...parsed.attributes, tags, slug: folder };
            } catch {
              return null;
            }
          })
        );
        const sorted = posts
          .filter(Boolean)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setLatest(sorted);
      } catch {
        setLatest([]);
      }
    }
    fetchLatest();
  }, []);

  return (
    <div className="landing">
      {/* Hero: text + illustrated cloud scene */}
      <section className="landing__hero">
        <div className="landing__hero-art">
          <HeroScene />
        </div>

        <div className="landing__hero-inner">
          <h1 className="landing__title">
            Building <span className="landing__accent">backend &amp; data</span>{' '}
            systems in the cloud.
          </h1>
          <p className="landing__intro">
            Software engineer working with Java, Scala, and distributed data.
            Notes, projects, and books worth keeping.
          </p>
          <div className="landing__actions">
            <Link className="btn btn--primary" to="/blog">
              Read the blog
            </Link>
            <Link className="btn btn--ghost" to="/about">
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="landing__section">
        <div className="landing__section-head">
          <h2>Latest posts</h2>
          <Link to="/blog" className="landing__see-all">
            All posts →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="landing__empty">No posts yet.</p>
        ) : (
          <div className="landing__posts">
            {latest.map((post) => (
              <Link key={post.slug} to={`/post/${post.slug}`} className="landing__post">
                <span className="landing__post-title">{post.title}</span>
                <span className="landing__post-meta">
                  {post.date ? new Date(post.date).toLocaleDateString() : ''}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Explore */}
      <section className="landing__section">
        <div className="landing__section-head">
          <h2>Explore</h2>
        </div>
        <div className="landing__links">
          <Link to="/projects" className="landing__link">
            <span className="landing__link-icon">🛠️</span>
            <span className="landing__link-title">Projects</span>
            <span className="landing__link-sub">Things I’ve built</span>
          </Link>
          <Link to="/bookshelf" className="landing__link">
            <span className="landing__link-icon">📚</span>
            <span className="landing__link-title">Bookshelf</span>
            <span className="landing__link-sub">What I’m reading</span>
          </Link>
          <Link to="/work" className="landing__link">
            <span className="landing__link-icon">💼</span>
            <span className="landing__link-title">Work</span>
            <span className="landing__link-sub">Where I’ve worked</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
