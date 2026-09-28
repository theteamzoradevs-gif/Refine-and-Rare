const allowedTags = new Set([
  "strong",
  "b",
  "em",
  "i",
  "u",
  "mark",
  "p",
  "br",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function sanitizeBlogHtml(value: string) {
  return value.replace(/<!--|-->|<[^>]*>|[^<]+/g, (token) => {
    if (!token.startsWith("<")) return escapeHtml(token);
    const match = token.match(/^<\/?\s*([a-z0-9]+)([^>]*)>$/i);
    if (!match) return "";
    const tag = match[1].toLowerCase();
    if (!allowedTags.has(tag)) return "";
    if (token.startsWith("</")) return `</${tag}>`;
    if (tag === "a") {
      const href = match[2].match(/href\s*=\s*["']([^"']+)["']/i)?.[1] || "";
      if (!/^https?:\/\//i.test(href)) return "<a>";
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">`;
    }
    return `<${tag}>`;
  });
}