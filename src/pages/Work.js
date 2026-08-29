// Work / experience page
import React from 'react';
import './Pages.css';

const experience = [
  {
    role: 'Software Engineer',
    company: 'Company Name',
    period: '2023 — Present',
    description:
      'Building and maintaining backend services. Update this with your real role and highlights.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Company Name',
    period: '2022 — 2023',
    description:
      'Worked on internal tooling and APIs. Replace with your actual experience.',
  },
];

const Work = () => (
  <div className="page">
    <h1 className="page__title">Work</h1>
    <p className="page__lead">
      A short history of where I’ve worked and what I’ve built.
    </p>

    <ul className="timeline">
      {experience.map((job, i) => (
        <li key={i} className="timeline__item">
          <p className="timeline__role">
            {job.role} · {job.company}
          </p>
          <p className="timeline__meta">{job.period}</p>
          <p>{job.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Work;
