import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => (
  <div className="about">

    {/* ── Hero ── */}
    <section className="about__hero">
      <div className="about__avatar-wrap">
        <img
          className="about__avatar"
          src={process.env.PUBLIC_URL + '/avatar.png'}
          alt="Anantashayana Hegde"
        />
      </div>

      <div className="about__hero-text">
        <span className="about__eyebrow">ABOUT</span>
        <h1 className="about__name">Anantashayana Hegde</h1>
        <p className="about__bio">
          I'm a software engineer who likes building the quiet machinery behind
          products — backend services, data pipelines, and the systems that keep
          them honest.
        </p>

        <div className="about__cta">
          <a
            className="btn btn--primary"
            href="https://drive.google.com/file/d/1tEN65CfDJmLXSo5AvCqF4Q91rK8UEaFV/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
          <a
            className="btn btn--ghost"
            href="https://github.com/Anantashayana"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn--ghost"
            href="https://www.linkedin.com/in/anantashayana/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>

    {/* ── Stat cards ── */}
    <section className="about__stats">
      <div className="about__stat">
        <span className="about__stat-label">NOW</span>
        <span className="about__stat-value">Software Engineer @ HSBC</span>
      </div>
      <div className="about__stat">
        <span className="about__stat-label">BASED IN</span>
        <span className="about__stat-value">Pune, India</span>
      </div>
      <div className="about__stat">
        <span className="about__stat-label">WORKING WITH</span>
        <span className="about__stat-value">Java · Scala · Kafka · Spark</span>
      </div>
      <div className="about__stat">
        <span className="about__stat-label">CURRENTLY</span>
        <span className="about__stat-value">Building data platforms</span>
      </div>
    </section>

    {/* ── Body copy ── */}
    <section className="about__body">
      <p className="about__body-p about__body-p--dropcap">
        Most of my work lives on the backend — I build and maintain services in
        Java and Scala, wrangle data with Kafka and Spark, and care a lot about
        making systems that are simple to reason about and hard to break.
      </p>
      <p className="about__body-p">
        Outside of shipping features, I enjoy the puzzle: untangling a
        scalability bottleneck, redesigning a schema, or bridging two systems
        that were never meant to talk. When I'm not coding, I'm usually reading
        or writing up something I just learned.
      </p>
    </section>

    {/* ── What I care about ── */}
    <section className="about__interests">
      <h2 className="about__interests-title">What I care about</h2>
      <div className="about__interest-grid">
        <div className="about__interest-card">
          <span className="about__interest-icon">▤</span>
          <h3>Backend systems</h3>
          <p>Designing services that stay fast and correct under real load.</p>
        </div>
        <div className="about__interest-card">
          <span className="about__interest-icon">⇶</span>
          <h3>Distributed data</h3>
          <p>Streaming, pipelines, and moving data reliably at scale.</p>
        </div>
        <div className="about__interest-card">
          <span className="about__interest-icon">☁</span>
          <h3>Cloud</h3>
          <p>Building cost-aware systems on AWS and GCP.</p>
        </div>
        <div className="about__interest-card">
          <span className="about__interest-icon">▭</span>
          <h3>Learning in public</h3>
          <p>Writing about what I read and figure out along the way.</p>
        </div>
      </div>
    </section>

    {/* ── Footer CTA ── */}
    <p className="about__footer-cta">
      Want to see what I've built? Take a look at my{' '}
      <Link to="/projects">projects</Link>, or read the{' '}
      <Link to="/blog">blog</Link>.
    </p>
  </div>
);

export default About;
