// Book detail page — renders a single book review's markdown
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fm from 'front-matter';
import { marked } from 'marked';
import './Pages.css';

const BOOKS_PATH = process.env.PUBLIC_URL + '/books';

const BookDetail = () => {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`${BOOKS_PATH}/${slug}/index.md`);
        if (!res.ok) throw new Error('not found');
        const parsed = fm(await res.text());
        let html = marked(parsed.body);
        html = html.replace(
          /<img src=["'](?!https?:\/\/|\/)([^"'>]+)["']/g,
          `<img src="${BOOKS_PATH}/${slug}/$1"`
        );
        setBook({ ...parsed.attributes, body: html });
      } catch (e) {
        setBook(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [slug]);

  if (loading) return <div className="page">Loading...</div>;

  if (!book) {
    return (
      <div className="page">
        <h1 className="page__title">Book not found</h1>
        <Link className="page__button" to="/bookshelf">
          ← Back to Bookshelf
        </Link>
      </div>
    );
  }

  return (
    <article className="post-page">
      <Link to="/bookshelf" className="back-link">
        ← Back to Bookshelf
      </Link>
      <h1 className="post-title">{book.title}</h1>
      <div className="post-meta">
        {book.author && <span>by {book.author}</span>}
      </div>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: book.body }} />
    </article>
  );
};

export default BookDetail;
