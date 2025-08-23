// src/utils/fetchReadme.js
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const fetchReadmeContent = async (username, repo) => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${username}/${repo}/main/README.md`
    );
    
    if (!response.ok) {
      throw new Error('README not found');
    }
    
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
};

// Component to display README content
export const ReadmePost = ({ username, repo, title = 'README' }) => {
  const [content, setContent] = useState('Loading...');
  
  useEffect(() => {
    fetchReadmeContent(username, repo)
      .then(readme => {
        if (readme) {
          setContent(readme);
        } else {
          setContent('Failed to load README content.');
        }
      });
  }, [username, repo]);

  return (
    <article className="readme-post">
      <h1>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};
