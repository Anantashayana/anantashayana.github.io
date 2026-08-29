import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home" id="home">
      {/* Intro */}
      <section className="home__intro">
        <div className="home__text">
          <span className="home__badge">
            <span className="home__badge-dot" /> Open to opportunities
          </span>

          <p className="home__greeting">👋 Hi, I’m</p>
          <h1 className="home__title">Anantashayana Hegde</h1>
          <p className="home__subtitle">Software Engineer · Backend Developer</p>
          <p className="home__tagline">
            I build reliable backend systems and enjoy working across cloud,
            DevOps, and machine learning.
          </p>

          <div className="home__cta">
            <a
              className="btn btn--primary"
              href="https://drive.google.com/file/d/1tEN65CfDJmLXSo5AvCqF4Q91rK8UEaFV/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Resume
            </a>
            <Link className="btn btn--ghost" to="/projects">
              View Projects
            </Link>
          </div>

          <div className="home__socials">
            <a href="https://github.com/Anantashayana" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/anantashayana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Things I Love Section */}
      <section className="home__love">
        <h2>Things I Love ❤️</h2>
        <div className="love__cards">
          <div className="card">
            <div className="card-icon">🤖</div>
            <h3>Machine Learning</h3>
            <p>Exploring algorithms and building intelligent solutions excites me.</p>
          </div>
          <div className="card">
            <div className="card-icon">⚙️</div>
            <h3>DevOps</h3>
            <p>Love automating workflows, CI/CD pipelines, and scaling apps.</p>
          </div>
          <div className="card">
            <div className="card-icon">☁️</div>
            <h3>Cloud</h3>
            <p>Enjoy designing cost‑effective cloud architectures for real problems.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
