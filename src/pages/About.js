// About page
import React from 'react';
import './Pages.css';

const About = () => (
  <div className="page">
    <h1 className="page__title">About</h1>
    <p className="page__lead">
      Hi, I’m Anantashayana Hegde, a software engineer who enjoys building
      reliable backend systems and exploring cloud, DevOps, and machine learning.
    </p>

    <section className="page__section">
      <h2>What I do</h2>
      <p>
        I work mostly on backend services and distributed systems, and I like
        automating things away with good tooling and CI/CD. Outside of work I
        write about what I learn and read a fair bit.
      </p>
    </section>

    <section className="page__section">
      <h2>Get in touch</h2>
      <p>
        The best way to reach me is on{' '}
        <a href="https://www.linkedin.com/in/anantashayana/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        or{' '}
        <a href="https://github.com/Anantashayana" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </section>
  </div>
);

export default About;
