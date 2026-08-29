// Project detail page — renders a single project's markdown
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fm from 'front-matter';
import { marked } from 'marked';
import './Pages.css';

const PROJECTS_PATH = process.env.PUBLIC_URL + '/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`${PROJECTS_PATH}/${slug}/index.md`);
        if (!res.ok) throw new Error('not found');
        const parsed = fm(await res.text());
        let tags = parsed.attributes.tags;
        if (typeof tags === 'string') {
          tags = tags.split(',').map((t) => t.trim());
        }
        let html = marked(parsed.body);
        // Rewrite relative image paths to this project's folder
        html = html.replace(
          /<img src=["'](?!https?:\/\/|\/)([^"'>]+)["']/g,
          `<img src="${PROJECTS_PATH}/${slug}/$1"`
        );
        setProject({ ...parsed.attributes, tags, body: html });
      } catch (e) {
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) return <div className="page">Loading...</div>;

  if (!project) {
    return (
      <div className="page">
        <h1 className="page__title">Project not found</h1>
        <Link className="page__button" to="/projects">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="post-page">
      <Link to="/projects" className="back-link">
        ← Back to Projects
      </Link>
      <h1 className="post-title">{project.title}</h1>

      {project.tags && (
        <div className="post-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {(project.github || project.demo) && (
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="page__button">
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="page__button">
              Live Demo
            </a>
          )}
        </div>
      )}

      <div className="post-content" dangerouslySetInnerHTML={{ __html: project.body }} />
    </article>
  );
};

export default ProjectDetail;
