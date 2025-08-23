import React from "react";
// import svgRect from "@src/static/home_rect.svg";
import "./Home.css"; // 👈 styles file

const Home = () => {
  return (
    <div className="home" id="home">
      {/* Background Shape */}
      {/* <img className="home__bg" src={svgRect} alt="background design" /> */}

      {/* Intro */}
      <section className="home__intro">
        <div className="home__text">
          <p className="home__greeting">👋 Hi, I’m</p>
          <h1 className="home__title">Anantashayana Hegde</h1>
          <p className="home__subtitle">Software Engineer | Backend Developer</p>

          <div className="home__cta">
            <a
              className="btn"
              href="https://drive.google.com/file/d/1tEN65CfDJmLXSo5AvCqF4Q91rK8UEaFV/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Resume
            </a>

            <div className="home__socials">
              <a href="https://github.com/Anantashayana" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://twitter.com/#" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://www.linkedin.com/in/anantashayana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Hero Image/Card */}
        {/* <div className="home__hero">
          <div className="hero-card">
            <img src="/profile.jpg" alt="Anantashayana" /> 
            <p>Passionate about backend systems, cloud & distributed apps 🚀</p>
          </div>
        </div> */}
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
