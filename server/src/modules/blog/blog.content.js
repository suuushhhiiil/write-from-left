import sanitizeHtml from "sanitize-html";

const EXCERPT_LIMIT = 180;

const textOf = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (!Array.isArray(node.content)) return "";
  return node.content.map(textOf).join("");
};

export const excerptFromContent = (content) => {
  let found = "";

  const walk = (node) => {
    if (found || !node) return;
    if (node.type === "paragraph" || node.type === "heading") {
      const text = textOf(node).replace(/\s+/g, " ").trim();
      if (text) found = text;
      return;
    }
    if (Array.isArray(node.content)) node.content.forEach(walk);
  };

  walk(content);
  if (!found) return "";
  if (found.length <= EXCERPT_LIMIT) return found;
  return `${found.slice(0, EXCERPT_LIMIT - 1).trimEnd()}…`;
};

export const resolveExcerpt = (raw, content) => {
  const trimmed = String(raw ?? "").trim();
  if (trimmed) return trimmed;
  return excerptFromContent(content);
};

export const sanitizeContentHtml = (html) =>
  sanitizeHtml(String(html || ""), {
    allowedTags: [
      "p",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "hr",
      "a",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      }),
    },
  });
