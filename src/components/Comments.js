// src/components/Comments.js
import React from 'react';
import Giscus from '@giscus/react';

const Comments = ({ postId }) => {
  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <Giscus
        id="comments"
        repo="yourusername/my-react-blog" // Replace with your repo
        repoId="your-repo-id" // Get from giscus.app
        category="General"
        categoryId="your-category-id" // Get from giscus.app
        mapping="specific"
        term={postId}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default Comments;
