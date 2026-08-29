// 404 page
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const NotFound = () => (
  <div className="page" style={{ textAlign: 'center' }}>
    <h1 className="page__title">404</h1>
    <p className="page__lead">This page doesn’t exist or may have moved.</p>
    <Link className="page__button" to="/">
      ← Back home
    </Link>
  </div>
);

export default NotFound;
