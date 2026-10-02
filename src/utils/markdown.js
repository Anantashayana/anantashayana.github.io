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

/** Strip any inline markdown syntax to get plain text from a heading */
function extractPlainText(tokens) {
  return tokens
    .map((t) => {
      // inline code: use the raw text without backticks
      if (t.type === 'codespan') return t.text;
      // bold/italic/link: recurse into their tokens
      if (t.tokens && t.tokens.length) return extractPlainText(t.tokens);
      // plain text
      return t.text ?? t.raw ?? '';
    })
    .join('');
}

/** Turn plain heading text into a URL-safe id */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // strip punctuation / symbols
    .trim()
    .replace(/\s+/g, '-');    // spaces → hyphens
}

/**
 * Render markdown to HTML.
 * Returns { html, headings } where headings is
 * [{ level: 1|2|3, text: string, id: string }].
 */
export function renderMarkdown(body, basePath) {
  const headings = [];
  const usedIds = {};

  const renderer = {
    heading({ tokens, depth }) {
      const plainText = extractPlainText(tokens);
      // Produce the display HTML by parsing inner tokens normally
      const innerHtml = tokens
        .map((t) => {
          if (t.type === 'codespan') return `<code>${t.text}</code>`;
          if (t.tokens && t.tokens.length)
            return t.tokens.map((tt) => tt.text ?? tt.raw ?? '').join('');
          return t.text ?? t.raw ?? '';
        })
        .join('');

      if (depth > 3) {
        return `<h${depth}>${innerHtml}</h${depth}>\n`;
      }

      let id = slugify(plainText);

      // De-duplicate ids (e.g. two "Overview" headings)
      if (usedIds[id] !== undefined) {
        usedIds[id]++;
        id = `${id}-${usedIds[id]}`;
      } else {
        usedIds[id] = 0;
      }

      headings.push({ level: depth, text: plainText, id });
      return `<h${depth} id="${id}">${innerHtml}</h${depth}>\n`;
    },
  };

  marked.use({ renderer });

  let html = marked.parse(body);

  if (basePath) {
    html = html.replace(
      /<img src=["'](?!https?:\/\/|\/)([^"'>]+)["']/g,
      `<img src="${basePath}/$1"`
    );
  }

  return { html, headings };
}
