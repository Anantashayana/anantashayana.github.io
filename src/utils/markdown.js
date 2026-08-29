// Shared markdown renderer with syntax highlighting.
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

/**
 * Render markdown to HTML and rewrite relative image paths to the
 * given base path (e.g. /blogs/<slug>).
 */
export function renderMarkdown(body, basePath) {
  let html = marked.parse(body);
  if (basePath) {
    html = html.replace(
      /<img src=["'](?!https?:\/\/|\/)([^"'>]+)["']/g,
      `<img src="${basePath}/$1"`
    );
  }
  return html;
}
