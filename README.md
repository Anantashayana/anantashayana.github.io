# Blog

A personal blog built with React and deployed to GitHub Pages. Blog posts are written in Markdown.

## Run locally

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Deploy

Deploys to GitHub Pages:

```bash
npm run deploy
```

## Add a blog post

1. Create a new folder under `public/blogs/` with your post's slug, e.g. `public/blogs/my-post/`.
2. Add an `index.md` file inside it with front matter at the top:

   ```markdown
   ---
   title: My Post Title
   date: 2025-01-05 12:28:00
   author: Anantashayana
   tags: ['tag1', 'tag2']
   ---

   Your post content here.
   ```

3. Add the folder name to `public/blogs/blogs.json`:

   ```json
   [
     "sample",
     "my-post"
   ]
   ```
