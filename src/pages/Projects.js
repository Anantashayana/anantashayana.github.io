// Projects list page — reads markdown projects from public/projects
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fm from 'front-matter';
import './Pages.css';

const PROJECTS_PATH = process.env.PUBLIC_URL + '/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const manifestRes = await fetch(`${PROJECTS_PATH}/projects.json`);
      const folders = manifestRes.ok ? await manifestRes.json() : [];
      const items = await Promise.all(
        folders.map(async (folder) => {
          try {
            const res = await fetch(`${PROJECTS_PATH}/${folder}/index.md`);
            if (!res.ok) return null;
            const parsed = fm(await res.text());
            let tags = parsed.attributes.tags;
            if (typeof tags === 'string') {
              tags = tags.split(',').map((t) => t.trim());
            }
            return { ...parsed.attributes, tags, slug: folder };
          } catch (e) {
            return null;
          }
        })
      );
      setProjects(items.filter(Boolean));
    }
    fetchProjects();
  }, []);

  return (
    <div className="page">
      <h1 className="page__title">Projects</h1>
      <p className="page__lead">Things I’ve built and experimented with.</p>

      <div className="cards-grid">
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card-link">
              <div className="project-card">
                <h3>{p.title}</h3>
                {p.tags && (
                  <div className="project-card__tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <p>{p.summary}</p>
                <span className="project-card__link">Read more →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
