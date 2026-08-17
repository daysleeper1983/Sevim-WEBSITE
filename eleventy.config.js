const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({ html: true, breaks: false, linkify: true });

module.exports = function (eleventyConfig) {
  // Static passthrough
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ admin: "admin" });
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Render an i18n text field (markdown or plain) to safe HTML
  eleventyConfig.addFilter("markdown", (value) => {
    if (!value) return "";
    return md.render(String(value));
  });

  eleventyConfig.addFilter("markdownInline", (value) => {
    if (!value) return "";
    return md.renderInline(String(value));
  });

  // Locale-aware date formatting: {{ post.data.date | localeDate: "tr" }}
  eleventyConfig.addFilter("localeDate", (dateValue, locale) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    if (isNaN(d)) return "";
    const loc = locale === "en" ? "en-GB" : "tr-TR";
    return d.toLocaleDateString(loc, { year: "numeric", month: "long", day: "numeric" });
  });

  // Sort a collection array (of Eleventy items) newest date first
  eleventyConfig.addFilter("sortByDateDesc", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return [...arr].sort((a, b) => {
      const ad = new Date(a.data.date || 0).getTime();
      const bd = new Date(b.data.date || 0).getTime();
      return bd - ad;
    });
  });

  eleventyConfig.addFilter("limit", (arr, n) => {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, n);
  });

  eleventyConfig.addFilter("featuredOnly", (arr) => {
    if (!Array.isArray(arr)) return arr;
    return arr.filter((item) => item.data && item.data.featured);
  });

  eleventyConfig.addFilter("byCategory", (arr, cat) => {
    if (!Array.isArray(arr)) return arr;
    if (!cat || cat === "all") return arr;
    return arr.filter((item) => item.data && item.data.category === cat);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
