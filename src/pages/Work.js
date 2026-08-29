// Work / experience page
import React from 'react';
import './Pages.css';

const experience = [
  {
    role: 'Software Engineer',
    company: 'HSBC',
    period: 'July 2024 — Present',
    location: 'Pune, India',
    points: [
      'Built and maintained Spring Boot and Micronaut microservices on Kubernetes, applying design patterns for maintainable code and tuning for high-throughput, high-availability workloads.',
      "Developed the core data ingestion platform powering the bank's internal data-sharing infrastructure, exposing configurable REST APIs for multi-source and multi-target data flows.",
      'Resolved a critical scalability bottleneck in a scheduling microservice by redesigning the database locking strategy, eliminating contention and improving concurrent job throughput.',
      'Built a native file-watcher scheduling mechanism using JNI/JNA to bridge OS-level file system events with the JVM, enabling real-time, trigger-based pipeline execution.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Societe Generale',
    period: 'January 2024 — July 2024',
    location: 'Bengaluru, India',
    points: [
      "Migrated a departmental application's data store from MongoDB to PostgreSQL, including schema redesign and zero-data-loss migration scripting.",
      'Built a Grafana dashboard and Prometheus-based alerting system covering all departmental APIs, giving management actionable analytics on API health.',
      'Built and maintained an internal portal to track and monitor VMs company-wide, generating automated daily health reports; extended it to support self-service VM decommissioning, reducing manual IT ops overhead.',
    ],
  },
  {
    role: 'Project Intern',
    company: 'Oracle',
    period: 'July 2023 — September 2023',
    location: 'Bengaluru, India',
    points: [
      'Built an Enterprise Java application consuming Oracle Advanced Queue messages and dispatching SMS notifications via jSMPP, deployed on WebLogic using JMS and Message-Driven Beans.',
    ],
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
          <div className="timeline__head">
            <div>
              <p className="timeline__role">{job.role}</p>
              <p className="timeline__company">{job.company}</p>
            </div>
            <div className="timeline__when">
              <span className="timeline__period">{job.period}</span>
              {job.location && (
                <span className="timeline__location">{job.location}</span>
              )}
            </div>
          </div>
          <ul className="timeline__points">
            {job.points.map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

export default Work;
