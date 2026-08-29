// Bookshelf list page — reads book reviews from public/books
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';
import './Pages.css';

const BOOKS_PATH = process.env.PUBLIC_URL + '/books';

const statusLabel = {
  reading: 'Reading',
  finished: 'Finished',
  toread: 'To read',
};

const Bookshelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const manifestRes = await fetch(`${BOOKS_PATH}/books.json`);
      const folders = manifestRes.ok ? await manifestRes.json() : [];
      const items = await Promise.all(
        folders.map(async (folder) => {
          try {
            const res = await fetch(`${BOOKS_PATH}/${folder}/index.md`);
            if (!res.ok) return null;
            const parsed = fm(await res.text());
            return { ...parsed.attributes, slug: folder };
          } catch (e) {
            return null;
          }
        })
      );
      setBooks(items.filter(Boolean));
    }
    fetchBooks();
  }, []);

  return (
    <div className="page">
      <h1 className="page__title">Bookshelf</h1>
      <p className="page__lead">Books I’ve read, with a few thoughts on each.</p>

      <ul className="book-list">
        {books.length === 0 ? (
          <p>No books yet.</p>
        ) : (
          books.map((book) => (
            <li key={book.slug}>
              <Link to={`/bookshelf/${book.slug}`} className="book">
                <span className="book__info">
                  <span className="book__title">{book.title}</span>
                  <span className="book__author">{book.author}</span>
                </span>
                <span className={`book__status book__status--${book.status}`}>
                  {statusLabel[book.status] || book.status}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Bookshelf;
