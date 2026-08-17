const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Reads src/content/site-content.md (managed as a single "file" entry in the
// CMS) and exposes its i18n front matter as global Eleventy data: `site`.
// NOTE: deliberately not named `content` — Eleventy's Nunjucks layouts use
// the reserved variable `content` to inject the current page's rendered
// output, so reusing that name here would silently break every layout.
// Because the CMS uses i18n structure "single_file", translated fields are
// nested under top-level `tr` / `en` keys automatically.
module.exports = function () {
  const file = path.join(__dirname, "..", "content", "site-content.md");
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  return data;
};
